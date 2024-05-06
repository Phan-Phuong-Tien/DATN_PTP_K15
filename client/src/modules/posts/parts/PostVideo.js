import React from "react";
import { DefaultPlayer as Video } from "react-html5video";
import "react-html5video/dist/styles.css";

const PostVideo = ({ src = "" }) => {
  return (
    <div className="w-full">
      <Video controls={["PlayPause", "Seek", "Time", "Volume", "Fullscreen"]}>
        <source src={src} />
      </Video>
    </div>
  );
};

export default PostVideo;
