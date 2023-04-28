export interface AddCartDataRequest {
  productId: number
  sizeId: number
  colorId: number
  quantity: number
  isOrder?: boolean;
}

export interface CartItem {
  itemId: number
  productId: number
  code: string
  thumbnail: string
  price: number
  salePercent: number
  quantity: number
  calculatePrice: number
  calculateSalePrice: number
  name: string
  slug: string
  colors: ProductProperty[]
  sizes: ProductProperty[]
  inStock?: boolean
}

export interface CartDetail {
  cartId: number;
  items: CartItem[];
}
