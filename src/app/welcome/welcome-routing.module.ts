import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./main/main.component";
import {CategoryComponent} from "./category/category.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    title: 'Welcome'
  },
  {
    path: 'category/:id',
    component: CategoryComponent,
    title: 'Category'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelcomeRoutingModule {}
