import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersListComponent } from './members-list/members-list.component';
import { MembersPageComponent } from './members-page/members-page.component';
import { MemberRoutingModule } from '@app/features/member/member-routing.module';
import { SharedModule } from '@app/shared';
import { StoreModule } from '@ngrx/store';
import { MEMBER_FEATURE_NAME, reducers } from '@app/features/member/member.state';
import { EffectsModule } from '@ngrx/effects';
import { MemberEffects } from '@app/features/member/member.effects';
import { MemberCardComponent } from '@app/features/member/member-card/member-card.component';
import { MemberDetailPageComponent } from './member-detail-page/member-detail-page.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,

    StoreModule.forFeature(MEMBER_FEATURE_NAME, reducers),

    MemberRoutingModule,

    EffectsModule.forFeature([MemberEffects]),
  ],
  declarations: [
    MembersListComponent,
    MembersPageComponent,
    MemberCardComponent,
    MemberDetailPageComponent,
  ],
})
export class MemberModule {
}
