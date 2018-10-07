import { LoginFormModel } from '@app/features/login/login-form/login-form.model';
import { LoginDto, SignUpDto } from '@app/core/auth/auth.models';
import { Injectable } from '@angular/core';
import { IFormToDtoMapper } from '@app/core/mapping/form-to-dto.mapper';
import { UserAuthFormModel } from '@app/shared/user-auth-form/user-auth-form.model';

@Injectable()
export class UserAuthFormToSignUpDtoMapper implements IFormToDtoMapper<UserAuthFormModel, SignUpDto> {
  map(loginForm: UserAuthFormModel): SignUpDto {
    return loginForm;
  }
}
