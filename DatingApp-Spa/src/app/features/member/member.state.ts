import { EntityState } from '@ngrx/entity';
import { Member } from '@app/features/member/member.model';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { memberReducer } from '@app/features/member/member.reducer';
import { AppState } from '@app/core';
import { UserForDetailedDto } from '@app/features/user/user.models';

export const MEMBER_FEATURE_NAME = 'memberModule';

export const reducers: ActionReducerMap<MemberModuleState> = {
  member: memberReducer,
};

export const selectMemberModule = createFeatureSelector<State, MemberModuleState>(
  MEMBER_FEATURE_NAME,
);

export interface MemberModuleState {
  member: MemberState;
}

export interface MemberState extends EntityState<Member> {
  selectedMember: UserForDetailedDto;
}

export interface State extends AppState {
  memberModule: MemberModuleState;
}
