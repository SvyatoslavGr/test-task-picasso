import { createSlice } from '@reduxjs/toolkit';
import { IPost } from '../../models/IPost';
import { fetchPosts, fetchUserPosts } from './ActionCreators';

interface PostState {
  posts: IPost[];
  filteredPosts: IPost[];
  filterValue: string;
  isLoading: boolean;
  error: string;
}

const initialState: PostState = {
  posts: [],
  filteredPosts: [],
  filterValue: '',
  isLoading: false,
  error: '',
};

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setFilterValue(state, action) {
      state.filterValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = '';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = '';
        state.filteredPosts = action.payload;
      })
      .addCase(fetchUserPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFilterValue } = postSlice.actions;
export default postSlice.reducer;