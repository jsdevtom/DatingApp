import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';

import { StaticRoutingModule } from './static-routing.module';
import { FeaturesComponent } from './features/features.component';

@NgModule({
  imports: [SharedModule, StaticRoutingModule],
  declarations: [FeaturesComponent]
})
export class StaticModule {}
