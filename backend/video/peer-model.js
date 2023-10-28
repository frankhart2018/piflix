import mongoose, { mongo } from "mongoose";

import peerSchema from "./peer-schema.js";

const peerModel = mongoose.model("PeerModel", peerSchema);

export default peerModel;
