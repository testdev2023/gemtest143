/* eslint-disable @next/next/no-img-element */
import styles from "../../../talenthunt_styles/AboutJurryBaner.module.css";
import styles1 from "../../../styles/Modal.module.css";

import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";

import axios from "axios";
import localStorage from "local-storage";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Loder from "../../components/Loder";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function AboutJurryBaner() {
  const [open, setOpen] = useState(false);
  const handleOpenClose = () => setOpen(!open);
  const user = localStorage.get("loginAuth")?.data?.api_token;
  const router = useRouter();
  const [jury, setJury] = useState();
  const [juryLoader, setJuryLoader] = useState(false);
  const [loder, setLoder] = useState(true);
  const swiperRef = useRef(null);

  const buttonRedirect = () => {
    if (!user) {
      setTimeout(() => {
        toast.error("Please login to access.", {
          autoClose: 5000,
        });
      }, 3000);
    }
    router.push({
      pathname: user ? "/aboutjurry" : "/login",
    });
  };
  const GetJury = async () => {
    try {
      await axios
        .get(
          // `${baseUrl}/api/competition-jury?competition_id=${1}`
          process.env.NEXT_PUBLIC_BASE_URL +
            "/api/competition-jury?competition_id=" +
            1
        )
        .then((response) => {
          setJury(response?.data?.response?.data);
          setLoder(false);
          setJuryLoader(true);
        })
        .catch((error) => {
          // alert(error);
          toast.error(error);
        });
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        autoClose: 5000,
      });
    }
  };

  useEffect(() => {
    GetJury();
  }, []);

  useEffect(() => {
    // Update the swiperRef whenever the Swiper component updates
    if (swiperRef.current && juryLoader) {
      swiperRef.current.swiper.update();
    }
  }, [juryLoader]);

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

  function stripHtmlTags(htmlString) {
    return htmlString?.replace(/(<([^>]+)>)/gi, "");
  }

  return (
    <div className={styles.about_jury_container}>
      {!loder || <Loder />}
      <div className={styles.about_jury_sec1}>
        <h2 className="color_yellow">
          {" "}
          <Link href="/aboutjurry">About Jury</Link>
        </h2>

        <div className={styles.btn_parent}>
          <div className="swiper-button-prev" onClick={slidePrev}></div>
          {/* Custom next button */}
          <div className="swiper-button-next" onClick={slideNext}></div>
        </div>
      </div>
      {juryLoader ? (
        <div className={styles.about_jury_sec3}>
          {/* Latest Project Card No 1 */}

          <div className={styles.carousel}>
            <Swiper
              className={styles.carousel}
              ref={swiperRef} // Assign the swiperRef to the Swiper component
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              slidesPerView={5}
              spaceBetween={24}
              breakpoints={{
                // 1920: {
                //   slidesPerView: 5,
                // },
                1440: {
                  slidesPerView: 5,
                },
                1024: {
                  slidesPerView: 4,
                },
                464: {
                  slidesPerView: 3,
                },
                0: {
                  slidesPerView: 1,
                },
              }}
              // loop={true}
            >
              {jury &&
                jury?.slice(0, 5)?.map((item, i) => (
                  <SwiperSlide key={i}>
                    <div key={i} className={styles.card}>
                      <div className={styles.about_jury_img_div}>
                        <Image
                          width={10000}
                          height={10000}
                          className={styles.about_jury_alexendradoe_image}
                          src={item?.picture}
                          loading="lazy"
                          alt={item.name}
                        />
                      </div>
                      <div className={styles.about_jury_content}>
                        <p className="name_heading">{item.name}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      ) : (
        ""
      )}

      <button
        onClick={() => {
          !user ? handleOpenClose() : router.push("/aboutjurry");
        }}
        className={styles.view_more_button}
      >
        View more
      </button>
      <Modal
        open={open}
        onClose={handleOpenClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles1.box}>
          <div className={styles1.btn_div_mob}>
            <button
              className={styles1.unitX_mob}
              variant="contained"
              onClick={handleOpenClose}
            >
              X
            </button>
          </div>
          <div className={styles1.box_div1}>
            <p>
              Unlock exclusive content. Join for free or log in to access the
              members-only area.
            </p>
            <div className={styles1.box_div2}>
              <Link href="/login"> Login </Link>
              <Link href="/signup"> Sign Up </Link>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
