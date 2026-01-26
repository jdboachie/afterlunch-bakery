interface Product {
  id: string;
  label: string;
  description: string;
  imageUrl: string;
  price: number;
}

interface Cart {
  products: Product[];
  totalPrice: number;
}
