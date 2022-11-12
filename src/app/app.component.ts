import { Component, OnInit } from '@angular/core';
import { ShopItem } from './model/shop-item.model';
import { enumSelector, Categories } from './model/category.enum';
import { Cart } from './model/cart.model';

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
    debugger;
    this.items.forEach((item) => {
      if (item.amount > 1) item.price = item.price * item.amount;
      if (
        item.category != Categories.meds &&
        item.category != Categories.food &&
        item.category != Categories.book &&
        !item.imported
      ) {
        let rate = this.customRound(
          Math.round(((item.price * this.tax) / 100 + Number.EPSILON) * 100) /
            100
        );
        totalTax += rate;
        item.price = item.price + rate;
      } else if (
        item.category != Categories.meds &&
        item.category != Categories.food &&
        item.category != Categories.book &&
        item.imported
      ) {
        let rate = this.customRound(
          Math.round(
            ((item.price * (this.impTax + this.tax)) / 100 + Number.EPSILON) *
              100
          ) / 100
        );
        totalTax += rate;
        item.price = item.price + rate;
      } else if (
        (item.category == Categories.meds ||
        item.category == Categories.food ||
        item.category == Categories.book) && item.imported
      ) {
        let rate = this.customRound(
          Math.round(
            ((item.price * this.impTax) / 100 + Number.EPSILON) * 100
          ) / 100
        );
        totalTax += rate;
        item.price = item.price + rate;
      }
      total += item.price;
      this.cart.total = total;
      this.cart.payedTax = totalTax;
      this.cart.items.push(item);
    });
    this.item = new ShopItem();
    this.items = [];
    console.log(this.cart);
  }

  customRound(num: number) {
    return Math.round(num * 20) / 20.0;
  }
}
