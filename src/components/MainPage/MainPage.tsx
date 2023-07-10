import React from 'react';
import PostList from '../PostList/PostList';
import UserSelect from '../UserSelect/UserSelect';

function MainPage() {
  return (
    <div className='container'>
      <UserSelect />
      <PostList />
    </div>
  );
}

export default MainPage;