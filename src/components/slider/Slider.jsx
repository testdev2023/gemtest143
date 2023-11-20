import styles from "../../../styles/Slider.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function Slider() {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 5000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className={styles.sliderContainer}>
      <Carousel
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        className={styles.carousel}
        responsive={responsive}
        showDots={true}
        removeArrowOnDeviceType={["desktop", "tablet", "mobile"]}
      >
        <div className={styles.slide1}></div>
        <div className={styles.slide2}></div>
        <div className={styles.slide3}></div>
      </Carousel>
    </div>
  );
}
