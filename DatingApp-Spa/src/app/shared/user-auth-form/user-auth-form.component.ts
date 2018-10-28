import {
  ChangeDetectionStrategy,
  Component,
  Input,
  } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';

@Component({
  selector: 'dtapp-user-auth-form',
  templateUrl: './user-auth-form.component.html',
  styleUrls: ['./user-auth-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserAuthFormComponent {
  @Input() parentForm: FormGroup;

  hidePassword = true;

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
}
