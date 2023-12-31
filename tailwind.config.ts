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
      "5xl": "61px",
    },
    extend: {
      colors: {
        "blue-bg": "#F0F5F8",
        "green-primary": "#03C988",
        "gray-primary": "#393F42",
      },
      backgroundImage: {
        bannerDesktop: "url('/assets/images/banner-desktop.png')",
        bannerTablet: "url('/assets/images/banner-tablet.png')",
        bannerMobile: "url('/assets/images/banner-mobile.png')",
        homeLeftShape: "url('/assets/images/home-left-shape.svg')",
        homeRightShape: "url('/assets/images/home-right-shape.svg')",
        benefitsStudentsDesktop:
          "url('/assets/images/benefits-line-students-desktop.svg')",
        benefitsStudentsTablet:
          "url('/assets/images/benefits-line-students-tablet.svg')",
        benefitsStudentsMobile:
          "url('/assets/images/benefits-line-students-mobile.svg')",
        benefitsProfessorDesktop:
          "url('/assets/images/benefits-line-professor-desktop.svg')",
        benefitsProfessorTablet:
          "url('/assets/images/benefits-line-professor-tablet.svg')",
        benefitsProfessorMobile:
          "url('/assets/images/benefits-line-professor-mobile.svg')",
        paperAirplane: "url('/assets/images/paper-airplane.svg')",
        contactDesktop: "url('/assets/images/contact-bg-desktop.png')",
        contactTablet: "url('/assets/images/contact-bg-tablet.png')",
        contactMobile: "url('/assets/images/contact-bg-mobile.png')",
        briefcase: "url('/assets/icons/briefcase.svg')",
        close: "url('/assets/icons/close.svg')",
        hat: "url('/assets/icons/hat.svg')",
        menu: "url('/assets/icons/menu.svg')",
        camera: "url('/assets/icons/camera.svg')",
        uploadIcon: "url('/assets/icons/upload.svg')",
        highlight: "url('/assets/icons/highlight.svg')",
      },
    },
  },
  variants: {
    extend: {
      brightness: ["disabled"],
      cursor: ["disabled"],
    },
  },
  plugins: [
    require("tailwind-scrollbar")
  ],
};
export default config;
