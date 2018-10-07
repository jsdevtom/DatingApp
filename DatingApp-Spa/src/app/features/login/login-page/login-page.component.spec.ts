import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageComponent } from './login-page.component';
import { TestingModule } from '@testing/utils';
import { MockComponent } from '@app/shared/utils/test/mock-component';
import { CoreModule } from '@app/core';
import { UserAuthFormToLoginDtoMapper } from '@app/features/login/user-auth-form-to-login-dto.mapper';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [CoreModule, TestingModule],
        declarations: [
          LoginPageComponent,
          MockComponent({
            selector: 'dtapp-login-form',
            inputs: ['parentForm'],
          }),
        ],
        providers: [UserAuthFormToLoginDtoMapper],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
