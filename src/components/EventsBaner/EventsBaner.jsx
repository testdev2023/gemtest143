/* eslint-disable @next/next/no-img-element */
import styles from "../../../styles/EventsBaner.module.css";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import moment from "moment";
import Loder from "../Loder";
import localStorage from "local-storage";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import { toast } from "react-toastify";
import { toast, ToastContainer } from "react-toastify";

export default function EventsBaner() {
  const router = useRouter();
  const [events, setEvents] = useState();
  const [eventsLoader, setEventsLoader] = useState(false);
  const [loder, setLoder] = useState(false);
  const swiperRef = useRef(null);

  const GetEvents = async () => {
    try {
      await axios
        .get(
          // `${baseUrl}/api/events`
          process.env.NEXT_PUBLIC_BASE_URL + "/api/events"
        )
        .then((response) => {
          const lastSixElements = response.data.response.data.slice(0, 15);
          setEvents(lastSixElements);
          setEventsLoader(true);
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
    GetEvents();
  }, []);

  useEffect(() => {
    // Update the swiperRef whenever the Swiper component updates
    if (swiperRef.current && eventsLoader) {
      swiperRef.current.swiper.update();
    }
  }, [eventsLoader]);

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

  const timeDate = (timeDate) => {
    const formattedDateString = moment(timeDate).format("MMM DD, YYYY");
    return formattedDateString;
  };
  return (
    <>
      {!loder || <Loder />}

      <div className={styles.events_baner_container}>
        <div className={styles.events_baner_sec1}>
          <h2 className="color_yellow">
            <Link href="/events">Events </Link>{" "}
          </h2>

          <div className={styles.btn_parent}>
            <div className="swiper-button-prev" onClick={slidePrev}></div>
            {/* Custom next button */}
            <div className="swiper-button-next" onClick={slideNext}></div>
          </div>
        </div>
        {eventsLoader ? (
          <div className={styles.events_baner_sec3}>
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
              {events?.map((cardData, index) => (
                <SwiperSlide key={index}>
                  <div
                    key={index}
                    className={styles.events_baner_card}
                    onClick={() => {
                      setLoder(true);
                      localStorage.set("eventsSlug", cardData?.slug);
                      router.push({
                        pathname: "/eventsdetails",
                        query: { slug: cardData?.slug },
                      });
                    }}
                  >
                    <div className={styles.events_baner_card_link}>
                      {/* <Link
                   
                    href={`/eventsdetails?slug=${cardData.slug}`} passHref
                  > */}
                      <Image
                        width={10000}
                        height={10000}
                        // loading="lazy"
                        priority={true}
                        className={styles.card_image}
                        src={cardData?.thumbURL}
                        alt={cardData?.title}
                        title={cardData?.title}
                      />

                      <div className={styles.content}>
                        <h4 className={styles.card_title}>{cardData?.title}</h4>
                        <Link
                          className="color_yellow"
                          href={`/eventsdetails?slug=${cardData.slug}`}
                          passHref
                        >
                          View Details
                        </Link>
                      </div>
                      {/* </Link> */}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          ""
        )}

        <Link href="events" className={styles.view_more_button}>
          View more
        </Link>
      </div>
      <ToastContainer className="tost" />
    </>
  );
}
