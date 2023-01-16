import React from "react";
import { Marqy } from "marqy";

import { useInView } from "framer-motion";
import { useRef } from "react";
import Photo from "../Photo";
import cx from "classnames";

const Marquee = ({ data = {} }) => {
  const { items, isClipped, speed, reverse, pausable } = data;

  const ref = useRef();
  const inView = useInView(ref);
  if (!items?.length) return null;
  return (
    <div
      ref={ref}
      style={{ background: data?.backgroundColor?.hex ?? "auto" }}
      className={cx("marquee-section")}
    >
      <Marqy
        speed={speed}
        direction={reverse ? "right" : "left"}
        pauseOnHover={pausable}
        className="marquee"
      >
        <div className="marquee--item">
          {items.map((item, key) => {
            switch (item._type) {
              case "simple":
                return (
                  <span key={key} className="marquee--text">
                    {item.text}
                  </span>
                );
              case "photo":
                return (
                  <div
                    key={key}
                    className="marquee--photo"
                    style={{ flex: item.photo.aspectRatio }}
                  >
                    <Photo
                      photo={item.photo}
                      hasPlaceholder={false}
                      forceLoad={inView}
                    />
                  </div>
                );
            }
          })}
        </div>
      </Marqy>
    </div>
  );
};

export default Marquee;
