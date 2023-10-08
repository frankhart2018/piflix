import React from "react";

const ShowVideo = () => {
  const pathName = window.location.pathname;
  const videoId = pathName.split("/")[2];

  return <div>ShowVideo({videoId})</div>;
};

export default ShowVideo;
