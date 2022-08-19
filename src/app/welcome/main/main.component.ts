import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {PageEvent} from "@angular/material/paginator";
import {takeUntil, tap} from "rxjs/operators";
import {Subject} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {FullImageModalComponent} from "../full-image-modal/full-image-modal.component";
import {FileDataType} from "../../admin/models/upload.model";

const DATA_IMAGES_COLLECTION = 'images';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit, OnDestroy {
  pageEvent!: PageEvent;
  images: FileDataType[] = [];

  public loadHandler(e: Event) {
    (e.target as HTMLImageElement).style.opacity = '1'
  }

  public openDialog(image: FileDataType) {
    this.dialog.open(FullImageModalComponent, {
      width: '100%',
      data: image,
    });
  }

  protected readonly onDestroy = new Subject<void>();

  constructor(
    private afs: AngularFirestore,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.afs.collection<FileDataType>(DATA_IMAGES_COLLECTION)
      .valueChanges()
      .pipe(takeUntil(this.onDestroy))
      .subscribe((images) => {
        console.log(images);
        this.images = images;
        this.cdr.markForCheck();
      })
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
