import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Member } from './member.model';
import { UserForDetailedDto } from '@app/features/user/user.models';

export enum MemberActionTypes {
  LoadMembers = '[Member] Load Members',
  LoadMember = '[Member] Load Member',
  AddAllMembers = '[Member] Add All Member',
  AddMember = '[Member] Add Member',
  SelectOne = '[Member] Select Member',
  DeselectMember = '[Member] Deselect Member',
  UpsertMember = '[Member] Upsert Member',
  AddMembers = '[Member] Add Members',
  UpsertMembers = '[Member] Upsert Members',
  UpdateMember = '[Member] Update Member',
  UpdateMembers = '[Member] Update Members',
  DeleteMember = '[Member] Delete Member',
  DeleteMembers = '[Member] Delete Members',
  ClearMembers = '[Member] Clear Members'
}

export class LoadMembers implements Action {
  readonly type = MemberActionTypes.LoadMembers;
}

export class LoadMember implements Action {
  readonly type = MemberActionTypes.LoadMember;

  constructor(public payload: { id: string }) {}
}

export class AddAllMembers implements Action {
  readonly type = MemberActionTypes.AddAllMembers;

  constructor(public payload: { members: Member[] }) {}
}

export class AddMember implements Action {
  readonly type = MemberActionTypes.AddMember;

  constructor(public payload: { member: Member }) {}
}

export class SelectMember implements Action {
  readonly type = MemberActionTypes.SelectOne;

  constructor(public payload: { member: UserForDetailedDto }) {}
}

export class DeselectMember implements Action {
  readonly type = MemberActionTypes.DeselectMember;
}


export class UpsertMember implements Action {
  readonly type = MemberActionTypes.UpsertMember;

  constructor(public payload: { member: Member }) {}
}

export class AddMembers implements Action {
  readonly type = MemberActionTypes.AddMembers;

  constructor(public payload: { members: Member[] }) {}
}

export class UpsertMembers implements Action {
  readonly type = MemberActionTypes.UpsertMembers;

  constructor(public payload: { members: Member[] }) {}
}

export class UpdateMember implements Action {
  readonly type = MemberActionTypes.UpdateMember;

  constructor(public payload: { member: Update<Member> }) {}
}

export class UpdateMembers implements Action {
  readonly type = MemberActionTypes.UpdateMembers;

  constructor(public payload: { members: Update<Member>[] }) {}
}

export class DeleteMember implements Action {
  readonly type = MemberActionTypes.DeleteMember;

  constructor(public payload: { id: string }) {}
}

export class DeleteMembers implements Action {
  readonly type = MemberActionTypes.DeleteMembers;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearMembers implements Action {
  readonly type = MemberActionTypes.ClearMembers;
}

export type MemberActions =
 LoadMembers
 | AddAllMembers
 | AddMember
 | SelectMember
 | DeselectMember
 | UpsertMember
 | AddMembers
 | UpsertMembers
 | UpdateMember
 | UpdateMembers
 | DeleteMember
 | DeleteMembers
 | ClearMembers;
