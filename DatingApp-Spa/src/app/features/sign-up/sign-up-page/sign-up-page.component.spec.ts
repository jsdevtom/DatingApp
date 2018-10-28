import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingModule } from '@testing/utils';
import { MockComponent } from '@app/shared/utils/test/mock-component';
import { CoreModule } from '@app/core';
import { SignUpPageComponent } from '@app/features/sign-up/sign-up-page/sign-up-page.component';
import { UserAuthFormToSignUpDtoMapper } from '@app/features/sign-up/user-auth-form-to-login-dto.mapper';

describe('SignUpPageComponent', () => {
  let component: SignUpPageComponent;
  let fixture: ComponentFixture<SignUpPageComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [CoreModule, TestingModule],
        declarations: [
          SignUpPageComponent,
          MockComponent({
            selector: 'dtapp-login-form',
            inputs: ['parentForm'],
          }),
        ],
        providers: [UserAuthFormToSignUpDtoMapper],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
