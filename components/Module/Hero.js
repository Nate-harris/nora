import React from "react";

import BlockContent from "@/components/BlockContent";
import VideoLoop from "@/components/VimeoLoop";
import Photo from "@/components/Photo";
import cx from "classnames";
import { useInView } from "framer-motion";

const Hero = ({ data = {} }) => {
  const { content, bgType, isFixed, photos, video, videoPlaceholder } = data;
  return (
    <section className="hero">
      {content && (
        <div className="hero--overlay">
          <div className="hero--content">
            <BlockContent blocks={content} />
          </div>
        </div>
      )}

      {bgType === "video" && (
        <>
          <div className={cx("hero--bg is-desktop", isFixed && "is-fixed")}>
            <VideoLoop title={video.title} id={video.id} />
          </div>
          <div className="hero--bg is-mobile">
            <VideoLoop title={video.title} id={video.id} />
          </div>
          <div
            className={cx("hero--video-placeholder ", isFixed && "is-fixed")}
          >
            <Photo photo={videoPlaceholder} layout="fill" />
          </div>
        </>
      )}

      {bgType === "photo" && (
        <>
          {photos?.desktopPhoto && (
            <Photo
              photo={photos.desktopPhoto}
              width={1600}
              srcSizes={[800, 1000, 1200, 1600]}
              sizes="100vw"
              layout="fill"
              className="hero--bg is-desktop"
            />
          )}
          {photos?.mobilePhoto && (
            <Photo
              photo={photos.mobilePhoto}
              width={800}
              sizes="100vw"
              layout="fill"
              className="hero--bg is-mobile"
            />
          )}
        </>
      )}
    </section>
  );
};

export default Hero;
