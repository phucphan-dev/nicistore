import { CreateOrderDataRequest, CreateOrderResponseData, OrderData } from './types';

import axiosInstance from 'services/common/instance';

export const getAllOrderService = async (params: BaseFilterParams):
  Promise<APIPaginationResponse<OrderData[]>> => {
  const response = await axiosInstance.get('client/orders', { params });
  return response.data;
};

export const getOrderDetailService = async (code: string): Promise<OrderData> => {
  const response = await axiosInstance.get(`client/orders/${code}`);
  return response.data.data;
};

export const createOrderService = async (
  data: CreateOrderDataRequest
): Promise<CreateOrderResponseData> => {
  const response = await axiosInstance.post('client/orders/create-order', data);
  return response.data.data;
};

export const createOrderUnAuthService = async (
  data: CreateOrderDataRequest
): Promise<CreateOrderResponseData> => {
  const response = await axiosInstance.post('client/orders/create-order-without-auth', data);
  return response.data.data;
};
