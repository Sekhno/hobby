import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {COLLECTION_CATEGORIES, COLLECTION_IMAGES, FileDataType} from "../../admin/models/upload.model";
import {FullImageModalComponent} from "../full-image-modal/full-image-modal.component";
import {PageEvent} from "@angular/material/paginator";
import {Subject} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {
  images: FileDataType[] = [];
  curImages: FileDataType[] = [];

  public loadHandler(e: Event) {
    (e.target as HTMLImageElement).style.opacity = '1'
  }

  public openDialog(image: FileDataType) {
    this.dialog.open(FullImageModalComponent, {
      width: '100%',
      data: image,
    });
  }

  public changePageEvent({ pageIndex, pageSize }: PageEvent) {
    const start = pageIndex * pageSize;
    const end = start + pageSize;
    this.curImages = this.images.slice(start, end);
    this.cdr.markForCheck();
  }

  protected readonly onDestroy = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.afs
        .collection(COLLECTION_IMAGES)
        .doc(COLLECTION_CATEGORIES)
        .collection<FileDataType>(id)
        .valueChanges()
        .pipe(takeUntil(this.onDestroy))
        .subscribe((images) => {
          this.images = images;
          this.curImages = images.slice(0, 5);
          this.cdr.markForCheck();
        })
    }
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

}
