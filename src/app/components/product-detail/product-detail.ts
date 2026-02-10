import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { take } from 'rxjs/operators';
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
  styleUrls: ['./product-detail.css'],
  viewProviders: [provideIcons({ featherPlus, featherMinus })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetail {
  protected readonly router = inject(Router);
  protected readonly cart = inject(CartContext);
  private activatedRoute = inject(ActivatedRoute);
  private inventory = inject(Inventory);
  private logger = inject(Logging);

  public product?: Product;

  constructor() {
    const productId: string = this.activatedRoute.snapshot.params['id'];
    this.inventory
      .get(productId)
      .pipe(take(1))
      .subscribe((p) => {
        if (!p || Array.isArray(p)) {
          this.logger.reportError('Product could not be found');
          this.router.navigateByUrl('');
          return;
        }
        this.product = p;
      });
  }

  public goBack() {
    this.router.navigateByUrl('');
  }

  public handleAddToCart(product: Product) {
    this.cart.add(product);
  }

  public handleIncrement() {
    if (!this.product) return;
    this.cart.increment(this.product.id);
  }

  public handleDecrement() {
    if (!this.product) return;
    this.cart.decrement(this.product.id);
  }

  public getQuantity(): number {
    return this.product ? this.cart.getQuantity(this.product.id) : 0;
  }

  public isInCart(): boolean {
    return this.getQuantity() > 0;
  }
}
