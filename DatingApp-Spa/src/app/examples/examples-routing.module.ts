import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IsAuthenticatedGuardService } from '@app/core';

import { ExamplesComponent } from './examples/examples.component';
import { AuthenticatedComponent } from './authenticated/authenticated.component';
import { CrudComponent } from './crud/components/crud.component';

const routes: Routes = [
  {
    path: '',
    component: ExamplesComponent,
    children: [
      {
        path: '',
        redirectTo: 'crud',
        pathMatch: 'full'
      },
      {
        path: 'crud',
        component: CrudComponent,
        data: { title: 'dtapp.examples.menu.crud' }
      },
      {
        path: 'authenticated',
        component: AuthenticatedComponent,
        canActivate: [IsAuthenticatedGuardService],
        data: { title: 'dtapp.examples.menu.auth' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamplesRoutingModule {}
