import {ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import {FileDataType, FileUpload} from "../models/upload.model";
import {FormBuilder, Validators} from "@angular/forms";

const COLLECTION_IMAGES = 'images';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadComponent implements OnInit {
  @ViewChild('fileInput', {static: false}) fileRef!: ElementRef;
  form = this.fb.group({
    title: this.fb.control('no name', Validators.required),
    description: this.fb.control(''),
    orientation: this.fb.control('horizontal')
  });
  fileUploaded: FileUpload | null = null;
  filePath!: string;

  readonly collectionImages$ = this.afs.collection<FileDataType>('images').valueChanges();
  private readonly basePath = '/uploads';

  private _saveFileData() {
    const { title, description, orientation } = this.form.value;
    const { url, name } = this.fileUploaded as FileUpload;

    this.afs.collection(COLLECTION_IMAGES).doc(`image_${title}`).set({ name, url, title, orientation, description })
      .then(() => {
        console.log("Document successfully written!");
        this._clearForm();
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  }

  private _clearForm() {
    this.form.patchValue({ title: 'no name', description: '', orientation: 'horizontal' }, {emitEvent: false});
    this.fileUploaded = null;
    this.filePath = '';
  }

  public onFileSelected() {
    const inputNode: any = this.fileRef.nativeElement;
    const fileUpload = inputNode.files[0] as FileUpload;
    const name = fileUpload.name;
    this.filePath = `${this.basePath}/${name}`;
    this.fileUploaded = fileUpload;
  }

  public async uploadAndSaveFileData() {
    await this.storage.upload(this.filePath, this.fileUploaded);

    this.storage.ref(this.filePath).getDownloadURL().subscribe((url) => {
      (this.fileUploaded as FileUpload).url = url;
      this._saveFileData()
    });
  }

  public delete(image: FileDataType) {
    const desertRef = this.storage.ref(`${this.basePath}`).child(`${image.name}`);

    desertRef.delete().subscribe((v) => {
      console.log('delete', v)
    });

    this.afs.collection(COLLECTION_IMAGES).doc(`image_${image.title}`).delete().then(() => {
      console.log("Document successfully deleted!");
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private fb: FormBuilder
  ) {
    this.collectionImages$.subscribe((r) => console.log(r))
  }

  ngOnInit(): void {
  }

}
