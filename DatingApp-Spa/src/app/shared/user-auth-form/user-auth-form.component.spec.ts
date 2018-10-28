import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormComponent } from './login-form.component';
import { TestingModule } from '@testing/utils';
import { FormControl, FormGroup } from '@angular/forms';
import { CoreModule } from '@app/core';
import { UserAuthFormComponent } from '@app/shared/user-auth-form/user-auth-form.component';

describe('UserAuthFormComponent', () => {
  let component: UserAuthFormComponent;
  let fixture: ComponentFixture<UserAuthFormComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [TestingModule],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAuthFormComponent);
    component = fixture.componentInstance;
    component.parentForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
