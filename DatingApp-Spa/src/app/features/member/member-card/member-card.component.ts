import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { UserForListDto } from '@app/features/user/user.models';

@Component({
  selector: 'dtapp-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberCardComponent implements OnInit {

  @Input()
  user: UserForListDto;

  constructor() { }

  ngOnInit() {
  }

}
