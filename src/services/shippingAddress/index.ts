import { ShippingAddressDataRequest } from './types';

import axiosInstance from 'services/common/instance';

export const createShippingAddressService = async (
  data: ShippingAddressDataRequest
): Promise<void> => {
  await axiosInstance.post('customers/shipping-address', data);
};

export const getAllShippingAddressService = null;
