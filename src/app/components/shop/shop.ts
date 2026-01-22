import { Component, EventEmitter, inject } from '@angular/core';
import { ProductList } from '../product-list/product-list';
import { RouterOutlet } from '@angular/router';
import { CartContext } from '../../services/cart-context.service';

@Component({
  selector: 'app-shop',
  imports: [ProductList, RouterOutlet],
  templateUrl: './shop.html',
  styleUrl: './shop.css',
})
export class Shop {
  cart = inject(CartContext);

  products: Product[] = [
    // move this to service
    {
      id: 1,
      label: 'Assorted Cookie Tin',
      imageUrl:
        'https://milkbarstore.com/cdn/shop/files/CookieUpdate2025_12Assorted_0969_995773d1-5464-4254-8590-122b9cfff3c6.jpg?format=pjpg&v=1740416234&width=700',
      price: 28,
    },
    {
      id: 2,
      label: 'Cookie Classics Assorted Tin',
      imageUrl:
        'https://milkbarstore.com/cdn/shop/files/CookieUpdate2025_6ctAssorted_0925.jpg?format=pjpg&v=1768346791&width=540',
      price: 28,
    },
    // CAKES
    {
      id: 3,
      label: 'Birthday Cake',
      imageUrl:
        'https://milkbarstore.com/cdn/shop/files/BirthdayCake_2023_0011.jpg?format=pjpg&v=1689691374&width=600',
      price: 65,
    },
    {
      id: 4,
      label: 'Quadruple Chocolate Cake Duo',
      imageUrl:
        'https://milkbarstore.com/cdn/shop/files/Q3Humans_009.jpg?format=pjpg&v=1725917881&width=600',
      price: 105,
    },
    {
      id: 5,
      label: 'Red Velvet Cheesecake Cake',
      imageUrl:
        'https://milkbarstore.com/cdn/shop/files/Q12026__0061_1_copy.jpg?format=pjpg&v=1767201533&width=540',
      price: 65,
    },
    //
    {
      id: 6,
      label: 'Birthday Truffle Dozen Box',
      imageUrl:
        'https://milkbarstore.com/cdn/shop/products/BMBackgroundRemoval_02921_13.png?format=pjpg&v=1747414247&width=600',
      price: 40,
    },
    // PIES
    {
      id: 7,
      label: 'Milk Bar Pie',
      imageUrl:
        'https://milkbarstore.com/cdn/shop/files/MilkBarPie_2023_001.jpg?format=pjpg&v=1736534291&width=540',
      price: 53,
    },
    {
      id: 8,
      label: 'PumpkinMilk Bar Pie',
      imageUrl:
        'https://milkbarstore.com/cdn/shop/files/MilkBarPumpkinPiePDP_01_1.jpg?format=pjpg&v=1763516079&width=540',
      price: 38.5,
    },
    {
      id: 9,
      label: 'Milk Bar Pie',
      imageUrl:
        'https://milkbarstore.com/cdn/shop/files/MilkBarPie_2023_001.jpg?format=pjpg&v=1736534291&width=540',
      price: 40,
    },
  ];

  handleAddToCart(product: Product) {
    this.cart.add(product);
  }
}
