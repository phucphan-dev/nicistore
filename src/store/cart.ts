import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getDetailCartService } from 'services/cart';
import { CartDetail } from 'services/cart/types';

interface CartState {
  cartId?: number
  items: CartItem[];
  checkoutId: number[];
}

const initialState: CartState = {
  items: [],
  checkoutId: [],
};

export const getCartDetailAction = createAsyncThunk<
  CartDetail,
  void,
  { rejectValue: ErrorResponse }
>('cartReducer/getCartDetailAction', async (_, { rejectWithValue }) => {
  try {
    const response = await getDetailCartService();
    return response;
  } catch (error) {
    return rejectWithValue(error as ErrorResponse);
  }
});

export const cartSlice = createSlice({
  name: 'cartReducer',
  initialState,
  reducers: {
    loadCartLocal: ($state, action: PayloadAction<CartItem[]>) => {
      $state.items = action.payload;
    },
    addToCart: ($state, action: PayloadAction<CartItem>) => {
      const findIndex = $state.items.findIndex((
        item
      ) => item.productId === action.payload.productId
      && item.color.id === action.payload.color.id && item.size.id === action.payload.size.id);
      if (findIndex === -1) {
        $state.items = [...$state.items, action.payload];
      } else {
        const clone = $state.items;
        clone[findIndex] = {
          ...$state.items[findIndex],
          quantity: $state.items[findIndex].quantity + action.payload.quantity
        };
        $state.items = clone;
      }
    },
    updateItemCartLocal: ($state, action: PayloadAction<CartItem>) => {
      const findIndex = $state.items.findIndex((item) => item.id === action.payload.id);
      if (findIndex > -1) {
        const clone = $state.items;
        clone[findIndex] = action.payload;
        $state.items = clone;
      }
    },
    deleteItemCartLocal: ($state, action: PayloadAction<number>) => {
      $state.items = $state.items.filter((item) => item.id !== action.payload);
    },
    processCheckoutAction: ($state, action: PayloadAction<number[]>) => {
      $state.checkoutId = action.payload;
    },
    deleteCheckoutId: ($state) => {
      const ids = $state.checkoutId;
      $state.items = $state.items.filter((item) => !ids.includes(item.id));
      $state.checkoutId = [];
    },
    resetCart: ($state) => {
      $state.cartId = undefined;
      $state.items = [];
      $state.checkoutId = [];
    }
  },
  extraReducers(builder) {
    builder.addCase(getCartDetailAction.fulfilled, ($state, action) => {
      $state.cartId = action.payload.cartId;
      $state.items = action.payload.items.map((item) => ({
        id: item.itemId,
        productId: item.productId,
        image: item.thumbnail,
        link: item.slug,
        name: item.name,
        color: item.colors[0],
        size: item.sizes[0],
        quantity: item.quantity,
        price: item.price,
        salePrice: item.calculateSalePrice,
        isOrder: !item.inStock
      }));
    });
  },
});
export const {
  loadCartLocal, addToCart, updateItemCartLocal,
  deleteItemCartLocal, processCheckoutAction, deleteCheckoutId, resetCart
} = cartSlice.actions;
export default cartSlice.reducer;
