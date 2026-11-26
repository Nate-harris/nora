import React from "react";

import BlockContent from "@/components/BlockContent";
import HeroCarousel from "@/components/Module/HeroCarousel";
import Photo from "@/components/Photo";
import { m } from "framer-motion";
import { useIsSmall } from "@/utils/useMediaQueries";

const fadeAnim = {
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.6,
      delay: 2,
      ease: [0.16, 1, 0.3, 1],
      when: "beforeChildren",
    },
  },
  hide: ({ isSmall }) => ({
    opacity: 0,
    y: isSmall ? 0 : "-5rem",
    transition: {
      duration: 0.2,
      ease: [0.16, 1, 0.3, 1],
      when: "beforeChildren",
    },
  }),
};

const Hero = ({ data = {} }) => {
  const { content, bgType, isFixed, photos } = data;
  const isSmall = useIsSmall();
  return (
    <section className="hero">
      {content && (
        <div className="hero--overlay">
          <m.div
            initial="hide"
            animate="show"
            exit="hide"
            variants={fadeAnim}
            custom={{ isSmall }}
            className="hero--content"
          >
            <BlockContent blocks={content} />
          </m.div>
        </div>
      )}

      {bgType === "video" && <HeroCarousel isFixed={isFixed} />}

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