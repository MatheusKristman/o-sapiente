export const contactRightSideAnimation = {
  offscreen: {
    x: window.innerWidth >= 1024 ? -100 : 0,
    y: window.innerWidth < 1024 ? -50 : 0,
    opacity: 0,
  },
  onscreen: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

export const contactLeftSideAnimation = {
  offscreen: {
    x: window.innerWidth >= 1024 ? 100 : 0,
    y: window.innerWidth < 1024 ? -50 : 0,
    opacity: 0,
  },
  onscreen: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};
