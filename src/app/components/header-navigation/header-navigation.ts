import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherShoppingBag } from '@ng-icons/feather-icons';
import { CartContext } from '../../services/cart-context.service';

@Component({
  selector: 'app-header-navigation',
  template: `
    <div class="px-6 py-12 h-fit flex justify-between bg-white items-center sticky top-0 z-10">
      <a class="text-sm" routerLink="/">MENU</a>
      <p class="font-serif text-lg max-sm:text-base tracking-widest max-sm:tracking-wide">
        AFTERLUNCH BAKERY
      </p>
      <div class="flex items-center relative">
        <a class="btn" aria-label="cart" title="cart" routerLink="/cart">
          <ng-icon name="featherShoppingBag" />
        </a>
        @if (cartCount() > 0) {
          <span
            class="text-xs absolute -top-0.5 -right-0.5 bg-black text-white rounded-full size-4 grid place-items-center"
            >{{ cartCount() }}</span
          >
        }
      </div>
    </div>
  `,
  imports: [NgIcon, RouterLink],
  viewProviders: [provideIcons({ featherShoppingBag })],
})
export class HeaderNavigation {
  protected readonly cartContext = inject(CartContext);

  cartCount = computed(() => this.cartContext.cart().products.length);
}
