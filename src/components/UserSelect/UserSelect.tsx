/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { IUser } from '../../models/IUser';
import { setFilterValue } from '../../store/reducers/PostSlice';
import { fetchUserPosts } from '../../store/reducers/ActionCreators';
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { enqueueSnackbar } from 'notistack';

function UserSelect() {
  const dispatch = useAppDispatch();
  const { filterValue } = useAppSelector(state => state.postReducer);
  const { users, isLoading, error } = useAppSelector(state => state.userReducer);
  
  const handleChange = (e: SelectChangeEvent<string>) => {
    const userId = e.target.value.toString();
    const user = users.find((el: IUser) => el.id.toString() === userId);
    dispatch(setFilterValue(userId));
    if (user && userId) {
      dispatch(fetchUserPosts(user));
    } else {
      enqueueSnackbar('Showing all posts');
    }
  };

  return (
    <div className='page-header'>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <FormControl sx={{ m: 1, mb: '25px', minWidth: 270 }}>
        <Select value={filterValue} displayEmpty onChange={handleChange}>
          <MenuItem value=''>All posts</MenuItem>
          {users && users.map((el: IUser) => (
            <MenuItem value={el.id} key={el.id}>{el.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default UserSelect;