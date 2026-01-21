import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { CartContext } from '../../services/cart-context.service';
import { featherX } from '@ng-icons/feather-icons';

@Component({
  selector: 'app-cart-view',
  imports: [NgIcon],
  viewProviders: [provideIcons({ featherX })],
  templateUrl: './cart-view.html',
  styleUrl: './cart-view.css',
})
export class CartView {
  protected readonly cartContext = inject(CartContext);
  protected readonly router = inject(Router);

  cart = this.cartContext.get();

  closeOverlay() {
    this.router.navigateByUrl('');
  }
}
