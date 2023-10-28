import { createSlice } from "@reduxjs/toolkit";

import {
  registerVideoThunk,
  listVideosThunk,
  getVideoStartLocationThunk,
} from "../services/video-thunk";

const initialState = {
  videoList: [],
  startLocation: 0,
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {},
  extraReducers: {
    [registerVideoThunk.fulfilled]: (state, action) => {
      alert(action.payload);
    },
    [listVideosThunk.pending]: (state, action) => {
      state.videoList = [];
    },
    [listVideosThunk.fulfilled]: (state, action) => {
      state.videoList = action.payload.data;
    },
    [listVideosThunk.rejected]: (state, action) => {
      state.videoList = [];
    },
    [getVideoStartLocationThunk.pending]: (state, action) => {
      state.startLocation = 0;
    },
    [getVideoStartLocationThunk.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.startLocation = action.payload.data.startLocation;
    },
    [getVideoStartLocationThunk.rejected]: (state, action) => {
      state.startLocation = 0;
    },
  },
});

export default videoSlice.reducer;
