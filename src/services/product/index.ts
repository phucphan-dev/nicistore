import {
  FilterProductParams, ProductCategoryData,
  ProductCategoryDetail, ProductDetail, ProductListItemData
} from './types';

import axiosInstance from 'services/common/instance';

export const getAllProductCategoriesService = async (): Promise<ProductCategoryData[]> => {
  const response = await axiosInstance.get('client/product-categories');
  return response.data.data;
};

export const getProductCategoryDetailService = async (
  slug: string
): Promise<ProductCategoryDetail> => {
  const response = await axiosInstance.get(`client/product-categories/${slug}`);
  return response.data.data;
};

export const getAllProductService = async (params?: FilterProductParams):
  Promise<APIPaginationResponse<ProductListItemData[]>> => {
  const response = await axiosInstance.get('client/products', { params });
  return response.data;
};

export const getProductDetailService = async (slug: string):
  Promise<ProductDetail> => {
  const response = await axiosInstance.get(`client/products/${slug}`);
  return response.data.data;
};

export const favoriteProductService = async (productId: number): Promise<void> => {
  await axiosInstance.post('client/product-favorites', { productId });
};

export const getAllFavoriteProductService = async (params?: FilterProductParams):
  Promise<APIPaginationResponse<ProductListItemData[]>> => {
  const response = await axiosInstance.get('client/product-favorites', { params });
  return response.data;
};
