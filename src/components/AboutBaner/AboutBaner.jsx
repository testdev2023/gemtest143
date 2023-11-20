import React, { useEffect, useState } from "react";
import styles from "../../../styles/AboutBaner.module.css";
import axios from "axios";
// import { baseUrl } from "../../../src/config/Config";
import Loder from "../Loder";
// import { toast } from "react-toastify";
import { toast, ToastContainer } from "react-toastify";

export default function AboutBanner() {
  const [banner, setBanner] = useState(null);
  const [bannerLoader, setBannerLoader] = useState(false);

  const fetchBanner = async () => {
    try {
      const response = await axios.get(
        // `${baseUrl}/api/landing_page`

        process.env.NEXT_PUBLIC_BASE_URL + "/api/landing_page"
      );
      console.log(response.data);
      setBanner(response.data);
      setBannerLoader(true);
      // console.log(response.data ,"data checking ");
    } catch (error) {
      console.log(error);
      // alert("Failed to fetch banner data");
      toast.error("Failed to fetch banner data", { autoClose: 5000 });
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  return (
    <>
      {bannerLoader ? (
        <>
          {banner && (
            <div className={styles.about_baner_main}>
              <div className={styles.about_baner_sec1}>
                <h2 className="yellow">{banner?.about_section.title}</h2>
              </div>

              <div className={styles.about_baner_sec2}>
                <div className={styles.about_baner_sec2_sub1}>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: banner?.about_section?.description,
                    }}
                  ></span>
                </div>
              </div>
            </div>
          )}
          <ToastContainer className="tost" />
        </>
      ) : (
        ""
      )}
    </>
  );
}
