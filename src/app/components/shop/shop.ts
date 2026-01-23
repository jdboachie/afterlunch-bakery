import { Component, EventEmitter, inject } from '@angular/core';
import { ProductList } from '../product-list/product-list';
import { RouterOutlet } from '@angular/router';
import { CartContext } from '../../services/cart-context';
import { Inventory } from '../../services/inventory';

@Component({
  selector: 'app-shop',
  imports: [ProductList, RouterOutlet],
  templateUrl: './shop.html',
  styleUrl: './shop.css',
})
export class Shop {
  cart = inject(CartContext);
  products = inject(Inventory);

  handleAddToCart(product: Product) {
    this.cart.add(product);
  }
}
