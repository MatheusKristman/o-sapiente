"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import RecentsRequestsCard from "./RecentsRequestsCard";
import useHomeStore from "@/stores/useHomeStore";

import "swiper/css";
import { AccountRole } from "@prisma/client";

const RecentsRequestsSlider = () => {
  const { recentsRequests } = useHomeStore();

  console.log(recentsRequests);

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
      {recentsRequests.map((request, index) => {
        const student = request.users.filter((user) => user.accountType === AccountRole.STUDENT)[0];

        return (
          <SwiperSlide key={request.id + index}>
            <RecentsRequestsCard
              title={request.subject}
              desc={request.description}
              createdAt={request.createdAt}
              student={`${student.firstName} ${student.lastName}`}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default RecentsRequestsSlider;
