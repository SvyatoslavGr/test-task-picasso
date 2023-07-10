import { createSlice } from '@reduxjs/toolkit';
import { IComment } from '../../models/IComment';
import { createComment, fetchComments } from './ActionCreators';

interface CommentState {
  comments: IComment[];
  isLoading: boolean;
  error: string;
}

const initialState: CommentState = {
  comments: [],
  isLoading: false,
  error: '',
};

export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = '';
        state.comments = action.payload;
      })
      .addCase(fetchComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchComments.rejected, (state,  action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.error = '';
        state.comments.push(action.payload);
      })
      .addCase(createComment.rejected, (state,  action) => {
        state.error = action.payload as string;
      });
  },
});

export default commentSlice.reducer;