import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState, selectIsAuthenticated } from '@app/core';
import { MatSnackBar } from '@angular/material';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NotLoggedInGuard implements CanActivate {
  constructor(private store: Store<AppState>, private snackBar: MatSnackBar) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.pipe(
      select(selectIsAuthenticated),
      map(isAuthenticated => {
        if (isAuthenticated) {
          // TODO-Tom: i18n
          // TODO-Tom: extract duration constant
          this.snackBar.open('You are already logged in', 'Ok', {duration: 3000});
          return false;
        } else {
          return true;
        }
      }),
    );
  }
}
