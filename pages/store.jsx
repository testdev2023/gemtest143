import TopBar from "../src/components/TopBar/EntTopBar";
import Footer from "../src/components/Footer/Footer";
import styles from "../talenthunt_styles/AboutCompetition.module.css";
import ScrollToTopButton from "../src/components/ScrollToTopButton/ScrollToTopButton";
import { useEffect, useState } from "react";
import axios from "axios";
import InnerBaner from "../src/components/Baner/innerBaner";
// import { baseUrl } from "../src/config/Config";
import moment from "moment/moment";
import localStorage from "local-storage";
import { useRouter } from "next/router";
// import { toast } from "react-toastify";
import { toast, ToastContainer } from "react-toastify";

export default function Store() {
  const [content, setContent] = useState();
  const [banner, setBanner] = useState();
  // USER Activity
  const router = useRouter();
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
          // `${baseUrl}/api/banners?s[page]=store&s[type]=Landing`
          process.env.NEXT_PUBLIC_BASE_URL +
            "/api/banners?s[page]=store&s[type]=Landing"
        )
        .then((response) => {
          setBanner(response?.data?.response?.data[0]);
        })

        .catch((error) => {
          toast.error(error, { autoClose: 5000 });
        });
    } catch (error) {
      console.log(error);
    }
  };
  const GetContent = async () => {
    try {
      await axios
        .get(
          // `${baseUrl}/api/page/store`
          process.env.NEXT_PUBLIC_BASE_URL + "/api/page/store"
        )
        .then((response) => {
          setContent(response?.data?.response);
        })
        .catch((error) => {
          toast.error(error, { autoClose: 5000 });
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetContent();
    GetBanner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      style={{
        // backgroundColor: "black",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <ScrollToTopButton />
      <TopBar />

      <InnerBaner
        source={
          banner?.file_type == "image" ? banner?.imageURL : banner?.videoURL
        }
        fileType={banner?.file_type}
        headingBanner={banner?.title}
      />
      <div className={styles.about_competition_main}>
        <div className={styles.about_competition_sec2}>
          <div className={styles.about_competition_sec2_sub1}>
            <p dangerouslySetInnerHTML={{ __html: content?.tagline }}></p>
            <div
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: content?.content }}
            ></div>
          </div>
          {content?.thumbnailUrl && (
            <div
              style={{
                backgroundImage: `url(${content.thumbnailUrl})`,
              }}
              className={styles.about_competition_sec2_sub2}
            ></div>
          )}
        </div>
        <ToastContainer className="tost" />
      </div>
      <Footer />
    </div>
  );
}
