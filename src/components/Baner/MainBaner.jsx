import { useEffect, useState } from "react";
import styles from "../../../styles/InnerBaner.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import Link from "next/link";

import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

export default function MainBaner({ dataBanner }) {
  const [muted, setMuted] = useState(true);

  const handleToggleMute = () => {
    setMuted((prevMuted) => !prevMuted);
  };

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
    <div className={styles.baner_container}>
      <Carousel
        // infinite={true}
        // autoPlay={true}
        // autoPlaySpeed={3000}
        className={styles?.carousel1}
        responsive={responsive}
        showDots={true}
        swipeable={true}
        removeArrowOnDeviceType={["desktop", "tablet", "mobile"]}
      >
        {dataBanner.length > 0 &&
          dataBanner.map((item, index) => {
            const openInNewTab = item.first_button_new_tab === 1;
            const openInNewTab2 = item.second_button_new_tab === 1;

            return (
              <div className={styles.data_parent} key={index}>
                {/* {console.log(item, "dataBanner")} */}
                {item.file_type == "image" ? (
                  <Image
                    className={styles.img}
                    width={10000}
                    height={10000}
                    // src={item?.main_image}
                    src={item.main_file}
                    alt=""
                  />
                ) : (
                  <div className={styles.parent}>
                    <video
                      src={item.main_file}
                      alt="Video"
                      controls={false}
                      playsInline
                      muted={muted}
                      autoPlay
                      loop
                    />

                    <div
                      className={styles.mute_button}
                      onClick={handleToggleMute}
                    >
                      {muted ? (
                        <VolumeOffIcon className={styles.icon} />
                      ) : (
                        <VolumeUpIcon className={styles.icon} />
                      )}
                    </div>
                  </div>
                )}
                {/* >>>>>>>>>>>>>  uper layer >>>>>>>>>>>>>>>> */}
                <div className={styles.content}>
                  <h1>{item.title}</h1>

                  {item && item.sub_image && (
                    <Image
                      src={item.sub_image}
                      alt=""
                      width={10000}
                      height={10000}
                    />
                  )}

                  <p
                    dangerouslySetInnerHTML={{ __html: item.slider_text }}
                    className={styles.banner_head}
                  ></p>
                  <div className={styles.btn_flex}>
                    {item.first_button_url && (
                      <Link
                        target={openInNewTab ? "_blank" : "_self"}
                        href={item.first_button_url}
                        className={`${styles.btn1} ${
                          item.first_button_text ? styles.withPadding : ""
                        }`}
                      >
                        {item.first_button_text}
                      </Link>
                    )}
                    {item.second_button_url && (
                      <Link
                        target={openInNewTab2 ? "_blank" : "_self"}
                        href={item.second_button_url}
                        className={`${styles.btn2} ${
                          item.second_button_text ? styles.withPadding : ""
                        }`}
                      >
                        {item.second_button_text}
                      </Link>
                    )}
                  </div>
                </div>

                {/* >>>>>>>>>>>>>  uper layer ennd>>>>>>>>>>>>>>>> */}
              </div>
            );
          })}
      </Carousel>
    </div>
  );
}
