import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useAppDispatch } from './hooks/redux';
import { fetchPosts, fetchUsers } from './store/reducers/ActionCreators';
import MainPage from './components/MainPage/MainPage';
import PostPage from './components/PostPage/PostPage';
import PageNotFound from './components/PageNotFound/PageNotFound';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchUsers());
  }, [dispatch]);
  
  return (
    <Routes>
      <Route
        path="/"
        element={<MainPage />}
      />
      <Route
        path="/posts/:postId"
        element={<PostPage />}
      />
      <Route
        path="*"
        element={<PageNotFound />}
      />
    </Routes>
  );
}

export default App;
