import { Injectable, Signal, WritableSignal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalSync {
  init<T>(storageKey: string, target: WritableSignal<T>): LocalSync {
    const raw = localStorage.getItem(storageKey);
    if (!raw) {
      return this;
    }

    try {
      const parsed = JSON.parse(raw) as T;
      target.set(parsed);
    } catch {
      // If parsing fails, keep current cart state
    }

    return this;
  }

  sync<T>(storageKey: string, cart: Signal<T>): void {
    effect(() => {
      const value = cart();
      localStorage.setItem(storageKey, JSON.stringify(value));
    });
  }
}
