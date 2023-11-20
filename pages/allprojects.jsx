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

import { toast, ToastContainer } from "react-toastify";

export default function Projects() {
  const router = useRouter();
  const [projects, setProjects] = useState();
  const [allprojectloader, SetAllProjectLoader] = useState(false);
  const [loder, setLoder] = useState(true);
  const [bannerLoader, setBannerLoader] = useState(false);
  const [banner, setBanner] = useState();

  const { allProjectCategory } = router.query;

  const GetProjectsSlug = async () => {
    try {
      await axios
        .get(
          // `${baseUrl}/api/projects?category_id=${allProjectCategory}`
          process.env.NEXT_PUBLIC_BASE_URL +
            "/api/projects?category_id=" +
            allProjectCategory
        )

        .then((response) => {
          setProjects(response?.data?.response?.data);
          SetAllProjectLoader(true);
          setLoder(false);
        })
        .catch((error) => {
          // alert(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetProjectsSlug();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allProjectCategory]);
  useEffect(() => {
    GetBanner();
  }, []);

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

  return (
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

      {/* <div className={styles.cover_baner}>
        <h1>Projects</h1>
      </div> */}

      <div className={styles.parent}>
        <div className={styles.child1_sub}>
          <div className={styles.sub_child}>
            {allprojectloader ? (
              <div className={styles.latest_project_sec3}>
                {projects?.map((cardData2, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      // setLoder(true);
                      router.push({
                        pathname: "/projectsdetails",
                        query: {
                          projectsSlug: cardData2?.id,
                        },
                      });
                    }}
                    className={styles.card}
                  >
                    <Link href={`projectsdetails?projectsSlug=${cardData2.id}`}>
                      <div className={styles.card_sub}>
                        <Image
                          width={10000}
                          height={10000}
                          alt="projects"
                          loading="lazy"
                          className={styles.latest_project_image_sizing}
                          src={cardData2?.thumbURL}
                        />
                      </div>
                      <div className={styles.content}>
                        <h4>{cardData2?.title}</h4>
                        <div className="small_heading_yellow">
                          {cardData2.category}
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
        </div>
        <ToastContainer className="tost" />
      </div>

      <Footer />
    </div>
  );
}
