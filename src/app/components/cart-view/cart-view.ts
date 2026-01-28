import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { CartContext } from '../../services/cart-context';
import { featherX, featherShoppingBag, featherPlus, featherMinus } from '@ng-icons/feather-icons';

@Component({
  selector: 'app-cart-view',
  imports: [NgIcon],
  viewProviders: [provideIcons({ featherX, featherShoppingBag, featherPlus, featherMinus })],
  templateUrl: './cart-view.html',
  styleUrl: './cart-view.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartView {
  protected readonly cartContext = inject(CartContext);
  protected readonly router = inject(Router);

  cart = this.cartContext.cart;

  removeCartItem(item: Product) {
    this.cartContext.remove(item.id);
  }

  closeOverlay() {
    this.router.navigateByUrl('');
  }
}
