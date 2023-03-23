import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getAllProductCategoriesService } from 'services/product';
import { ProductCategoryData } from 'services/product/types';

interface ProductState {
  categories?: ProductCategoryData[];
}

const initialState: ProductState = {
};

export const getProductCategoriesAction = createAsyncThunk<
  ProductCategoryData[],
  void,
  { rejectValue: ErrorResponse }
>('productReducer/getProductCategoriesAction', async (_, { rejectWithValue }) => {
  try {
    const response = await getAllProductCategoriesService();
    return response;
  } catch (error) {
    return rejectWithValue(error as ErrorResponse);
  }
});

export const productSlice = createSlice({
  name: 'productReducer',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getProductCategoriesAction.fulfilled, ($state, action) => {
      $state.categories = action.payload;
    });
  },
});

export default productSlice.reducer;
