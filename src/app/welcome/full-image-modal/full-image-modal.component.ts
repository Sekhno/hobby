import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FileDataType} from "../../admin/models/upload.model";

@Component({
  selector: 'app-full-image-modal',
  templateUrl: './full-image-modal.component.html',
  styleUrls: ['./full-image-modal.component.scss']
})
export class FullImageModalComponent implements OnInit {

  public onCloseClick(): void {
    this.dialogRef.close();
  }

  constructor(
    public dialogRef: MatDialogRef<FullImageModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FileDataType,
  ) { }

  ngOnInit(): void {
  }

}
