import { Injectable, signal } from '@angular/core';
import { LocalSync } from './local-sync';

@Injectable({
  providedIn: 'root',
})
export class CartContext {
  private cartSignal = signal<Cart>({ products: [], totalPrice: 0.0 });

  cart = this.cartSignal.asReadonly();

  constructor(private localSync: LocalSync) {
    this.localSync.init(this.cartSignal).sync(this.cart);
  }

  add(product: Product) {
    this.cartSignal.update((cart) => ({
      ...cart,
      products: [...cart.products, product],
      totalPrice: cart.totalPrice + product.price,
    }));
  }

  remove(id: string) {
    this.cartSignal.update((cart) => {
      const product = cart.products.find((p) => p.id === id);
      if (!product) return cart;

      return {
        ...cart,
        products: cart.products.filter((p) => p.id !== id),
        totalPrice: cart.totalPrice - product.price,
      };
    });
  }

  get() {
    return this.cartSignal();
  }
}
