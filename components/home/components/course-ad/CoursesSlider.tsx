"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import useHomeStore from "@/stores/useHomeStore";
import { RecentsCourseCard } from "./RecentsCourseCard";

import "swiper/css";

export function CoursesSlider() {
  const { recentsCourses } = useHomeStore();

  return (
    <Swiper
      centeredSlides={true}
      spaceBetween={30}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        0: {
          slidesPerView: 1,
        },
        640: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
        1280: {
          slidesPerView: 4,
        },
      }}
      modules={[Autoplay]}
    >
      {recentsCourses.map((course, index) => {
        return (
          <SwiperSlide key={course.id + index}>
            <RecentsCourseCard
              title={course.courseName}
              price={course.price / 100}
              lessonsCount={course.lessonsCount}
              hoursCount={course.hoursCount}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
