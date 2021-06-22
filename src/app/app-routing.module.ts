import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { ListComponent } from './components/list/list.component';

const routes: Routes = [
  {
    path: 'home',
    component: ListComponent
  },
  {
    path: 'form',
    component: FormComponent
  },
  {
    path: 'edit/:id',
    component: FormComponent
  },
  {
    path: '**',
    redirectTo:'/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
