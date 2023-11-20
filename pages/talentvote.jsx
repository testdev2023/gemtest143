/* eslint-disable @next/next/no-img-element */

import TopBar from "../src/components/TopBar/EntTopBar";

import Footer from "../src/components/Footer/Footer";
import styles from "../talenthunt_styles/TalentVote.module.css";
import Link from "next/link";
import dynamic from "next/dynamic";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import ReactPlayer from "react-player";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

import moment from "moment";
import ScrollToTopButton from "../src/components/ScrollToTopButton/ScrollToTopButton";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";
import "react-toastify/dist/ReactToastify.css";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

import Loder from "../src/components/Loder";
import InnerBaner from "../src/components/Baner/innerBaner";
import { ShareSocial } from "react-share-social";

export default function TalentVote() {
  const router = useRouter();
  const {
    cometetion_id,

    competetion_name,
    competetion_description,
    title,
    created_at,
    first_name,
    last_name,
    category,
    added_by_first_name,
    added_by_last_name,
    competetion_cover_image,
  } = router.query;

  const data = {
    competetion_name: String(competetion_name),
    competetion_description: String(competetion_description),
    title: String(title),
    created_at: String(created_at),
    first_name: String(first_name),
    last_name: String(last_name),
    category: String(category),
    added_by_first_name: String(added_by_first_name),
    added_by_last_name: String(added_by_last_name),
    competetion_cover_image: String(competetion_cover_image),
  };

  const DateFormatter = (date) => {
    const formattedDate = moment(date).format("MMM DD, YYYY");
    return formattedDate;
  };

  const [projects, setProjects] = useState();
  const [projectsloader, setProjectsloader] = useState(false);
  const [loder, setLoder] = useState(true);
  const [banner, setBanner] = useState();
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  // const GetProjects = async () => {
  //   try {
  //     await axios
  //       .get(

  //         process.env.NEXT_PUBLIC_BASE_URL +
  //           "/api/competition/participants?competition_id=" +
  //           1
  //       )

  //       .then((response) => {
  //         const lastThree = response?.data?.response?.data.slice(-6);
  //         setProjects(lastThree);
  //         setLoder(false);
  //         setProjectsloader(true);
  //       })
  //       .catch((error) => {
  //         alert(error);
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {

  //   if (typeof window !== "undefined") {
  //     GetProjects();
  //   }
  // }, []);

  useEffect(() => {
    if (cometetion_id) {
      axios
        .get(
          process.env.NEXT_PUBLIC_BASE_URL +
            "/api/competition_entries?user_competition_id=" +
            cometetion_id,
          {
            headers: {
              Authorization:
                "Bearer " +
                reactLocalStorage.getObject("loginAuth").data?.api_token,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          const lastThree = response?.data?.response?.data?.slice(-6);
          setProjects(lastThree);
          setDashboardData(response.data.response.data);
          setLoder(false);
          setProjectsloader(true);
        })
        .catch((error) => {
          console.error("Error fetching project data :", error);
        });
    }
  }, [cometetion_id]);
  const handleVote = async () => {
    axios
      .post(
        // `${baseUrl}/api/member/competition/add-vote`
        process.env.NEXT_PUBLIC_BASE_URL + "/api/member/competition/add-vote",
        // { user_compeition_id: competetion_id },
        {
          headers: {
            Authorization:
              "Bearer " +
              reactLocalStorage.getObject("loginAuth").data?.api_token,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        toast.success(response.data.message, { autoClose: 5000 });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // checking for stat
  const [dashboardData, setDashboardData] = useState(null);
  const videoRef = useRef([]);
  const [isPlaying, setIsPlaying] = useState(
    dashboardData ? new Array(dashboardData.length).fill(false) : []
  );
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState(-1);

  const handlePlay = (index) => {
    if (currentPlayingIndex !== index) {
      if (currentPlayingIndex !== -1) {
        videoRef.current[currentPlayingIndex].pause();
        setIsPlaying((prevIsPlaying) => {
          const updatedIsPlaying = [...prevIsPlaying];
          updatedIsPlaying[currentPlayingIndex] = false;
          return updatedIsPlaying;
        });
        videoRef.current[currentPlayingIndex].pause();
      }

      setIsPlaying((prevIsPlaying) => {
        const updatedIsPlaying = [...prevIsPlaying];
        updatedIsPlaying[index] = true;
        return updatedIsPlaying;
      });
      setCurrentPlayingIndex(index);
      videoRef.current[index].play();
    }
  };

  const handlePause = (index) => {
    if (currentPlayingIndex === index) {
      setIsPlaying((prevIsPlaying) => {
        const updatedIsPlaying = [...prevIsPlaying];
        updatedIsPlaying[index] = false;
        return updatedIsPlaying;
      });
      setCurrentPlayingIndex(-1);
      videoRef.current[index].pause();
    }
  };

  useEffect(() => {
    // Initialize the isPlaying state with false for all videos
    setIsPlaying(
      dashboardData ? new Array(dashboardData.length).fill(false) : []
    );
  }, [dashboardData]);
  const getFileExtension = (url) => {
    const parts = url.split(".");
    return parts[parts.length - 1].toLowerCase();
  };

  const GetBanner = async () => {
    try {
      await axios
        .get(
          // `${baseUrl}/api/banners?s[page]=Benefits&s[type]=Landing`
          process.env.NEXT_PUBLIC_BASE_URL +
            "/api/banners?s[page]=Competition Entry&s[type]=Landing"
        )
        .then((response) => {
          setBanner(response?.data?.response?.data[0]);

          setLoder(false);
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

  // checking for end
  return (
    <>
      <div className={styles.talent_vote_container}>
        {!loder || <Loder />}
        <ScrollToTopButton />
        <TopBar />

        <InnerBaner
          source={
            banner?.file_type == "image" ? banner?.imageURL : banner?.videoURL
          }
          fileType={banner?.file_type}
          headingBanner={banner?.title}
        />

        <div className={styles.talent_vote_sub_container1}>
          {/* <div className={styles.talent_vote_boxsize_parents}> */}
          <div className={styles.talent_vote_boxsize1}>
            <div className={styles.talent_vote_sec1}>
              {/* <div className={styles.talent_vote_dashline}></div> */}
              <h2 className={styles.talent_vote_heading}>
                {/* {data?.competetion_name} */}
                {title}
              </h2>
            </div>
            <div className={styles.talent_vote_sec2}>
              <p className={styles.talent_vote_textalign}>
                {data?.competetion_description}
              </p>
              {/* <p className={styles.talent_vote_by}>
                By{" "}
                <span className={styles.talent_vote_dubai}>
                  {data?.added_by_first_name + " " + data?.added_by_last_name}
                </span>
              </p> */}
            </div>
          </div>
          <div className={styles.talent_vote_sec3}>
            <div className={styles.talent_vote_card}>
              <h4 className={styles.talent_vote_heading_voting}>
                {/* Vote For Change */}
                Vote For Your Favourite Person
              </h4>

              <div className={styles.talent_vote_vote_now}>
                <button onClick={() => handleVote()}>Vote Now</button>
              </div>
            </div>
            <ToastContainer />
            {/* <div className={styles.talent_vote_card_reminder}>
              <div className={styles.talent_vote_days_hours}>
                <span className={styles.talent_vote_timer_icon}>
                  <AccessTimeIcon />
                </span>
                <h3 className={styles.talent_vote_days_paragraph}>
                  4 days 3 hours Left to Vote
                </h3>
              </div>
            </div> */}
          </div>
        </div>
        <div className={styles.talent_vote_sub_container1}>
          {projectsloader ? (
            <div className={styles.talent_vote_boxsize_parents}>
              <div className={styles.talent_vote_boxsize1}>
                {/* <div className={styles.talent_vote_video_player}>
                  <ReactPlayer
                    width="100%"
                    height="100%"
                    url="https://youtu.be/mqqft2x_Aa4"
                    light={competetion_cover_image}
                  />
                </div> */}

                {/* checking start */}

                {dashboardData?.map((item, i) => (
                  <div className={styles.card} key={i}>
                    <div className={styles.video_div}>
                      <div
                        className={styles.play_div}
                        onClick={() =>
                          isPlaying[i] ? handlePause(i) : handlePlay(i)
                        }
                      >
                        {!isPlaying[i] && (
                          <PlayCircleOutlineIcon
                            className={styles.dashboard_video_icon}
                          />
                        )}
                      </div>
                      {/* Video file */}
                      {item.files.map((file, index) => {
                        const fileExtension = getFileExtension(file.file_url);
                        if (
                          fileExtension === "mp4" ||
                          fileExtension === "webm"
                        ) {
                          return (
                            <video
                              key={index}
                              className={styles.dashboard_card_image_sizing}
                              width="100%"
                              height="100%"
                              controls={isPlaying[i]}
                              poster={item.cover_image}
                              ref={(ref) => (videoRef.current[i] = ref)}
                              onEnded={() => handlePause(i)}
                              onPause={() => handlePause(i)}
                            >
                              <source
                                src={file.file_url}
                                type={`video/${fileExtension}`}
                              />
                            </video>
                          );
                        }
                      })}
                      <h3>Other attachments</h3>
                      <div className={styles.flex}>
                        {/* Audio file */}
                        {item.files.map((file, index) => {
                          const fileExtension = getFileExtension(file.file_url);
                          if (
                            fileExtension === "mp3" ||
                            fileExtension === "wav"
                          ) {
                            return (
                              <audio key={index} controls>
                                <source
                                  src={file.file_url}
                                  type={`audio/${fileExtension}`}
                                />
                              </audio>
                            );
                          }
                        })}
                        {/* PDF file */}
                        {item.files.map((file, index) => {
                          const fileExtension = getFileExtension(file.file_url);
                          if (fileExtension === "pdf") {
                            return (
                              <div key={index}>
                                <a
                                  href={file.file_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <PictureAsPdfIcon className={styles.icon} />

                                  {/* View PDF */}
                                </a>
                              </div>
                            );
                          }
                        })}
                      </div>
                    </div>
                  </div>
                ))}
                {/* checking End */}
                <div className={styles.talent_vote_video_player_detail_section}>
                  <h3>
                    {/* {title} */}
                    {data?.competetion_name}
                  </h3>
                  <div
                    className={
                      styles.talent_vote_video_player_detail_section_flex
                    }
                  >
                    <p className="small_heading_yellow">
                      {DateFormatter(created_at)}
                    </p>
                    <span className="small_heading">{category}</span>
                    <Link href="" className="small_heading_yellow">
                      {first_name + " " + last_name}
                    </Link>
                  </div>
                </div>

                <h3>Share with friends</h3>
                <div className={styles.social_sec}>
                  <ShareSocial
                    url={`${currentUrl}`}
                    socialTypes={[
                      "facebook",
                      "whatsapp",
                      "twitter",
                      // "youtube",
                    ]}
                    onSocialButtonClicked={(socialType, url) => {
                      console.log("Button clicked:", socialType, url);
                      // Handle the button click event, e.g., open the Facebook share dialog
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        <Footer />
      </div>
    </>
  );
}
