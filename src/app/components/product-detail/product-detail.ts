import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Inventory } from '../../services/inventory';
import { CartContext } from '../../services/cart-context';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherX } from '@ng-icons/feather-icons';

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

  product: Product;

  constructor() {
    let productId: string = this.activatedRoute.snapshot.params['id'];
    this.product = this.inventory.get(productId) as Product;
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
