import React, { useEffect, useState } from "react";
import styles from "../../../styles/ProfileCard.module.css";
import Image from "next/image";
import logo from "../../asset/gemlogo.png";
// import { baseUrl } from "../../config/Config";
import { reactLocalStorage } from "reactjs-localstorage";
import localStorage from "local-storage";
// import profilevector from "../../asset/icon/profile_vector.jpg";
import profilevector from "../../asset/profile_vector.png";
import axios from "axios";
import { useRouter } from "next/router";
import PopUp from "../PopUp/PopUp";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const ProfileCard = () => {
  const router = useRouter();

  const [profileImage, setProfileImage] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userDashboardData, setUserDashboardData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userDataLoader, setUserDataLoader] = useState(false);

  const handleUpgradeClick = () => {
    // Perform the upgrade action here

    // Show a success toast
    toast.warning("Stay tuned, this feature is coming soon.", {
      // position: toast.POSITION.TOP_CENTER,
    });
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
        console.log(response?.data?.data?.photoURL, "url");

        setUserName(response?.data?.data?.first_name);
        setUserData(response?.data?.data);
        setUserDataLoader(true);
        // console.log(userData, "chexkng userdata");
      })
      .catch((error) => {
        // alert(error.response?.data?.message || "An error occurred");
        toast.error(error.response?.data?.message || "An error occurred", {
          autoClose: 5000,
        });
      });
  };
  const getUserDashboard = () => {
    axios
      .get(
        // `${baseUrl}/api/member/user-dashboard`
        process.env.NEXT_PUBLIC_BASE_URL + "/api/member/user-dashboard",
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
        setUserDashboardData(response?.data?.response);
      })
      .catch((error) => {
        // alert(error.response?.data?.message || "An error occurred");
        toast.error(error.response?.data?.message || "An error occurred", {
          autoClose: 5000,
        });
      });
  };
  const isUserLoggedIn = !!localStorage.get("loginAuth")?.data?.api_token;

  useEffect(() => {
    if (!isUserLoggedIn) {
      // If the user is not logged in, redirect to the login page
      router.push("/login"); // Replace "/login" with your actual login page URL
    } else {
      // If the user is logged in, fetch the page data
      getUser();
      getUserDashboard();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // useEffect(() => {
  //   getUser();
  //   getUserDashboard();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <>
      <div className={styles.wrapper}>
        {userDataLoader ? (
          <>
            {userData?.status === "Active" ? (
              <h3 style={{ textTransform: "capitalize" }}>
                Welcome {userName}
              </h3>
            ) : (
              <h3>Welcome USERNAME</h3>
            )}

            <div className={styles.profile}>
              {console.log(userData?.photoURL, "user data ")}
              {/* {userData?.status === "Active" && profileImage ? ( */}

              {(userData?.status === "Active" &&
                profileImage?.endsWith(".jpg")) ||
              (userData?.status === "Active" &&
                profileImage?.endsWith(".png")) ? (
                <Link href="/userprofile">
                  <Image
                    width={1000}
                    height={1000}
                    src={profileImage}
                    className="thumbnail"
                    alt="profile Card"
                    // loading="lazy"
                    priority={true}
                  />
                </Link>
              ) : (
                <Link href="/userprofile">
                  <Image
                    width={1000}
                    height={1000}
                    src={profilevector}
                    // loading="lazy"
                    priority={true}
                    alt="logo"
                  />
                </Link>
              )}

              <div className={styles.check}>
                <Image
                  width={1000}
                  height={1000}
                  src={logo}
                  // loading="lazy"
                  priority={true}
                  alt="logo"
                />
              </div>
              <div className={styles.flex}>
                <div
                  onClick={() => {
                    // setLoder(true);
                    router.push({
                      pathname: "/rewards",
                    });
                  }}
                >
                  <h4>Rewards</h4>

                  {userDashboardData?.status === 1 ? (
                    <p>{userDashboardData?.rewards}</p>
                  ) : (
                    <p>-</p>
                  )}
                </div>
                <div
                  onClick={() => {
                    // setLoder(true);
                    router.push({
                      pathname: "/refferel",
                    });
                  }}
                >
                  <h4>Referrels</h4>

                  {userDashboardData?.status === 1 ? (
                    <p>{userDashboardData?.referrels}</p>
                  ) : (
                    <p>-</p>
                  )}
                </div>
              </div>

              <div className={styles.status_parent}>
                <div className={styles.flex1}>
                  <h4>Status :</h4>

                  {userDashboardData?.status === 1 ? (
                    <p>Basic Member</p>
                  ) : (
                    <p>-</p>
                  )}
                </div>
                <button onClick={handleUpgradeClick} className={styles.status}>
                  Upgrade Subscription
                </button>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
      {/* <ToastContainer /> Add this line to render the toast notifications */}
      <ToastContainer className="tost" />
    </>
  );
};

export default ProfileCard;
