/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import styles from "../../../talenthunt_styles/UserProfile.module.css";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { reactLocalStorage } from "reactjs-localstorage";
import axios from "axios";
import moment from "moment/moment";
import { Tune } from "@material-ui/icons";
import Image from "next/image";
import profilevector from "../../asset/profile_vector.png";
// import { baseUrl } from "../../config/Config";
// import { useRouter } from "next/router";
const Profile = ({ setProfile, setEditProfile, setEditPicture }) => {
  const [user, setUser] = useState(null);
  const [userLoader, setUserLoader] = useState(false);
  // const router = useRouter(); // Add this line
  // const [reloadTriggered, setReloadTriggered] = useState(false);
  // const [reloadPage, setReloadPage] = useState(false);
  const show = () => {
    setProfile(false);
    setEditProfile(true);
    setEditPicture(true);
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
        setUser(response.data.data);

        setUserLoader(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // useEffect(() => {
  //   getUser();
  // }, [user]);
  useEffect(() => {
    getUser();

    // Check for the 'reload' query parameter
  }, []);
  // useEffect(() => {
  //   // Reload the page if reloadPage is true
  //   if (reloadPage) {
  //     router.push("/userprofile?reload=true");
  //   }
  // }, [reloadPage, router]);

  const DateFormatter = (date) => {
    const formattedDate = moment(date).format("LL");
    return formattedDate;
  };

  return (
    <div className={styles.user_profile_main_sec3_parent}>
      {userLoader ? (
        <div className={styles.user_profile_main_sec3}>
          <div className={styles.user_profile_main_sec3_sub}>
            <h3 className="yellow">Profile</h3>
            <button onClick={show}>
              <BorderColorIcon />
              <span>Edit</span>
            </button>
          </div>
          {/* {console.log(user.photoURL, "ürl")} */}
          {user?.photoURL.endsWith(".jpg") ||
          user?.photoURL.endsWith(".png") ? (
            <Image
              width={1000}
              height={1000}
              style={{
                borderRadius: "50%",
                border: "1px solid black",
                height: "150px",
                width: "150px",
              }}
              // loading="lazy"
              priority={true}
              src={user?.photoURL}
              alt="user-images"
            />
          ) : (
            <Image
              width={1000}
              height={1000}
              style={{
                borderRadius: "50%",
                border: "1px solid black",
                height: "30%",
                width: "20%",
              }}
              // loading="lazy"
              priority={true}
              src={profilevector}
              alt="user"
            />
          )}

          <div className={styles.user_profile_main_sec3_sub1}>
            <p className={styles.key}>Full name</p>
            <p className={styles.value}>
              {/* {user?.first_name + " " + user?.last_name} */}
              {user?.first_name + (user?.last_name ? " " + user.last_name : "")}
            </p>
          </div>
          <div className={styles.user_profile_main_sec3_sub1}>
            <p className={styles.key}>Email</p>
            <p className={styles.value}>{user?.email}</p>
          </div>
          <div className={styles.user_profile_main_sec3_sub1}>
            <p className={styles.key}>Phone</p>
            <p className={styles.value}>{user?.phone}</p>
          </div>
          <div className={styles.user_profile_main_sec3_sub1}>
            <p className={styles.key}>Country</p>
            <p className={styles.value}>{user?.country}</p>
          </div>
          <div className={styles.user_profile_main_sec3_sub1}>
            <p className={styles.key}>City</p>
            <p className={styles.value}>{user?.city}</p>
          </div>
          <div className={styles.user_profile_main_sec3_sub1}>
            <p className={styles.key}>Date of birth</p>
            <p className={styles.value}>{DateFormatter(user?.dob)}</p>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Profile;
