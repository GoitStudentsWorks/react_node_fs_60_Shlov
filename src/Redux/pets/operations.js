import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

// axios.defaults.baseURL = 'https://fourtwo-back.onrender.com/';

export const fetchPets = createAsyncThunk(
  'pets/fetchPets',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await axios.get('/user-pets',
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        console.log(response.data);
      return response.data;
    } catch (error) {
      toast.error('Something went wrong!!!')
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deletePet = createAsyncThunk(
  'pet/deletePet',
  async (petId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await axios.delete(`/pets/${petId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
      });
      return response.data;
    } catch (error) {
      toast.error('Something went wrong. Try again!!!')
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
