import multer from "multer";
import { v4 as uuid4 } from "uuid";
import Path from "path";
import fs, { unlinkSync } from "fs";
import { getVideoDurationInSeconds } from "get-video-duration";

import * as videoDao from "./video-dao.js";
import * as peerDao from "./peer-dao.js";

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

const listVideosHandler = async (req, res) => {
  return res.status(200).json(await videoDao.listVideos());
};

const sendVideo = async (video, res, range) => {
  const videoPath = video.path;
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

const getVideoHandler = async (req, res) => {
  const { video_id } = req.params;
  const ip = req.ip;
  const range = req.headers.range.replace(/[^\d-]/g, "");

  const video = await videoDao.findVideoById(video_id);
  if (video === null) {
    return res.status(404).json({
      status: `Video with id '${video_id}' not found`,
    });
  }

  await sendVideo(video, res, range);
};

const getStartLocationHandler = async (req, res) => {
  const { video_id } = req.params;
  const ip = req.ip;

  res.status(200).send({
    startLocation: 15,
  });
};

const setCurrentLocationHandler = async (req, res) => {
  const { video_id } = req.params;
  const location = req.body.location;
  const ip = req.ip;

  const video = await videoDao.findVideoById(video_id);
  const peer = await peerDao.findPeerByIp(ip);
  await peerDao.updatePeerVideoStats(peer, ip, video.name, location);

  res.status(200).send({
    status: "ok",
  });
};

const VideoController = (app) => {
  app.post(
    "/register-video",
    upload.single("video-file"),
    registerVideoHandler
  );
  app.get("/list-videos", listVideosHandler);
  app.get("/video/:video_id", getVideoHandler);
  app.get("/video/:video_id/location", getStartLocationHandler);
  app.post("/video/:video_id/location", setCurrentLocationHandler);
};

export default VideoController;
