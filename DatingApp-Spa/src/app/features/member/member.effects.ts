import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AddAllMembers, LoadMember, LoadMembers, MemberActionTypes, SelectMember } from '@app/features/member/member.actions';
import { exhaustMap, map } from 'rxjs/operators';
import { UserService } from '@app/features/user/user.service';


@Injectable()
export class MemberEffects {

  constructor(
    private actions$: Actions,
    private userService: UserService,
  ) {}

  @Effect()
  loadMembers = this.actions$.pipe(
    ofType(MemberActionTypes.LoadMembers),
    exhaustMap(() => this.userService.getUsers()),
    map(users => new AddAllMembers({members: users})),
  );

  @Effect()
  loadMember = this.actions$.pipe(
    ofType<LoadMember>(MemberActionTypes.LoadMember),
    exhaustMap(({payload}) => this.userService.getUser(payload.id)),
    map(user => new SelectMember({member: user})),
  );
}
