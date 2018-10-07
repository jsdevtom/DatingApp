import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { MatButtonModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';
import { MatMenuModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { MatTabsModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material';
import { MatChipsModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatListModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material';
import { MatSlideToggleModule } from '@angular/material';
import { MatDividerModule } from '@angular/material';
import { MatSliderModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material';
import { MatNativeDateModule } from '@angular/material';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBars,
  faBook,
  faCaretDown,
  faCaretUp,
  faCheck,
  faCog,
  faEdit,
  faExclamationTriangle,
  faFilter,
  faLanguage,
  faLightbulb,
  faPaintBrush,
  faPlayCircle,
  faPlus,
  faPowerOff,
  faRocket,
  faSquare,
  faStream,
  faTasks,
  faTimes,
  faTrash,
  faUserCircle,
  faWindowMaximize,
} from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faInstagram,
  faMediumM,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { BigInputComponent } from './big-input/big-input.component';
import { BigInputActionComponent } from './big-input/big-input-action.component';
import { HasRequiredFieldPipe } from './pipes/has-required-field/has-required-field.pipe';
import { CapitalizeFirstPipe } from '@app/shared/pipes/capitalize-first/capitalize-first.pipe';
import has = Reflect.has;
import { UserAuthFormComponent } from '@app/shared/user-auth-form/user-auth-form.component';

library.add(
  faBars,
  faUserCircle,
  faPowerOff,
  faCog,
  faRocket,
  faPlayCircle,
  faGithub,
  faMediumM,
  faTwitter,
  faInstagram,
  faYoutube,
  faPlus,
  faEdit,
  faTrash,
  faTimes,
  faCaretUp,
  faCaretDown,
  faExclamationTriangle,
  faFilter,
  faTasks,
  faCheck,
  faSquare,
  faLanguage,
  faPaintBrush,
  faLightbulb,
  faWindowMaximize,
  faStream,
  faBook,
);

const declarations = [
  BigInputComponent,
  BigInputActionComponent,
  UserAuthFormComponent,

  CapitalizeFirstPipe,
  HasRequiredFieldPipe,
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,

    TranslateModule,

    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    MatTabsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatCardModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatDividerModule,

    FontAwesomeModule,
  ],
  declarations,
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    TranslateModule,

    MatButtonModule,
    MatMenuModule,
    MatTabsModule,
    MatChipsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,

    FontAwesomeModule,

    ...declarations,
  ],
})
export class SharedModule {}
