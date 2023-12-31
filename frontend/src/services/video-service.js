import axios from "axios";

import { API_BASE } from "../utils/constants";

export const registerVideo = async (videoName, videoFile) => {
  const formData = new FormData();
  formData.append("name", videoName);
  formData.append("video-file", videoFile);
  try {
    const response = await axios.post(`${API_BASE}/register-video`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      responseType: "json",
    });
    return response.data.message;
  } catch (error) {
    return error.response.data.message;
  }
};

export const listVideos = async () => {
  const response = await axios.get(`${API_BASE}/list-videos`);
  return response;
};

export const getVideoStartLocation = async (videoId) => {
  const response = await axios.get(`${API_BASE}/video/${videoId}/location`);
  return response;
};

export const setCurrentVideoLocation = async (videoId, location) => {
  const response = await axios.post(`${API_BASE}/video/${videoId}/location`, {
    location,
  });
  return response;
};
