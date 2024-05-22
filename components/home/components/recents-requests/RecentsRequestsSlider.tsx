"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import RecentsRequestsCard from "./RecentsRequestsCard";
import useHomeStore from "@/stores/useHomeStore";

import "swiper/css";

const RecentsRequestsSlider = () => {
  const { recentsRequests } = useHomeStore();

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
      {recentsRequests.map((request, index) => (
        <SwiperSlide key={request.id + index}>
          <RecentsRequestsCard
            title={request.subject}
            desc={request.description}
            createdAt={request.createdAt}
            student={`${request.users[0].firstName} ${request.users[0].lastName}`}
          />
        </SwiperSlide>
      ))}

      {/* <SwiperSlide> */}
      {/*     <RecentsRequestsCard /> */}
      {/* </SwiperSlide> */}
      {/**/}
      {/* <SwiperSlide> */}
      {/*     <RecentsRequestsCard /> */}
      {/* </SwiperSlide> */}
      {/**/}
      {/* <SwiperSlide> */}
      {/*     <RecentsRequestsCard /> */}
      {/* </SwiperSlide> */}
      {/**/}
      {/* <SwiperSlide> */}
      {/*     <RecentsRequestsCard /> */}
      {/* </SwiperSlide> */}
      {/**/}
      {/* <SwiperSlide> */}
      {/*     <RecentsRequestsCard /> */}
      {/* </SwiperSlide> */}
      {/**/}
      {/* <SwiperSlide> */}
      {/*     <RecentsRequestsCard /> */}
      {/* </SwiperSlide> */}
      {/**/}
      {/* <SwiperSlide> */}
      {/*     <RecentsRequestsCard /> */}
      {/* </SwiperSlide> */}
      {/**/}
      {/* <SwiperSlide> */}
      {/*     <RecentsRequestsCard /> */}
      {/* </SwiperSlide> */}
      {/**/}
      {/* <SwiperSlide> */}
      {/*     <RecentsRequestsCard /> */}
      {/* </SwiperSlide> */}
    </Swiper>
  );
};

export default RecentsRequestsSlider;
