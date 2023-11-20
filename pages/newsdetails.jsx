/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import TopBar from "../src/components/TopBar/EntTopBar";
import Footer from "../src/components/Footer/Footer";
import styles from "../styles/NewsDetails.module.css";

import { useRouter } from "next/router";
import axios from "axios";
import localStorage from "local-storage";
import moment from "moment/moment";
import ScrollToTopButton from "../src/components/ScrollToTopButton/ScrollToTopButton";
import Loder from "../src/components/Loder";
import Image from "next/image";
import Link from "next/link";
// import { toast } from "react-toastify";
import { toast, ToastContainer } from "react-toastify";
import { ShareSocial } from "react-share-social";

export default function NewsDetails() {
  const router = useRouter();
  const { slugnews } = router.query;
  const { sluglatestnews } = router.query;

  const [newsInfo, setNewsInfo] = useState(null);
  const [news, setNews] = useState();
  const [loadingDiv, setLoadingDiv] = useState();
  const [newsInfoLoader, setNewsInfoLoader] = useState(false);
  const [newsLoader, setNewsLoader] = useState(false);
  const [loder, setLoder] = useState(true);
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const GetNewsInfoSlug = async () => {
    try {
      await axios
        .get(
          // `${baseUrl}/api/news/${slugnews})`
          process.env.NEXT_PUBLIC_BASE_URL + "/api/news/" + slugnews
        )
        .then((response) => {
          setNewsInfo(response.data.response);
          setNewsInfoLoader(true);
          setLoder(false);
        })
        .catch((error) => {
          toast.error(error, { autoClose: 5000 });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const GetNewsLatestSlug = async () => {
    try {
      await axios
        .get(
          // `https://dev8.sidat.digital/api/news/${sluglatestnews})`
          process.env.NEXT_PUBLIC_BASE_URL + "/api/news/" + sluglatestnews
        )
        .then((response) => {
          setNewsInfo(response.data.response);
          console.log(response.data, "checking for getbews latesat slug");
          setNewsInfoLoader(true);
        })
        .catch((error) => {
          toast.error(error, { autoClose: 5000 });
        });
    } catch (error) {
      console.log(error);
    }
  };
  const GetNews = async () => {
    try {
      await axios
        .get(
          // `${baseUrl}/api/news`
          process.env.NEXT_PUBLIC_BASE_URL + "/api/news"
        )
        .then((response) => {
          const lastSixElements = response?.data?.response?.data;
          // console.log("data checking", lastSixElements);
          setNews(lastSixElements);
          setNewsLoader(true);
        })
        .catch((error) => {
          toast.error(error, { autoClose: 5000 });
        });
    } catch (error) {
      console.log(error);
    }
  };

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  useEffect(() => {
    GetNews();
    // GetNewsInfo();

    // eslint-disable-next-line react-hooks/exhaustive-deps

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // GetNewsInfo();
    if (slugnews) {
      GetNewsInfoSlug();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugnews]);

  useEffect(() => {
    // GetNewsInfo();
    if (sluglatestnews) {
      GetNewsLatestSlug();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sluglatestnews]);

  const timeDate = (timeDate) => {
    const formattedDateString = moment(timeDate).format("MMM DD, YYYY");
    return formattedDateString;
  };

  function stripHtmlTags(htmlString) {
    return htmlString?.replace(/(<([^>]+)>)/gi, "");
  }

  return (
    <>
      {!loder || <Loder />}
      {newsInfo || news ? (
        <div>
          <ScrollToTopButton />
          <TopBar />

          <div className={styles.container}>
            {newsInfoLoader ? (
              <>
                <div className={styles.news_details_sec1}>
                  {/* <div className={styles.dash}></div> */}
                  <h2 className="yellow">{newsInfo?.title}</h2>
                  <div className="small_heading_yellow">
                    <p className="small_heading_yellow">
                      {timeDate(newsInfo?.created_at)}{" "}
                    </p>
                  </div>
                </div>
                <div className={styles.news_details_sec2}>
                  <Image
                    width={1000}
                    height={1000}
                    src={newsInfo?.bannerURL}
                    // loading="lazy"
                    priority={true}
                    alt="newsDetails"
                  />
                  <p
                    dangerouslySetInnerHTML={{ __html: newsInfo?.description }}
                  ></p>
                </div>
                <div className={styles.news_details_sec2}>
                  <h3>Share with friends</h3>
                  <div className={styles.social_sec}>
                    <ShareSocial
                      url={`${currentUrl}`}
                      socialTypes={[
                        "facebook",
                        "whatsapp",
                        "twitter",
                        // "youtube",
                      ]}
                      onSocialButtonClicked={(socialType, url) => {
                        console.log("Button clicked:", socialType, url);
                        // Handle the button click event, e.g., open the Facebook share dialog
                      }}
                    />
                  </div>
                </div>
              </>
            ) : (
              ""
            )}

            <div className={styles.news_details_sec3}>
              <h2 className="yellow">Latest news</h2>
              {newsLoader ? (
                <div className={styles.flex}>
                  {news &&
                    news?.slice(0, 3).map((item, index) => (
                      // <>
                      <div key={index} className={styles.news_image_div}>
                        <Link href={`/newsdetails?sluglatestnews=${item.slug}`}>
                          <Image
                            width={10000}
                            height={10000}
                            style={{ height: "100%", width: "100%" }}
                            src={item.thumbURL}
                            alt="news picture"
                            loading="lazy"
                            onClick={() => {
                              setLoadingDiv(index);
                              router.push({
                                pathname: "/newsdetails",
                                query: { sluglatestnews: item.slug },
                              });
                            }}
                          />
                          {/* {console.log(item.slug, "console sluglatestnews")} */}

                          <div className={styles.content}>
                            <h4>{item?.title}</h4>
                            <div
                              className={`${styles.date_time} small_heading_yellow`}
                            >
                              {timeDate(item.created_at)}

                              <p className="small_heading">{item?.category}</p>
                            </div>
                          </div>
                        </Link>
                      </div>
                      // </>
                    ))}
                </div>
              ) : (
                ""
              )}
            </div>

            <ToastContainer className="tost" />
          </div>
          <Footer />
        </div>
      ) : (
        <Loder />
      )}
    </>
  );
}
