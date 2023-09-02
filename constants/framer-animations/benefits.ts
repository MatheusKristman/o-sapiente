export const benefitsContainerAnimation = {
  offscreen: {
    opacity: 0,
  },
  onscreen: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      delay: 0.3,
      duration: 0.5,
    },
  },
};

export const benefitsEvenCardAnimation = {
  offscreen: {
    x: window.innerWidth < 1280 ? 100 : 0,
    y: window.innerWidth >= 1280 ? -100 : 0,
    opacity: 0,
  },
  onscreen: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: { delay: 0.3, type: "spring", stiffness: 100 },
  },
  exit: {
    x: window.innerWidth < 1280 ? 100 : 0,
    y: window.innerWidth >= 1280 ? -100 : 0,
    opacity: 0,
    transition: { duration: 0.4 },
  },
};

export const benefitsOddCardAnimation = {
  offscreen: {
    x: window.innerWidth < 1280 ? -100 : 0,
    y: window.innerWidth >= 1280 ? 100 : 0,
    opacity: 0,
  },
  onscreen: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: { delay: 0.3, type: "spring", stiffness: 100 },
  },
  exit: {
    x: window.innerWidth < 1280 ? -100 : 0,
    y: window.innerWidth >= 1280 ? 100 : 0,
    opacity: 0,
    transition: { duration: 0.4 },
  },
};
