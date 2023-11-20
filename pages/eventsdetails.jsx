/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import TopBar from "../src/components/TopBar/EntTopBar";
import Footer from "../src/components/Footer/Footer";
import styles from "../styles/EventsDetails.module.css";
import Image from "next/image";
import ScrollToTopButton from "../src/components/ScrollToTopButton/ScrollToTopButton";
import { useRouter } from "next/router";
import axios from "axios";
import localStorage from "local-storage";
import moment from "moment";
import Loder from "../src/components/Loder";
import { ShareSocial } from "react-share-social";

export default function EventsDetails() {
  const router = useRouter();
  const { slug } = router.query;
  const [eventsInfo, setEventsInfo] = useState(null);
  const [eventsInfoLoader, setEventsInfoLoader] = useState(false);
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const GetNewsInfoSlug = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/event/" + slug,

        {
          headers: {
            Authorization:
              "Bearer " + localStorage.get("loginAuth")?.authorisation?.token,
          },
        }
      );
      setEventsInfo(response.data.response);
      setEventsInfoLoader(true);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    // GetNewsInfo();
    if (slug) {
      GetNewsInfoSlug();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);
  const timeDate = (timeDate) => {
    const formattedDateString = moment(timeDate).format("MMM DD, YYYY");
    return formattedDateString;
  };

  return (
    <>
      {eventsInfoLoader ? (
        <>
          {eventsInfo ? (
            <div>
              <ScrollToTopButton />
              <TopBar />
              <div className={styles.container}>
                <div className={styles.events_details_sec1}>
                  <Image
                    width={1000}
                    height={1000}
                    // loading="lazy"
                    src={eventsInfo?.bannerURL}
                    alt="Cover Photo"
                    priority={true}
                  />
                </div>

                <div className={styles.events_details_sec2}>
                  <div className={styles.flex}>
                    <p className="small_heading_yellow">
                      {timeDate(eventsInfo?.start_date)}
                    </p>
                    <p
                      className={styles.cetagory}
                      onClick={() => {
                        localStorage.set(
                          "allEventsCategory",
                          eventsInfo?.category?.id
                        );
                        router.push("allevents");
                      }}
                    >
                      {eventsInfo?.category?.category}
                    </p>
                  </div>
                  <div className={styles.short_details}>
                    <h3>{eventsInfo?.title}</h3>
                    <p className={styles.short_discripction}>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: eventsInfo?.short_description,
                        }}
                      ></span>
                    </p>
                    <div className={styles.flex2}>
                      <p className="small_heading">Organizer</p>
                      <p className="small_heading_yellow">
                        {eventsInfo?.contact?.name}
                      </p>
                    </div>
                    {/* <div className={styles.flex3}>
                      <p className={styles.tags}>Tags:</p>
                      <span>{eventsInfo?.category?.category}</span>
                    </div> */}

                    <h3> About this event</h3>
                    <p className={styles.long_discripction}>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: eventsInfo?.description,
                        }}
                      ></span>
                    </p>
                  </div>
                </div>

                <div className={styles.events_details_sec2}>
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
              </div>
              <Footer />
            </div>
          ) : (
            ""
          )}
        </>
      ) : (
        <Loder />
      )}
    </>
  );
}
