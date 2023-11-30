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
              <div style="display: flex; justify-content: center; align-items: center; flex-wrap: wrap; text-align: center;">
<div style="flex: 1; padding: 10px;"><img style="max-width: 100%; height: auto;" src="your-image-source.jpg" alt="Your Image" /></div>

<div style="flex: 1; padding: 10px;">
<h1 style="font-family: 'Josefin Sans', sans-serif; color: #f1c40f;"><strong>UNITING GEMS</strong></h1>
<h1 style="font-family: 'Josefin Sans', sans-serif; color: #f1c40f;">10,000,000</h1>
<p style="font-family: 'Josefin Sans', sans-serif; font-size: 14pt;">OUR GOAL IS TO UNITE 10 MILLION GEMS LIKE YOU GLOBALLY AS STAKEHOLDERS OF THE COMPANY BY 2030.</p>
<span style="color: #f1c40f; font-family: 'Josefin Sans', sans-serif; font-size: 18pt;">#IAMGEMGLOBAL</span></div>
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
