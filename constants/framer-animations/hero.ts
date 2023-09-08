export const heroInfoAnimation = {
  offscreen: { y: 100, opacity: 0 },
  onscreen: { y: 0, opacity: 1, transition: { duration: 1 } },
  exit: { y: 100, opacity: 0, transition: { duration: 1 } },
};

export const heroImageAnimation = {
  offscreen: {
    x: 100,
    opacity: 0,
  },
  onscreen: { x: 0, opacity: 1, transition: { duration: 1 } },
  exit: {
    x: 100,
    opacity: 0,
    transition: { duration: 1 },
  },
};

export const heroImageMobileAnimation = {
  offscreen: {
    y: 100,
    opacity: 0,
  },
  onscreen: { y: 0, opacity: 1, transition: { duration: 1 } },
  exit: {
    y: 100,
    opacity: 0,
    transition: { duration: 1 },
  },
};
