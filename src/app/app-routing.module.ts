import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  {
    path: 'admin',
    children: [
      {
        canActivate: [],
        path: '',
        loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
      },
    ],
  },
  {
    path: 'welcome',
    children: [
      {
        path: '',
        loadChildren: () => import('./welcome/welcome.module').then((m) => m.WelcomeModule),
      },
    ],
  },
  { path: '**', redirectTo: 'welcome' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
