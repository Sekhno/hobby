import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {UploadComponent} from './upload/upload.component';
import {MainComponent} from './main/main.component';
import {AdminRoutingModule} from "./admin-routing.module";
import {CoreMaterialModule} from "../core-material.module";
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from "@angular/forms";
import {StoreModule} from "@ngrx/store";
import {ADMIN_KEY, userReducer} from "./store/reducers/admin.reducer";
import {EffectsModule} from "@ngrx/effects";
import {AdminEffect} from "./store/effects/admin.effect";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {SnackbarInterceptor} from "../_helpers/snackbar.interceptor";




@NgModule({
  declarations: [
    LoginComponent,
    UploadComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CoreMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    StoreModule.forFeature(ADMIN_KEY, userReducer),
    EffectsModule.forFeature([AdminEffect])
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: SnackbarInterceptor },
  ]
})
export class AdminModule { }
