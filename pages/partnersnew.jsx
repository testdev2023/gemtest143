/* eslint-disable @next/next/no-img-element */
import TopBar from "../src/components/TopBar/EntTopBar";
import Footer from "../src/components/Footer/Footer";
import styles from "../talenthunt_styles/AboutCompetition.module.css";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import ScrollToTopButton from "../src/components/ScrollToTopButton/ScrollToTopButton";
// import { baseUrl } from "../src/config/Config";
import Loder from "../src/components/Loder";
import InnerBaner from "../src/components/Baner/innerBaner";
import moment from "moment/moment";
import localStorage from "local-storage";
import { useRouter } from "next/router";
import { Box, Modal } from "@mui/material";
// import { toast } from "react-toastify";
import { toast, ToastContainer } from "react-toastify";

export default function Partners() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Partnerships");
  const [selectedSubcategory, setSelectedSubcategory] =
    useState("Major Partners");
  const [selectedOption, setSelectedOption] = useState("Partnerships");
  const [selectedCatColor, setSelectedCatColor] = useState("Major Partners");
  const [banner, setBanner] = useState();
  const [partnersLoader, setPartnersLoader] = useState(false);
  const [loder, setLoder] = useState(true);
  // USER Activity
  const router = useRouter();
  const [pageName, setPageName] = useState("");
  const [pageURL, setPageURL] = useState("");
  const [localDateTime, setLocalDateTime] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpenClose = () => setOpen(!open);

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
          // `${baseUrl}/api/banners?s[page]=Partners&s[type]=Landing`

          process.env.NEXT_PUBLIC_BASE_URL +
            "/api/banners?s[page]=Partners&s[type]=Landing"
        )
        .then((response) => {
          setBanner(response?.data?.response?.data[0]);
          setPartnersLoader(true);
          setLoder(false);
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
          // `${baseUrl}/api/partners`
          process.env.NEXT_PUBLIC_BASE_URL + "/api/partners_new"
        )
        .then((response) => {
          setCategories(response?.data.categories);
          setPartnersLoader(true);
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
    GetNews();
  }, []);

  const subcategories =
    categories.find((cat) => cat.category === selectedCategory)?.children || [];

  return (
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
      <>
        <InnerBaner
          source={
            banner?.file_type == "image" ? banner?.imageURL : banner?.videoURL
          }
          fileType={banner?.file_type}
          headingBanner={banner?.title}
        />

        <div className={styles.partners_main}>
          {partnersLoader ? (
            <>
              <div>
                <div className={styles.partners_sec1}>
                  {categories.map((cat) => (
                    // <div className={styles.partners_sec2} key={cat.id}>
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedOption(cat.category);
                        setSelectedCategory(cat.category);
                      }}
                      className={
                        cat.category === selectedOption
                          ? styles.yellow
                          : styles.white
                      }
                    >
                      {cat.category}
                    </button>
                    // </div>
                  ))}
                </div>
                <div className={styles.partners_sec1}>
                  {subcategories.map((subcat) => (
                    // <div className={styles.partners_sec1} key={subcat.id}>
                    <button
                      style={{ borderTop: "none" }}
                      key={subcat.id}
                      onClick={() => {
                        setSelectedCatColor(subcat.category);
                        setSelectedSubcategory(subcat.category);
                      }}
                      className={
                        subcat.category === selectedCatColor
                          ? styles.yellow
                          : styles.white
                      }
                    >
                      {subcat.category}
                    </button>
                    // </div>
                  ))}
                </div>
                <div className={styles.partners_sec2}>
                  {/* Render the information for the selected subcategory */}
                  {subcategories
                    ? subcategories
                        .find(
                          (subcat) => subcat.category === selectedSubcategory
                        )
                        ?.rows?.map((row) => (
                          <div key={row.id}>
                            {/* <div className={styles.partners_sec2}> */}
                            <Link
                              href="#"
                              key={row.id}
                              className={styles.card}
                              onClick={() => {
                                handleOpenClose();
                                setModalData(row);
                              }}
                            >
                              <Image
                                width={1000}
                                height={1000}
                                // loading="lazy"
                                priority={true}
                                className={styles.imgs}
                                src={row.logoURL}
                                alt={row.company}
                              />

                              <div>
                                <h2 className="name_heading">{row.company}</h2>
                                {/* <h3
                                  dangerouslySetInnerHTML={{
                                    __html: row.description,
                                  }}
                                ></h3> */}
                              </div>
                            </Link>
                          </div>
                          // </div>
                        ))
                    : null}
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          <Modal
            open={open}
            onClose={handleOpenClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className={styles.box}>
              <div className={styles.btn_div_mob}>
                <button
                  className={styles.unitX_mob}
                  variant="contained"
                  onClick={() => {
                    handleOpenClose();
                    setModalData(null);
                  }}
                >
                  X
                </button>
              </div>
              <div className={styles.box_left_child}>
                <Image
                  width={1000}
                  height={1000}
                  className={styles.team_modal_image}
                  src={modalData?.logoURL}
                  alt={modalData?.company}
                  // loading="lazy"
                  priority={true}
                />
              </div>

              <div className={styles.box_right_child}>
                <div className={styles.btn_div}>
                  <button
                    className={styles.unitX}
                    variant="contained"
                    onClick={() => {
                      handleOpenClose();
                      setModalData(null);
                    }}
                  >
                    X
                  </button>
                </div>
                <div className={styles.modal_data}>
                  <p className="h4_light_black">{modalData?.company}</p>
                  <p className={styles.modal_discription}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: modalData?.description,
                      }}
                    ></div>
                  </p>
                </div>
              </div>
            </Box>
          </Modal>
        </div>
      </>
      <ToastContainer className="tost" />

      <Footer />
    </div>
  );
}
