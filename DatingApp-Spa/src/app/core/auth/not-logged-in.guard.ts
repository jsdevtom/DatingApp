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
import { flatMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { standardSnackBarDuration } from '@app/core/ui.constants';

@Injectable({
  providedIn: 'root',
})
export class NotLoggedInGuard implements CanActivate {
  constructor(
    private store: Store<AppState>,
    private snackBar: MatSnackBar,
    private translateService: TranslateService,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.pipe(
      select(selectIsAuthenticated),
      flatMap(async isAuthenticated => {
        if (isAuthenticated) {
          const message = (await this.translateService
            .get('dtapp.login.alreadyLoggedIn')
            .toPromise()) as string;

          this.snackBar.open(message, 'Ok', {
            duration: standardSnackBarDuration,
          });

          return false;
        } else {
          return true;
        }
      }),
    );
  }
}
