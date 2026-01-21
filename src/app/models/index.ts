interface Product {
  id: number
  label: string
  imageUrl: string
  price: number
}

interface Cart {
  products: Product[]
  totalPrice: number
}
