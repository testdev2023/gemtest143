/* eslint-disable @next/next/no-img-element */
import TopBar from "../src/components/TopBar/EntTopBar";
import Footer from "../src/components/Footer/Footer";
import styles from "../talenthunt_styles/CompitationEntry.module.css";
import React, { useEffect, useState, useRef } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import ScrollToTopButton from "../src/components/ScrollToTopButton/ScrollToTopButton";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import Loder from "../src/components/Loder";
import InnerBaner from "../src/components/Baner/innerBaner";
import localStorage from "local-storage";

export default function Dashboard() {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState(null);
  const [competetions, setCompetetions] = useState();
  const [fee, setFee] = useState();
  const [banner, setBanner] = useState();
  const [loder, setLoder] = useState(true);
  // USER Activity

  const [pageName, setPageName] = useState("");
  const [pageURL, setPageURL] = useState("");
  const [localDateTime, setLocalDateTime] = useState([]);
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
          // `${baseUrl}/api/banners?s[page]=Benefits&s[type]=Landing`
          process.env.NEXT_PUBLIC_BASE_URL +
            // "/api/banners?s[page]=user dashboard&s[type]=Landing"
            "/api/banners?/competition entry[type]=Landing"
        )
        .then((response) => {
          setBanner(response?.data?.response?.data[0]);
          console.log(response?.data?.response?.data[0]);
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
  }, []);
  const getCompetetions = () => {
    axios
      .get(
        // `${baseUrl}/api/competitions`
        process.env.NEXT_PUBLIC_BASE_URL + "/api/competitions",

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
        setCompetetions(
          response?.data?.response?.data.filter(
            (obj) => obj.status === "Active"
          )
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getDashboard = () => {
    axios
      .get(
        // `${baseUrl}/api/member/registered-competitions?competition_id=${1}`
        process.env.NEXT_PUBLIC_BASE_URL +
          "/api/member/registered-competitions?competition_id=" +
          1,

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
        setDashboardData(response.data.response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (id) => {
    axios
      .get(
        // `${baseUrl}/api/member/user-competition/delete?user_competition_id=${id}`
        process.env.NEXT_PUBLIC_BASE_URL +
          "/api/member/user-competition/delete?user_competition_id=" +
          id,

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
        setTimeout(() => {
          router.push("competitionentry");
        }, 6000);
      })
      .catch((error) => {
        toast.error(error, { autoClose: 5000 });
      });
  };

  const handlePay = async (competetion_id, id, category_id, title, brief) => {
    const matchingObject = await competetions?.find(
      (obj) => obj.id == competetion_id
    );
    setFee(matchingObject?.fee);
    setTimeout(() => {
      router.push({
        pathname: "payment",
        query: {
          user_competetion_id: id,
          competetion_id: competetion_id,
          competetion_category: category_id,
          competetion_title: title,
          competetion_brief: brief,
          competetion_fees: matchingObject.fee,
        },
      });
    }, 2000);
  };

  const DateFormatter = (date) => {
    const formattedDate = moment(date).format("LL");
    return formattedDate;
  };

  useEffect(() => {
    getDashboard();
    getCompetetions();
  }, []);

  const videoRef = useRef([]);
  const [isPlaying, setIsPlaying] = useState(
    dashboardData ? new Array(dashboardData.length).fill(false) : []
  );
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState(-1);

  const handlePlay = (index) => {
    if (currentPlayingIndex !== index) {
      if (currentPlayingIndex !== -1) {
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

  return (
    <div className={styles.dashboard_container}>
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

      <div className={styles.section2}>
        {dashboardData ? (
          dashboardData?.map((item, i) => (
            <div className={styles.card} key={i}>
              {/* >>>>>>>>>>>>>>>>>>>> play button >>>>>>>>>>>>>>>> */}

              <div
                className={styles.play_div}
                // onClick={isPlaying ? handlePause : handlePlay}
                onClick={() => (isPlaying[i] ? handlePause(i) : handlePlay(i))}
              >
                {!isPlaying[i] && (
                  <PlayCircleOutlineIcon
                    className={styles.dashboard_video_icon}
                  />
                )}
              </div>

              {/* >>>>>>>>>>>>>>>>>>>> play button end >>>>>>>>>>>>>>>> */}
              <div className={styles.video_div}>
                <video
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
                </video>
              </div>
              <div className={styles.card_child}>
                <h2 className={styles.dashboard_card_raping}>{item.title}</h2>

                <h3 className={styles.dashboard_card_singing}>
                  {item.category?.name}
                </h3>

                <div className={styles.discription}>
                  <span className={styles.dashboard_card_paragraph}>
                    {item.brief}
                  </span>
                </div>
                <div className={styles.flex}>
                  <h4>Status :</h4>
                  <h5>{item.status}</h5>
                </div>
                <div className={styles.flex}>
                  <h4>Date of Submission:</h4>
                  <h5>{DateFormatter(item.created_at)}</h5>
                </div>

                {/* >>>>>>>>>>>>>>>>>>>>>. buttons >>>>>>>>>>>>>>>>>>>>>>>> */}

                <div className={styles.dashboard_editsection}>
                  {item.status === "Un Paid" ? (
                    <>
                      <button className={styles.dashboard_Editbtn}>
                        <Link
                          href={{
                            pathname: "/editproject",
                            query: {
                              competetion_files: JSON.stringify(item.files),
                              competetion_id: item.id,
                              competetion_category: item.category?.name,
                              competetion_title: item.title,
                              competetion_brief: item.brief,
                              competetion_cover_image: item.cover_image,
                            },
                          }}
                        >
                          Edit
                        </Link>
                      </button>
                      <button
                        className={styles.dashboard_Editbtn}
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                      <button
                        className={styles.dashboard_Editbtn}
                        onClick={() =>
                          handlePay(
                            item.competition_id,
                            item.id,
                            item.category_id,
                            item.title,
                            item.brief
                          )
                        }
                      >
                        Pay Now
                      </button>
                    </>
                  ) : null}
                </div>

                {/* >>>>>>>>>>>>>>>>>>>>>. buttons end >>>>>>>>>>>>>>>>>>>>>>>> */}
              </div>
            </div>
          ))
        ) : (
          <>
            <p>Submit your responsis</p>
          </>
        )}
      </div>

      <ToastContainer className="tost" />
      {/* <ToastContainer /> */}
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  const res2 = await axios.get(
    // `${baseUrl}/api/competitions`
    process.env.NEXT_PUBLIC_BASE_URL + "/api/competitions"
  );
  const data2 = res2?.data?.response?.data.filter(
    (obj) => obj.status === "Active"
  );

  return { props: { data2 } };
}
