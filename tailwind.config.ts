import type { Config } from "tailwindcss";
import { withUt } from "uploadthing/tw";

export default withUt({
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx,mdx}",
  ],
  prefix: "",
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
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
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
        registerLeftShape:
          "url('/assets/images/register-left-shape.svg')",
        briefcase: "url('/assets/icons/briefcase.svg')",
        close: "url('/assets/icons/close.svg')",
        hat: "url('/assets/icons/hat.svg')",
        menu: "url('/assets/icons/menu.svg')",
        camera: "url('/assets/icons/camera.svg')",
        documentIcon: "url('/assets/icons/document.svg')",
        "camera-white": "url('/assets/icons/camera-white.svg')",
        uploadIcon: "url('/assets/icons/upload.svg')",
        highlight: "url('/assets/icons/highlight.svg')",
        registerStepShadow:
          "url('/assets/icons/register-about-shadow-step.svg')",
        lightGrayArrowDown:
          "url('/assets/icons/light-gray-arrow-down.svg')",
        sendIcon: "url('/assets/icons/send-icon.svg')",
        micOnIcon: "url('/assets/icons/mic-on.svg')",
        micOffIcon: "url('/assets/icons/mic-off.svg')",
        videoIcon: "url('/assets/icons/video.svg')",
        galleryIcon: "url('/assets/icons/gallery.svg')",
        videoFile: "url('/assets/icons/video-file.svg')",
        archiveIcon: "url('/assets/icons/archive.svg')",
        logoIcon: "url('/assets/icons/logo-icon.svg')",
        whatsappIcon: "url('/assets/icons/whatsapp.svg')",
      },
      transitionProperty: {
        "max-height": "max-height",
      },
      colors: {
        "blue-bg": "#F0F5F8",
        "green-primary": "#03C988",
        "gray-primary": "#393F42",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      borderWidth: {
        DEFAULT: "1px",
        "0": "0",
        "2": "2px",
        "3": "3px",
        "4": "4px",
        "6": "6px",
        "8": "8px",
        "20": "20px",
        "30": "30px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      screens: {
        sm: "640px",

        md: "768px",

        lg: "1024px",

        xl: "1280px",

        desktop: "1440px",

        "2xl": "1536px",
      },
    },
  },
  variants: {
    extend: {
      brightness: ["disabled"],
      cursor: ["disabled"],
      "max-height": ["responsive"],
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwind-scrollbar")({
      nocompatible: true,
      preferredStrategy: "pseudoelements",
    }),
  ],
}) satisfies Config;
