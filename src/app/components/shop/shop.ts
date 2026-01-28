import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ProductList } from '../product-list/product-list';
import { OrderConfirmation } from '../order-confirmation/order-confirmation';
import { RouterOutlet } from '@angular/router';
import { CartContext } from '../../services/cart-context';
import { Inventory } from '../../services/inventory';

@Component({
  selector: 'app-shop',
  imports: [ProductList, RouterOutlet, DecimalPipe, OrderConfirmation],
  templateUrl: './shop.html',
  styleUrl: './shop.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Shop {
  cart = inject(CartContext);
  inventory = inject(Inventory);

  products = this.inventory.products;
  showConfirmation = signal(false);

  handleRemove(productId: string) {
    this.cart.remove(productId);
  }

  handleConfirmOrder() {
    this.showConfirmation.set(true);
  }

  handleStartNewOrder() {
    this.cart.clear();
    this.showConfirmation.set(false);
  }
}
