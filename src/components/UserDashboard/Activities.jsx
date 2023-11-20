import React, { useEffect, useState } from "react";
import styles from "../../../styles/ProfileCard.module.css";
// import { baseUrl } from "../../config/Config";
import { reactLocalStorage } from "reactjs-localstorage";
import localStorage from "local-storage";
import axios from "axios";
import moment from "moment/moment";
import { useRouter } from "next/router";
// import { toast } from "react-toastify";
import { toast, ToastContainer } from "react-toastify";

const Activities = () => {
  const router = useRouter();
  const userToken = localStorage.get("loginAuth")?.data?.api_token;
  const [activites, setActivites] = useState(null);
  const [activitesLoader, setActivitesLoader] = useState(false);
  const [loder, setLoder] = useState(true);

  // const datetime = (dtStr) => {
  //   let dt = moment.utc(dtStr);
  //   let formattedDtStr = dt.format("MMM DD, YYYY");
  //   return formattedDtStr;
  // };
  const datetime = (dtStr) => {
    let dt = moment.utc(dtStr, "MM/DD/YYYY hh:mm A");
    let formattedDtStr = dt.format("MMM DD,YYYY");
    return formattedDtStr;
  };
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(reactLocalStorage.getObject("loginAuth").data);
  }, []);

  const AllActivities = async () => {
    try {
      const response = await axios.get(
        // `${baseUrl}/api/member/user-activity`
        process.env.NEXT_PUBLIC_BASE_URL + "/api/member/user-activity",
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      if (response?.data?.status === true) {
        setActivites(response?.data?.data);

        setActivitesLoader(true);
        setLoder(false);
      }
    } catch (error) {
      console.error(error);
      // alert(error.message);
      toast.error(error.message, {
        autoClose: 5000,
      });
    }
  };

  const isUserLoggedIn = !!localStorage.get("loginAuth")?.data?.api_token;

  useEffect(() => {
    if (!isUserLoggedIn) {
      // If the user is not logged in, redirect to the login page
      router.push("/login"); // Replace "/login" with your actual login page URL
    } else {
      // If the user is logged in, fetch the page data
      AllActivities();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // useEffect(() => {
  //   AllActivities();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div className={styles.activities_parent}>
      {activitesLoader ? (
        <>
          <h2 className="yellow">Latest Activities</h2>

          {activites &&
            // activites.map((items, index) => (
            activites.slice(0, 5).map((items, index) => (
              <div key={index} className={styles.flex2}>
                {/* <p className={styles.date}>{datetime(items.created_at)}</p> */}
                <p className="small_heading">{datetime(items.date_time)}</p>

                <p>{items.page_name}</p>
                <span
                  className="small_heading_yellow"
                  onClick={() => {
                    router.push(items.page_url);
                  }}
                >
                  {/* {items?.page_url} */}
                  View
                </span>
              </div>
            ))}
        </>
      ) : (
        ""
      )}
      <ToastContainer className="tost" />
    </div>
  );
};

export default Activities;
