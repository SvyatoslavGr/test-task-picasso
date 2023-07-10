/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAppDispatch } from '../../hooks/redux';
import { createComment } from '../../store/reducers/ActionCreators';

interface CommentModalProps {
  open: boolean;
  handleClose: () => void;
  postId: string | undefined;
}

export default function CommentModal({ open, handleClose, postId }: CommentModalProps) {
  const dispatch = useAppDispatch();
  const [values, setValues] = useState({ title: '', body: '' });

  const handleSubmit = () => {
    if (postId) {
      dispatch(createComment({ ...values, postId }));
    }
    handleClose();
    setValues({ title: '', body: '' });
  };
  
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Comment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title-input"
            name="title"
            value={values.title}
            onChange={(e) => setValues({ ...values, title: e.target.value })}
            label="Comment title"
            type="text"
            fullWidth
            variant="standard"
            required
          />
          <TextField
            margin="dense"
            id="body-input"
            name="body"
            value={values.body}
            onChange={(e) => setValues({ ...values, body: e.target.value })}
            label="Comment text"
            type="text"
            fullWidth
            variant="standard"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}