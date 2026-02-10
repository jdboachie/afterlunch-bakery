import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalSync } from './local-sync';

const STORAGE_KEY = 'AFTERLUNCH_CART';

@Injectable({
  providedIn: 'root',
})
export class CartContext {
  private cartSubject = new BehaviorSubject<Cart>({ items: [], totalPrice: 0.0 });

  readonly cart$ = this.cartSubject.asObservable();

  readonly totalItems$ = this.cart$.pipe(
    map((cart) => cart.items.reduce((sum, item) => sum + item.quantity, 0)),
  );

  readonly totalPrice$ = this.cart$.pipe(
    map((cart) => cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)),
  );

  constructor(private localSync: LocalSync) {
    this.localSync.init(STORAGE_KEY, this.cartSubject);
    this.localSync.sync(STORAGE_KEY, this.cart$);
  }

  add(product: Product) {
    const cart = this.cartSubject.getValue();
    const existingItem = cart.items.find((item) => item.product.id === product.id);

    if (existingItem) {
      const updated: Cart = {
        ...cart,
        items: cart.items.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        ),
        totalPrice: cart.totalPrice + product.price,
      };
      this.cartSubject.next(updated);
      return;
    }

    const updated: Cart = {
      ...cart,
      items: [...cart.items, { product, quantity: 1 }],
      totalPrice: cart.totalPrice + product.price,
    };
    this.cartSubject.next(updated);
  }

  remove(id: string) {
    const cart = this.cartSubject.getValue();
    const item = cart.items.find((i) => i.product.id === id);
    if (!item) return;

    const updated: Cart = {
      ...cart,
      items: cart.items.filter((i) => i.product.id !== id),
      totalPrice: cart.totalPrice - item.product.price * item.quantity,
    };
    this.cartSubject.next(updated);
  }

  increment(id: string) {
    const cart = this.cartSubject.getValue();
    const item = cart.items.find((i) => i.product.id === id);
    if (!item) return;

    const updated: Cart = {
      ...cart,
      items: cart.items.map((i) => (i.product.id === id ? { ...i, quantity: i.quantity + 1 } : i)),
      totalPrice: cart.totalPrice + item.product.price,
    };
    this.cartSubject.next(updated);
  }

  decrement(id: string) {
    const cart = this.cartSubject.getValue();
    const item = cart.items.find((i) => i.product.id === id);
    if (!item) return;

    if (item.quantity === 1) {
      const updated: Cart = {
        ...cart,
        items: cart.items.filter((i) => i.product.id !== id),
        totalPrice: cart.totalPrice - item.product.price,
      };
      this.cartSubject.next(updated);
      return;
    }

    const updated: Cart = {
      ...cart,
      items: cart.items.map((i) => (i.product.id === id ? { ...i, quantity: i.quantity - 1 } : i)),
      totalPrice: cart.totalPrice - item.product.price,
    };
    this.cartSubject.next(updated);
  }

  getQuantity(id: string): number {
    const item = this.cartSubject.getValue().items.find((i) => i.product.id === id);
    return item ? item.quantity : 0;
  }

  clear() {
    this.cartSubject.next({ items: [], totalPrice: 0 });
  }

  get(): Cart {
    return this.cartSubject.getValue();
  }
}
