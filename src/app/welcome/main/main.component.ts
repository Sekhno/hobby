import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FileDataType} from "../../admin/models/upload.model";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {

  readonly collectionImages$ = this.afs.collection<FileDataType>('images').valueChanges();

  constructor(
    private afs: AngularFirestore,
  ) { }

  ngOnInit(): void {
  }

}
