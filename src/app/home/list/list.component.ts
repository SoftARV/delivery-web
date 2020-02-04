import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';

import { products } from '../../shared/data-test.json';
import { SettingsComponent } from '../settings/settings.component';
import { PopupService } from '../../shared/popup/services/popup.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @ViewChild('list', {static: false}) list;
  @Output() product = new EventEmitter();
  products: any[];
  productSelected;
  isVisible = true;

  constructor(private popupService: PopupService) { }

  ngOnInit() {
    this.products = products;
  }

  onItemSelect(product) {
    if (product === this.productSelected) {
      this.productSelected = null;

    } else {
      this.productSelected = product;
    }
    this.product.emit(this.productSelected);
  }

  openSettings() {
    const popup = this.popupService.open(SettingsComponent);
    popup.afterClosed.subscribe(response => {
      console.log(response);
    });
  }

  openShoppingCart() {

  }

}
