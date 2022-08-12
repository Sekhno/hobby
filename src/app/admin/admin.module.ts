import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { UploadComponent } from './upload/upload.component';



@NgModule({
  declarations: [
    LoginComponent,
    UploadComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
