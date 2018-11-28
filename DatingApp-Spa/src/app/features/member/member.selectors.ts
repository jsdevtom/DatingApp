import { createSelector, MemoizedSelector } from '@ngrx/store';
import { MemberModuleState, MemberState, selectMemberModule, State } from '@app/features/member/member.state';
import { selectAll } from '@app/features/member/member.reducer';

export const selectMember: MemoizedSelector<State, MemberState> =
  createSelector(
    selectMemberModule,
    (state: MemberModuleState) => state.member,
  );

export const selectAllMembers =
  createSelector(selectMember, selectAll);

export const selectSelectedMember = createSelector(selectMember, (memberState) => memberState.selectedMember)
