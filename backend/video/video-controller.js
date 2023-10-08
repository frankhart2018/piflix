import multer from "multer";
import { v4 as uuid4 } from "uuid";
import Path from "path";
import fs, { unlinkSync } from "fs";

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

const sendVideo = (res, range, videoPath) => {
  const videoSize = fs.statSync(videoPath).size;

  const CHUNK_SIZE = 10 ** 6; // 1MB
  const range_split = range.split("-");
  const start = Number(range_split[0]);
  const end = Math.min(
    range_split[1] == "" ? start + CHUNK_SIZE : range_split[1],
    videoSize - 1
  );

  // Create headers
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  // HTTP Status 206 for Partial Content
  res.writeHead(206, headers);

  // create video read stream for this particular chunk
  const videoStream = fs.createReadStream(videoPath, { start, end });

  // Stream the video chunk to the client
  videoStream.pipe(res);
};

const getVideo = async (req, res) => {
  const { video_id } = req.params;
  const range = req.headers.range.replace(/[^\d-]/g, "");

  try {
    const video = await videoDao.findVideoById(video_id);
    const videoPath = video.path;
    sendVideo(res, range, videoPath);
  } catch (_error) {
    console.log(_error);
    res.status(404).json({
      status: `Video with id '${video_id}' not found`,
    });
  }
};

const VideoController = (app) => {
  app.post(
    "/register-video",
    upload.single("video-file"),
    registerVideoHandler
  );

  app.get("/list-videos", listVideos);

  app.get("/video/:video_id", getVideo);
};

export default VideoController;
