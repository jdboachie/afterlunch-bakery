import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
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
  public readonly cart = inject(CartContext);
  private readonly inventory = inject(Inventory);
  public readonly loadError$ = this.inventory.loadError$;
  private readonly search$ = new BehaviorSubject<string>('');
  public readonly filteredProducts$ = this.inventory.filter(this.search$);
  public readonly enrichedFilteredProducts$ = combineLatest([
    this.filteredProducts$,
    this.cart.cart$,
  ]).pipe(
    map(([products, cart]) =>
      products.map((p) => ({
        ...p,
        inCartQuantity: cart.items.find((i) => i.product.id === p.id)?.quantity ?? 0,
      })),
    ),
  );
  public readonly showConfirmation$ = new BehaviorSubject<boolean>(false);

  public handleSearch(event: Event) {
    const v = (event.target as HTMLInputElement).value;
    this.search$.next(v);
  }

  public handleRemove(productId: string) {
    this.cart.remove(productId);
  }

  public handleConfirmOrder() {
    this.showConfirmation$.next(true);
  }

  public handleStartNewOrder() {
    this.cart.clear();
    this.showConfirmation$.next(false);
  }
}
