import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      xs: ["10px", "17px"],
      sm: ["13px", "20px"],
      base: ["16px", "30px"],
      lg: ["20px", "35px"],
      xl: "25px",
      "2xl": "31px",
      "3xl": "39px",
      "4xl": "49px",
      "8xl": "61px",
    },
    extend: {
      colors: {
        "blue-bg": "#F0F5F8",
        "green-primary": "#03C988",
        "gray-primary": "#393F42",
      },
      backgroundImage: {
        heroDesktop: "url('assets/images/hero-desktop.png')",
        heroTablet: "url('assets/images/hero-tablet.png')",
        heroMobile: "url('assets/images/hero-mobile.png')",
        bannerDesktop: "url('assets/images/banner-desktop.png')",
        bannerTablet: "url('assets/images/banner-tablet.png')",
        bannerMobile: "url('assets/images/banner-mobile.png')",
        homeLeftShape: "url('assets/images/home-left-shape.svg')",
        homeRightShape: "url('assets/images/home-right-shape.svg')",
        arrow: "url('assets/images/arrow.svg')",
        paperAirplane: "url('assets/images/paper-airplane.svg')",
        briefcase: "url('assets/icons/briefcase.svg')",
        close: "url('assets/icons/close.svg')",
        hat: "url('assets/icons/hat.svg')",
        menu: "url('assets/icons/menu.svg')",
      },
    },
  },
  plugins: [],
};
export default config;
