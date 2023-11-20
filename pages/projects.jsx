/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import styles from "../styles/Projects.module.css";
import TopBar from "../src/components/TopBar/EntTopBar";
import Image from "next/image";
import Link from "next/link";
import Footer from "../src/components/Footer/Footer";
import ScrollToTopButton from "../src/components/ScrollToTopButton/ScrollToTopButton";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";

import Loder from "../src/components/Loder";
import InnerBaner from "../src/components/Baner/innerBaner";
import moment from "moment/moment";
import localStorage from "local-storage";
// import { toast } from "react-toastify";
import { toast, ToastContainer } from "react-toastify";

// import { useRouter } from "next/router";
export default function Projects() {
  const router = useRouter();
  const [projects, setProjects] = useState();
  const [banner, setBanner] = useState();
  const [projectCategories, setProjectCategories] = useState();

  const [projectsLoader, setProjectsLoader] = useState(false);
  const [bannerLoader, setBannerLoader] = useState(false);
  const [projectCategoriesLoader, setProjectCategoriesLoader] = useState(false);
  const [loder, setLoder] = useState(true);
  // USER Activity

  const [pageName, setPageName] = useState("");
  const [pageURL, setPageURL] = useState("");
  const [localDateTime, setLocalDateTime] = useState([]);
  useEffect(() => {
    const storedPage = localStorage.get("currentPage");
    if (storedPage) {
      setCurrentPage(parseInt(storedPage));
    }
  }, []);

  useEffect(() => {
    const currentPage = router.route;
    const formattedPageName = currentPage.startsWith("/")
      ? currentPage.substring(1)
      : currentPage;
    setPageName(formattedPageName);
    // Get the page URL
    setPageURL(window.location.href);

    // Get the formatted local date and time
    const getCurrentDateTime = () => {
      const currentDateTime = moment().format("MM/DD/YYYY hh:mm A");
      setLocalDateTime(currentDateTime);
    };
    // Update the local time every second
    const interval = setInterval(getCurrentDateTime, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [router]);
  useEffect(() => {
    const userToken = localStorage.get("loginAuth")?.data?.api_token;
    if (userToken) {
      UserActivity();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageName, pageURL, localDateTime]);

  const UserActivity = async () => {
    const userToken = localStorage.get("loginAuth")?.data?.api_token;
    try {
      if (pageName && pageURL && localDateTime) {
        const requestBody = {
          page_name: pageName,
          page_url: pageURL,
          date_time: localDateTime,
        };
        const response = await axios.post(
          process.env.NEXT_PUBLIC_BASE_URL + "/api/member/add-user-activity",
          requestBody,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        if (response.data.status === true) {
          setPageName("");
          setPageURL("");
          setLocalDateTime("");
        }
      }
    } catch (error) {
      console.error("Error recording user activity:", error);
    }
  };
  const GetBanner = async () => {
    try {
      await axios
        .get(
          // `${baseUrl}/api/banners?s[page]=Overview&s[type]=Landing`
          process.env.NEXT_PUBLIC_BASE_URL +
            "/api/banners?s[page]=Projects&s[type]=Landing"
        )
        .then((response) => {
          setBanner(response?.data?.response?.data[0]);
          setBannerLoader(true);
          setLoder(false);
        })
        .catch((error) => {
          toast.error(error, { autoClose: 5000 });
        });
    } catch (error) {
      console.log(error);
    }
  };
  const GetProjects = async () => {
    try {
      await axios
        .get(
          // `${baseUrl}/api/projects`
          process.env.NEXT_PUBLIC_BASE_URL + "/api/projects"
        )
        .then((response) => {
          setProjects(response?.data?.response?.data);
          setProjectsLoader(true);
        })
        .catch((error) => {
          toast.error(error, { autoClose: 5000 });
        });
    } catch (error) {
      console.log(error);
    }
  };
  const GetProjectsCategories = async () => {
    try {
      await axios
        .get(
          // `${baseUrl}/api/ajax/project_categories`
          process.env.NEXT_PUBLIC_BASE_URL + "/api/ajax/project_categories"
        )
        .then((response) => {
          setProjectCategories(response?.data);
          setProjectCategoriesLoader(true);
        })
        .catch((error) => {
          toast.error(error, { autoClose: 5000 });
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetBanner();
    GetProjects();
    GetProjectsCategories();
  }, []);

  return (
    <>
      <div className={styles.talent_bord_main}>
        <ScrollToTopButton />
        <TopBar />
        {!loder || <Loder />}
        {bannerLoader ? (
          <InnerBaner
            source={
              banner?.file_type == "image" ? banner?.imageURL : banner?.videoURL
            }
            fileType={banner?.file_type}
            headingBanner={banner?.title}
          />
        ) : (
          ""
        )}

        <div className={styles.parent}>
          <div className={styles.child1}>
            <div className={styles.sub_child}>
              <h2 className="yellow">Lastest Projects</h2>
              {projectsLoader ? (
                <div className={styles.latest_project_sec3}>
                  {projects?.slice(0, 6).map((item, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setLoder(true);
                        router.push({
                          pathname: "/projectsdetails",
                          query: {
                            projectsSlug: item?.id,
                          },
                        });
                      }}
                      className={styles.card}
                    >
                      <Link href={`/projectsdetails?projectsSlug=${item.id}`}>
                        <div className={styles.card_sub}>
                          <Image
                            width={1000}
                            height={1000}
                            alt="projects"
                            // loading="lazy"
                            priority={true}
                            className={styles.latest_project_image_sizing}
                            src={item?.thumbURL}
                          />
                        </div>
                        <div className={styles.content}>
                          <h4>{item?.title}</h4>
                          <div className="small_heading_yellow">
                            {item.category}
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                ""
              )}
            </div>
            {projectsLoader ? (
              <div className={styles.sub_child}>
                <h2 className="yellow">Popular Projects</h2>
                <div className={styles.latest_project_sec3}>
                  {projects?.slice(-4, -1).map((cardData3, o) => (
                    <div
                      key={o}
                      onClick={() => {
                        setLoder(true);
                        router.push({
                          pathname: "/projectsdetails",
                          query: { projectsSlug: cardData3?.id },
                        });
                      }}
                      className={styles.card}
                    >
                      <Link
                        href={`projectsdetails?projectsSlug${cardData3.id}`}
                      >
                        <div className={styles.card_sub}>
                          <Image
                            width={10000}
                            height={10000}
                            alt="projects"
                            // loading="lazy"
                            priority={true}
                            className={styles.latest_project_image_sizing}
                            src={cardData3.thumbURL}
                          />
                        </div>
                        <div className={styles.content}>
                          <h4>{cardData3.title}</h4>
                          <div className="small_heading_yellow">
                            {cardData3.category}
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              ""
            )}
            {projectCategoriesLoader ? (
              <div className={styles.sub_child}>
                {projectCategories?.map((items, p) => (
                  <div key={p}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "0 10px 20px 0",
                      }}
                    >
                      <h2 className="yellow">{items?.category}</h2>
                      <button
                        onClick={() => {
                          setLoder(true);
                          router.push({
                            pathname: "/allprojects",
                            query: {
                              allProjectCategory: items?.id,
                            },
                          });
                        }}
                        className={styles.view_more}
                      >
                        View more
                      </button>
                    </div>
                    <div className={styles.latest_project_sec3}>
                      {projects
                        ?.filter(
                          (project) => project.category === items.category
                        )
                        ?.slice(0, 3)
                        .map((project, a) => (
                          <div
                            key={a}
                            onClick={() => {
                              setLoder(true);
                              router.push({
                                pathname: "/projectsdetails",
                                query: {
                                  projectsSlug: project?.id,
                                },
                              });
                            }}
                            className={styles.card}
                          >
                            <div className={styles.card_sub}>
                              <Link
                                href={`/projectsdetails?projectsSlug=${project?.id}`}
                              >
                                <Image
                                  width={1000}
                                  height={1000}
                                  priority={true}
                                  alt="projects"
                                  // loading="lazy"
                                  className={styles.latest_project_image_sizing}
                                  src={project?.thumbURL}
                                />
                              </Link>
                            </div>
                            <div className={styles.content}>
                              <h4>{project.title}</h4>
                              <div className={styles.date_time}>
                                {/* {cardData2.category} */}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
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
    </>
  );
}
