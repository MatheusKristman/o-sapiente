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
    y: -100,
    x: 0,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    x: 0,
    opacity: 1,
    transition: { delay: 0.3, type: "spring", stiffness: 100 },
  },
  exit: {
    y: -100,
    x: 0,
    opacity: 0,
    transition: { duration: 0.4 },
  },
};

export const benefitsEvenCardMobileAnimation = {
  offscreen: {
    x: 100,
    y: 0,
    opacity: 0,
  },
  onscreen: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: { delay: 0.3, type: "spring", stiffness: 100 },
  },
  exit: {
    x: 100,
    y: 0,
    opacity: 0,
    transition: { duration: 0.4 },
  },
};

export const benefitsOddCardAnimation = {
  offscreen: {
    y: 100,
    x: 0,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    x: 0,
    opacity: 1,
    transition: { delay: 0.3, type: "spring", stiffness: 100 },
  },
  exit: {
    y: 100,
    x: 0,
    opacity: 0,
    transition: { duration: 0.4 },
  },
};

export const benefitsOddCardMobileAnimation = {
  offscreen: {
    x: -100,
    y: 0,
    opacity: 0,
  },
  onscreen: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: { delay: 0.3, type: "spring", stiffness: 100 },
  },
  exit: {
    x: -100,
    y: 0,
    opacity: 0,
    transition: { duration: 0.4 },
  },
};
