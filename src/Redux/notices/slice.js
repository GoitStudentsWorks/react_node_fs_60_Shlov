import { createSlice } from '@reduxjs/toolkit';
import {
  fetchNotices,
  fetchNotice,
  getNoticeByCategory,
  addNotice,
  getFavoriteNotices,
  updateFavorite,
  deleteNotice,
  getUserNotices,
} from './operation';

const handlePending = state => {
  state.isLoadNotices = true;
};

const handleRejected = (state, action) => {
  state.isLoadNotices = false;
  state.error = action.payload;
};

const noticesInitialState = {
  items: [],
  item: {favorite: []},
  isLoadNotices: false,
  isLoadNotice: false,
  category: 'sell',
  filter: { query: '', gender: '', age: '' },
  pagination: {},
  error: '',
  isResponseSuccessful: false,
};

const noticesSlice = createSlice({
  name: 'notices',
  initialState: noticesInitialState,
  extraReducers: {
    // Notices
    [fetchNotices.pending]: handlePending,
    [fetchNotices.fulfilled](state, action) {
      state.isLoadNotices = false;
      state.error = null;
      state.items = action.payload.message ? [] : action.payload.data.notices;
      state.pagination = action.payload.message ? {} : action.payload.data.pagination;
      state.isResponseSuccessful = false; },
    [fetchNotices.rejected]: handleRejected,

    [getNoticeByCategory.pending]: handlePending,
    [getNoticeByCategory.fulfilled](state, action) {
      state.items = action.payload.message ? [] : action.payload.data.notices;
      state.isLoadNotices = false;
      state.error = null;
      state.pagination = action.payload.message ? {} : action.payload.data.pagination;
      state.isResponseSuccessful = false; },
    [getNoticeByCategory.rejected]: handleRejected,

    [getFavoriteNotices.pending]: handlePending,
    [getFavoriteNotices.fulfilled](state, action) {
      state.isLoadNotices = false;
      state.error = null;
      state.pagination = action.payload.message ? {} : action.payload.data.pagination;
      state.items = action.payload.message ? [] : action.payload.data.notices;},
    [getFavoriteNotices.rejected]: handleRejected,

    [getUserNotices.pending]: handlePending,
    [getUserNotices.fulfilled](state, action) {
      state.isLoadNotices = false;
      state.error = null;
      state.items = action.payload.message ? [] : action.payload.data.notices;
      state.pagination = action.payload.message ? {} : action.payload.data.pagination; },
    [getUserNotices.rejected]: handleRejected,

        // Notice

    [fetchNotice.pending](state) {
      state.isLoadNotice = true; },
    [fetchNotice.fulfilled](state, action) {
      state.isLoadNotice = false;
      state.error = null;
      state.item = action.payload.data.notice;
      state.favorites = action.payload.data.notice.favorite; },
    [fetchNotice.rejected]: handleRejected,

    [updateFavorite.pending](state){
      state.isLoadNotice = true; },
    [updateFavorite.fulfilled](state, action) {
      state.isLoadNotice = false;
      state.error = '';
      state.favorites = action.payload.data.notice.favorite;
      state.item.favorite = action.payload.data.notice.favorite;
      state.items = state.items.map(item => {
        if (item.id !== action.meta.arg.noticeId) {
          return item
        } else {
          return {...item, favorite: action.payload.data.notice.favorite}
        }
      }) },
    [updateFavorite.rejected](state, action) {
      state.error = action.payload; },

    [addNotice.pending]: handlePending,
    [addNotice.fulfilled](state, action) {
      state.isLoading = false;
      state.error = '';
      state.isResponseSuccessful = true; },
    [addNotice.rejected]: handleRejected,

    [deleteNotice.pending](state, action){
      state.isLoadNotice = true; 
      state.items = state.items.filter(
        item => item.id !== action.payload.data.notice.id) },
    [deleteNotice.fulfilled](state){
      state.isLoadNotice = false;
      state.error = ''; },
    [deleteNotice](state, action){
      state.error = action.payload; },
  },

});

export const noticesReducer = noticesSlice.reducer;
