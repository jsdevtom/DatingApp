import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { environment } from '@env/environment';

import { LocalStorageService } from './local-storage/local-storage.service';
import { AuthEffects, TOKEN_KEY } from './auth/auth.effects';
import { IsAuthenticatedGuardService } from './auth/is-authenticated-guard.service';
import { AnimationsService } from './animations/animations.service';
import { TitleService } from './title/title.service';
import { metaReducers, reducers } from './core.state';
import { JwtModule } from '@auth0/angular-jwt';

@NgModule({
  imports: [
    // angular
    CommonModule,
    HttpClientModule,

    // ngrx
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([AuthEffects]),
    environment.production
      ? []
      : StoreDevtoolsModule.instrument({
          name: 'DatingApp',
        }),

    // 3rd party
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),

    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem(TOKEN_KEY),
        whitelistedDomains: ['localhost:3001'],
        blacklistedRoutes: ['localhost:3001/auth/']
      }
    }),

    StoreRouterConnectingModule.forRoot(),
  ],
  declarations: [],
  providers: [
    LocalStorageService,
    IsAuthenticatedGuardService,
    AnimationsService,
    TitleService,
  ],
  exports: [TranslateModule],
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule,
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    `${environment.i18nPrefix}/assets/i18n/`,
    '.json',
  );
}
