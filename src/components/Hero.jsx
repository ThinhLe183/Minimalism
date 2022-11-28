// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper";
export default function Hero() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        style={{
          "--swiper-pagination-color": "#fff",
          "--swiper-pagination-bullet-size": " 12px",
        }}
      >
        <SwiperSlide>
          <img
            src="https://res.cloudinary.com/dem7o0ijj/image/upload/v1669641043/Minimalism/z3917990141142_45a5e388610105e7898d92fd80a5985d_nx0vzt.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://res.cloudinary.com/dem7o0ijj/image/upload/v1667739754/Minimalism/Hero-BST-Dong-ppp_21_gajfyz.png"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://res.cloudinary.com/dem7o0ijj/image/upload/v1667739821/Minimalism/Banner-Coolmate-Active-opt-1_kzsemb.png"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
