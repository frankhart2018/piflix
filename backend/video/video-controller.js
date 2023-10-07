import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./videos/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const registerVideo = (req, res) => {
  res.status(200).send({
    status: "Success",
  });
};

const VideoController = (app) => {
  app.post("/register-video", upload.single("video-file"), registerVideo);
};

export default VideoController;
