import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from './ActionCreators';
import { IUser } from '../../models/IUser';

interface UserState {
  users: IUser[];
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  users: [],
  isLoading: false,
  error: '',
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = '';
        state.users = action.payload;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.rejected, (state,  action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;