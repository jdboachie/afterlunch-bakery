import { Injectable, Signal, WritableSignal, effect } from '@angular/core';

const STORAGE_KEY = 'AFTERLUNCH_CART';

@Injectable({
  providedIn: 'root',
})
export class LocalSync {
  init<T>(cart: WritableSignal<T>): LocalSync {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return this;
    }

    try {
      const parsed = JSON.parse(raw) as T;
      cart.set(parsed);
    } catch {
      // If parsing fails, keep current cart state.
    }

    return this;
  }

  sync<T>(cart: Signal<T>): void {
    effect(() => {
      const value = cart();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    });
  }
}
