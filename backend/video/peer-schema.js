import mongoose from "mongoose";

const VideoDetails = new mongoose.Schema({
  name: String,
  location: Number,
});

const schema = new mongoose.Schema(
  {
    ip: String,
    videos: [VideoDetails],
  },
  {
    collection: "peers",
  }
);

export default schema;
