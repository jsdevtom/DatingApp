import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { MatSlideToggle } from '@angular/material';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingModule, MockStore } from '@testing/utils';

import { SettingsContainerComponent } from './settings-container.component';
import {
  ActionSettingsChangeAnimationsElements,
  ActionSettingsChangeAnimationsPage,
  ActionSettingsChangeAutoNightMode,
  ActionSettingsChangeTheme,
  ActionSettingsChangeStickyHeader
} from '../settings.actions';

describe('SettingsComponent', () => {
  let component: SettingsContainerComponent;
  let fixture: ComponentFixture<SettingsContainerComponent>;
  let store: MockStore<any>;
  let dispatchSpy;

  const getThemeSelectArrow = () =>
    fixture.debugElement.queryAll(By.css('.mat-select-trigger'))[1];
  const getSelectOptions = () =>
    fixture.debugElement.queryAll(By.css('mat-option'));

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [TestingModule],
        declarations: [SettingsContainerComponent]
      }).compileComponents();

      store = TestBed.get(Store);
      store.setState({
        settings: {
          theme: 'DEFAULT-THEME',
          autoNightMode: true,
          stickyHeader: true,
          pageAnimations: true,
          pageAnimationsDisabled: false,
          elementsAnimations: true,
          language: 'en'
        }
      });
      fixture = TestBed.createComponent(SettingsContainerComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(component.settings.theme).toBe('DEFAULT-THEME');
    expect(component.settings.autoNightMode).toBeTruthy();
    expect(component.settings.pageAnimations).toBeTruthy();
  });

  it('should dispatch change theme action on theme selection', () => {
    dispatchSpy = spyOn(store, 'dispatch');
    getThemeSelectArrow().triggerEventHandler('click', {});

    fixture.detectChanges();

    getSelectOptions()[1].triggerEventHandler('click', {});

    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledTimes(2);
    expect(dispatchSpy).toHaveBeenCalledWith(
      new ActionSettingsChangeTheme({ theme: 'LIGHT-THEME' })
    );
  });
});
