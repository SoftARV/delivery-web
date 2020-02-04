import { Component, OnInit } from '@angular/core';
import { PopupRef } from 'src/app/shared/popup/components/popup-ref';
import { ShoppingService } from '../services/shopping.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  cart: any[];
  total: number;

  constructor(private ref: PopupRef, private shoppingService: ShoppingService) { }

  ngOnInit() {
    this.cart = this.shoppingService.cartList;
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = 0;
    this.cart.map(item => this.total += item.product.price * item.quantity);
  }

  remove(code) {
    this.shoppingService.removeFromCart(code);
    this.cart = this.shoppingService.cartList;
    this.calculateTotal();
  }

  checkout() {

  }

  close() {
    this.ref.close();
  }

}
