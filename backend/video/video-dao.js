import videoModel from "./video-model.js";
import mongoose from "mongoose";

export const registerVideo = (path, name) => {
  return videoModel.create({
    path,
    name,
  });
};

export const checkVideoExistanceByName = (name) => {
  return videoModel.exists({
    name,
  });
};

export const listVideos = () => {
  return videoModel.find();
};

export const findVideoById = (video_id) => {
  try {
    new mongoose.Types.ObjectId(video_id);
    return videoModel.findOne({
      _id: video_id,
    });
  } catch (_) {
    return null;
  }
};
