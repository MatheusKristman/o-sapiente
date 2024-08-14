export const titleAnimation = {
  offscreen: {
    y: -50,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

export const leftCardAnimation = {
  offscreen: {
    x: "var(--x-initial)",
    y: "var(--y-initial)",
    opacity: "var(--opacity-initial)",
  },
  onscreen: {
    x: "var(--x-animate)",
    y: "var(--y-animate)",
    opacity: "var(--opacity-animate)",
    transition: {
      stiffness: 100,
      type: "spring",
    },
  },
};

export const rightCardAnimation = {
  offscreen: {
    x: "var(--x-initial)",
    y: "var(--y-initial)",
    opacity: "var(--opacity-initial)",
  },
  onscreen: {
    x: "var(--x-animate)",
    y: "var(--y-animate)",
    opacity: "var(--opacity-animate)",
    transition: {
      stiffness: 100,
      type: "spring",
    },
  },
};
