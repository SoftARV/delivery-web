import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { products } from '../../shared/data-test.json';
import { SettingsComponent } from '../settings/settings.component';
import { PopupService } from '../../shared/popup/services/popup.service';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';


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

  search = new FormControl('');
  searching = false;

  constructor(private popupService: PopupService) { }

  ngOnInit() {
    this.products = products;
    this.initSearch();
  }

  initSearch() {
    this.search.valueChanges
      .pipe(debounceTime(500))
      .subscribe((term: string) => {
        this.products = products.filter(p => p.description.toLowerCase().includes(term.toLowerCase()));
        console.log(this.products);
      });
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
  }

  openShoppingCart() {
    const popup = this.popupService.open(ShoppingCartComponent);
  }

}
