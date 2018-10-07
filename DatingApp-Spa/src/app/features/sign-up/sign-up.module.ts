import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { SignUpRoutingModule } from '@app/features/sign-up/sign-up-routing.modules';
import { SignUpPageComponent } from '@app/features/sign-up/sign-up-page/sign-up-page.component';
import { environment } from '@env/environment';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { UserAuthFormToSignUpDtoMapper } from '@app/features/sign-up/user-auth-form-to-login-dto.mapper';

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

    SignUpRoutingModule,
  ],
  declarations: [SignUpPageComponent],
  providers: [UserAuthFormToSignUpDtoMapper],
})
export class SignUpModule {}

function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    `${environment.i18nPrefix}/assets/i18n/auth/`,
    '.json',
  );
}
