import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalSync {
  public init<T>(storageKey: string, target: BehaviorSubject<T>): LocalSync {
    const raw = localStorage.getItem(storageKey);
    if (!raw) {
      return this;
    }

    try {
      const parsed = JSON.parse(raw) as T;
      target.next(parsed);
    } catch {
      // TODO: Handle the error
    }

    return this;
  }

  public sync<T>(storageKey: string, source: Observable<T>): Subscription {
    return source.subscribe((value) => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(value));
      } catch {
        // TODO: Handle the error
      }
    });
  }
}
