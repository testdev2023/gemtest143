import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import TopBar from "../src/components/TopBar/EntTopBar";
import MainBaner from "../src/components/Baner/MainBaner";
import AboutBaner from "../src/talenthunt_components/AboutBaner/AboutBaner";
import ApplyBaner from "../src/talenthunt_components/ApplyBaner/ApplyBaner";
import AddBaner from "../src/components/AddBaner/AddBaner";
import LatestProjectsBaner from "../src/talenthunt_components/LatestProjectsBaner/LatestProjectsBaner";
import AboutJurryBaner from "../src/talenthunt_components/AboutJurryBaner/AboutJurryBaner";
import WinnersBaner from "../src/talenthunt_components/WinnersBaner/WinnersBaner";
import PrizesBaner from "../src/talenthunt_components/PrizesBaner/PrizesBaner";
import RulesBaner from "../src/talenthunt_components/RulesAndCriteriaBaner/RulesAndCriteriaBaner";
import NewsLetter from "../src/talenthunt_components/NewsLetter/NewsLetter";
import Footer from "../src/components/Footer/Footer";
import ScrollToTopButton from "../src/components/ScrollToTopButton/ScrollToTopButton";
import axios from "axios";
import moment from "moment/moment";
import localStorage from "local-storage";
import { useRouter } from "next/router";
// import { toast } from "react-toastify";
import { toast, ToastContainer } from "react-toastify";

export default function Talenthunt() {
  const [banner, setBanner] = useState();
  const [sliderSection, setSliderSection] = useState([]);
  const [sliderSectionLoader, setSliderSectionLoader] = useState(false);
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
          // `${baseUrl}/api/landing_page`
          // process.env.NEXT_PUBLIC_BASE_URL + "/api/slider/user-dashboard"
          process.env.NEXT_PUBLIC_BASE_URL + "/api/slider/talent-competition"
        )
        .then((response) => {
          // console.log("data checking", response.data);
          setBanner(response.data);
          setSliderSection(response?.data?.slider_section);

          setSliderSectionLoader(true);
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

  return (
    <>
      {/* <Provider store={store}> */}
      <div className={styles.ent_main}>
        <ScrollToTopButton />
        <TopBar />
        {sliderSectionLoader ? (
          <MainBaner dataBanner={banner?.slider_section} />
        ) : (
          ""
        )}
        <AboutBaner />
        <ApplyBaner />
        <AddBaner page="team" />
        <LatestProjectsBaner />
        <AboutJurryBaner />
        <PrizesBaner />
        <RulesBaner page="home" />
        {/* <NewsLetter /> */}

        <Footer />
        <ToastContainer className="tost" />
      </div>
      {/* </Provider> */}
    </>
  );
}
