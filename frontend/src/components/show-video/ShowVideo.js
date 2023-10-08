import React from "react";

const ShowVideo = () => {
  const pathName = window.location.pathname;
  const videoId = pathName.split("/")[2];

  const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000";

  return (
    <div style={{ textAlign: "center" }}>
      <video id="videoPlayer" width="90%" controls autoplay muted="false">
        <source src={`${API_BASE}/video/${videoId}`} type="video/mp4" />
      </video>
    </div>
  );
};

export default ShowVideo;
