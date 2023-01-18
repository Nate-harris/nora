import React from "react";

import BlockContent from "@/components/BlockContent";
import VideoLoop from "@/components/VimeoLoop";
import Photo from "@/components/Photo";
import cx from "classnames";
import { m, useInView } from "framer-motion";

const fadeAnim = {
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 4,
      ease: [0.16, 1, 0.3, 1],
      when: "beforeChildren",
    },
  },
  hide: {
    opacity: 0,
    y: "-100%",
    transition: {
      duration: 0.2,
      ease: [0.16, 1, 0.3, 1],
      when: "beforeChildren",
    },
  },
};

const Hero = ({ data = {} }) => {
  const { content, bgType, isFixed, photos, video, videoPlaceholder } = data;
  return (
    <section className="hero">
      {content && (
        <div className="hero--overlay">
          <m.div
            initial="hide"
            animate="show"
            exit="hide"
            variants={fadeAnim}
            className="hero--content"
          >
            <BlockContent blocks={content} />
          </m.div>
        </div>
      )}

      {bgType === "video" && (
        <>
          <div className={cx("hero--bg is-desktop", isFixed && "is-fixed")}>
            <VideoLoop title={video.title} id={video.id} />
          </div>
          <div className={cx("hero--bg is-mobile", isFixed && "is-fixed")}>
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
