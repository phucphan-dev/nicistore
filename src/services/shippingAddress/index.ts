import { ShippingAddressData, ShippingAddressDataRequest } from './types';

import axiosInstance from 'services/common/instance';

export const getAllShippingAddressService = async ():
  Promise<APIPaginationResponse<ShippingAddressData[]>> => {
  const response = await axiosInstance.get('customers/shipping-address');
  return response.data;
};

export const createShippingAddressService = async (
  data: ShippingAddressDataRequest
): Promise<void> => {
  await axiosInstance.post('customers/shipping-address', data);
};

export const editShippingAddressService = async (
  data: ShippingAddressDataRequest & { id: number }
): Promise<void> => {
  await axiosInstance.put(`customers/shipping-address/${data.id}`, data);
};

export const deleteShippingAddressService = async (ids: number[]): Promise<void> => {
  await axiosInstance.delete('customers/shipping-address', { data: { ids } });
};
