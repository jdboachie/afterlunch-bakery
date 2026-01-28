import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

interface RawProduct {
  image: ProductImage;
  name: string;
  category: string;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class Inventory {
  private http = inject(HttpClient);
  private productsSignal = signal<Product[]>([]);

  readonly products = this.productsSignal.asReadonly();

  constructor() {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.http.get<RawProduct[]>('/data.json').subscribe((data) => {
      const products = data.map((item) => ({
        id: this.slugify(item.name),
        name: item.name,
        category: item.category,
        image: item.image,
        price: item.price,
      }));
      this.productsSignal.set(products);
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

  get(id?: string): Product | Product[] | undefined {
    if (id) {
      return this.products().find((product) => product.id === id);
    }
    return this.products();
  }
}
