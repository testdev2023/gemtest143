/* eslint-disable @next/next/no-img-element */
import styles from "../../../talenthunt_styles/LatestProjectsBaner.module.css";
import styles1 from "../../../styles/Modal.module.css";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";

import axios from "axios";
import localStorage from "local-storage";
import moment from "moment";

import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import Loder from "../../components/Loder";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function LatestProject() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleOpenClose = () => setOpen(!open);
  const [projects, setProjects] = useState();
  const [projectsLoader, setProjectsLoader] = useState(false);
  const [loder, setLoder] = useState(true);
  const swiperRef = useRef(null);

  const user = localStorage.get("loginAuth")?.data?.api_token;

  const GetProjects = async () => {
    try {
      await axios
        .post(
          // `${baseUrl}/api/competition/participants?competition_id=${1}`
          process.env.NEXT_PUBLIC_BASE_URL +
            // "/api/competition/participants?competition_id=" +
            // 3
            "/api/competition/participants-all"
        )
        .then((response) => {
          const lastThree = response?.data?.response?.data.slice(0, 15);

          setProjectsLoader(true);
          setLoder(false);
          setProjects(lastThree);
        })
        .catch((error) => {
          // alert(error);
          toast.error(error, {
            autoClose: 5000,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetProjects();
  }, []);

  const timeDate = (timeDate) => {
    const formattedDateString = moment(timeDate).format("MMM DD, YYYY");
    return formattedDateString;
  };
  const buttonRedirect = () => {
    if (!user) {
      setTimeout(() => {
        toast.error("Please login to access", {
          autoClose: 5000,
        });
      }, 3000);
    }
    router.push({
      pathname: user ? "/projects" : "/login",
    });
  };

  useEffect(() => {
    // Update the swiperRef whenever the Swiper component updates
    if (swiperRef.current && projectsLoader) {
      swiperRef.current.swiper.update();
    }
  }, [projectsLoader]);

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
    <div className={styles.latest_project_container}>
      {!loder || <Loder />}

      <div className={styles.latest_project_sec1}>
        {/* <div className={styles.dashline}></div> */}
        <h2 className="color_yellow">
          {" "}
          <Link href="/talentbord">Latest Entries </Link>{" "}
        </h2>

        <div className={styles.btn_parent}>
          <div className="swiper-button-prev" onClick={slidePrev}></div>
          {/* Custom next button */}
          <div className="swiper-button-next" onClick={slideNext}></div>
        </div>
      </div>
      {projectsLoader ? (
        <div className={styles.latest_project_sec3}>
          {/* Latest Project Card No 1 */}
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
            {projects?.map((cardData, i) => (
              <SwiperSlide key={i}>
                <Link
                  href={{
                    pathname: "/talentvote",
                    query: {
                      cometetion_id: cardData?.id,
                      competetion_name: cardData.competition.title,
                      competetion_description:
                        // cardData.competition.short_description,
                        cardData?.brief,
                      title: cardData?.title,
                      created_at: cardData?.created_at,
                      first_name: cardData.user?.first_name,
                      last_name: cardData.user?.last_name,
                      category: cardData?.category
                        ? cardData.category?.name
                        : "unknown",
                      added_by_first_name:
                        cardData?.competition?.added_by?.first_name,
                      added_by_last_name:
                        cardData?.competition?.added_by?.last_name,
                      competetion_cover_image: cardData.cover_image,

                      // submition: projectsSubmition,
                    },
                  }}
                  key={i}
                  className={styles.card}
                >
                  <div className={styles.card_img_div}>
                    <Image
                      width={1000}
                      height={1000}
                      className={styles.latest_project_image_sizing}
                      src={cardData.cover_image}
                      // loading="lazy"
                      priority={true}
                      alt="mypic"
                    />
                  </div>

                  <div className={styles.content}>
                    <h4>{cardData?.title}</h4>

                    <span className="name_heading">
                      {cardData?.competition?.title}
                    </span>
                    <span className="name_heading">
                      {cardData?.category?.name}
                    </span>
                    <span className="small_heading">
                      {timeDate(cardData?.updated_at)} | Submitted by:{" "}
                      <Link
                        href=""
                        className={`${styles.latest_project_Submitted_by} small_heading`}
                      >
                        {/* {cardData.user.first_name + " " + cardData.user.last_name } */}
                        {/* const fullName = cardData.user.first_name + (cardData.user.last_name ? " " + cardData.user.last_name : ""); */}
                        {cardData.user?.first_name +
                          (cardData.user?.last_name
                            ? " " + cardData.user?.last_name
                            : " ")}
                      </Link>
                    </span>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        ""
      )}

      <button
        onClick={() => {
          !user ? handleOpenClose() : router.push("/talentbord");
        }}
        // onClick={buttonRedirect}
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
