import { createSlice } from "@reduxjs/toolkit";

import { registerVideoThunk } from "../services/register-video-thunk";

const registerVideoSlice = createSlice({
  name: "register-video",
  initialState: {},
  reducers: {},
  extraReducers: {
    [registerVideoThunk.fulfilled]: (state, action) => {
      alert(action.payload);
    },
  },
});

export default registerVideoSlice.reducer;
