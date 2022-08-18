import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FileDataType} from "../../admin/models/upload.model";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {PageEvent} from "@angular/material/paginator";
import {tap} from "rxjs/operators";

const DATA_IMAGES_COLLECTION = 'images';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {
  pageEvent!: PageEvent;

  readonly collectionImages$ = this.afs.collection<FileDataType>(DATA_IMAGES_COLLECTION).valueChanges();

  public loadHandler(e: Event) {
    (e.target as HTMLImageElement).style.opacity = '1'
  }

  constructor(
    private afs: AngularFirestore,
  ) { }

  ngOnInit(): void {
  }

}
