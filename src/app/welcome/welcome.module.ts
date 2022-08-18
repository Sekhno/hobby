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

const materialModules = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatPaginatorModule,
  MatProgressSpinnerModule
];
@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    FlexLayoutModule,
    materialModules
  ]
})
export class WelcomeModule { }
