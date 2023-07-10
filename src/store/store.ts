import { combineReducers, configureStore } from '@reduxjs/toolkit';
import postReducer from './reducers/PostSlice';
import userReducer from './reducers/UserSlice';
import commentReducer from './reducers/CommentSlice';

const rootReducer = combineReducers({
  postReducer,
  userReducer,
  commentReducer,
});

// export const setupStore = () => {
//   return configureStore({
//     reducer: rootReducer
//   })
// }

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
// export type AppStore = ReturnType<typeof setupStore>
// export type AppDispatch = AppStore['dispatch']


export type AppDispatch = typeof store.dispatch;
