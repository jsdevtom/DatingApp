import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '@app/features/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { UserForDetailedDto } from '@app/features/user/user.models';
import { Observable } from 'rxjs';
import { DeselectMember, LoadMember } from '@app/features/member/member.actions';
import { select, Store } from '@ngrx/store';
import { selectSelectedMember } from '@app/features/member/member.selectors';
import { MemberState } from '@app/features/member/member.state';

@Component({
  selector: 'dtapp-member-detail-page',
  templateUrl: './member-detail-page.component.html',
  styleUrls: ['./member-detail-page.component.scss'],
})
export class MemberDetailPageComponent implements OnInit, OnDestroy {

  user: Observable<UserForDetailedDto>;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private store: Store<MemberState>,
  ) {
  }

  ngOnInit() {
    this.loadUser();
  }

  private loadUser(): void {
    this.store.dispatch(new LoadMember({ id: this.activatedRoute.snapshot.params['id'] }));
    this.user = this.store.pipe(select(selectSelectedMember));
  }

  ngOnDestroy() {
    this.store.dispatch(new DeselectMember());
  }

}
