import multer from "multer";
import { v4 as uuid4 } from "uuid";
import Path from "path";
import { unlinkSync } from "fs";

import * as videoDao from "./video-dao.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./videos/");
  },
  filename: (req, file, cb) => {
    const filePath = Path.parse(file.originalname);
    const fileName = filePath.name;
    const fileExt = filePath.ext;
    cb(null, `${fileName}-${uuid4()}${fileExt}`);
  },
});

const upload = multer({ storage: storage });

const registerVideoHandler = async (req, res) => {
  const filePath = Path.parse(req.file.path);
  const fileExt = filePath.ext;
  if (fileExt == ".mp4") {
    const videoName = req.body.name;
    const video = await videoDao.checkVideoExistanceByName(videoName);
    if (video == null) {
      videoDao.registerVideo(req.file.path, videoName);
      res.status(200).json({
        message: "Video registered successfully",
      });
    } else {
      unlinkSync(req.file.path);
      res.status(409).json({
        message: `Video with name '${videoName}' already registered`,
      });
    }
  } else {
    unlinkSync(req.file.path);
    res.status(422).json({
      message: `Invalid extension '${fileExt}'`,
    });
  }
};

const listVideos = async (req, res) => {
  return res.status(200).json(await videoDao.listVideos());
};

const VideoController = (app) => {
  app.post(
    "/register-video",
    upload.single("video-file"),
    registerVideoHandler
  );

  app.get("/list-videos", listVideos);
};

export default VideoController;
