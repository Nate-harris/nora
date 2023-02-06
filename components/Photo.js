import React, { useState, useEffect } from "react";
import cx from "classnames";

import { buildSrcSet, buildSrc } from "../utils/helpers";
import { useInView } from "framer-motion";
import { useRef } from "react";

const Photo = ({
  photo,
  width,
  height,
  srcSizes = [400, 600, 800, 1000, 1200],
  sizes = "(min-width: 940px) 50vw, 100vw",
  layout = "intrinsic",
  quality = 80,
  hasPlaceholder = true,
  forceLoad,
  onLoad,
  className,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef();
  const inView = useInView(ref, {
    once: true,
  });

  // define our aspect ratio if not a background fill
  const aspect =
    typeof width === "number" && typeof height === "number"
      ? (height / width) * 100
      : 100 / (photo?.customRatio || photo?.aspectRatio);

  const aspectCustom =
    layout === "intrinsic" ? { paddingTop: `${aspect}%` } : null;

  // define our src and srcset
  const src = buildSrc(photo, {
    ...{ width },
    ...{ height },
    ...{ quality },
  });

  const srcset = buildSrcSet(photo, {
    ...{ srcSizes },
    ...{ aspect },
    ...{ quality },
  });

  // handle our image onLoad
  function handleLoad() {
    requestAnimationFrame(() => {
      setIsLoaded(true);
    });
  }

  // trigger any onLoad callbacks
  useEffect(() => {
    if (isLoaded) onLoad?.();
  }, [isLoaded, onLoad]);

  if (!photo?.asset) return null;
  return (
    <figure ref={ref} className={className ? className : null}>
      <div
        className={cx("ar", {
          "has-fill": layout === "fill" || layout === "contain",
        })}
        style={aspectCustom}
      >
        <picture>
          <img
            width={width}
            height={height}
            src={forceLoad || inView ? src : null}
            srcSet={forceLoad || inView ? srcset : null}
            sizes={sizes}
            decoding="async"
            onLoad={handleLoad}
            alt={photo.alt || photo.asset?.altText}
            className={cx(getSize(layout), { "is-loaded": isLoaded })}
          />
        </picture>

        {hasPlaceholder && (
          <div className={cx("ar--placeholder", { "is-loaded": isLoaded })}>
            <img src={photo.lqip} alt="" role="presentation" />
          </div>
        )}
      </div>
    </figure>
  );
};

const getSize = (layout) => {
  switch (layout) {
    case "intrinsic":
      return "object-cover";
    case "fill":
      return "object-cover";
    case "contain":
      return "object-contain";
  }
};

export default Photo;
