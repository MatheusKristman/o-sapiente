export const stepsTitleAnimation = {
  offscreen: { y: -100, opacity: 0 },
  onscreen: { y: 0, opacity: 1, transition: { duration: 1 } },
};

export const stepsCardAnimation = {
  offscreen: { y: 100, opacity: 0 },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};
