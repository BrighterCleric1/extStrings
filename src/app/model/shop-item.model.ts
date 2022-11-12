import { Categories } from '../model/category.enum';
export class ShopItem {
  name: string;
  price: number;
  amount: number;
  imported: boolean = false;
  category: number;
}
