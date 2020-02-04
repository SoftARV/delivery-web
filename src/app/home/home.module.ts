import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { SharedModule } from '../shared/shared.module';
import { ShoppingService } from './services/shopping.service';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    HomeComponent,
    ListComponent,
    DetailsComponent,
    SettingsComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [HomeComponent],
  entryComponents: [SettingsComponent],
  providers: [ShoppingService]
})
export class HomeModule { }
