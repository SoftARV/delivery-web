import { NgModule } from '@angular/core';
import { PopupComponent } from './components/popup.component';
import { CommonModule } from '@angular/common';
import { InsertionDirective } from './directives/insertion.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [PopupComponent, InsertionDirective],
  exports: [PopupComponent],
  entryComponents: [PopupComponent]
})
export class PopupModule {}
