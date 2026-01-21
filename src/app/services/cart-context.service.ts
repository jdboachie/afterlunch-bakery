import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartContext {
  private cart: Cart = { products: [], totalPrice: 0.0 };

  add(product: Product) {
    // construct a cart item and push it. cart item extends product with quantity
    this.cart.products.push(product);
    this.cart.totalPrice += product.price;
  }

  remove(id: number) {
    const product = this.cart.products.find((p) => p.id === id);
    if (product) {
      this.cart.totalPrice -= product.price;
      this.cart.products = this.cart.products.filter((p) => p.id !== id);
    }
  }

  get() {
    return this.cart;
  }
}
