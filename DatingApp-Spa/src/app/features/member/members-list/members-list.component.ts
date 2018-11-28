import { Component, Input, OnInit } from '@angular/core';
import { Member } from '@app/features/member/member.model';

@Component({
  selector: 'dtapp-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.scss']
})
export class MembersListComponent implements OnInit {

  @Input()
  members: Member[] = [];

  constructor() { }

  ngOnInit() {
  }

}
