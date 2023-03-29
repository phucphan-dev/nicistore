import { CreateOrderDataRequest, OrderData } from './types';

import axiosInstance from 'services/common/instance';

export const getOrderDetailService = async (code: string): Promise<OrderData> => {
  const response = await axiosInstance.post(`client/orders/${code}`);
  return response.data.data;
};

export const createOrderService = async (data: CreateOrderDataRequest): Promise<void> => {
  await axiosInstance.post('client/orders/create-order', data);
};

export const createOrderUnAuthService = async (data: CreateOrderDataRequest): Promise<void> => {
  await axiosInstance.post('client/orders/create-order-without-auth', data);
};
