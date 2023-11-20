import TopBar from "../src/components/TopBar/EntTopBar";
import Footer from "../src/components/Footer/Footer";
import styles from "../styles/TermsAndConditions.module.css";
import ScrollToTopButton from "../src/components/ScrollToTopButton/ScrollToTopButton";
import axios from "axios";
import { useEffect, useState } from "react";

import Loder from "../src/components/Loder";
import InnerBaner from "../src/components/Baner/innerBaner";
// import { toast } from "react-toastify";
import { toast, ToastContainer } from "react-toastify";

export default function Overview() {
  const [content, setContent] = useState(null);
  const [banner, setBanner] = useState(null);
  const [loder, setLoder] = useState(true);
  // const [partnersLoader, setPartnersLoader] = useState(false);
  const [contentLoader, setContentLoader] = useState(false);

  const GetBanner = async () => {
    try {
      await axios
        .get(
          // `${baseUrl}/api/banners?s[page]=Partners&s[type]=Landing`

          process.env.NEXT_PUBLIC_BASE_URL +
            "/api/banners?s[page]=Competition Terms&s[type]=Landing"
        )
        .then((response) => {
          setBanner(response?.data?.response?.data[0]);
          setLoder(false);
          setContentLoader(true);
        })
        .catch((error) => {
          // alert(error);
          toast.error(error, { autoClose: 5000 });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const GetContent = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL +
          "/api/page/terms-and-conditions-for-competition"
      );
      setContent(response?.data?.response);
      setContentLoader(true);
    } catch (error) {
      console.error("Error fetching content:", error);
      setContent(null);
      setPartnersLoader(true);
    }
  };

  useEffect(() => {
    GetBanner();
    GetContent();
  }, []);
  const backgroundImageUrl = content?.thumbnailUrl || ""; // Use empty string as default if thumbnailUrl is undefined

  return (
    <>
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

        {contentLoader ? (
          <>
            <InnerBaner
              source={
                banner?.file_type == "image"
                  ? banner?.imageURL
                  : banner?.videoURL
              }
              fileType={banner?.file_type}
              headingBanner={banner?.title}
            />

            <div className={styles.terms_and_condictions_baner_sec1}>
              <div className={styles.about_competition_sec2_sub1}>
                <p dangerouslySetInnerHTML={{ __html: content?.tagline }}></p>
                <span
                  dangerouslySetInnerHTML={{ __html: content?.content }}
                ></span>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
        <ToastContainer className="tost" />

        <Footer />
      </div>
    </>
  );
}
