/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import styles from "../styles/Team.module.css";
import TopBar from "../src/components/TopBar/EntTopBar";
import Footer from "../src/components/Footer/Footer";
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import localStorage from "local-storage";
import { useRouter } from "next/router";
import Link from "next/link";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ScrollToTopButton from "../src/components/ScrollToTopButton/ScrollToTopButton";
import { findFlagUrlByCountryName } from "country-flags-svg";

import Image from "next/image";
import Loder from "../src/components/Loder";
import InnerBaner from "../src/components/Baner/innerBaner";
import moment from "moment/moment";
// import { toast } from "react-toastify";
import { toast, ToastContainer } from "react-toastify";

export default function Team() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const handleOpenClose = () => setOpen(!open);
  const [rows, setRows] = useState({});
  const [locations, setLocations] = useState({});
  const [selectedCountry, setSelectedCountry] = useState({});

  const [teamMembers, setTeamMembers] = useState();
  const [teamMembersLoader, setTeamMembersLoader] = useState();

  const [modalData, setModalData] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedCountryColor, setSelectedCountryColor] = useState(null);
  const [banner, setBanner] = useState();
  const [bannerLoader, setBannerLoader] = useState(false);

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
          // `${baseUrl}/api/banners?s[page]=Team&s[type]=Landing`
          process.env.NEXT_PUBLIC_BASE_URL +
            "/api/banners?s[page]=Team&s[type]=Landing"
        )
        .then((response) => {
          setBanner(response?.data?.response?.data[0]);
          setLoder(false);
          setBannerLoader(true);
        })
        .catch((error) => {
          // alert(error);
          toast.error(error, { autoClose: 5000 });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getFlagUrl = (countryFullName) => {
    const flagUrl = findFlagUrlByCountryName(countryFullName);

    return flagUrl;
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    GetBanner();
    axios
      .get(
        // Api?.TEAM
        process.env.NEXT_PUBLIC_TEAM_NEW
      )
      .then((response) => {
        let data = response?.data;

        setData(data);
        setLocations(data?.locations);
        setRows(data?.rows);

        if (data?.locations[0]) {
          // Set teamMembers to the data of the first item in rows
          const firstLocation = Object.keys(data?.rows)[0]; // Get the first location name
          // const firstLocation = data?.locations[0].location;
          const firstLocationData = data?.rows[firstLocation]; // Get the data for the first location
          setTeamMembers(firstLocationData);
          setSelectedOption(firstLocation);
          setSelectedCountryColor(firstLocationData);
        }

        setTeamMembersLoader(true);
      })
      .catch((error) => {
        console.log("Error occured while fetching product ❌", error);
      });
  }, []);

  return (
    <>
      <div className={styles.team_main}>
        {!loder || <Loder />}
        <ScrollToTopButton />
        <TopBar />
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

        <div className={styles.team_sec2}>
          {Object.keys(locations)?.map((key) => (
            <div key={key}>
              <button
                onClick={(e) => {
                  setSelectedOption(locations[key]?.location); // Check if the clicked location is "Other"
                  if (locations[key]?.location === "Other") {
                    setTeamMembers(rows.Other);
                    setSelectedCountry(null); // Clear any selected country
                  } else if (locations[key]?.location === "Global") {
                    setTeamMembers(rows.Global);
                    setSelectedCountry(null); // Clear any selected country
                  } else {
                    // setTeamMembers(rows.Global);
                    const firstLocation = Object.keys(rows)[0]; // Get the first location name
                    const firstLocationData = rows[firstLocation]; // Get the data for the first location
                    setTeamMembers(firstLocationData);
                    setSelectedCountryColor(locations[key]?.location); // Set the selectedCountryColor
                    setSelectedCountry(locations[key]?.children);
                    const selectedChildren = locations[key]?.children;
                    if (selectedChildren) {
                      const firstChild = Object.values(selectedChildren)[0];
                      const firstChildLocation = firstChild?.location;
                      setTeamMembers(rows[firstChildLocation]);
                      setSelectedCountryColor([firstChildLocation]); // Set the selectedCountryColor
                    }
                  }
                }}
                className={
                  locations[key]?.location === selectedOption
                    ? styles.button2
                    : styles.button1
                }
              >
                {locations[key]?.location}
              </button>
            </div>
          ))}
        </div>
        {/* <hr /> */}

        <div className={styles.team_sec2}>
          {selectedCountry &&
            Object?.keys(selectedCountry)?.map((key) => (
              <div key={key}>
                <button
                  style={{ borderTop: "none" }}
                  onClick={(e) => {
                    setSelectedCountryColor(selectedCountry[key]?.location);
                    setTeamMembers(rows[selectedCountry[key]?.location]);
                  }}
                  className={
                    selectedCountry[key]?.location == selectedCountryColor
                      ? styles.button2
                      : styles.button1
                  }
                >
                  {selectedCountry[key]?.location}
                </button>
              </div>
            ))}
        </div>

        {/* <hr /> */}
        {teamMembersLoader ? (
          <div className={styles.team_sec3}>
            {teamMembers ? (
              Object?.keys(teamMembers?.Large)?.map((title, index) => (
                <React.Fragment key={index}>
                  <h3 className="yellow">{title}</h3>
                  <div key={title}>
                    {teamMembers?.Large[title]?.map((item) => (
                      <Link
                        href=""
                        key={item.id}
                        onClick={() => {
                          handleOpenClose();
                          setModalData(item);
                        }}
                        className={styles.card}
                      >
                        <div className={styles.card_image_div}>
                          <Image
                            width={1000}
                            height={1000}
                            className={styles.card_image}
                            src={item.photoLargeURL}
                            alt={item.first_name + " " + item.last_name}
                            // loading="lazy"
                            priority={true}
                          />
                        </div>
                        <div className={styles.card_content}>
                          <span className="name_heading">
                            {/* {item.first_name + " " + item.last_name} */}
                            {item.full_name}
                          </span>
                          <p className="small_heading">{item.designation}</p>
                          <div className={styles.country_div}>
                            <p className="small_heading">{item.city}.</p>

                            <p className="small_heading">{item.country}</p>
                            {item?.country ? (
                              <img
                                src={getFlagUrl(item.country)}
                                alt={item.country}
                                style={{ width: 30, marginRight: 3 }}
                              />
                            ) : null}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </React.Fragment>
              ))
            ) : (
              <></>
            )}
          </div>
        ) : (
          ""
        )}

        {/* <<<<<<<<<<<<<<<<<<<< card modal >>>>>>>>>>>>>>>>>>>>*/}

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
                src={modalData?.photoLargeURL}
                alt={modalData?.full_name}
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
                <h4 className={styles.modal_name}>{modalData?.full_name}</h4>
                <div className={styles.modal_country_div}>
                  <h4 className="h4_light_black">{modalData?.designation}</h4>
                  <h4
                    className={styles.dash_modal}
                    style={{ color: "#000", fontWeight: "bold" }}
                  >
                    -
                  </h4>
                  <h4 className="h4_light_black">{modalData?.city}.</h4>
                  <div className={styles.flex1}>
                    <h4 className="h4_light_black">{modalData?.country} </h4>
                    {modalData?.country ? (
                      <img
                        src={getFlagUrl(modalData.country)}
                        alt={modalData.country}
                        style={{ width: 30, marginRight: 3 }}
                      />
                    ) : null}
                  </div>

                  <div className={styles.flex}>
                    <p className={styles.modal_country}>
                      {modalData?.country}{" "}
                    </p>
                    {modalData?.country ? (
                      <img
                        src={getFlagUrl(modalData.country)}
                        alt={modalData.country}
                        style={{ width: 30, marginRight: 3 }}
                      />
                    ) : null}
                  </div>
                </div>

                <p className={styles.modal_discription}>
                  <div
                    dangerouslySetInnerHTML={{ __html: modalData?.bio }}
                  ></div>
                </p>
              </div>
            </div>
          </Box>
        </Modal>
        <ToastContainer className="tost" />

        <Footer />
      </div>
    </>
  );
}
