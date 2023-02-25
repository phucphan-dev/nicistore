import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ExampleState {
  value: number;
}

const initialState: ExampleState = {
  value: 0,
};

const delay = async () => new Promise((resolve) => setTimeout(
  () => { resolve(true); },
  2000,
));

export const incrementAsync = createAsyncThunk('exampleReducer/example', async (amount: number) => {
  await delay();
  return amount;
});

export const exampleSlice = createSlice({
  name: 'exampleReducer',
  initialState,
  reducers: {
    increment($state) {
      $state.value += 1;
    },
    decrement($state) {
      $state.value -= 1;
    },
    incrementByAmount($state, action: PayloadAction<number>) {
      $state.value += action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(incrementAsync.fulfilled, ($state, action) => {
      $state.value += action.payload;
    });
  },
});

export const { increment, decrement, incrementByAmount } = exampleSlice.actions;

export default exampleSlice.reducer;
