import { NgModule } from '@angular/core';
import { LoginPageComponent } from '@app/features/login/login-page/login-page.component';
import { LoginRoutingModule } from '@app/features/login/login-routing.modules';
import { SharedModule } from '@app/shared';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from '@env/environment';
import { UserAuthFormToLoginDtoMapper } from '@app/features/login/user-auth-form-to-login-dto.mapper';

@NgModule({
  imports: [
    SharedModule,

    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: true,
    }),

    LoginRoutingModule,
  ],
  declarations: [LoginPageComponent],
  providers: [UserAuthFormToLoginDtoMapper],
})
export class LoginModule {}

function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    `${environment.i18nPrefix}/assets/i18n/auth/`,
    '.json',
  );
}
