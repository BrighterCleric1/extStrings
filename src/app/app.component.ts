import { Component, OnInit } from '@angular/core';
import { ShopItem } from './model/shop-item.model';
import { enumSelector, Categories } from './model/category.enum';
import { Cart } from './model/cart.model';
import { formatNumber } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'SalesAngular';
  categories = enumSelector(Categories);
  item: ShopItem = new ShopItem();
  items: ShopItem[] = [];
  tax = 10;
  impTax = 5;
  cart: Cart;

  ngOnInit() {}

  AddToCart() {
    this.items.push(this.item);
    this.item = new ShopItem();
  }

  EmptyCart() {
    this.items = [];
  }

  Calculate() {
    let total = 0;
    let totalTax = 0;
    this.cart = new Cart();
    // debugger;
    this.items.forEach((item) => {
      let singlePrice = item.price;
      for(let i = 0; i < item.amount; i++ ){
        if (
          item.category != Categories.meds &&
          item.category != Categories.food &&
          item.category != Categories.book &&
          !item.imported
        ) {
          let rate = this.customRound((singlePrice * this.tax)/100);
          totalTax += rate;
          totalTax = Math.round((totalTax + Number.EPSILON)*100)/100;
          item.price = Math.round(((singlePrice + rate)+Number.EPSILON)*100)/100;
        } else if (
          item.category != Categories.meds &&
          item.category != Categories.food &&
          item.category != Categories.book &&
          item.imported
        ) {
          let rate = this.customRound((item.price * (this.impTax + this.tax)) / 100);
          totalTax += rate;
          totalTax = Math.round((totalTax + Number.EPSILON)*100)/100;
          item.price = Math.round(((singlePrice + rate)+Number.EPSILON)*100)/100;
        } else if (
          (item.category == Categories.meds ||
          item.category == Categories.food ||
          item.category == Categories.book) && item.imported
        ) {
          let rate = this.customRound((singlePrice * this.impTax) / 100);
          totalTax += rate;
          totalTax = Math.round((totalTax + Number.EPSILON)*100)/100;
          item.price = Math.round(((singlePrice + rate)+Number.EPSILON)*100)/100;
        }
        total += item.price;      
      }      
      this.cart.items.push(item);
    });
    this.cart.total = total;
    this.cart.payedTax = totalTax;
    this.item = new ShopItem();
    this.items = [];
    console.log(this.cart);
  }

  customRound(num: number) {
    // debugger;
    return Math.ceil(num * 20) / 20.0;
  }
}
