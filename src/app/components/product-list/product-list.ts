import { Component, ChangeDetectionStrategy, inject, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherPlus, featherMinus } from '@ng-icons/feather-icons';
import { CartContext } from '../../services/cart-context';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon, DecimalPipe, RouterLink],
  viewProviders: [provideIcons({ featherPlus, featherMinus })],
})
export class ProductList {
  products = input<Product[]>([]);

  protected readonly cart = inject(CartContext);

  handleAddToCart(event: MouseEvent, product: Product) {
    event.stopPropagation();
    this.cart.add(product);
  }

  handleIncrement(event: MouseEvent, product: Product) {
    event.stopPropagation();
    this.cart.increment(product.id);
  }

  handleDecrement(event: MouseEvent, product: Product) {
    event.stopPropagation();
    this.cart.decrement(product.id);
  }

  getQuantity(productId: string): number {
    return this.cart.getQuantity(productId);
  }

  isInCart(productId: string): boolean {
    return this.getQuantity(productId) > 0;
  }
}
