import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginPageComponent} from '@app/features/login/login-page/login-page.component';


const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
    data: { title: 'dtapp.login.title' },
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {
}

export const routedComponents = [LoginPageComponent];
