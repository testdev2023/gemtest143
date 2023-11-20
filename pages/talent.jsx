import TopBar from "../src/components/TopBar/EntTopBar";
import Footer from "../src/components/Footer/Footer";
import styles from "../talenthunt_styles/AboutCompetition.module.css";
import Link from "next/link";
import Image from "next/image";
import logo1 from "../src/asset/partners/auchanlogo.png";
import logo2 from "../src/asset/partners/yahoologo.png";
import logo3 from "../src/asset/partners/venturebeatlogo.png";
import logo4 from "../src/asset/partners/indiewirelogo.png";
import ScrollToTopButton from "../src/components/ScrollToTopButton/ScrollToTopButton";
import { useEffect, useState } from "react";
import axios from "axios";
// import { baseUrl } from "../src/config/Config";
import Loder from "../src/components/Loder";
import InnerBaner from "../src/components/Baner/innerBaner";
import moment from "moment/moment";
import localStorage from "local-storage";
import { useRouter } from "next/router";
// import { toast } from "react-toastify";
import { toast, ToastContainer } from "react-toastify";

const cardData = [
  {
    id: "1",
    title: "Yahoo",
    sub_title: "The real market",
    image: logo1,
  },
  {
    id: "2",
    title: "Auchan",
    sub_title: "The real market",
    image: logo2,
  },
  {
    id: "3",
    title: "venture beat",
    sub_title: "The real market",
    image: logo3,
  },
  {
    id: "4",
    title: "IndieWire",
    sub_title: "The real market",
    image: logo4,
  },
  {
    id: "5",
    title: "Auchan",
    sub_title: "The real market",
    image: logo1,
  },
  {
    id: "6",
    title: "Yahoo",
    sub_title: "The real market",
    image: logo2,
  },
];

export default function Talent() {
  // USER Activity
  const router = useRouter();
  const [pageName, setPageName] = useState("");
  const [pageURL, setPageURL] = useState("");
  const [localDateTime, setLocalDateTime] = useState([]);
  const [banner, setBanner] = useState();
  const [talentLoader, setTalentLoader] = useState(false);
  const [talentdata, setTalentData] = useState(false);
  const [loder, setLoder] = useState(true);
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
          // `${baseUrl}/api/banners?s[page]=Talents&s[type]=Landing`
          process.env.NEXT_PUBLIC_BASE_URL +
            "/api/banners?s[page]=Talent&s[type]=Landing"
        )
        .then((response) => {
          setBanner(response?.data?.response?.data[0]);
          setTalentLoader(true);
          setLoder(false);
        })
        .catch((error) => {
          // alert(error);
          // toast.error(error);
          toast.error(error, { autoClose: 5000 });
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetBanner();
    GetTalent();
  }, []);
  const GetTalent = async () => {
    try {
      await axios
        .get(
          // `${baseUrl}/api/page/talent`
          process.env.NEXT_PUBLIC_BASE_URL + "/api/page/talent"
        )
        .then((response) => {
          setTalentData(response?.data?.response?.content);
          // console.log(response?.data?.response?.content, "checking talet");

          setTalentLoader(true);
        })
        .catch((error) => {
          // alert(error);
          toast.error(error, { autoClose: 5000 });
        });
    } catch (error) {
      console.log(error);
    }
  };
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
      {!loder || <Loder />}
      {talentLoader ? (
        <>
          {talentLoader ? (
            <InnerBaner
              source={
                banner?.file_type == "image"
                  ? banner?.imageURL
                  : banner?.videoURL
              }
              fileType={banner?.file_type}
              headingBanner={banner?.title}
            />
          ) : (
            ""
          )}

          <div className={styles.about_competition_main}>
            <div className={styles.about_competition_sec2}>
              <div className={styles.about_competition_sec2_talent}>
                {talentdata ? (
                  <span
                    className={styles.content}
                    dangerouslySetInnerHTML={{
                      __html: talentdata,
                    }}
                  ></span>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      <ToastContainer className="tost" />

      <Footer />
    </div>
  );
}
