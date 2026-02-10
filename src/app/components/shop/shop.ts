import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { ProductList } from '../product-list/product-list';
import { OrderConfirmation } from '../order-confirmation/order-confirmation';
import { RouterOutlet } from '@angular/router';
import { CartContext } from '../../services/cart-context';
import { Inventory } from '../../services/inventory';

@Component({
  selector: 'app-shop',
  imports: [ProductList, RouterOutlet, DecimalPipe, OrderConfirmation, AsyncPipe],
  templateUrl: './shop.html',
  styleUrls: ['./shop.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Shop {
  cart = inject(CartContext);
  inventory = inject(Inventory);
  products$ = this.inventory.products$;
  showConfirmation$ = new BehaviorSubject<boolean>(false);

  handleRemove(productId: string) {
    this.cart.remove(productId);
  }

  handleConfirmOrder() {
    this.showConfirmation$.next(true);
  }

  handleStartNewOrder() {
    this.cart.clear();
    this.showConfirmation$.next(false);
  }
}
