import TopBar from "../src/components/TopBar/EntTopBar";
import Footer from "../src/components/Footer/Footer";
import styles from "../talenthunt_styles/AboutCompetition.module.css";
import ScrollToTopButton from "../src/components/ScrollToTopButton/ScrollToTopButton";
import axios from "axios";
import { useEffect, useState } from "react";
import Loder from "../src/components/Loder";
import InnerBaner from "../src/components/Baner/innerBaner";

export default function Overview() {
  const [content, setContent] = useState(null);
  const [banner, setBanner] = useState(null);
  const [loder, setLoder] = useState(true);
  const [overviewLoader, setOverViewLoader] = useState(false);

  const GetBanner = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL +
          "/api/banners?s[page]=Overview&s[type]=Landing"
      );
      const bannerData = response?.data?.response?.data[0];
      setBanner(bannerData);
      setOverViewLoader(true);
      setLoder(false);
    } catch (error) {
      console.error("Error fetching banner:", error);
      setBanner(null);
      setOverViewLoader(true);
      setLoder(false);
    }
  };

  const GetContent = async () => {
    try {
      const response = await axios.get(
        // `${baseUrl}/api/page/about`
        process.env.NEXT_PUBLIC_BASE_URL + "/api/page/overview"
      );
      setContent(response?.data?.response);
      console.log(response.data.response);
      setOverViewLoader(true);
    } catch (error) {
      console.error("Error fetching content:", error);
      setContent(null);
      setOverViewLoader(true);
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

        {overviewLoader ? (
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

            <div className={styles.about_competition_main}>
              <div className={styles.about_competition_sec2}>
                <div className={styles.about_competition_sec2_sub1}>
                  <h3
                    dangerouslySetInnerHTML={{ __html: content?.tagline }}
                  ></h3>
                  <span
                    className={styles.content}
                    dangerouslySetInnerHTML={{ __html: content?.content }}
                  ></span>
                </div>

                {content?.thumbnailUrl && (
                  <div
                    style={{
                      backgroundImage: `url(${content.thumbnailUrl})`,
                    }}
                    className={styles.about_competition_sec2_sub2}
                  ></div>
                )}
              </div>
            </div>
          </>
        ) : (
          ""
        )}

        <Footer />
      </div>
    </>
  );
}
