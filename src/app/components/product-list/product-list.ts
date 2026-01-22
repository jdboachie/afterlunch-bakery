import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherPlus, featherMinus } from '@ng-icons/feather-icons';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
  imports: [NgIcon, RouterLink],
  viewProviders: [provideIcons({ featherPlus, featherMinus })],
})
export class ProductList {
  @Input() products: Product[] = [];
  @Output() addToCart = new EventEmitter<Product>();

  protected readonly router = inject(Router);

  handleAddToCart(event: MouseEvent, product: Product) {
    event.stopPropagation()
    this.addToCart.emit(product);
    this.router.navigateByUrl('/cart');
  }
}
