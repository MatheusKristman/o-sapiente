"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import RecentsRequestsCard from "./RecentsRequestsCard";

import "swiper/css";

const RecentsRequestsSlider = () => {
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
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}>
      <SwiperSlide>
        <RecentsRequestsCard />
      </SwiperSlide>

      <SwiperSlide>
        <RecentsRequestsCard />
      </SwiperSlide>

      <SwiperSlide>
        <RecentsRequestsCard />
      </SwiperSlide>

      <SwiperSlide>
        <RecentsRequestsCard />
      </SwiperSlide>

      <SwiperSlide>
        <RecentsRequestsCard />
      </SwiperSlide>

      <SwiperSlide>
        <RecentsRequestsCard />
      </SwiperSlide>

      <SwiperSlide>
        <RecentsRequestsCard />
      </SwiperSlide>

      <SwiperSlide>
        <RecentsRequestsCard />
      </SwiperSlide>

      <SwiperSlide>
        <RecentsRequestsCard />
      </SwiperSlide>

      <SwiperSlide>
        <RecentsRequestsCard />
      </SwiperSlide>
    </Swiper>
  );
};

export default RecentsRequestsSlider;
