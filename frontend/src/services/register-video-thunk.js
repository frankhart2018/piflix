import { createAsyncThunk } from "@reduxjs/toolkit";

import * as uploadService from "./register-video-service";

export const registerVideoThunk = createAsyncThunk(
  "register/registerVideo",
  async (payload) => {
    const response = await uploadService.registerVideo(
      payload.videoName,
      payload.videoFile
    );
    return response;
  }
);
