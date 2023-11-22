import React, { useEffect, useState, useRef } from "react";
import styles from "../../../styles/TalentsBaner.module.css";
import Link from "next/link";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Flags from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';

export default function TalentsBnaer() {
  const [talents, setTalents] = useState([]);
  const [talentsLoader, setTalentsLoader] = useState(false);

  // Create a ref to hold the Swiper instance
  const swiperRef = useRef(null);

  const GetTalent = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/talents"
      );
      setTalents(response?.data?.response?.data);
      setTalentsLoader(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetTalent();
  }, []);

  useEffect(() => {
    // Update the swiperRef whenever the Swiper component updates
    if (swiperRef.current && talentsLoader) {
      swiperRef.current.swiper.update();
    }
  }, [talentsLoader]);

  const slideNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const slidePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  return (
    <>
      <div className={styles.talents_baner_main}>
        <div className={styles.talents_baner_sec1}>
          <h2 className="color_yellow">
            <Link href="/talent">Talent</Link>
          </h2>
        </div>
        {talentsLoader && (
          <div className={styles.carousel}>
            <Swiper
              ref={swiperRef} // Assign the swiperRef to the Swiper component
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              slidesPerView={5}
              spaceBetween={24}
              breakpoints={{
                1440: {
                  slidesPerView: 5,
                },
                1024: {
                  slidesPerView: 4,
                },
                464: {
                  slidesPerView: 3,
                },
                0: {
                  slidesPerView: 2,
                },
              }}
              pagination={{ clickable: true }}
              // loop={true}
            >
              {talents?.slice(0, 15).map((item, index) => (
                <SwiperSlide key={index}>
                  <Link className={styles.carousel_card} href="/talent">
                    <img
                      className={styles.card_image}
                      src={item?.photoURL}
                      alt="talents slide_image"
                    />
                    <Flags
                      country={item?.countryCode}  // Assuming your talent object has a countryCode property
                      className={styles.flag_icon}
                    />
                    <h3 className="name_heading">{item?.name}</h3>
                    {item?.gender === 'Male' && (
                      <h3 className="name_heading">Actors</h3>
                    )}
                    {item?.gender === 'Female' && (
                      <h3 className="name_heading">Actress</h3>
                    )}
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </>
  );
}
