import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/swiper.min.css';
import 'swiper/components/autoplay/autoplay.min.css';
import styles from "../../../styles/HomeBaner.module.css";

// Install Swiper modules
SwiperCore.use([Autoplay]);

export default function HomeBaner() {
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
        {/* Static Slides */}
        <SwiperSlide>
          <div className={styles.staticImageSection}>
            <img
              src="/path/to/your/static/image1.jpg"
              alt="Static Image 1"
              className={styles.staticImage}
            />
            <div>
              <h3>Static Image Title 1</h3>
              <p>Static Image Description 1</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className={styles.staticImageSection}>
            <img
              src="/path/to/your/static/image2.jpg"
              alt="Static Image 2"
              className={styles.staticImage}
            />
            <div>
              <h3>Static Image Title 2</h3>
              <p>Static Image Description 2</p>
            </div>
          </div>
        </SwiperSlide>

        {/* Add more static slides as needed */}
      </Swiper>
    </div>
  );
}
