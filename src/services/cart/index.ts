import { AddCartDataRequest, CartDetail } from './types';

import axiosInstance from 'services/common/instance';

export const addToCartService = async (params: AddCartDataRequest[]): Promise<void> => {
  await axiosInstance.post('client/add-to-cart', { items: params });
};

export const getDetailCartService = async (): Promise<CartDetail> => {
  const response = await axiosInstance.get('client/cart');
  return response.data.data;
};

export const updateItemCartService = async (
  id: number,
  params: AddCartDataRequest
): Promise<void> => {
  await axiosInstance.put(`client/update-item-cart/${id}`, { params });
};

export const removeItemCartService = async (ids: number[]): Promise<void> => {
  await axiosInstance.delete('client/remove-item-cart', { params: { ids } });
};
