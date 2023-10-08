import videoModel from "./video-model.js";

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
  return videoModel.findOne({
    _id: video_id,
  });
};
