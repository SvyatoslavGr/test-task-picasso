/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

interface CommentModalProps {
  open: boolean;
  handleClose: () => void;
  values: { title: string, body: string };
  setValues: (values: { title: string, body: string }) => void;
  handleSubmit: () => void;
}

export default function CommentModal({ open, handleClose, values, setValues, handleSubmit }: CommentModalProps) {
  
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