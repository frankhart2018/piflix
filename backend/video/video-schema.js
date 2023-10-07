import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    path: String,
    name: String,
  },
  {
    collection: "videos",
  }
);

export default schema;
