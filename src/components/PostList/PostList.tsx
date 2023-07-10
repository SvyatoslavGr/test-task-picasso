import React from 'react';
import { useAppSelector } from '../../hooks/redux';
import { IPost } from '../../models/IPost';
import PostItem from '../PostItem/PostItem';

function PostList() {
  const { posts, filteredPosts, filterValue, isLoading, error } = useAppSelector(state => state.postReducer);
  const postsArray = filterValue ? filteredPosts : posts;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {postsArray.length ? postsArray.map((el: IPost) => (
        <PostItem post={el} key={el.id} />
      )) : (
        <p>Nothing found</p>
      )
      }
    </div>
  );
}

export default PostList;