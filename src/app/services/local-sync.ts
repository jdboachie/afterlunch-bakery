import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Logging } from './logging';

@Injectable({
  providedIn: 'root',
})
export class LocalSync {
  private readonly logger = inject(Logging);

  public init<T>(storageKey: string, target: BehaviorSubject<T>): LocalSync {
    const raw = localStorage.getItem(storageKey);
    if (!raw) {
      return this;
    }

    try {
      const parsed = JSON.parse(raw) as T;
      target.next(parsed);
    } catch (err) {
      this.logger.reportError(`LocalSync.init: failed to parse key "${storageKey}": ${err}`);
    }

    return this;
  }

  public sync<T>(storageKey: string, source: Observable<T>): Subscription {
    return source.subscribe((value) => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(value));
      } catch (err) {
        this.logger.reportError(`LocalSync.sync: failed to persist key "${storageKey}": ${err}`);
      }
    });
  }
}
