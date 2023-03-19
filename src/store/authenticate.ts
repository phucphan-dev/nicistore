import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getProfileService } from 'services/authenticate';
import { UserProfileData } from 'services/authenticate/types';

interface AuthenticateState {
  profile?: UserProfileData;
}

const initialState: AuthenticateState = {
};

export const getProfileAction = createAsyncThunk<
  UserProfileData,
  void,
  { rejectValue: ErrorResponse }
>('authenticateReducer/getProfileAction', async (_, { rejectWithValue }) => {
  try {
    const response = await getProfileService();
    return response;
  } catch (error) {
    return rejectWithValue(error as ErrorResponse);
  }
});

export const authenticateSlice = createSlice({
  name: 'authenticateReducer',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getProfileAction.fulfilled, ($state, action) => {
      $state.profile = action.payload;
    });
  },
});

export default authenticateSlice.reducer;
