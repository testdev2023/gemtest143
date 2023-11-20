/* eslint-disable jsx-a11y/alt-text */
import TopBar from "../src/components/TopBar/EntTopBar";
import Footer from "../src/components/Footer/Footer";
import styles from "../styles/Benefits.module.css";
import ScrollToTopButton from "../src/components/ScrollToTopButton/ScrollToTopButton";
import Image from "next/image";
import card1bg from "../src/asset/bfcard1.svg";
import card2bg from "../src/asset/bfcard2.svg";
import card3bg from "../src/asset/bfcard3.svg";
import card4bg from "../src/asset/bfcard4.svg";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";

import Loder from "../src/components/Loder";
import InnerBaner from "../src/components/Baner/innerBaner";
import moment from "moment/moment";
import localStorage from "local-storage";
import { useRouter } from "next/router";

import { toast, ToastContainer } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// const cardData = [
//   {
//     id: "card1",
//     class: "heading1",
//     title: "QUARTZ",
//     heading: "TIER 1",
//     backgroundColor: "bg1",
//     point1: "Invitation to exclusive memberships by GEM",
//     point2: "Complete access to GEM the networking community",
//     point3: "Registration as a Talent, Employer or,  Vendor",
//     point4: "Digital membership cards",
//     image: card1bg,
//   },
//   {
//     id: "card2",
//     class: "heading2",
//     title: "AMBER",
//     heading: "TIER 2",
//     backgroundColor: "bg2",
//     point1: "Complete access to Tier 1 benefits",
//     point2: "Up to 10% off on tickets for GEM and partnership events",
//     point3: "Exciting discounts at selective local retailers",
//     point4: "Invitation to annual GEM ",
//     point5: "Silver Members’ events ",
//     image: card2bg,
//   },
//   {
//     id: "card3",
//     class: "heading3",
//     title: "EMARLD",
//     heading: "TIER 3",
//     backgroundColor: "bg3",
//     point1: "Access to Tier 1 & 2 benefits",
//     point2: "Up to 25% off on tickets for GEM and partner events",
//     point3: "Attractive discounts at various local and national retailers",
//     point4: " Invitation to bi-annual GEM Gold Members events ",
//     point5: "Substantial (Plastic) membership cards ",
//     image: card3bg,
//   },
//   {
//     id: "card4",
//     class: "heading4",
//     title: "DIAMOND",
//     heading: "TIER 4",
//     backgroundColor: "bg4",
//     point1: "Access to Tier 1,2 & 3 benefits",
//     point2: "Up to 50% off on tickets for GEM and partner events",
//     point3:
//       "Exciting discounts at various local, national, and international retailers",
//     point4: " Access to exclusive lounges and cafes in different eateries ",
//     point5:
//       "Invitation to 1 high-profile, exclusive GEM event with founders and co-founders",
//     point6: "Eligibility to attend GEM private parties and screen nobles",
//     point7: "Exclusive celebrity meet & greet",
//     point8: " Networking Events",
//     point9: "Substantial (metal) membership cards",
//     image: card4bg,
//   },
// ];

export default function Benefits() {
  const [benefits, setBenefit] = useState();

  const [banner, setBanner] = useState();
  const [loder, setLoder] = useState(true);
  // USER Activity
  const router = useRouter();
  const [pageName, setPageName] = useState("");
  const [pageURL, setPageURL] = useState("");
  const [localDateTime, setLocalDateTime] = useState([]);
  const swiperRef = useRef(null);

  useEffect(() => {
    const storedPage = localStorage.get("currentPage");
    if (storedPage) {
      setCurrentPage(parseInt(storedPage));
    }
  }, []);

  useEffect(() => {
    const currentPage = router.route;
    const formattedPageName = currentPage.startsWith("/")
      ? currentPage.substring(1)
      : currentPage;
    setPageName(formattedPageName);
    // Get the page URL
    setPageURL(window.location.href);

    // Get the formatted local date and time
    const getCurrentDateTime = () => {
      const currentDateTime = moment().format("MM/DD/YYYY hh:mm A");
      setLocalDateTime(currentDateTime);
    };
    // Update the local time every second
    const interval = setInterval(getCurrentDateTime, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [router]);
  useEffect(() => {
    const userToken = localStorage.get("loginAuth")?.data?.api_token;
    if (userToken) {
      UserActivity();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageName, pageURL, localDateTime]);

  const UserActivity = async () => {
    const userToken = localStorage.get("loginAuth")?.data?.api_token;
    try {
      if (pageName && pageURL && localDateTime) {
        const requestBody = {
          page_name: pageName,
          page_url: pageURL,
          date_time: localDateTime,
        };
        const response = await axios.post(
          process.env.NEXT_PUBLIC_BASE_URL + "/api/member/add-user-activity",
          requestBody,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        if (response.data.status === true) {
          setPageName("");
          setPageURL("");
          setLocalDateTime("");
        }
      }
    } catch (error) {
      console.error("Error recording user activity:", error);
    }
  };
  const GetBanner = async () => {
    try {
      await axios
        .get(
          process.env.NEXT_PUBLIC_BASE_URL +
            "/api/banners?s[page]=Benefits&s[type]=Landing"
        )
        .then((response) => {
          setBanner(response?.data?.response?.data[0]);
          setLoder(false);
        })
        .catch((error) => {
          toast.error(error, { autoClose: 5000 });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const GetBenefit = async () => {
    try {
      await axios
        .get(process.env.NEXT_PUBLIC_BASE_URL + "/api/benefit_page")
        .then((response) => {
          setBenefit(response?.data?.slider_section);
          setLoder(false);
        })
        .catch((error) => {
          toast.error(error, { autoClose: 5000 });
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetBanner();
    GetBenefit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <ScrollToTopButton />

      <TopBar />
      {!loder || <Loder />}

      <InnerBaner
        source={
          banner?.file_type == "image" ? banner?.imageURL : banner?.videoURL
        }
        fileType={banner?.file_type}
        headingBanner={banner?.title}
      />

      <div className={styles.benefits_main}>
        <div className={styles.btn_parent}>
          <div className="swiper-button-prev" onClick={slidePrev}></div>
          {/* Custom next button */}
          <div className="swiper-button-next" onClick={slideNext}></div>
        </div>
        <Swiper
          style={{ width: "100%" }}
          ref={swiperRef} // Assign the swiperRef to the Swiper component
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView={5}
          spaceBetween={24}
          breakpoints={{
            // 1920: {
            //   slidesPerView: 5,
            // },
            1440: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 3,
            },
            464: {
              slidesPerView: 2,
            },
            0: {
              slidesPerView: 1,
            },
          }}
          // loop={true}
        >
          <div className={styles.benefits_sec1}>
            {benefits?.map((cardData, i) => (
              <SwiperSlide key={i}>
                <div
                  key={i}
                  className={`${styles.card} ${styles[cardData.id]}`}
                >
                  <div className={styles.img_div}>
                    <Image
                      id={cardData.id}
                      className={styles[cardData.backgroundColor]}
                      src={cardData?.main_file}
                      alt="benfits"
                      loading="lazy"
                      width={1000}
                      height={1000}
                    />
                    <h3>{cardData.title}</h3>
                  </div>
                  <h4 className={styles[cardData.class]}>{cardData.heading}</h4>
                  <div className={styles.pading_div}>
                    <ul
                      className={styles.circle_checkmark}
                      dangerouslySetInnerHTML={{
                        __html: cardData?.slider_text,
                      }}
                    >
                      {/* <li>{cardData.point1}</li>
                      <li>{cardData.point2}</li>
                      <li>{cardData.point3}</li> */}
                      {/* {cardData.point4 && <li>{cardData.point4}</li>}
                      {cardData.point5 && <li>{cardData.point5}</li>}
                      {cardData.point6 && <li>{cardData.point6}</li>}
                      {cardData.point7 && <li>{cardData.point7}</li>}
                      {cardData.point8 && <li>{cardData.point8}</li>}
                      {cardData.point9 && <li>{cardData.point9}</li>} */}
                    </ul>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
        <ToastContainer className="tost" />
      </div>
      <Footer />
    </div>
  );
}
