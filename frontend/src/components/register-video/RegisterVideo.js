import React from "react";

const RegisterVideo = () => {
  return (
    <div className="container">
      <p>
        <input type="text" placeholder="Video name" />
      </p>

      <p>
        <label for="video-file">Video file: </label>
        <input type="file" id="video-file" />
      </p>

      <p>
        <input type="button" value="Register video" />
      </p>
    </div>
  );
};

export default RegisterVideo;
