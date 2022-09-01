import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {FormBuilder, Validators} from "@angular/forms";
import {
  DataUrl,
  NgxImageCompressService,
  UploadResponse,
} from 'ngx-image-compress';
import {
  FileDataType,
  CategoryDataType,
  CategoryItemType,
  COLLECTION_IMAGES,
  COLLECTION_CATEGORIES
} from "../models/upload.model";
import {takeUntilDestroy$} from "../../_helpers/takeUntilDestroy.function";
import {first, map, switchMap} from "rxjs/operators";


const ORIGINAL_IMAGE_PREFIX = 'original_';
const COMPRESS_IMAGE_PREFIX = 'compress_';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadComponent implements OnInit {

  isLoading = false;
  categoryForm = this.fb.group({
    name: this.fb.control('', Validators.required)
  })
  form = this.fb.group({
    title: this.fb.control('no name', Validators.required),
    description: this.fb.control(''),
    orientation: this.fb.control('horizontal'),
    category: this.fb.control('', Validators.required),
    cover: this.fb.control(false)
  });
  fileName = '';
  fileOriginalSize = 0;
  fileAfterCompressSize = 0;
  imgResultBeforeCompress: DataUrl = '';
  imgResultAfterCompress: DataUrl = '';

  categories: CategoryItemType[] = [];

  readonly collectionImages$ = this.afs.collection(COLLECTION_IMAGES).doc(COLLECTION_CATEGORIES);
  readonly collectionCategories$ = this.afs.collection<CategoryDataType>(COLLECTION_CATEGORIES).valueChanges();

  private readonly basePath = '/uploads';


  private _clearForm() {
    this.form.patchValue({ title: 'no name', description: '', orientation: 'horizontal' }, {emitEvent: false});
    this.fileName = '';
    this.fileOriginalSize = 0;
    this.fileAfterCompressSize = 0;
    this.imgResultBeforeCompress = '';
    this.imgResultAfterCompress = '';
    // this.fileUploaded = null;
    // this.filePath = '';
  }

  private _uploadImage(type: 'original' | 'compress', data: DataUrl) {
    return this.storage.ref(`${this.basePath}/${type}/${this.fileName}`)
      .putString(data, 'data_url')
      // .then((v) => console.log('success', v.ref.getDownloadURL()))
  }

  public selectImage() {
    this.imageCompress.uploadFile().then(({ image, orientation, fileName }: UploadResponse) => {
      this.imgResultBeforeCompress = image;
      this.fileName = fileName;
      this.fileOriginalSize = this.imageCompress.byteCount(image);

      this.imageCompress
        .compressFile(image, orientation, 50, 50)
        .then((result: DataUrl) => {
          this.imgResultAfterCompress = result;
          this.fileAfterCompressSize =  this.imageCompress.byteCount(result);
          this.cdr.markForCheck();
        });
    });
  }

  public async uploadAndSaveFileData() {
    this.isLoading = true;
    const original = await this._uploadImage('original', this.imgResultBeforeCompress);
    const compress = await this._uploadImage('compress', this.imgResultAfterCompress);
    const url = {
      original: await original.ref.getDownloadURL(),
      compress: await compress.ref.getDownloadURL()
    }
    const { title, description, orientation, cover, category } = this.form.value;
    const name = this.fileName;
    const data = { title, description, orientation, url, name }

    if (cover) {
      await this.afs.collection(COLLECTION_CATEGORIES).doc(`${category}`).set({name: category, cover: url.compress})
    }

    await this.afs.collection(COLLECTION_IMAGES).doc(COLLECTION_CATEGORIES).collection(`${category}`).add(data)
    this._clearForm();
    this.isLoading = false;
    this.cdr.markForCheck();
  }

  public delete(image: FileDataType) {
    const desertOriginalRef = this.storage.ref(`${this.basePath}/original`).child(`${image.name}`);
    const desertCompressRef = this.storage.ref(`${this.basePath}/compress`).child(`${image.name}`);

    desertOriginalRef.delete().subscribe((v) => {
      console.log('delete desertOriginalRef', v)
    });
    desertCompressRef.delete().subscribe((v) => {
      console.log('delete desertCompressRef', v)
    });

    this.afs.collection(COLLECTION_IMAGES).doc(`${image.name}`).delete().then(() => {
      console.log("Document successfully deleted!");
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  public async saveCategory() {
    this.isLoading = true;
    const { name } = this.categoryForm.value;
    const cover = null;
    await this.afs.collection(COLLECTION_CATEGORIES).doc(`${name}`).set({ name, cover });
    this.isLoading = false;
    this.cdr.markForCheck();
  }

  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private fb: FormBuilder,
    private imageCompress: NgxImageCompressService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.collectionCategories$.subscribe((category) => {
      category.forEach(({name}) => {
        this.collectionImages$.collection<FileDataType>(name).valueChanges()
          .subscribe((data) => {
            const item = this.categories.find((c) => c.name === name);
            if (item) {
              item.data = data;
            } else {
              this.categories.push({name, data})
            }
            this.cdr.markForCheck();
          })
      })
    });

  }

}
