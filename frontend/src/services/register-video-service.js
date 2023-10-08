import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000";

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
