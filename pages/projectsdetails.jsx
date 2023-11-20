/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import TopBar from "../src/components/TopBar/EntTopBar";
import Footer from "../src/components/Footer/Footer";
import styles from "../styles/EventsDetails.module.css";
import ScrollToTopButton from "../src/components/ScrollToTopButton/ScrollToTopButton";
import Image from "next/image";
import Link from "next/link";
import YouTube from "react-youtube";
import { useRouter } from "next/router";
import axios from "axios";
import localStorage from "local-storage";
import moment from "moment";
import Loder from "../src/components/Loder";
import { toast, ToastContainer } from "react-toastify";
import { ShareSocial } from "react-share-social";

export default function ProjectsDetails() {
  const router = useRouter();
  const [origin, setOrigin] = useState("");
  const { projectsSlug } = router.query;
  const { slugallproject } = router.query;

  const [projectInfo, setProjectInfo] = useState(null);
  const [videos, setVideos] = useState();
  const [loder, setLoder] = useState(true);
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const GetProjectInfoSlug = async () => {
    try {
      await axios
        .get(
          // `${baseUrl}/api/project-details/${projectsSlug})`
          process.env.NEXT_PUBLIC_BASE_URL +
            "/api/project-details/" +
            projectsSlug,
          {
            headers: {
              Authorization:
                "Bearer " + localStorage.get("loginAuth")?.authorisation?.token,
            },
          }
        )
        .then((response) => {
          setProjectInfo(response?.data?.response);
          const videosArray = JSON.parse(response?.data?.response?.videos);
          setVideos(videosArray);
          setLoder(false);
        })
        .catch((error) => {
          toast.error(error, { autoClose: 5000 });
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (projectsSlug) {
      GetProjectInfoSlug();
    }
    // GetProjectInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectsSlug]);

  const GetProjectAllInfoSlug = async () => {
    try {
      await axios
        .get(
          // `${baseUrl}/api/project-details/${slugallproject})`
          process.env.NEXT_PUBLIC_BASE_URL +
            "/api/project-details/" +
            slugallproject,
          {
            headers: {
              Authorization:
                "Bearer " + localStorage.get("loginAuth")?.authorisation?.token,
            },
          }
        )
        .then((response) => {
          setProjectInfo(response?.data?.response);
          const videosArray = JSON.parse(response?.data?.response?.videos);
          setVideos(videosArray);
        })
        .catch((error) => {
          toast.error(error, { autoClose: 5000 });
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (slugallproject) {
      GetProjectAllInfoSlug();
    }
    // GetProjectInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugallproject]);
  // slugallproject

  const timeDate = (timeDate) => {
    const formattedDateString = moment(timeDate).format("MMMM D, YYYY,h:mm A");
    return formattedDateString;
  };

  function getFirstWord(str) {
    const words = str?.trim().split(" ");
    return words[0];
  }

  const YoutubeID = (link) => {
    const videoId = link?.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/)?(.+)/
    )[1];
    return videoId;
  };

  const opts = {
    width: "460",
    height: "360",
    // Set the origin in the opts object
  };

  function stripHtmlTags(htmlString) {
    return htmlString?.replace(/(<([^>]+)>)/gi, "");
  }

  return (
    <>
      {!loder || <Loder />}
      {projectInfo ? (
        <div>
          <ScrollToTopButton />
          <TopBar />
          <div className={styles.container}>
            <div className={styles.events_details_sec1}>
              <Image
                width={1000}
                height={1000}
                src={projectInfo?.bannerURL}
                // loading="lazy"
                priority={true}
                alt="projects Details"
              />
            </div>

            <div className={styles.events_details_sec2}>
              <div className={styles.flex}>
                <p
                  className="small_heading"
                  onClick={() => {
                    setLoder(true);
                    router.push({
                      pathname: "allprojects",
                      query: {
                        slugallproject: projectInfo?.project_categories?.id,
                      },
                    });
                  }}
                >
                  {projectInfo?.project_categories?.category}
                </p>
              </div>
              <div className={styles.short_details}>
                <h3>{projectInfo?.title}</h3>
                <div className={styles.short_discripction}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: projectInfo?.description,
                    }}
                  ></div>
                </div>
                {/* <div className={styles.flex2}>
                  <p className="small_heading">Organizer</p>
                  <p className="small_heading_yellow">Dubai Expo</p>
                </div> */}
                {/* <div className={styles.flex3}>
                  <p className={styles.tags}>Tags:</p>
                  <span>Music</span>
                  <span>Amarica</span>
                </div> */}
                <h3> About this project</h3>
                {/* <p className={styles.long_discripction}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: projectInfo?.description,
                    }}
                  ></div>
                </p> */}
              </div>
            </div>

            <div className={styles.events_details_sec3}>
              {videos?.length && <h4>Videos ({videos?.length}) </h4>}
              <div className={styles.cards_sec}>
                {videos?.map((item, i) => (
                  <YouTube key={i} videoId={YoutubeID(item)} opts={opts} />
                ))}
              </div>
            </div>

            <div className={styles.events_details_sec3}>
              {projectInfo?.images?.length && (
                <h4>Images ({projectInfo?.images?.length}) </h4>
              )}
              <div className={styles.cards_sec}>
                {projectInfo?.images?.map((item, i) => (
                  <Link
                    key={i}
                    // href={`/allprojects?slugallproject=${projectInfo?.project_categories?.id}`}
                    href="#"
                  >
                    <div className={styles.card}>
                      <Image
                        width={1000}
                        height={1000}
                        // loading="lazy"
                        priority={true}
                        alt="project Details"
                        className={styles.cardimg}
                        src={item}
                      />
                    </div>
                  </Link>
                ))}
              </div>
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
