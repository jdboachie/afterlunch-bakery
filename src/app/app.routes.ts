import { Routes } from '@angular/router';
import { NotFound } from './components/not-found/not-found';
import { Shop } from './components/shop/shop';
import { ProductDetail } from './components/product-detail/product-detail';

export const routes: Routes = [
  {
    path: '',
    component: Shop,
  },
  {
    path: 'product/:id',
    component: ProductDetail,
  },
  {
    path: '**',
    component: NotFound,
  },
];
