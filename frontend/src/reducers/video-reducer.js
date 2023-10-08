import { createSlice } from "@reduxjs/toolkit";

import { registerVideoThunk, listVideosThunk } from "../services/video-thunk";

const initialState = {
  videoList: [],
};

const videoSlice = createSlice({
  name: "register-video",
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
  },
});

export default videoSlice.reducer;
