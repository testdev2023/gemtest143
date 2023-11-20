/* eslint-disable jsx-a11y/alt-text */
import styles from "../../../styles/FindWorkBaner.module.css";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import moment from "moment";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function FindWorkBaner() {
  const [findWork, setFindWork] = useState([]);
  const [findLoder, setFindLoder] = useState(false);
  const swiperRef = useRef(null);

  const getFindWork = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/find-work"
      );
      setFindWork(response?.data?.response?.data || []);
      setFindLoder(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFindWork();
  }, []);

  useEffect(() => {
    // Update the swiperRef whenever the Swiper component updates
    if (swiperRef.current && findLoder) {
      swiperRef.current.swiper.update();
    }
  }, [findLoder]);

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
      {findLoder ? (
        <>
          {findWork?.length > 0 && (
            <div className={styles.find_work_container}>
              <div className={styles.section1}>
                <h1 className="yellow">Find Work</h1>

                <div className={styles.btn_parent}>
                  <div className="swiper-button-prev" onClick={slidePrev}></div>
                  {/* Custom next button */}
                  <div className="swiper-button-next" onClick={slideNext}></div>
                </div>
              </div>
              <div className={styles.section2}>
                <Swiper
                  className={styles.carousel}
                  ref={swiperRef} // Assign the swiperRef to the Swiper component
                  modules={[Navigation, Pagination, Scrollbar, A11y]}
                  slidesPerView={3}
                  spaceBetween={24}
                  breakpoints={{
                    // 1920: {
                    //   slidesPerView: 5,
                    // },
                    1440: {
                      slidesPerView: 3,
                    },
                    1024: {
                      slidesPerView: 3,
                    },
                    768: {
                      slidesPerView: 2,
                    },
                    0: {
                      slidesPerView: 1,
                    },
                  }}
                >
                  {findWork.slice(0, 15).map((item, i) => (
                    <SwiperSlide key={i}>
                      <Link key={i} href="#" className={styles.card} passHref>
                        <Image
                          width={10000}
                          height={10000}
                          src={item?.thumbURL}
                          alt="FindWorkBanner"
                          priority={true}
                        />
                        <div className={styles.card_child}>
                          <div className={styles.heading}>
                            <h4>{item?.title}</h4>
                          </div>
                          <div className={styles.discription}>
                            <span
                              dangerouslySetInnerHTML={{
                                __html: item?.short_description,
                              }}
                            />
                          </div>
                          {/* <div className={styles.date}>
                            <span className="yellow">
                              {moment(item.created_at).format("MMMM DD, YYYY")}
                            </span>
                          </div> */}
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          )}
        </>
      ) : (
        ""
      )}
    </>
  );
}
