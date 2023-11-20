/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import styles from "../talenthunt_styles/TalentBord.module.css";
import TopBar from "../src/components/TopBar/EntTopBar";
import Image from "next/image";
import Link from "next/link";
import Footer from "../src/components/Footer/Footer";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import ScrollToTopButton from "../src/components/ScrollToTopButton/ScrollToTopButton";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import localStorage from "local-storage";
import moment from "moment/moment";
import { Pagination } from "antd";
import Loder from "../src/components/Loder";
import InnerBaner from "../src/components/Baner/innerBaner";
// import { toast } from "react-toastify";
import { toast, ToastContainer } from "react-toastify";

export default function Events() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(16);
  const [total, setTotal] = useState(0);
  const [eventCategoreis, setEventCategories] = useState();
  const [cEvents, setCEvents] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loder, setLoder] = useState(false);
  const [banner, setBanner] = useState();
  const [bannerLoader, setBannerLoader] = useState(false);
  const [eventCategoreisLoader, setEventCategoriesLoader] = useState(false);
  // USER Activity

  const [pageName, setPageName] = useState("");
  const [pageURL, setPageURL] = useState("");
  const [localDateTime, setLocalDateTime] = useState([]);

  useEffect(() => {
    const handleRouteChange = (url) => {
      // Check if the route changed to '/events' from '/eventsdetails'
      if (url === "/events") {
        // Reload the page
        window.location.reload();
      }
    };

    // Subscribe to the router's route change event
    router.events.on("routeChangeComplete", handleRouteChange);

    // Clean up the event listener when the component unmounts
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
  setTimeout(() => {
    setLoder(false);
  }, 2000);
  const GetBanner = async () => {
    try {
      await axios
        .get(
          process.env.NEXT_PUBLIC_BASE_URL +
            "/api/banners?s[page]=Events&s[type]=Landing"
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

  const GetEvents = async (page) => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/events?page=" + page
      );
      return response.data.response.data; // Return events data
    } catch (error) {
      console.error("Error fetching events:", error);
      return []; // Return empty array in case of error
    }
  };
  const loadMoreEvents = async () => {
    const nextPage = currentPage + 1;
    const newEvents = await GetEvents(nextPage);

    if (newEvents && newEvents.length > 0) {
      setEvents([...events, ...newEvents]);
      setCurrentPage(nextPage);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      if (scrollTop + windowHeight >= documentHeight - 100) {
        loadMoreEvents();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, events]);

  const GetEventCategoreis = async () => {
    try {
      await axios
        .get(process.env.NEXT_PUBLIC_BASE_URL + "/api/ajax/event_categories")
        .then((response) => {
          setEventCategories(response.data);
          setEventCategoriesLoader(true);
        })
        .catch((error) => {
          // alert(error);
          toast.error(error, { autoClose: 5000 });
        });
    } catch (error) {
      console.log(error);
    }
  };

  function handleCategorySelection(catID) {
    const index = selectedCategories.indexOf(catID);
    if (index === -1) {
      axios
        .get(
          // `${baseUrl}/api/events?category_id=${catID}&q=`
          process.env.NEXT_PUBLIC_BASE_URL +
            "/api/events?category_id=" +
            catID +
            "&q="
        )
        .then((response) => {
          setCEvents([...cEvents, ...response.data.response.data]);
        });

      setSelectedCategories([...selectedCategories, catID]);
    } else {
      const updatedCategories = [...selectedCategories];
      updatedCategories.splice(index, 1);
      const updatedEvents = cEvents.filter(
        (event) => event.category_id !== catID
      );
      setCEvents(updatedEvents);
      setSelectedCategories(updatedCategories);
    }
  }

  const filteredEvents = !selectedCategories.length
    ? events
    : cEvents.filter((event) => selectedCategories.includes(event.category_id));

  useEffect(() => {
    GetBanner();
    GetEventCategoreis();
    // Fetch initial events
    GetEvents(currentPage).then((initialEvents) => {
      setEvents(initialEvents);
      setEventCategoriesLoader(true);
      setLoder(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handlePageChange(pageNumber) {
    localStorage.set("EventCurrentPage", pageNumber);
  }

  useEffect(() => {
    const storedPage = localStorage.get("EventCurrentPage");
    if (storedPage) {
      setCurrentPage(parseInt(storedPage));
    }
  }, []);

  const timeDate = (timeDate) => moment(timeDate).format("MMM DD, YYYY");

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

        <div className={styles.categories}>
          <div className={styles.categories_heading}>
            <h2 className={`${styles.categories_heading} yellow`}>
              Events Categories
            </h2>
          </div>
          {eventCategoreisLoader ? (
            <div className={styles.tag_sec}>
              <input
                type="checkbox"
                id="marking_0"
                name="check"
                className={styles.check_input}
                onChange={() => GetEvents()}
              />

              {eventCategoreis?.map((categories, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setLoder(true);
                  }}
                >
                  <input
                    type="checkbox"
                    id={`marking_0${categories.id}`}
                    name="check"
                    className={styles.check_input}
                    value={categories.id}
                    checked={selectedCategories.includes(categories.id)}
                    onChange={() => handleCategorySelection(categories.id)}
                  />
                  <label
                    name="check"
                    htmlFor={`marking_0${categories.id}`}
                    className={styles.check_label}
                  >
                    <div className={styles.tag_icon}>
                      <AccessibilityIcon />
                    </div>
                    <p>{categories.category}</p>
                  </label>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>

        <div className={styles.categories_heading2}>
          <h2 className="yellow">Events in </h2>
        </div>

        <div className={styles.latest_project_sec3}>
          {filteredEvents?.map((cardData, index) => (
            <div
              key={index}
              onClick={() => {
                setLoder(true);
                router.push({
                  pathname: "/eventsdetails",
                  query: { slug: cardData?.slug },
                });
              }}
              className={styles.card}
            >
              <Link href={`/eventsdetails?slug=${cardData.slug}`}>
                <Image
                  width={1000}
                  height={1000}
                  alt="eventsDetails"
                  priority={true}
                  className={styles.latest_project_image_sizing}
                  src={cardData?.thumbURL}
                />
                <div className={styles.content}>
                  <h4>{cardData?.title}</h4>

                  <p className="small_heading_yellow">
                    {timeDate(cardData?.start_date)}
                  </p>
                </div>
              </Link>
            </div>
          ))}
          <ToastContainer className="tost" />
        </div>
        {/* <>
          <Pagination
            className="pagination"
            current={currentPage}
            pageSize={perPage}
            total={total}
            onChange={handlePageChange}
            showLessItems
            showQuickJumper={false}
            showSizeChanger={false}
          />
        </> */}
        <Footer />
      </div>
    </>
  );
}
