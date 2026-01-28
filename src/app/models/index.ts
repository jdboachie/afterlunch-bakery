interface ProductImage {
  thumbnail: string;
  mobile: string;
  tablet: string;
  desktop: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  image: ProductImage;
  price: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface Cart {
  items: CartItem[];
  totalPrice: number;
}
