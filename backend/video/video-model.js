import mongoose, { mongo } from "mongoose";

import videoSchema from "./video-schema.js";

const videoModel = mongoose.model("VideoModel", videoSchema);

export default videoModel;
