import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./main/main.component";
import {LoginComponent} from "./login/login.component";
import {UploadComponent} from "./upload/upload.component";
import {AuthGuard} from "../_guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'upload',
        component: UploadComponent,
        // canActivate: [AuthGuard]
      },
      { path: '**', redirectTo: 'login' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
