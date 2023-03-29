interface OrderProduct {
  id: number
  thumbnail: string
  name: string
  slug: string
  shortDescription: string
}

export interface OrderData {
  code: string
  city: APartOfLocation
  district: APartOfLocation
  ward: APartOfLocation
  name: string
  phone: string
  email: string
  address: string
  note: string
  createdAt: string
  status: number
  items: {
    product: OrderProduct
    size: ProductProperty
    color: ProductProperty
    quantity: number
    price: number
    salePercent: number
    finalPrice: number
  }[]
  totalPrice: number
  totalFinalPrice: number
}

interface OrderProductItem {
  productId: number
  sizeId: number
  colorId: number
  quantity: number
}

export interface CreateOrderDataRequest {
  shippingAddressId: number
  cityId: number
  districtId: number
  wardId: number
  address: string
  name: string
  phone: string
  email: string
  note: string
  items: OrderProductItem[]
}
