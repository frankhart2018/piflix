import { createAsyncThunk } from "@reduxjs/toolkit";

import * as videoService from "./video-service";

export const registerVideoThunk = createAsyncThunk(
  "video/registerVideo",
  async (payload) => {
    const response = await videoService.registerVideo(
      payload.videoName,
      payload.videoFile
    );
    return response;
  }
);

export const listVideosThunk = createAsyncThunk(
  "video/listVideos",
  async () => {
    const response = await videoService.listVideos();
    return response;
  }
);

export const getVideoStartLocationThunk = createAsyncThunk(
  "video/getVideoStartLocation",
  async (payload) => {
    const response = await videoService.getVideoStartLocation(payload.videoId);
    return response;
  }
);

export const setCurrentVideoLocationThunk = createAsyncThunk(
  "video/setCurrentVideoLocation",
  async (payload) => {
    const response = await videoService.setCurrentVideoLocation(
      payload.videoId,
      payload.location
    );
    return response;
  }
);
