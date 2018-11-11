import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Member } from './member.model';
import { MemberActions, MemberActionTypes } from './member.actions';
import { MemberState } from '@app/features/member/member.state';
import { BookActionTypes } from '@app/examples/crud/books.actions';

export const memberAdapter: EntityAdapter<Member> = createEntityAdapter<Member>();

export const initialMemberState: MemberState = memberAdapter.getInitialState({
  selectedMember: null
});

export function memberReducer(
  state = initialMemberState,
  action: MemberActions
): MemberState {
  switch (action.type) {
    case MemberActionTypes.AddMember: {
      return memberAdapter.addOne(action.payload.member, state);
    }

    case MemberActionTypes.SelectOne:
      return { ...state, selectedMember: action.payload.member };

    case MemberActionTypes.DeselectMember:
      return { ...state, selectedMember: null };

    case MemberActionTypes.UpsertMember: {
      return memberAdapter.upsertOne(action.payload.member, state);
    }

    case MemberActionTypes.AddMembers: {
      return memberAdapter.addMany(action.payload.members, state);
    }

    case MemberActionTypes.UpsertMembers: {
      return memberAdapter.upsertMany(action.payload.members, state);
    }

    case MemberActionTypes.UpdateMember: {
      return memberAdapter.updateOne(action.payload.member, state);
    }

    case MemberActionTypes.UpdateMembers: {
      return memberAdapter.updateMany(action.payload.members, state);
    }

    case MemberActionTypes.DeleteMember: {
      return memberAdapter.removeOne(action.payload.id, state);
    }

    case MemberActionTypes.DeleteMembers: {
      return memberAdapter.removeMany(action.payload.ids, state);
    }

    case MemberActionTypes.AddAllMembers: {
      return memberAdapter.addAll(action.payload.members, state);
    }

    case MemberActionTypes.ClearMembers: {
      return memberAdapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = memberAdapter.getSelectors();
