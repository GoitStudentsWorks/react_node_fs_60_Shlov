import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
// import { boolean } from 'yup';

axios.defaults.baseURL = 'https://fourtwo-back.onrender.com/';

export const fetchNotices = createAsyncThunk(
  'notices/all',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await axios.get('/notices', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // toast.success('Notices done! 👏');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchNotice = createAsyncThunk(
  'notices/one',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await axios.get(`/notices/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getNoticeByCategory = createAsyncThunk(
  'notices/getNoticesByCategory',
  async ({ categories, title, sex, minMonths, maxMonths }, thunkAPI) => {
    try {
      if (!title && categories) {
        const token = thunkAPI.getState().auth.token;
        const { data } = await axios.get(`/notices`, {
          params: { categories, sex, minMonths, maxMonths },
          headers: { Authorization: `Bearer ${token}` },
        });
        return data;
      } else if (title !== '' && !categories) {
        const { data } = await axios.get(`/notices`, {
          params: { title, minMonths, maxMonths, sex },
        });
        return data;
      } else if ((!title && !categories) && (sex !== null || (minMonths !== null && maxMonths !== null))) {
        const { data } = await axios.get(`/notices`, {
          params: { sex, minMonths, maxMonths },
        });
        return data;
      } else {
        const { data } = await axios.get(`/notices`, {
          params: { categories, title, minMonths, maxMonths, sex },
        });
        return data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addNotice = createAsyncThunk(
  'notices/addNotice',
  async ({ formData }, thunkAPI) => {
    try {
      const response = await axios.post('/notices/user', formData, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      });
      toast.success('Successfully added to notices');
      console.log(response);
    } catch (error) {
      if (error.response.status === 400) {
        toast.error('Notice creation error. Please try again🙏');
      }
      if (error.response.status === 500) {
        toast.error('Server error. Please try later🙏');
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getFavoriteNotices = createAsyncThunk(
  'notices/user/favorite',
  async ({ title, sex, minMonths, maxMonths }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await axios.get('/notices/user/favorite', {
        params: { title, sex, minMonths, maxMonths },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateFavorite = createAsyncThunk(
  'notices/updateFavorite',
  async ({noticeId, isFavorite}, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const responce = await axios.patch(`/notices/user/favorite/${noticeId}?favorite=${isFavorite}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if(isFavorite) {
        toast.success('Pet added to favorites!', {
          style: {
            backgroundColor: `var(--cl-background)`,
            padding: '6px',
            color: `var(--cl-black)`,
          },
          icon: '💗',
        });
      }
      if(!isFavorite) {
        toast.success('Pet removed from favorites!', {
          style: {
            backgroundColor: `var(--cl-background)`,
            padding: '6px',
            color: `var(--cl-black)`,
          },
          icon: '😿',
        });
      }
      // console.log(responce.data.data.notice.favorite);
      return responce.data;
    } catch (error) {
      if (error.response.status === 401) {
        toast.error('Please authorization and try again 😸');
      }
      if(error.response.status === 404){
        toast.error('Notice is not found 😸');
      }
      if (error.response.status === 500) {
        toast.error('Server error. Please try later😸');
      }
      console.log(error)
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteNotice = createAsyncThunk(
  'notices/deleteNotice',
  async ( noticeId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const responce = await axios.delete(`/notices/user/${noticeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      toast.success('Notice deleted successfully!', {
        style: {
          backgroundColor: `var(--cl-background)`,
          padding: '6px',
          color: `var(--cl-black)`,
        },
        icon: '😸',
      });
      console.log(responce.data)
      return responce;
    } catch (error) {
      if (error.response.status === 401) {
        toast.error('Please authorization and try again 😸');
      }
      if(error.response.status === 404){
        toast.error('Notice is not found 😸');
      }
      if (error.response.status === 500) {
        toast.error('Server error. Please try later😸');
      }
      console.log(error)
      return thunkAPI.rejectWithValue(error.message);
    }
});
