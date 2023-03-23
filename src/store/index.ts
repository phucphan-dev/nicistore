import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import authReducer from './authenticate';
import productReducer from './product';

export const store = configureStore({
  devTools: process.env.NODE_ENV === 'development',
  reducer: {
    auth: authReducer,
    product: productReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
