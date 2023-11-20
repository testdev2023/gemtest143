import styles from "../talenthunt_styles/ProjectView.module.css";
import TopBar from "../src/components/TopBar/EntTopBar";
import Image from "next/image";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

import { useRouter } from "next/router";
import { reactLocalStorage } from "reactjs-localstorage";
import localStorage from "local-storage";
import ScrollToTopButton from "../src/components/ScrollToTopButton/ScrollToTopButton";

import "react-toastify/dist/ReactToastify.css";
import PauseCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import moment from "moment";
import InnerBaner from "../src/components/Baner/innerBaner";
import Loder from "../src/components/Loder";
import pdfIcon from "../src/asset/icon/PDF_file_icon.svg";
// import { toast } from "react-toastify";
import { toast, ToastContainer } from "react-toastify";

// import { useRouter } from 'next/router';
export default function EditProject() {
  const router = useRouter();
  const { id } = router.query;
  const [dashboardData, setDashboardData] = useState(null);

  const [banner, setBanner] = useState();
  const [bannerLoader, setBannerLoader] = useState(false);
  const [loder, setLoder] = useState(true);

  // checking for stat

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
      }

      setIsPlaying((prevIsPlaying) => {
        const updatedIsPlaying = [...prevIsPlaying];
        updatedIsPlaying[index] = true;
        return updatedIsPlaying;
      });
      setCurrentPlayingIndex(index);
      // videoRef.current[index].play(); // Play the clicked video
      const currentVideo = videoRef.current[index];
      if (currentVideo) {
        currentVideo.play(); // Play the clicked video
      }
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
      // videoRef.current[index].pause(); // Pause the clicked video
      // Check if the video element exists before trying to pause it
      const currentVideo = videoRef.current[index];
      if (currentVideo) {
        currentVideo.pause(); // Pause the clicked video
      }
    }
  };

  useEffect(() => {
    // Initialize the isPlaying state with false for all videos
    setIsPlaying(
      dashboardData ? new Array(dashboardData.length).fill(false) : []
    );
  }, [dashboardData]);

  const DateFormatter = (date) => {
    const formattedDate = moment(date).format("LL");
    return formattedDate;
  };

  const isUserLoggedIn = !!localStorage.get("loginAuth")?.data?.api_token;

  useEffect(() => {
    if (!isUserLoggedIn) {
      // If the user is not logged in, redirect to the login page
      router.push("/login"); // Replace "/login" with your actual login page URL
    } else {
      // If the user is logged in, fetch the page data
      if (id) {
        // Fetch data by ID from your API endpoint
        axios
          .get(
            // `/api/projects/${id}`
            // process.env.NEXT_PUBLIC_BASE_URL +
            //   "/api/member/registered-competitions?competition_id=" +
            //   1,
            process.env.NEXT_PUBLIC_BASE_URL +
              "/api/competition_entries?user_competition_id=" +
              id,
            {
              headers: {
                Authorization:
                  "Bearer " +
                  reactLocalStorage.getObject("loginAuth").data?.api_token,
                "Content-Type": "multipart/form-data",
              },
            }
          ) // Replace this with your API endpoint URL
          .then((response) => {
            setDashboardData(response.data.response.data);
          })
          .catch((error) => {
            console.error("Error fetching project data:", error);
          });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const getFileExtension = (url) => {
    const parts = url.split(".");
    return parts[parts.length - 1].toLowerCase();
  };

  // const GetBanner = async () => {
  //   try {
  //     await axios
  //       .get(
  //         // `${baseUrl}/api/banners?s[page]=talenthunt/submit now&s[type]=Landing`
  //         process.env.NEXT_PUBLIC_BASE_URL +
  //           "/api/banners?s[page]=Project Preview&s[type]=Landing"
  //       )

  //       .then((response) => {
  //         setBanner(response?.data?.response?.data[0]);
  //         setBannerLoader(true);
  //         setLoder(false);
  //       })
  //       .catch((error) => {
  //         // alert(error);
  //                toast.error(error, { autoClose: 5000 });

  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const GetBanner = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/banners?s[page]=Project Preview&s[type]=Landing`
      );

      setBanner(response?.data?.response?.data[0]);
      setBannerLoader(true);
      setLoder(false);
    } catch (error) {
      toast.error(error, { autoClose: 5000 });

      // Handle the error (e.g., show an error message).
    }
  };
  useEffect(() => {
    GetBanner();
  }, []);

  return (
    <>
      {!loder || <Loder />}
      <div className={styles.submit_now_main}>
        <ScrollToTopButton />
        <TopBar />
        {bannerLoader ? (
          <InnerBaner
            source={
              banner?.file_type == "image" ? banner?.imageURL : banner?.videoURL
            }
            fileType={banner?.file_type}
            headingBanner={banner?.title}
          />
        ) : (
          ""
        )}

        <div className={styles.project_submit_sec}>
          {/* testing */}

          {dashboardData?.map((item, i) => (
            <div className={styles.card} key={i}>
              <div className={styles.flex}>
                {/* <h3>Title :</h3> */}
                <h3 className={styles.dashboard_card_raping}>{item.title}</h3>
              </div>
              <div className={styles.flex}>
                <h3 className={styles.dashboard_card_raping}>
                  {item?.competition?.title}
                </h3>
              </div>
              <div className={styles.flex}>
                <div className={styles.flex}>
                  {/* <h3>Category :</h3> */}
                  <h4 className={styles.dashboard_card_singing}>
                    {item.category?.name}
                    {/* {item?.} */}
                  </h4>
                </div>
                <div className={styles.flex}>
                  {/* <h5>Date of Submission:</h5> */}
                  <p className="small_heading_yellow">
                    {DateFormatter(item.created_at)}
                  </p>
                </div>
              </div>
              <div className={styles.video_di}>
                {/* Video file */}
                {item.files.map((file, index) => {
                  const fileExtension = getFileExtension(file.file_url);
                  if (fileExtension === "mp4" || fileExtension === "webm") {
                    return (
                      <>
                        <div className={styles.video_parent} key={index}>
                          <video
                            className={styles.video_div}
                            id={`video-${index}`}
                            key={index}
                            // className={styles.dashboard_card_image_sizing}
                            width="100%"
                            height="100%"
                            controls={isPlaying[index]}
                            muted
                            poster={item.cover_image}
                            ref={(ref) => (videoRef.current[index] = ref)}
                            onError={(e) => {
                              console.error(
                                "Video playback error:",
                                e.target.error
                              );
                            }}
                          >
                            <source
                              src={file.file_url}
                              type={`video/${fileExtension}`}
                            />
                          </video>
                          <div
                            className={styles.playIcon}
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
                        </div>
                      </>
                    );
                  }
                  return null;
                })}

                {item.files.every((file) => {
                  const fileExtension = getFileExtension(file.file_url);
                  return fileExtension !== "mp4" && fileExtension !== "webm";
                }) && (
                  <div className={styles.dashboard_card_image_sizing}>
                    <Image
                      src={item.cover_image}
                      alt=""
                      width={1400}
                      height={900}
                    />
                  </div>
                )}
                {/* Audio file */}

                {/* PDF file */}

                {/* PDF file */}
                {/* {item.files.map((file, index) => {
                  const fileExtension = getFileExtension(file.file_url);
                  if (fileExtension === "pdf") {
                    return (
                      <div key={index}>
                        <iframe
                          src={file.file_url}
                          title={`PDF Preview ${index}`}
                          width="100%"
                          height="500px" // Set the desired height for the viewer
                        />
                      </div>
                    );
                  }
                })} */}

                {/* <video
                className={styles.dashboard_card_image_sizing}
                width="100%"
                height="100%"
                controls={isPlaying[i]}
                poster={item.cover_image}
                ref={(ref) => (videoRef.current[i] = ref)}
                onEnded={() => handlePause(i)}
                onPause={() => handlePause(i)}
              >
                <source src={item.files[0]?.file_url} type="video/mp4" />
              </video> */}

                <div className={styles.discription}>
                  <span className={styles.dashboard_card_paragraph}>
                    {item.brief}
                  </span>
                </div>
                <h3>Other attachments</h3>
                <div className={styles.flex}>
                  {item.files.map((file, index) => {
                    const fileExtension = getFileExtension(file.file_url);
                    if (fileExtension === "mp3" || fileExtension === "wav") {
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
                            <Image
                              src={pdfIcon}
                              alt="pdfIcon"
                              className={styles.icon}
                            />
                            {/* <PictureAsPdfIcon className={styles.icon} /> */}

                            {/* View PDF */}
                          </a>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>

              <div className={styles.card_child}>
                {/* <h2 className={styles.dashboard_card_raping}>{item.title}</h2> */}

                <div className={styles.flex}>
                  <h4>Status :</h4>
                  <h4>{item.status}</h4>
                </div>

                <div>
                  {item.competition_payments.map((paye, iy) => {
                    if (paye?.status === "paid" && paye?.bank_name !== null) {
                      return (
                        <div className={styles.bank_section} key={iy}>
                          {console.log(paye, "checking")}
                          <h3>Bank recept</h3>
                          <Image
                            className={styles.bank_recept}
                            src={paye?.payment_slip}
                            alt="Description of the image"
                            width={10000}
                            height={10000}
                          />
                          <div className={styles.flex}>
                            <div className={styles.flex}>
                              <h3>Bank Name :</h3>
                              <h4>{paye?.bank_name}</h4>
                            </div>
                            <div className={styles.flex}>
                              <h3>Amount :</h3>
                              <h4>{paye?.amount}</h4>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
        <ToastContainer className="tost" />
      </div>
    </>
  );
}
