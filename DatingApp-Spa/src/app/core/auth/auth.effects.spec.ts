import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LocalStorageService } from '@app/core';
import { EffectsMetadata, getEffectsMetadata } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthEffects, AUTH_KEY } from './auth.effects';
import { AuthState } from './auth.models';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestingModule } from '@testing/utils';

describe('AuthEffects', () => {
  const actions$: Observable<Action> = null;
  let authEffect: AuthEffects;
  let metadata: EffectsMetadata<AuthEffects>;
  let localStorageService: any;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TestingModule],
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        {
          provide: LocalStorageService,
          useValue: { setItem: jest.fn() },
        },
        {
          provide: Router,
          useValue: { navigateByUrl: jest.fn() },
        },
      ],
    });
    localStorageService = TestBed.get(LocalStorageService);
    authEffect = TestBed.get(AuthEffects);
    router = TestBed.get(Router);
  });

  it('should be created', () => {
    expect(authEffect).toBeTruthy();
  });

  it('logout should not dispatch any action', () => {
    metadata = getEffectsMetadata(authEffect);
    expect(metadata.logout).toEqual({ dispatch: false });
  });

  it('should call setItem on LocalStorageService for login action', () => {
    const loginState: AuthState = {
      isAuthenticated: true,
    };

    authEffect.login.subscribe(() => {
      expect(localStorageService.setItem).toHaveBeenCalledWith(
        AUTH_KEY,
        loginState,
      );
    });
  });

  it('should call setItem on LocalStorageService for logout action and navigate to about', () => {
    const logoutState: AuthState = {
      isAuthenticated: false,
    };

    authEffect.logout.subscribe(() => {
      expect(localStorageService.setItem).toHaveBeenCalledWith(
        AUTH_KEY,
        logoutState,
      );
      expect(router.navigate).toHaveBeenCalledWith(['']);
    });
  });
});
