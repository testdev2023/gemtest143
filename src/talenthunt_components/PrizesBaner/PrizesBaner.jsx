import styles from "../../../talenthunt_styles/PrizesAndWinners.module.css";

import axios from "axios";
import { useEffect, useState, useRef } from "react";

import styles1 from "../../../styles/Modal.module.css";
import moment from "moment/moment";
import localStorage from "local-storage";
import { useRouter } from "next/router";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import { Box, Modal } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function PrizesAndWinners() {
  // USER Activity
  const [open, setOpen] = useState(false);
  const handleOpenClose = () => setOpen(!open);
  const router = useRouter();
  const [allcompetition, setAllCompetition] = useState([]);
  const user = localStorage.get("loginAuth")?.data?.api_token;
  const [prizes, setPrizes] = useState([]); // State for storing competition prizes

  const [prizeLoder, setPrizeLoder] = useState(false);
  const swiperRef = useRef(null);

  const GetPrize = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/competition-prizes"
      );
      // console.log(response?.data?.response?.data, "chrcking");

      if (response?.data?.status === true) {
        setAllCompetition(response?.data?.response?.data);
        setPrizes(response?.data?.response?.data?.[0]?.competition_prizes);
        setPrizeLoder(true);
      } else {
        // Handle the case where the status is not active
        console.log("Competition prizes are not currently active.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetPrize();
  }, []);

  useEffect(() => {
    // Update the swiperRef whenever the Swiper component updates
    if (swiperRef.current && prizeLoder) {
      swiperRef.current.swiper.update();
    }
  }, [prizeLoder]);

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
    <div className={styles.about_prizes_winners_main}>
      {prizeLoder ? (
        <div className={styles.sub_parent}>
          {allcompetition?.map((competitions) => (
            <div
              className={styles.prize_winners_baner_sec2}
              key={competitions?.id}
            >
              <div className={styles.flex}>
                <h2 className="yellow">{competitions?.title}</h2>
                {/* <div className={styles.btn_parent}>
                  <div className="swiper-button-prev" onClick={slidePrev}></div>
                  <div className="swiper-button-next" onClick={slideNext}></div>
                </div> */}
              </div>
              <p
                dangerouslySetInnerHTML={{
                  __html: competitions?.short_description,
                }}
              ></p>
              {/* {console.log(competitions?.competition_prizes, "testing ")} */}
              <div className={styles.prize_winners_baner_sec3}>
                {/* <div className={styles.btn_parent}>
                  <div className="swiper-button-prev" onClick={slidePrev}></div>
                  <div className="swiper-button-next" onClick={slideNext}></div>
                </div> */}
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
                  {competitions?.competition_prizes
                    ?.slice(0, 3)
                    ?.map((prize, i) => (
                      <SwiperSlide key={i}>
                        <div
                          className={styles.prize_winner_card}
                          style={{
                            backgroundImage: `url(${prize?.prize_image})`,
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundColor: "#474747",
                          }}
                          key={prize.id}
                        >
                          <div className={styles.prize_winner_card_sec2}>
                            <div
                              className={styles.prize_winner_card2_icon1}
                              style={{
                                backgroundImage: `url(${prize?.prize_icon})`,
                              }}
                            ></div>
                          </div>
                          <div>
                            <p className={styles.prize_winner_card_position_no}>
                              {prize?.prize_title}
                            </p>
                          </div>
                          <div>
                            <p
                              className={styles.prize_winner_card_position}
                              dangerouslySetInnerHTML={{
                                __html: prize?.description,
                              }}
                            ></p>
                          </div>
                          <div className={styles.prize_winner_card_sec3}>
                            <p className={styles.prize_winner_card_prizing}>
                              {prize?.prize_amount}
                            </p>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>
            </div>
          ))}

          <button
            onClick={() => {
              !user ? handleOpenClose() : router.push("/prizes");
            }}
            className={styles.view_more_button}
          >
            View more
          </button>

          {/* 1st Card */}
          {/* {prizes?.map((prize) => (
          <div
            className={styles.prize_winner_card}
            style={{ backgroundImage: `url(${prize?.prize_image})` }}
            key={prize.id}
          >
            <div className={styles.prize_winner_card_sec2}>
              <div
                className={styles.prize_winner_card2_icon1}
                style={{ backgroundImage: `url(${prize?.prize_icon})` }}
              ></div>
            </div>
            <div>
              <p className={styles.prize_winner_card_position_no}>
                {prize?.prize_title}
              </p>
            </div>
            <div>
              <p
                className={styles.prize_winner_card_position}
                dangerouslySetInnerHTML={{ __html: prize?.description }}
              ></p>
            </div>
            <div className={styles.prize_winner_card_sec3}>
              <p className={styles.prize_winner_card_prizing}>
                {prize?.prize_amount}
              </p>
            </div>
          </div>
        ))} */}

          {/* Second Card */}
          {/* <div className={styles.prize_winner_card}>
          <div className={styles.prize_winner_card_sec2}>
            <div className={styles.prize_winner_card2_icon1}></div>
          </div>
          <div>
            <p className={styles.prize_winner_card_position_no}>2nd</p>
          </div>
          <div>
            <p className={styles.prize_winner_card_position}>Position</p>
          </div>
          <div className={styles.prize_winner_card_sec3}>
            <p className={styles.prize_winner_card_prizing}>TBD</p>
          </div>
        </div> */}
          {/* Thrid Card */}
          {/* <div className={styles.prize_winner_card}>
          <div className={styles.prize_winner_card_sec2}>
            <div className={styles.prize_winner_card2_icon1}></div>
          </div>
          <div>
            <p className={styles.prize_winner_card_position_no}>3rd</p>
          </div>
          <div>
            <p className={styles.prize_winner_card_position}>Position</p>
          </div>
          <div className={styles.prize_winner_card_sec3}>
            <p className={styles.prize_winner_card_prizing}>TBD</p>
          </div>
        </div> */}
          <ToastContainer className="tost" />
        </div>
      ) : (
        ""
      )}

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
