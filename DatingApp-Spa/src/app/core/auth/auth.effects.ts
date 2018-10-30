import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { BAD_REQUEST, UNAUTHORIZED } from 'http-status-codes';

import { LocalStorageService } from '../local-storage/local-storage.service';

import {
  ActionAuthFailure,
  ActionAuthLogin,
  ActionAuthLogout,
  ActionAuthSuccess,
  ActionSignUp,
  ActionSignUpFailure,
  ActionSignUpSuccess,
  AuthActionTypes,
} from './auth.actions';
import { Observable, of } from 'rxjs';
import { AuthService } from '@app/core/auth/auth.service';
import {
  LoginDto,
  LoginFailureResponse,
  LoginSuccessResponse,
  SignUpDto,
  SignUpFailureResponse,
} from '@app/core/auth/auth.models';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { standardSnackBarDuration } from '@app/core/ui.constants';

export const AUTH_KEY = 'AUTH';
export const TOKEN_KEY = 'TOKEN';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions<Action>,
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
  ) {}

  @Effect()
  login: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN),
    switchMap(({ payload }: { payload: LoginDto }) => {
      return this.authService
        .login(payload)
        .pipe(
          map(user => new ActionAuthSuccess({ token: user.token })),
          catchError(error => of(new ActionAuthFailure({ error }))),
        );
    }),
  );

  @Effect({ dispatch: false })
  loginSuccess: Observable<ActionAuthLogin> = this.actions$.pipe(
    ofType<ActionAuthLogin>(AuthActionTypes.LOGIN_SUCCESS),
    tap(async ({ payload }: { payload: LoginSuccessResponse }) => {
      if (!payload || !payload) {
        await this.handleUnexpectedError();
        return;
      }

      this.router.navigate(['']);
      this.setLoggedInKeys(payload);
      this.snackBar.open(
        await this.translate.get('dtapp.login.successfulLogin').toPromise(),
        null,
        { duration: standardSnackBarDuration },
      );
    }),
  );

  @Effect({ dispatch: false })
  loginFailure: Observable<ActionAuthLogin> = this.actions$.pipe(
    ofType<ActionAuthLogin>(AuthActionTypes.LOGIN_FAILURE),
    tap(async ({ payload }: { payload: LoginFailureResponse }) => {
      const error = payload && payload.error;
      if (error instanceof HttpErrorResponse) {
        switch (error.status) {
          case UNAUTHORIZED:
            this.snackBar.open(
              await this.translate.get('dtapp.login.unauthorized').toPromise(),
              'Ok',
              {
                duration: standardSnackBarDuration,
              },
            );
            break;
          default:
            this.snackBar.open(
              await this.translate.get('dtapp.unexpectedError').toPromise(),
              'Ok',
              {
                duration: standardSnackBarDuration,
              },
            );
        }
      }
    }),
  );

  @Effect({ dispatch: false })
  logout = this.actions$.pipe(
    ofType<ActionAuthLogout>(AuthActionTypes.LOGOUT),
    tap(async () => {
      this.router.navigate(['']);
      this.localStorageService.setItem(AUTH_KEY, { isAuthenticated: false });
      this.localStorageService.removeItem(TOKEN_KEY);
      this.snackBar.open(
        await this.translate.get('dtapp.login.successfulLogout').toPromise(),
        null,
        { duration: standardSnackBarDuration },
      );
    }),
  );

  @Effect()
  signUp = this.actions$.pipe(
    ofType(AuthActionTypes.SIGN_UP),
    switchMap(({ payload }: { payload: SignUpDto }) => {
      return this.authService
        .signUp(payload)
        .pipe(
          map(user => new ActionSignUpSuccess({token: user.token})),
          catchError(error => of(new ActionSignUpFailure({ error }))),
        );
    }),
  );

  @Effect({ dispatch: false })
  signUpSuccess: Observable<ActionSignUp> = this.actions$.pipe(
    ofType<ActionSignUp>(AuthActionTypes.SIGN_UP_SUCCESS),
    tap(async ({ payload }: { payload: LoginSuccessResponse }) => {
      this.router.navigate(['']);

      this.setLoggedInKeys(payload);

      const message = await this.translate
        .get('dtapp.signup.successfulSignup')
        .toPromise();
      this.snackBar.open(message, null, { duration: standardSnackBarDuration });
    }),
  );

  @Effect({ dispatch: false })
  signUpFailure: Observable<ActionSignUp> = this.actions$.pipe(
    ofType<ActionSignUp>(AuthActionTypes.SIGN_UP_FAILURE),
    tap(async ({ payload }: { payload: SignUpFailureResponse }) => {
      const error = payload && payload.error;

      if (error instanceof HttpErrorResponse) {
        switch (error.status) {
          case BAD_REQUEST:
            this.snackBar.open(
              await this.translate
                .get('dtapp.signup.usernameAlreadyExists')
                .toPromise(),
              'Ok',
              {
                duration: standardSnackBarDuration,
              },
            );
            break;
          default:
            this.snackBar.open(
              await this.translate.get('dtapp.unexpectedError').toPromise(),
              'Ok',
              {
                duration: standardSnackBarDuration,
              },
            );
        }
      }
    }),
  );

  private async handleUnexpectedError() {
    this.snackBar.open(
      await this.translate.get('dtapp.unexpectedError').toPromise(),
      null,
      { duration: standardSnackBarDuration },
    );
  }

  private setLoggedInKeys(payload: LoginSuccessResponse) {
    if (!payload || !payload.token) {
      throw new TypeError('can not set logged in keys of an empty payload');
    }

    this.localStorageService.setItem(AUTH_KEY, { isAuthenticated: true });
    this.localStorageService.setItem(TOKEN_KEY, payload.token);
  }
}
