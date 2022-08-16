import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {FileDataType, FileUpload} from "../models/upload.model";
import {FormBuilder, Validators} from "@angular/forms";
import {
  DataUrl,
  DOC_ORIENTATION,
  NgxImageCompressService,
  UploadResponse,
} from 'ngx-image-compress';

const COLLECTION_IMAGES = 'images';
const ORIGINAL_IMAGE_PREFIX = 'original_';
const COMPRESS_IMAGE_PREFIX = 'compress_';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadComponent implements OnInit {

  // @ViewChild('fileInput', {static: false}) fileRef!: ElementRef;
  isLoading = false;
  form = this.fb.group({
    title: this.fb.control('no name', Validators.required),
    description: this.fb.control(''),
    orientation: this.fb.control('horizontal')
  });
  // fileUploaded: FileUpload | null = null;
  // filePath = '';
  fileName = '';
  fileOriginalSize = 0;
  fileAfterCompressSize = 0;
  imgResultBeforeCompress: DataUrl = '';
  imgResultAfterCompress: DataUrl = '';

  readonly collectionImages$ = this.afs.collection<FileDataType>('images').valueChanges();

  private readonly basePath = '/uploads';

  private _saveFileData() {
    // const { title, description, orientation } = this.form.value;
    // const { url, name } = this.fileUploaded as FileUpload;
    //
    // this.afs.collection(COLLECTION_IMAGES).doc(`image_${title}`).set({ name, url, title, orientation, description })
    //   .then(() => {
    //     console.log("Document successfully written!");
    //     this._clearForm();
    //   })
    //   .catch((error) => {
    //     console.error("Error writing document: ", error);
    //   });
  }

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
      console.warn('File Name:', fileName);
      console.warn(`Original: ${image.substring(0, 50)}... (${image.length} characters)`);
      console.warn('Size in bytes was:', this.imageCompress.byteCount(image));


      this.imageCompress
        .compressFile(image, orientation, 50, 50)
        .then((result: DataUrl) => {
          this.imgResultAfterCompress = result;
          this.fileAfterCompressSize =  this.imageCompress.byteCount(result);

          console.warn(`Compressed: ${result.substring(0, 50)}... (${ result.length } characters)`);
          console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
          this.cdr.markForCheck();
          // this.storage.ref(fileName).putString(result, 'data_url').then(
          //   (v) => console.log('success', v)
          // )
        });
    });
  }

  public onFileSelected() {
    // const inputNode: any = this.fileRef.nativeElement;
    // const fileUpload = inputNode.files[0] as FileUpload;
    // const name = fileUpload.name;
    // this.filePath = `${this.basePath}/${name}`;
    // this.fileUploaded = fileUpload;
  }

  public async uploadAndSaveFileData() {
    this.isLoading = true;
    const original = await this._uploadImage('original', this.imgResultBeforeCompress);
    const compress = await this._uploadImage('compress', this.imgResultAfterCompress);
    const url = {
      original: await original.ref.getDownloadURL(),
      compress: await compress.ref.getDownloadURL()
    }
    const { title, description, orientation } = this.form.value;
    const name = this.fileName;
    const data = { title, description, orientation, url, name }
    await this.afs.collection(COLLECTION_IMAGES).doc(`${name}`).set(data)
    this._clearForm();
    this.isLoading = false;
      // .then(() => {
      //   console.log("Document successfully written!");
      //   this._clearForm();
      // })
      // .catch((error) => {
      //   console.error("Error writing document: ", error);
      // });

    // await this.storage.upload(this.fileName, data);
    //
    // this.storage.ref(this.filePath).getDownloadURL().subscribe((url) => {
    //   (this.fileUploaded as FileUpload).url = url;
    //   this._saveFileData()
    // });
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

  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private fb: FormBuilder,
    private imageCompress: NgxImageCompressService,
    private cdr: ChangeDetectorRef
  ) {
    this.collectionImages$.subscribe((r) => console.log(r))
  }

  ngOnInit(): void {
  }

}
