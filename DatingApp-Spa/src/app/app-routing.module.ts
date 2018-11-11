import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsContainerComponent } from './settings';
import { HomeComponent } from '@app/features/home/home.component';
import { NotLoggedInGuard } from '@app/core/auth/not-logged-in.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'settings',
    component: SettingsContainerComponent,
    data: { title: 'dtapp.menu.settings' },
  },
  {
    path: 'examples',
    loadChildren: 'app/examples/examples.module#ExamplesModule',
  },
  {
    path: 'members',
    loadChildren: 'app/features/member/member.module#MemberModule',
  },
  {
    path: 'login',
    loadChildren: 'app/features/login/login.module#LoginModule',
    canActivate: [NotLoggedInGuard],
  },
  {
    path: 'sign-up',
    loadChildren: 'app/features/sign-up/sign-up.module#SignUpModule',
    canActivate: [NotLoggedInGuard],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
