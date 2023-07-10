/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { IUser } from '../../models/IUser';
import { setFilterValue } from '../../store/reducers/PostSlice';
import { fetchUserPosts } from '../../store/reducers/ActionCreators';
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';

function UserSelect() {
  const dispatch = useAppDispatch();
  const { users, isLoading, error } = useAppSelector(state => state.userReducer);
  const { filterValue } = useAppSelector(state => state.postReducer);
  
  const handleChange = (e: SelectChangeEvent<string>) => {
    const selectedValue = e.target.value;
    dispatch(setFilterValue(selectedValue));
    if (selectedValue) {
      dispatch(fetchUserPosts(selectedValue));
    }
  };

  return (
    <div className='page-header'>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <FormControl sx={{ m: 1, minWidth: 270 }}>
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