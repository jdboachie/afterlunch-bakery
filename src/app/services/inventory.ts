import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, combineLatest } from 'rxjs';
import {
  catchError,
  map,
  debounceTime,
  distinctUntilChanged,
  startWith,
  switchMap,
  mergeMap,
  delay,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Inventory {
  private http = inject(HttpClient);
  private productsSubject = new BehaviorSubject<Product[]>([]);
  private loadErrorSubject = new BehaviorSubject<string | null>(null);

  public readonly products$ = this.productsSubject.asObservable();
  public readonly loadError$ = this.loadErrorSubject.asObservable();

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
          this.loadErrorSubject.next('Failed to load products. Please try again later.');
          return of([] as Product[]);
        }),
      )
      .subscribe((products) => {
        this.productsSubject.next(products);
        this.loadErrorSubject.next(null);
      });
  }

  private slugify(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  public get(id: string): Observable<Product | undefined> {
    return this.products$.pipe(map((products) => products.find((product) => product.id === id)));
  }

  public filter(query$: Observable<string>): Observable<Product[]> {
    const q$ = query$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((s) => s.trim().toLowerCase()),
      startWith(''),
    );

    return combineLatest([this.products$, q$]).pipe(
      map(([products, q]) => {
        if (!q) return products;
        return products.filter(
          (p) => p.name.toLowerCase().includes(q) || (p.category || '').toLowerCase().includes(q),
        );
      }),
    );
  }

  public enrichedProductsWithCart(cart$: Observable<Cart>): Observable<(Product & { inCartQuantity: number })[]> {
    return combineLatest([this.products$, cart$]).pipe(
      map(([products, cart]) =>
        products.map((p) => ({ ...p, inCartQuantity: cart.items.find((i) => i.product.id === p.id)?.quantity ?? 0 })),
      ),
    );
  }

  public fetchProductDetails(productId$: Observable<string>): Observable<Product | undefined> {
    return productId$.pipe(
      distinctUntilChanged(),
      switchMap((id) => this.get(id)),
      mergeMap((p) => {
        if (!p) return of(undefined);
        return of({ ...(p as Product), description: `${p.name} — freshly fetched details` } as Product & {
          description?: string;
        }).pipe(delay(150));
      }),
    );
  }
}
