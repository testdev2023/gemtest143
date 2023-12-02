import styles from "../../../styles/HomeBaner.module.css";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import SwiperCore, { Pagination, Navigation } from "swiper/core";

// Install Swiper components
SwiperCore.use([Pagination, Navigation]);

export default function HomeBanner({ dataBanner }) {
  return (
    <div className={styles.home_banner_container}>
      <div className={styles.section}>
        <h2 className="yellow">Our Brand Partners</h2>
      </div>
      <Swiper
        navigation={true}
        pagination={{ clickable: true }}
        className={styles.swiper_container}
      >
        {dataBanner.map((banner, index) => (
          <SwiperSlide key={index}>
            <Link href={banner.url} target="_blank">
              <div
                className={styles.slide}
                style={{
                  backgroundImage: `url(${banner.image})`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              >
                <h3>{banner.title}</h3>
                <Link className="color_yellow" target="_blank" href={banner.url}>
                  More Details
                </Link>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
