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
