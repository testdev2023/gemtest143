import React, { useState } from "react";
// import React from "";
import styles from "../talenthunt_styles/UserProfile.module.css";
import TopBar from "../src/components/TopBar/EntTopBar";
// import Profile from "../src/talenthunt_components/Profile/profile";
import Profile from "../src/talenthunt_components/Profile/Profile";
import EditProfile from "../src/talenthunt_components/Profile/EditProfile";
import EditPicture from "../src/talenthunt_components/Profile/EditPicture";
import { useEffect } from "react";
import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";

import Loder from "../src/components/Loder";
import moment from "moment/moment";
import localStorage from "local-storage";
import { useRouter } from "next/router";

const UserProfile = () => {
  const [profile, setProfile] = useState(true);
  const [editProfile, setEditProfile] = useState(false);
  const [editPicrure, setEditPicture] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [loder, setLoder] = useState(true);
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
  const getUser = () => {
    axios
      .get(
        // `${baseUrl}/api/member/user_profile`
        process.env.NEXT_PUBLIC_BASE_URL + "/api/member/user_profile",
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
        setProfileImage(response?.data?.data?.photoURL);
        setLoder(false);
        // console.log(response?.data?.data?.photoURL);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // useEffect(() => {
  //   const userToken = reactLocalStorage.getObject("loginAuth").data?.api_token;
  //   if (userToken) {
  //     getUser();
  //   }
  // }, []);

  const isUserLoggedIn = !!localStorage.get("loginAuth")?.data?.api_token;

  useEffect(() => {
    if (!isUserLoggedIn) {
      // If the user is not logged in, redirect to the login page
      router.push("/login"); // Replace "/login" with your actual login page URL
    } else {
      // If the user is logged in, fetch the page data
      const userToken =
        reactLocalStorage.getObject("loginAuth").data?.api_token;
      if (userToken) {
        getUser();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={styles.user_profile_main}>
      {!loder || <Loder />}
      <TopBar />
      <div className={styles.user_profile_main_sec1}>
        <h2 className="yellow">Member profile</h2>
      </div>
      <>
        {!editPicrure || (
          <EditPicture
            setProfile={setProfile}
            setEditProfile={setEditProfile}
            setEditPicture={setEditPicture}
            profileImage={profileImage}
          />
        )}

        {!editProfile || (
          <EditProfile
            setProfile={setProfile}
            setEditProfile={setEditProfile}
            setEditPicture={setEditPicture}
            profileImage={profileImage}
          />
        )}
      </>

      {!profile || (
        <Profile
          setProfile={setProfile}
          setEditProfile={setEditProfile}
          setEditPicture={setEditPicture}
        />
      )}

      {/* <Footer /> */}
    </div>
  );
};

export default UserProfile;
