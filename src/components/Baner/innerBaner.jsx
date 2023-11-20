import { useEffect, useState } from "react";
import styles from "../../../styles/InnerBaner.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import Image from "next/image";

import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
// import { toast } from "react-toastify";
import { toast, ToastContainer } from "react-toastify";

export default function InnerBaner({ headingBanner, source, fileType }) {
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

  const [banner, setBanner] = useState();
  const [sliderSection, setSliderSection] = useState([]);
  const [sliderSectionLoader, setSliderSectionLoader] = useState(false);

  const GetBanner = async () => {
    try {
      await axios
        .get(
          // `${baseUrl}/api/landing_page`
          process.env.NEXT_PUBLIC_BASE_URL + "/api/landing_page"
        )
        .then((response) => {
          // console.log("data checking", response.data);
          setBanner(response.data);
          setSliderSection(response?.data?.slider_section);
          setSliderSectionLoader(true);
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
    GetBanner();
  }, []);

  return (
    <div className={styles.baner_container}>
      {sliderSectionLoader ? (
        <Carousel
          // infinite={true}
          // autoPlay={true}
          // autoPlaySpeed={3000}
          className={styles?.carousel}
          responsive={responsive}
          showDots={true}
          swipeable={true}
          removeArrowOnDeviceType={["desktop", "tablet", "mobile"]}
        >
          {sliderSection.length > 0 &&
            sliderSection?.map((item, index) => (
              <div className={styles.data_parent} key={index}>
                {fileType == "image" ? (
                  <Image
                    className={styles.img}
                    width={1000}
                    height={1000}
                    // src={item?.main_image}
                    src={source}
                    alt=""
                    priority={true}
                  />
                ) : (
                  <div className={styles.parent}>
                    <video
                      src={source}
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

                <h2 className={`${styles.heading} yellow`}>{headingBanner}</h2>

                {/* >>>>>>>>>>>>>  uper layer ennd>>>>>>>>>>>>>>>> */}
              </div>
            ))}
        </Carousel>
      ) : (
        ""
      )}
      <ToastContainer className="tost" />
    </div>
  );
}
