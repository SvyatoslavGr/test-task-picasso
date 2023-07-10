import React from 'react';
import { IPost } from '../../models/IPost';
import { NavLink } from 'react-router-dom';

interface PostItemProps {
  post: IPost
}

function PostItem({ post }: PostItemProps) {
  return (
    <NavLink className='post' to={`/posts/${post.id}`}>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
    </NavLink>
  );
}

export default PostItem;