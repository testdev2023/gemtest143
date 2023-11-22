/* eslint-disable @next/next/no-img-element */
import styles from "../../../styles/NewsBaner.module.css";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Loder from "../Loder";
import Link from "next/link";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, A11y } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/a11y";
import { toast, ToastContainer } from "react-toastify";

SwiperCore.use([Pagination, A11y]);

export default function News() {
  const router = useRouter();
  const [news, setNews] = useState();
  const [loder, setLoder] = useState(false);
  const [newsLoder, setNewsLoder] = useState(false);
  const swiperRef = useRef(null);

  const GetNews = async () => {
    try {
      await axios
        .get(process.env.NEXT_PUBLIC_BASE_URL + "/api/news")
        .then((response) => {
          setNews(response?.data?.response?.data);
          setNewsLoder(true);
        })
        .catch((error) => {
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
    if (swiperRef.current && newsLoder) {
      swiperRef.current.swiper.update();
    }
  }, [newsLoder]);

  return (
    <>
      {!loder || <Loder />}

      <div className={styles.news_baner_container}>
        <div className={styles.news_baner_sec1}>
          <h2 className="color_yellow">
            <Link href="/news">News Center</Link>
          </h2>

          {/* Remove navigation buttons */}
        </div>
        {newsLoder ? (
          <Swiper
            className={styles.carousel}
            ref={swiperRef}
            modules={[Pagination, A11y]}
            slidesPerView={2}
            spaceBetween={24}
            pagination={{ clickable: true }}
            breakpoints={{
              1440: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 2,
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
                  </div>
                  <div className={styles.content}>
                    <h4>{item?.title}</h4>
                    <Link
                      className="color_yellow"
                      href={`/newsdetails?slugnews=${item.slug}`}
                    >
                      View Details
                    </Link>
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
