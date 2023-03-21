export interface ShippingAddressDataRequest {
  cityId: number;
  districtId: number;
  wardId: number;
  address: string;
  phone: string;
  name: string;
}

export interface ShippingAddressData {
  id: number
  customerId: number
  address: string
  phone: string
  name: any
  city: {
    id: number
    name: string
  }
  district: {
    id: number
    name: string
  }
  ward: {
    id: number
    name: string
  }
}
