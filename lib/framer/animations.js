export const pageTransitionSpeed = 300;

export const FRAMER_TRANSITION_EASEOUT = {
  delay: 0.2,
  duration: 0.9,
  type: "tween",
  ease: "easeOut",
};

export const FRAMER_TRANSITION_FASTEASE = {
  delay: 0,
  duration: 0.5,
  type: "tween",
  ease: "easeInOut",
};

export const FRAMER_TRANSITION_FASTEREASE = {
  delay: 0,
  duration: 0.2,
  type: "tween",
  ease: "easeInOut",
};
export const swipeAnim = {
  show: {
    opacity: 1,
    x: ["-2rem", "0rem"],
    transition: {
      x: {
        duration: 0.6,
        delay: 0.1,
        ease: [0.16, 1, 0.3, 1],
      },
      opacity: {
        duration: 0.4,
        delay: 0.1,
      },
    },
  },
  hide: {
    x: ["0rem", "2rem"],
    opacity: 0,
    transition: {
      x: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
      opacity: {
        duration: 0.1,
      },
    },
  },
};

export const swipeDownAnim = {
  show: {
    opacity: 1,
    y: ["1rem", "0rem"],
    transition: {
      y: {
        duration: 0.8,
        delay: 0.1,
        ease: [0.16, 1, 0.3, 1],
      },
      opacity: {
        duration: 0.4,
        delay: 0.1,
      },
    },
  },
  hide: {
    y: ["0rem", "-1rem"],
    opacity: 0,
    transition: {
      y: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
      opacity: {
        duration: 0.1,
      },
    },
  },
};
