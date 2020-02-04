import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ShoppingService } from '../services/shopping.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  @Input() product;
  @Output() back = new EventEmitter();

  quantity = 1;
  innerWidth: number;

  constructor(private toastr: ToastrService, private shoppingService: ShoppingService) {
    this.innerWidth = window.innerWidth;
  }

  ngOnInit() {
  }

  goBack() {
    this.back.emit();
  }

  substract() {
    if (this.quantity <= 2) {
      this.quantity = 1;
    } else {
      this.quantity--;
    }
  }

  add() {
    this.quantity++;
  }

  addToCart() {
    this.shoppingService.addProductToCart(this.product, this.quantity);
    this.quantity = 1;
    this.toastr.show('Product added to the shopping cart!');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

}
