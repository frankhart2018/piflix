import peerModel from "./peer-model.js";

export const updatePeerVideoStats = (peer, peerIp, videoName, location) => {
  if (peer === null) {
    return peerModel.create({
      ip: peerIp,
      videos: [
        {
          name: videoName,
          location,
        },
      ],
    });
  } else {
    let peerFound = false;
    let videoIdx = -1;
    peer.videos.forEach((video, idx) => {
      if (video.name == videoName) {
        peerFound = true;
        videoIdx = idx;
      }
    });

    if (peerFound) {
      peer.videos[videoIdx].location = location;
    } else {
      peer.videos.push({
        name: videoName,
        location,
      });
    }

    return peerModel.findOneAndUpdate(
      {
        ip: peerIp,
      },
      {
        $set: {
          videos: peer.videos,
        },
      }
    );
  }
};

export const findPeerByIp = (peerIp) => {
  return peerModel.findOne({
    ip: peerIp,
  });
};

export const findVideoIdxInPeer = (peer, videoName) => {
  if (peer === null) {
    return 0;
  } else {
    return peer.videos.find((it) => it.name == videoName).location;
  }
};
