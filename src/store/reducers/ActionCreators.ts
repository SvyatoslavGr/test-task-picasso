import { createAsyncThunk } from '@reduxjs/toolkit';
import { IPost } from '../../models/IPost';
import { IUser } from '../../models/IUser';
import { IComment } from '../../models/IComment';

export const fetchPosts = createAsyncThunk(
  'posts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) {
        throw new Error;
      }
      const result = (await response.json()) as IPost[];
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to load posts');
    }
  },
);

export const fetchUserPosts = createAsyncThunk(
  'posts/fetchUserPosts',
  async (userId: string, thunkAPI) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
      if (!response.ok) {
        throw new Error;
      }
      const result = (await response.json()) as IPost[];
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to load posts');
    }
  },
);

export const fetchUsers = createAsyncThunk(
  'users/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error;
      }
      const result = (await response.json()) as IUser[];
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to load users');
    }
  },
);

export const fetchComments = createAsyncThunk(
  'comments/fetchAll',
  async (postId: string, thunkAPI) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
      if (!response.ok) {
        throw new Error;
      }
      const result = (await response.json()) as IComment[];
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to load comments');
    }
  },
);

export const createComment = createAsyncThunk(
  'comments/create',
  async (data: { title: string, body: string, postId: string }, thunkAPI) => {
    try {
      const { title, body, postId } = data;
      const response = await fetch('https://jsonplaceholder.typicode.com/comments', {
        method: 'POST',
        body: JSON.stringify({
          name: title,
          body: body,
          postId: Number(postId),
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      if (!response.ok) {
        throw new Error;
      }
      const result = (await response.json()) as IComment;
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to create comment');
    }
  },
);