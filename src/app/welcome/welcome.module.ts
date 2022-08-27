import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import {WelcomeRoutingModule} from "./welcome-routing.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatDialogModule} from "@angular/material/dialog";
import {FullImageModalComponent} from './full-image-modal/full-image-modal.component';


const materialModules = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatDialogModule
];
@NgModule({
  declarations: [
    MainComponent,
    FullImageModalComponent
  ],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    FlexLayoutModule,
    materialModules
  ]
})
export class WelcomeModule { }
