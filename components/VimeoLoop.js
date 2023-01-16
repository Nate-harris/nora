import React, { useRef, useState, useEffect } from "react";
import Player from "@vimeo/player";
import cx from "classnames";
import { useInView } from "framer-motion";

const VideoLoop = ({
  title,
  id,
  width = 16,
  height = 9,
  initialState = false,
  noDimensions = false,
  className,
  ...rest
}) => {
  const videoRef = useRef();
  const [iframePlayer, setIframePlayer] = useState(null);
  const inView = useInView(videoRef);

  useEffect(() => {
    if (videoRef.current && iframePlayer === null) {
      setIframePlayer(new Player(videoRef.current));
    }
  }, [videoRef.current]);

  useEffect(() => {
    if (iframePlayer) {
      if (inView) {
        iframePlayer.play().catch(() => {});
      } else {
        iframePlayer.pause();
      }
    }
  }, [iframePlayer, inView]);

  if (!id) return null;

  return (
    <div className={cx("video-loop", className)} {...rest}>
      <iframe
        ref={(node) => {
          videoRef.current = node;
        }}
        title={title}
        src={`https://player.vimeo.com/video/${id}?background=1&controls=0&autoplay=1&autopause=0&loop=1&muted=1`}
        frameBorder="0"
        allow="autoplay; fullscreen"
        aria-hidden="true"
        tabIndex="-1"
        style={
          noDimensions
            ? {}
            : {
                height: `${(height / width) * 100}vw`,
                minWidth: `${(width / height) * 100}vh`,
              }
        }
      ></iframe>
    </div>
  );
};

export default VideoLoop;
