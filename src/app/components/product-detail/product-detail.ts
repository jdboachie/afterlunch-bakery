import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { Inventory } from '../../services/inventory';
import { CartContext } from '../../services/cart-context';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherPlus, featherMinus } from '@ng-icons/feather-icons';
import { Logging } from '../../services/logging';

@Component({
  selector: 'app-product-detail',
  imports: [NgIcon, DecimalPipe],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
  viewProviders: [provideIcons({ featherPlus, featherMinus })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetail {
  protected readonly router = inject(Router);
  protected readonly cart = inject(CartContext);
  private activatedRoute = inject(ActivatedRoute);
  private inventory = inject(Inventory);
  private logger = inject(Logging);

  product: Product;

  constructor() {
    let productId: string = this.activatedRoute.snapshot.params['id'];
    this.product = this.inventory.get(productId) as Product;
    if (this.product === undefined) {
      this.logger.reportError('Product could not be found');
      this.router.navigateByUrl('');
    }
  }

  goBack() {
    this.router.navigateByUrl('');
  }

  handleAddToCart(product: Product) {
    this.cart.add(product);
  }

  handleIncrement() {
    this.cart.increment(this.product.id);
  }

  handleDecrement() {
    this.cart.decrement(this.product.id);
  }

  getQuantity(): number {
    return this.cart.getQuantity(this.product.id);
  }

  isInCart(): boolean {
    return this.getQuantity() > 0;
  }
}
