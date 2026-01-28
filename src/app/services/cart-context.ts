import { computed, Injectable, signal } from '@angular/core';
import { LocalSync } from './local-sync';

const STORAGE_KEY = 'AFTERLUNCH_CART';

@Injectable({
  providedIn: 'root',
})
export class CartContext {
  private cartSignal = signal<Cart>({ items: [], totalPrice: 0.0 });

  cart = this.cartSignal.asReadonly();

  totalItems = computed(() =>
    this.cartSignal().items.reduce((sum, item) => sum + item.quantity, 0),
  );

  totalPrice = computed(() =>
    this.cartSignal().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
  );

  constructor(private localSync: LocalSync) {
    this.localSync.init(STORAGE_KEY, this.cartSignal).sync(STORAGE_KEY, this.cart);
  }

  add(product: Product) {
    this.cartSignal.update((cart) => {
      const existingItem = cart.items.find((item) => item.product.id === product.id);

      if (existingItem) {
        return {
          ...cart,
          items: cart.items.map((item) =>
            item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
          totalPrice: cart.totalPrice + product.price,
        };
      }

      return {
        ...cart,
        items: [...cart.items, { product, quantity: 1 }],
        totalPrice: cart.totalPrice + product.price,
      };
    });
  }

  remove(id: string) {
    this.cartSignal.update((cart) => {
      const item = cart.items.find((i) => i.product.id === id);
      if (!item) return cart;

      return {
        ...cart,
        items: cart.items.filter((i) => i.product.id !== id),
        totalPrice: cart.totalPrice - item.product.price * item.quantity,
      };
    });
  }

  increment(id: string) {
    this.cartSignal.update((cart) => {
      const item = cart.items.find((i) => i.product.id === id);
      if (!item) return cart;

      return {
        ...cart,
        items: cart.items.map((i) =>
          i.product.id === id ? { ...i, quantity: i.quantity + 1 } : i,
        ),
        totalPrice: cart.totalPrice + item.product.price,
      };
    });
  }

  decrement(id: string) {
    this.cartSignal.update((cart) => {
      const item = cart.items.find((i) => i.product.id === id);
      if (!item) return cart;

      if (item.quantity === 1) {
        return {
          ...cart,
          items: cart.items.filter((i) => i.product.id !== id),
          totalPrice: cart.totalPrice - item.product.price,
        };
      }

      return {
        ...cart,
        items: cart.items.map((i) =>
          i.product.id === id ? { ...i, quantity: i.quantity - 1 } : i,
        ),
        totalPrice: cart.totalPrice - item.product.price,
      };
    });
  }

  getQuantity(id: string): number {
    const item = this.cartSignal().items.find((i) => i.product.id === id);
    return item ? item.quantity : 0;
  }

  clear() {
    this.cartSignal.set({ items: [], totalPrice: 0 });
  }

  get() {
    return this.cartSignal();
  }
}
