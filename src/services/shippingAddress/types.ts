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
  name: string
  city: APartOfLocation
  district: APartOfLocation
  ward: APartOfLocation
}
