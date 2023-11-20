/* eslint-disable @next/next/no-img-element */
import styles from "../talenthunt_styles/AboutJurry.module.css";
import Image from "next/image";
import Footer from "../src/components/Footer/Footer";
import TopBar from "../src/components/TopBar/EntTopBar";
import axios from "axios";
import { useEffect, useState } from "react";
import ScrollToTopButton from "../src/components/ScrollToTopButton/ScrollToTopButton";
import Loder from "../src/components/Loder";
import InnerBaner from "../src/components/Baner/innerBaner";
import moment from "moment/moment";
import localStorage from "local-storage";
import { useRouter } from "next/router";
import { Box, Modal } from "@mui/material";

import { toast, ToastContainer } from "react-toastify";

export default function AboutJurry(props) {
  const [jury, setJury] = useState([]);
  const [banner, setBanner] = useState();
  const [aboutjurryLoader, setAboutJurryLoader] = useState(false);
  const [loder, setLoder] = useState(true);
  // USER Activity
  const router = useRouter();
  const [pageName, setPageName] = useState("");
  const [pageURL, setPageURL] = useState("");
  const [localDateTime, setLocalDateTime] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [open, setOpen] = useState(false);
  const [allcompetition, setAllCompetition] = useState([]);

  const handleOpenClose = () => setOpen(!open);

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
            "/api/banners?s[page]=Jury & Mentors&s[type]=Landing"
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

  const isUserLoggedIn = !!localStorage.get("loginAuth")?.data?.api_token;

  useEffect(() => {
    if (!isUserLoggedIn) {
      // If the user is not logged in, redirect to the login page
      router.push("/login"); // Replace "/login" with your actual login page URL
    } else {
      // If the user is logged in, fetch the page data
      GetBanner();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    // console.log(props.data.response.data);
    setJury(props.data.response.data);
    setAboutJurryLoader(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function stripHtmlTags(htmlString) {
    return htmlString?.replace(/(<([^>]+)>)/gi, "");
  }

  const GetJurry = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/competition-jury-all"
      );
      // console.log(response?.data?.response?.data, "chrcking");

      if (response?.data?.status === true) {
        setAllCompetition(response?.data?.response?.data);
        console.log(response?.data?.response?.data);
        setJury(response?.data?.response?.data[0]?.competition_winner);
      } else {
        // Handle the case where the status is not active
        console.log("Competition prizes are not currently active.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetJurry();
  }, []);
  return (
    <div className={styles.about_jurry_main}>
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

      {aboutjurryLoader ? (
        <div className={styles.about_jury_sec1}>
          {allcompetition?.map((competitions) => (
            <div className={styles.about_jury_sec2} key={competitions.id}>
              <h2 className="yellow">{competitions?.title}</h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: competitions?.short_description,
                }}
              ></p>
              <div className={styles.about_jury_sec3}>
                {competitions?.competition_jury?.map((jury) => (
                  <div
                    className={styles.card}
                    key={jury.id}
                    onClick={() => {
                      handleOpenClose();
                      setModalData(jury);
                    }}
                  >
                    <div className={styles.about_jury_img_div} key={jury.id}>
                      <Image
                        width={10000}
                        height={10000}
                        className={styles.about_jury_alexendradoe_image}
                        src={jury?.picture}
                        loading="lazy"
                        alt={jury.name}
                      />
                    </div>

                    <div className={styles.about_jury_content}>
                      <p className="name_heading">{jury?.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}

      {/* <<<<<<<<<<<<<<<<<<<< card modal >>>>>>>>>>>>>>>>>>>>*/}

      <Modal
        open={open}
        onClose={handleOpenClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.box}>
          <div className={styles.btn_div_mob}>
            <button
              className={styles.unitX_mob}
              variant="contained"
              onClick={() => {
                handleOpenClose();
                setModalData(null);
              }}
            >
              X
            </button>
          </div>
          <div className={styles.box_left_child}>
            <Image
              width={1000}
              height={1000}
              className={styles.team_modal_image}
              src={modalData?.picture}
              alt={modalData?.picture}
              priority={true}
            />
          </div>

          <div className={styles.box_right_child}>
            <div className={styles.btn_div}>
              <button
                className={styles.unitX}
                variant="contained"
                onClick={() => {
                  handleOpenClose();
                  setModalData(null);
                }}
              >
                X
              </button>
            </div>
            <div className={styles.modal_data}>
              <h4 className={styles.modal_name}>{modalData?.name}</h4>
              <p
                className={styles.modal_discription}
                // dangerouslySetInnerHTML={{ __html: modalData?.description }}
              >
                <div
                  className={styles.modal_discription}
                  dangerouslySetInnerHTML={{ __html: modalData?.description }}
                ></div>
              </p>
            </div>
          </div>
        </Box>
      </Modal>
      <ToastContainer className="tost" />

      <Footer />
    </div>
  );
}
export async function getServerSideProps() {
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL +
      // "/api/competition-jury?competition_id=" +
      // 1
      "/api/competition-jury-all"
  );
  const data = res.data;
  console.log("checking", data);
  return { props: { data } };
}
