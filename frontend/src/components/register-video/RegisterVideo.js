import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { registerVideoThunk } from "../../services/video-thunk";

const RegisterVideo = () => {
  const [videoName, setVideoName] = useState("");
  const [videoFile, setVideoFile] = useState(null);

  const dispatch = useDispatch();

  const registerVideo = async () => {
    if (videoName === "" || videoFile === null) {
      alert("Video name and video file are required fields!");
    }

    await dispatch(
      registerVideoThunk({
        videoName,
        videoFile,
      })
    );
  };

  return (
    <div className="container">
      <p>
        <label for="video-name">Video name: </label>
        <input
          type="text"
          id="video-name"
          value={videoName}
          onChange={(e) => {
            setVideoName(e.target.value);
          }}
        />
      </p>

      <p>
        <label for="video-file">Video file: </label>
        <input
          type="file"
          id="video-file"
          accept="video/*"
          onChange={(e) => {
            setVideoFile(e.target.files[0]);
          }}
        />
      </p>

      <p>
        <input type="button" value="Register video" onClick={registerVideo} />
      </p>
    </div>
  );
};

export default RegisterVideo;
