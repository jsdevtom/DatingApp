import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { selectSettings, SettingsState } from '@app/settings';
import { filter, map, takeUntil } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { ActivationEnd, Router } from '@angular/router';
import { ActionAuthLogin, ActionSignUp, AppState, TitleService } from '@app/core';
import { UserAuthFormToSignUpDtoMapper } from '@app/features/sign-up/user-auth-form-to-login-dto.mapper';

@Component({
  selector: 'dtapp-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss'],
})
export class SignUpPageComponent implements OnInit, OnDestroy {
  // TODO-Tom: Add live checking whether the username exists or not.
  form: FormGroup;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private formBuilder: FormBuilder,
    private titleService: TitleService,
    private translate: TranslateService,
    private userAuthFormToSignUpDtoMapper: UserAuthFormToSignUpDtoMapper,
  ) {
  }

  ngOnInit(): void {
    this.translate.setDefaultLang('en');
    this.subscribeToSettings();
    this.setTitle();
    this.subscribeToRouterEvents();

    this.initForm();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSubmit(): void {
    if (this.form.valid) {
      const loginDto = this.userAuthFormToSignUpDtoMapper.map(this.form.value);

      this.store.dispatch(new ActionSignUp(loginDto));

      // then login
    }
  }

  private subscribeToSettings(): void {
    this.store
      .pipe(select(selectSettings), takeUntil(this.unsubscribe$))
      .subscribe((settings: SettingsState) =>
        this.translate.use(settings.language),
      );
  }

  private subscribeToRouterEvents(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof ActivationEnd),
        map((event: ActivationEnd) => event.snapshot),
        takeUntil(this.unsubscribe$),
      )
      .subscribe(snapshot =>
        this.titleService.setTitle(snapshot, this.translate),
      );
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      username: ['', { validators: Validators.required, updateOn: 'submit' }],
      password: ['', { validators: Validators.required, updateOn: 'submit' }],
    });
  }

  private setTitle(): void {
    this.titleService.setTitle(
      this.router.routerState.snapshot.root,
      this.translate,
    );
  }
}
