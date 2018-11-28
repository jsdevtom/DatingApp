import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {MembersPageComponent} from './members-page/members-page.component';
import { MemberDetailPageComponent } from '@app/features/member/member-detail-page/member-detail-page.component';

const routes: Routes = [
  {path: '', component: MembersPageComponent},
  {path: ':id', component: MemberDetailPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MemberRoutingModule {
}

export const routedComponents = [MembersPageComponent];
