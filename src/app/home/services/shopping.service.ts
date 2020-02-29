import { Injectable } from '@angular/core';
import { USER_INFO } from 'src/app/shared/constants';

@Injectable()
export class ShoppingService {
  private userInfo = {
    name: '',
    phone: '',
    address: {
      street: '',
      number: '',
      name: ''
    }
  };
  private cart: {product: any, quantity: number}[];
  public isInfoSet = false;

  constructor() {
    this.cart = [];
    const saveInfo = JSON.parse(localStorage.getItem(USER_INFO));
    if (saveInfo) {
      this.userInfo = saveInfo;
    }
  }

  set saveUserInfo(userInfo) {
    this.userInfo = userInfo;
    localStorage.setItem(USER_INFO, JSON.stringify(userInfo));
  }

  get getUserInfo() {
    return this.userInfo;
  }

  get cartList() {
    return this.cart;
  }

  public addProductToCart(product: any, quantity: number) {
    if (this.cart.find(p => p.product.code === product.code)) {
      this.cart.map(p => {
        if (p.product.code === product.code) { p.quantity = p.quantity + quantity; }
      });
    } else {
      this.cart.push({product, quantity});
    }
    console.log(this.cart);
  }

  public removeFromCart(code) {
    this.cart = this.cart.filter(p => p.product.code !== code);
  }
}
