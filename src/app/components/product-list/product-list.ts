import { Component, ChangeDetectionStrategy, inject, Input } from '@angular/core';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherPlus, featherMinus } from '@ng-icons/feather-icons';
import { CartContext } from '../../services/cart-context';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon, DecimalPipe, RouterLink, AsyncPipe],
  viewProviders: [provideIcons({ featherPlus, featherMinus })],
})
export class ProductList {
  @Input() public products: Product[] = [];

  protected readonly cart = inject(CartContext);
  public readonly cart$ = this.cart.cart$;
  public readonly inCartMap$ = this.cart$.pipe(
    map((cart) => {
      const m: Record<string, number> = {};
      cart.items.forEach((i) => (m[i.product.id] = i.quantity));
      return m;
    }),
  );

  public handleAddToCart(event: MouseEvent, product: Product) {
    event.stopPropagation();
    this.cart.add(product);
  }

  public handleIncrement(event: MouseEvent, product: Product) {
    event.stopPropagation();
    this.cart.increment(product.id);
  }

  public handleDecrement(event: MouseEvent, product: Product) {
    event.stopPropagation();
    this.cart.decrement(product.id);
  }

  public getQuantity(productId: string): number {
    return this.cart.getQuantity(productId);
  }

  public isInCart(productId: string): boolean {
    return this.getQuantity(productId) > 0;
  }
}
