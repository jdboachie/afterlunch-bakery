import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Inventory {
  private http = inject(HttpClient);
  private productsSubject = new BehaviorSubject<Product[]>([]);

  readonly products$ = this.productsSubject.asObservable();

  constructor() {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.http
      .get<RawProduct[]>('/data.json')
      .pipe(
        map((data) =>
          data.map((item) => ({
            id: this.slugify(item.name),
            name: item.name,
            category: item.category,
            image: item.image,
            price: item.price,
          })),
        ),
        catchError((err) => {
          console.error('Failed to load products', err);
          this.productsSubject.next([]);
          return of([] as Product[]);
        }),
      )
      .subscribe((products) => this.productsSubject.next(products));
  }

  private slugify(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  get(id?: string): Observable<Product | Product[] | undefined> {
    if (id) {
      return this.products$.pipe(map((products) => products.find((product) => product.id === id)));
    }
    return this.products$;
  }
}
