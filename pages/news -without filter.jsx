/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useRef } from "react";
import TopBar from "../src/components/TopBar/EntTopBar";
import Footer from "../src/components/Footer/Footer";
import styles from "../styles/News.module.css";
import moment from "moment/moment";
import ScrollToTopButton from "../src/components/ScrollToTopButton/ScrollToTopButton";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import localStorage from "local-storage";
import { useRouter } from "next/router";
import Loder from "../src/components/Loder";
import Link from "next/link";
import Image from "next/image";
import InnerBaner from "../src/components/Baner/innerBaner";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import { toast } from "react-toastify";

// import CircularProgress from "@mui/material/CircularProgimage.pngress";

export default function News() {
  const router = useRouter();
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(16);
  const [total, setTotal] = useState(0);
  const [loadingDiv, setLoadingDiv] = useState();
  const [loder, setLoder] = useState(true);
  const [loading, setLoading] = useState(false);
  const observer = useRef(null);
  const [newsLoader, setNewsLoader] = useState(false);
  const [banner, setBanner] = useState();
  const [bannerLoader, setBannerLoader] = useState(false);

  // USER Activity
  const [pageName, setPageName] = useState("");
  const [pageURL, setPageURL] = useState("");
  const [localDateTime, setLocalDateTime] = useState([]);
  const GetNews = async () => {
    try {
      const response = await axios.get(
        // `${baseUrl}/api/news?page=${currentPage}`
        process.env.NEXT_PUBLIC_BASE_URL + "/api/news?page=" + currentPage
      );
      setNews((prevNews) => [...prevNews, ...response.data?.response?.data]);
      setPerPage(response.data.response.per_page);
      setTotal(response.data.response.total);
      setNewsLoader(true);
      setLoder(false);
    } catch (error) {
      // alert(error);

      toast.error(error, { autoClose: 5000 });
    }
  };

  useEffect(() => {
    GetNews();
    GetBanner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber);
    localStorage.set("currentPage", pageNumber);
  }

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

  const datetime = (dtStr) => {
    let dt = moment.utc(dtStr);
    let formattedDtStr = dt.format("MMM DD, YYYY");
    return formattedDtStr;
  };

  const loadMoreData = () => {
    if (currentPage < total) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
  const lastNewsRef = (node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMoreData();
      }
    });
    if (node) observer.current.observe(node);
  };
  const GetBanner = async () => {
    try {
      await axios
        .get(
          process.env.NEXT_PUBLIC_BASE_URL +
            "/api/banners?s[page]=News&s[type]=Landing"
        )
        .then((response) => {
          setBanner(response?.data?.response?.data[0]);
          setBannerLoader(true);
        })
        .catch((error) => {
          toast.error(error, { autoClose: 5000 });
        });
    } catch (error) {
      console.log(error);
    }
  };

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

  return (
    <>
      {/* {!loder || <Loder />} */}
      <div>
        <TopBar />
        <ScrollToTopButton />
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
        <div className={styles.news_baner_container}>
          {/* <div className={styles.news_baner_sec1}>
            <h1>News Center</h1>
          </div> */}

          <div className={styles.categories}>
            <div className={styles.categories_heading}>
              <h2 className={`${styles.categories_heading2} yellow`}>
                News Categories
              </h2>
            </div>
            {/* {eventCategoreisLoader ? ( */}
            <div className={styles.tag_sec}>
              <input
                type="checkbox"
                id="marking_0"
                name="check"
                className={styles.check_input}
                onChange={() => GetEvents()}
              />

              {/* {eventCategoreis?.map((categories, index) => ( */}
              <div
                // key={index}
                onClick={() => {
                  setLoder(true);
                }}
              >
                <input
                  type="checkbox"
                  // id={`marking_0${categories.id}`}
                  name="check"
                  className={styles.check_input}
                  // value={categories.id}
                  // checked={selectedCategories.includes(categories.id)}
                  // onChange={() => handleCategorySelection(categories.id)}
                />
                <label
                  name="check"
                  // htmlFor={`marking_0${categories.id}`}
                  className={styles.check_label}
                >
                  <div className={styles.tag_icon}>
                    <AccessibilityIcon />
                  </div>
                  {/* <p>{categories.category}</p> */}
                  <p>saad</p>
                </label>
              </div>
              {/* ))} */}
            </div>
            {/* ) : ( */}
            {/* "" */}
            {/* )} */}
          </div>

          {newsLoader ? (
            <>
              <div className={styles.news_baner_sec2}>
                {news &&
                  news.map((item, index) => (
                    <div
                      onClick={() => {
                        setLoder(true);
                      }}
                      key={index}
                      ref={index === news.length - 1 ? lastNewsRef : null}
                      className={styles.news_image_div}
                    >
                      {/* <div> */}
                      <Link href={`/newsdetails?slugnews=${item.slug}`}>
                        <Image
                          width={10000}
                          height={10000}
                          src={item.thumbURL}
                          alt="news picture"
                          loading="lazy"
                          onClick={() => {
                            setLoadingDiv(index);
                            router.push({
                              pathname: "/newsdetails",
                              query: { slugnews: item.slug },
                            });
                          }}
                        />

                        <div className={styles.content}>
                          <h4 max={2}>{item.title}</h4>
                          <p className="small_heading_yellow">
                            {datetime(item.created_at)}
                          </p>
                          <p className="small_heading">{item?.category}</p>
                        </div>
                      </Link>
                    </div>
                  ))}
                {/* Display the pagination */}
              </div>

              <div ref={lastNewsRef}></div>
            </>
          ) : (
            ""
          )}
        </div>
        {<Footer />}
      </div>
    </>
  );
}
