/* eslint-disable @next/next/no-img-element */
import styles from "../../../styles/NewsBaner.module.css";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Loder from "../Loder";
import Link from "next/link";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import { toast } from "react-toastify";
import { toast, ToastContainer } from "react-toastify";

export default function News() {
  const router = useRouter();
  const [news, setNews] = useState();
  const [loder, setLoder] = useState(false);
  const [newsLoder, setNewsLoder] = useState(false);
  const swiperRef = useRef(null);

  const GetNews = async () => {
    try {
      await axios
        .get(
          // `${baseUrl}/api/news`
          process.env.NEXT_PUBLIC_BASE_URL + "/api/news"
        )
        .then((response) => {
          setNews(response?.data?.response?.data);
          setNewsLoder(true);
        })
        .catch((error) => {
          // alert(error);
          toast.error(error, { autoClose: 5000 });
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetNews();
  }, []);

  useEffect(() => {
    // Update the swiperRef whenever the Swiper component updates
    if (swiperRef.current && newsLoder) {
      swiperRef.current.swiper.update();
    }
  }, [newsLoder]);

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
      {!loder || <Loder />}

      <div className={styles.news_baner_container}>
        <div className={styles.news_baner_sec1}>
          <h2 className="color_yellow">
            <Link href="/news">News Center</Link>
          </h2>

          <div className={styles.btn_parent}>
            <div className="swiper-button-prev" onClick={slidePrev}></div>
            {/* Custom next button */}
            <div className="swiper-button-next" onClick={slideNext}></div>
          </div>
        </div>
        {newsLoder ? (
          // <div className={styles.carousel}></div>
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
            {news &&
              news?.slice(0, 15).map((item, index) => (
                <SwiperSlide key={index}>
                  <div
                    className={styles.news_image_div}
                    onClick={() => {
                      setLoder(true);
                      router.push({
                        pathname: "/newsdetails",
                        query: { slugnews: item?.slug },
                      });
                    }}
                  >
                    <Image
                      width={1000}
                      height={1000}
                      style={{ height: "100%", width: "100%" }}
                      src={item.thumbURL}
                      alt="news picture"
                      priority={true}
                    />
                    <div className={styles.content}>
                      <h4>{item?.title}</h4>
                      <Link
                        className="color_yellow"
                        href={`/newsdetails?slugnews=${item.slug}`}
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        ) : (
          ""
        )}
        <ToastContainer className="tost" />
      </div>
    </>
  );
}
