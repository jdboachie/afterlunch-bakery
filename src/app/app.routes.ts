import { Routes } from '@angular/router';
import { NotFound } from './components/not-found/not-found';
// import { CartView } from './components/cart-view/cart-view';
import { Shop } from './components/shop/shop';
// import { ProductDetail } from './components/product-detail/product-detail';

export const routes: Routes = [
  {
    path: '',
    component: Shop,
    // children: [
    //   {
    //     path: 'product/:id',
    //     component: ProductDetail
    //   },
    //   {
    //     path: 'cart',
    //     component: CartView,
    //   },
    // ],
  },
  {
    path: '**',
    component: NotFound,
  },
];
