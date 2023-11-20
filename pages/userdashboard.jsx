import React from "react";
import { useEffect, useState } from "react";

import TopBar from "../src/components/TopBar/EntTopBar";
import ProfileCard from "../src/components/UserDashboard/ProfileCard";
import styles from "../styles/ProfileCard.module.css";
import Activities from "../src/components/UserDashboard/Activities";
import Stats from "../src/components/UserDashboard/Stats";
import LatestOffer from "../src/components/UserDashboard/LatestOffer";
import LatestEvents from "../src/components/UserDashboard/LatestEvents";
import Footer from "../src/components/Footer/Footer";
import Referrel from "../src/components/UserDashboard/Referrel";
import UserDashboardBanner from "../src/components/Baner/UserDashboardBanner";
import axios from "axios";
import Loder from "../src/components/Loder";
import moment from "moment/moment";
import localStorage from "local-storage";
import { useRouter } from "next/router";
// import { toast } from "react-toastify";
import { toast, ToastContainer } from "react-toastify";

const UserDashboard = () => {
  const [banner, setBanner] = useState();
  const [loder, setLoder] = useState(true);
  const [sliderSection, setSliderSection] = useState([]);
  const [sliderSectionLoader, setSliderSectionLoader] = useState(false);
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
          process.env.NEXT_PUBLIC_BASE_URL +
            "/api/user_dashboard_slider/user-dashboard"
        )
        .then((response) => {
          // console.log("data checking", response.data);
          setBanner(response.data);
          setSliderSection(response?.data?.slider_section);
          console.log(response?.data?.slider_section);
          setLoder(false);

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

  // useEffect(() => {
  //   GetBanner();
  // }, []);
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
  return (
    <div className={styles.gparent}>
      <TopBar />
      {!loder || <Loder />}
      <div className={styles.parent}>
        <div className={styles.sub_parent}>
          {sliderSectionLoader ? (
            <UserDashboardBanner dataBanner={banner?.slider_section} />
          ) : (
            ""
          )}
          <Referrel />
        </div>
        <ProfileCard />
      </div>

      <div className={styles.parent1}>
        <Stats />
      </div>

      <div className={styles.parent1}>
        <Activities />
      </div>

      <div className={styles.parent1}>
        <LatestOffer />
        <LatestEvents />
      </div>
      <ToastContainer className="tost" />

      <Footer />
    </div>
  );
};

export default UserDashboard;
