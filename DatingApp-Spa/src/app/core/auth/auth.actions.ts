import { Action } from '@ngrx/store';
import {
  LoginFailureResponse,
  LoginSuccessResponse, SignUpFailureResponse,
} from '@app/core/auth/auth.models';
import { User } from '@app/features/login/user.model';

export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  LOGOUT = '[Auth] Logout',

  SIGN_UP = '[Auth] Sign Up',
  SIGN_UP_SUCCESS = '[Auth] Sign Up Success',
  SIGN_UP_FAILURE = '[Auth] Sign Up Failure',
}

export class ActionAuthLogin implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public payload: User) {}
}

export class ActionAuthSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload: LoginSuccessResponse) {}
}

export class ActionAuthFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;
  constructor(public payload: LoginFailureResponse) {}
}

export class ActionAuthLogout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export class ActionSignUp implements Action {
  readonly type = AuthActionTypes.SIGN_UP;
  constructor(public payload: User) {}
}

export class ActionSignUpSuccess implements Action {
  readonly type = AuthActionTypes.SIGN_UP_SUCCESS;
  constructor(public payload: LoginSuccessResponse) {}
}

export class ActionSignUpFailure implements Action {
  readonly type = AuthActionTypes.SIGN_UP_FAILURE;
  constructor(public payload: SignUpFailureResponse) {}
}

export type AuthActions =
  | ActionAuthLogin
  | ActionAuthSuccess
  | ActionAuthFailure
  | ActionAuthLogout
  | ActionSignUp
  | ActionSignUpSuccess
  | ActionSignUpFailure;
