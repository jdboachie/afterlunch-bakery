import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Inventory } from '../../services/inventory';
import { CartContext } from '../../services/cart-context';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherX } from '@ng-icons/feather-icons';
import { Logging } from '../../services/logging';

@Component({
  selector: 'app-product-detail',
  imports: [NgIcon],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
  viewProviders: [provideIcons({ featherX })],
})
export class ProductDetail {
  protected readonly router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private inventory = inject(Inventory);
  private cart = inject(CartContext);
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

  closeOverlay() {
    this.router.navigateByUrl('');
  }

  handleAddToCart(event: MouseEvent, product: Product) {
    event.stopPropagation();
    this.cart.add(product);
    this.router.navigateByUrl('/cart');
  }
}
