import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/swiper.min.css';
import 'swiper/components/autoplay/autoplay.min.css';
import styles from "../../../styles/HomeBaner.module.css";
import Link from "next/link";

// Install Swiper modules
SwiperCore.use([Autoplay]);

export default function HomeBaner({ dataBanner }) {
  return (
    <div className={styles.home_baner_container}>
      <div className={styles.section}>
        <h2 className="yellow">Our Brand Partners</h2>
      </div>

      <Swiper
        spaceBetween={10}
        slidesPerView={3} // Adjust the number of slides per view as needed
        loop={true}
        autoplay={{ delay: 3000 }}
        className={styles.swiperContainer}
      >
        {/* Map through your dataBanner array */}
        {dataBanner.map((banner, index) => (
          <SwiperSlide key={index}>
            <Link
              href={banner.url}
              style={{
                background: `url(${banner.image})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
              target="_blank"
              className={styles.section1}
            >
              <div>
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
