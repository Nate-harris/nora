import React, { useEffect, useState } from "react";

import cx from "classnames";

const slides = Array.from({ length: 7 }, (_, index) => {
  const imageNumber = index + 1;

  return {
    desktop: `/images/home-carousel/nora-horizontal-${imageNumber}.webp`,
    mobile: `/images/home-carousel/nora-vertical-${imageNumber}.webp`,
  };
});

const HeroCarousel = ({ isFixed }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (reducedMotion.matches) return undefined;

    const interval = window.setInterval(() => {
      setActiveSlide((currentSlide) => (currentSlide + 1) % slides.length);
    }, 5500);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div
      className={cx("hero--carousel", isFixed && "is-fixed")}
      aria-hidden="true"
    >
      {slides.map((slide, index) => (
        <picture
          className={cx(
            "hero--carousel-slide",
            index === activeSlide && "is-active"
          )}
          key={slide.desktop}
        >
          <source media="(max-width: 639px)" srcSet={slide.mobile} />
          <img
            src={slide.desktop}
            alt=""
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : "auto"}
            decoding="async"
          />
        </picture>
      ))}
    </div>
  );
};

export default HeroCarousel;
