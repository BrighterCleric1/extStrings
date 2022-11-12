import { ShopItem } from "./shop-item.model";

export class Cart{
    items: ShopItem[] = [];
    payedTax:number;
    total:number;
}