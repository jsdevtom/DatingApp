import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { LoadMembers } from '@app/features/member/member.actions';
import { Observable } from 'rxjs';
import { Member } from '@app/features/member/member.model';
import { MemberState} from '@app/features/member/member.state';
import { selectAllMembers } from '@app/features/member/member.selectors';

@Component({
  selector: 'dtapp-members-page',
  templateUrl: './members-page.component.html',
  styleUrls: ['./members-page.component.scss'],
})
export class MembersPageComponent implements OnInit {
  members: Observable<Member[]>;

  constructor(
    private store: Store<MemberState>,
  ) { }

  ngOnInit() {
    this.store.dispatch(new LoadMembers());
    this.members = this.store.pipe(select(selectAllMembers));
  }

}
