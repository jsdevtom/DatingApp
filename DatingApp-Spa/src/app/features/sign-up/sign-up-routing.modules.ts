import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { SignUpPageComponent } from '@app/features/sign-up/sign-up-page/sign-up-page.component';

const routes: Routes = [
  {
    path: '',
    component: SignUpPageComponent,
    data: { title: 'dtapp.signUp.title' },
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignUpRoutingModule {
}

