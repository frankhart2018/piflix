import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideoStartLocationThunk,
  setCurrentVideoLocationThunk,
} from "../../services/video-thunk";

const ShowVideo = () => {
  const pathName = window.location.pathname;
  const videoId = pathName.split("/")[2];

  const { startLocation } = useSelector((state) => state.video);

  const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000";

  const videoRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getVideoStartLocationThunk({
        videoId,
      })
    );

    const interval = setInterval(() => {
      updateLocation();
    }, 3000);

    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    videoRef.current.currentTime = startLocation;
  }, [startLocation]);

  const updateLocation = () => {
    const location = Math.floor(videoRef.current.currentTime);
    dispatch(
      setCurrentVideoLocationThunk({
        videoId,
        location,
      })
    );
  };

  return (
    <div style={{ textAlign: "center" }}>
      <video
        id="videoPlayer"
        width="90%"
        controls
        autoPlay
        muted={false}
        ref={videoRef}
        onPlay={updateLocation}
      >
        <source src={`${API_BASE}/video/${videoId}`} type="video/mp4" />
      </video>
    </div>
  );
};

export default ShowVideo;
