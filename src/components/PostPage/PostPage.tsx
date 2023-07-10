/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { IPost } from '../../models/IPost';
import { useNavigate, useParams } from 'react-router-dom';
import { IUser } from '../../models/IUser';
import { createComment, fetchComments } from '../../store/reducers/ActionCreators';
import { IComment } from '../../models/IComment';
import { Button } from '@mui/material';
import CommentModal from '../CommentModal/CommentModal';

function PostPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();
  const { posts } = useAppSelector(state => state.postReducer);
  const { users } = useAppSelector(state => state.userReducer);
  const { comments } = useAppSelector(state=> state.commentReducer);
  const isCommentsLoading = useAppSelector(state=> state.commentReducer.isLoading);
  const errorComments = useAppSelector(state=> state.commentReducer.error);
  const post = posts.find((el: IPost) => el.id.toString() === postId);
  const user = users.find((el: IUser) => el.id === post?.userId);
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({ title: '', body: '' });

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
    setValues({ title: '', body: '' });
  };

  const handleSubmit = () => {
    if (postId) {
      dispatch(createComment({ ...values, postId }));
    }
    handleClose();
  };

  useEffect(() => {
    if (postId) {
      dispatch(fetchComments(postId));
    }
  }, [postId, dispatch]);
  
  return (
    <div className='container'>
      <div className="page-header">
        <Button variant="contained" onClick={() => navigate(-1)}>Back</Button>
      </div>
      <div className='post-author-wrapper'>
        <div className='post-section'>
          {
            post ? (
              <>
                <h2>{post.title}</h2><p>{post.body}</p><Button className="comment-btn" variant="contained" onClick={handleClickOpen}>
                Post a comment
                </Button>
              </>
            ) : (
              <p>Post not found</p>
            )
          }
        </div>
        <div className='author-section'>
          <h2>Author:</h2>
          {
            user ? (
              <div className='author-info'>
                <span>Name: {user.name}</span>
                <span>Username: {user.username}</span>
                <span>Email: {user.email}</span>
                <span>Phone: {user.phone}</span>
                <span>Address: {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}</span>
              </div>
            ) : (
              <p>User not found</p>
            )
          }
        </div>
      </div>
      <div className='comments-section'>
        <h2 className='title-center'>Comments:</h2>
        <div>
          {isCommentsLoading && <p>Loading...</p>}
          {errorComments && <p>{errorComments}</p>}
          {comments.length ? comments.map((el: IComment) => (
            <div className="comment" key={el.id}>
              <h4>{el.name}</h4>
              <p>{el.body}</p>
            </div>
          )) : (
            <p>No comments yet</p>
          )}

        </div>
      </div>
      <CommentModal open={open} handleClose={handleClose} values={values} setValues={setValues} handleSubmit={handleSubmit}/>
    </div>
  );
}

export default PostPage;