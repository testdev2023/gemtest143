import styles from "../talenthunt_styles/PrizesAndWinners.module.css";
import TopBar from "../src/components/TopBar/EntTopBar";
import Image from "next/image";
import JohnDoe from "../src/asset/Winners/John Doe.png";
import AlexendraDoe from "../src/asset/Winners/Alexendra Doe.png";
import EmiliaClerk from "../src/asset/Winners/Emilia Clerk.png";
import Footer from "../src/components/Footer/Footer";
import ScrollToTopButton from "../src/components/ScrollToTopButton/ScrollToTopButton";
import axios from "axios";
// import { baseUrl } from "../src/config/Config";
import React, { useEffect, useState } from "react";
// import { Link } from "@mui/material";
import Link from "next/link";
import Loder from "../src/components/Loder";
import InnerBaner from "../src/components/Baner/innerBaner";
import moment from "moment/moment";
import localStorage from "local-storage";
import { useRouter } from "next/router";
export default function PrizesAndWinners() {
  const [banner, setBanner] = useState();
  const [loder, setLoder] = useState(true);
  // USER Activity
  const router = useRouter();
  const [pageName, setPageName] = useState("");
  const [pageURL, setPageURL] = useState("");
  const [localDateTime, setLocalDateTime] = useState([]);
  const [prizes, setPrizes] = useState([]); // State for storing competition prizes
  const [allcompetition, setAllCompetition] = useState([]);

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
  const GetPrize = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/competition-prizes"
      );
      // console.log(response?.data?.response?.data, "chrcking");

      if (response?.data?.status === true) {
        setAllCompetition(response?.data?.response?.data);
        setPrizes(response?.data?.response?.data?.[0]?.competition_prizes);
      } else {
        // Handle the case where the status is not active
        console.log("Competition prizes are not currently active.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const GetBanner = async () => {
    try {
      await axios
        .get(
          // `${baseUrl}/api/banners?s[page]=talenthunt/prizes and winners&s[type]=Landing`
          process.env.NEXT_PUBLIC_BASE_URL +
            "/api/banners?s[page]=Prizes & Winners&s[type]=Landing"
        )

        .then((response) => {
          setBanner(response?.data?.response?.data[0]);
          setLoder(false);
        })
        .catch((error) => {
          alert(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   GetBanner();
  // }, []);
  const isUserLoggedIn = !!localStorage.get("loginAuth")?.data?.api_token;

  useEffect(() => {
    if (!isUserLoggedIn) {
      // If the user is not logged in, redirect to the login page
      router.push("/login"); // Replace "/login" with your actual login page URL
    } else {
      // If the user is logged in, fetch the page data
      GetBanner();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    GetPrize();
  }, []);
  return (
    <div className={styles.about_prizes_winners_main}>
      <ScrollToTopButton />
      <TopBar />
      {!loder || <Loder />}

      <InnerBaner
        source={
          banner?.file_type == "image" ? banner?.imageURL : banner?.videoURL
        }
        fileType={banner?.file_type}
        headingBanner={banner?.title}
      />

      {/* <div className={styles.prize_winners_baner_sec1}>
        <h1>Prizes</h1>
      </div> */}

      <div className={styles.sub_parent}>
        {allcompetition?.map((competitions) => (
          <div
            className={styles.prize_winners_baner_sec2}
            key={competitions?.id}
          >
            <h2 className="yellow">{competitions?.title}</h2>
            <p
              dangerouslySetInnerHTML={{
                __html: competitions?.short_description,
              }}
            ></p>
            {console.log(competitions?.competition_prizes, "testing ")}
            <div className={styles.prize_winners_baner_sec3}>
              {competitions?.competition_prizes?.map((prize) => (
                <div
                  className={styles.prize_winner_card}
                  style={{
                    backgroundImage: `url(${prize?.prize_image})`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundColor: "#474747",
                  }}
                  key={prize.id}
                >
                  <div className={styles.prize_winner_card_sec2}>
                    <div
                      className={styles.prize_winner_card2_icon1}
                      style={{ backgroundImage: `url(${prize?.prize_icon})` }}
                    ></div>
                  </div>
                  <div>
                    <p className={styles.prize_winner_card_position_no}>
                      {prize?.prize_title}
                    </p>
                  </div>
                  <div>
                    <p
                      className={styles.prize_winner_card_position}
                      dangerouslySetInnerHTML={{ __html: prize?.description }}
                    ></p>
                  </div>
                  <div className={styles.prize_winner_card_sec3}>
                    <p className={styles.prize_winner_card_prizing}>
                      {prize?.prize_amount}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* 1st Card */}
        {/* {prizes?.map((prize) => (
          <div
            className={styles.prize_winner_card}
            style={{ backgroundImage: `url(${prize?.prize_image})` }}
            key={prize.id}
          >
            <div className={styles.prize_winner_card_sec2}>
              <div
                className={styles.prize_winner_card2_icon1}
                style={{ backgroundImage: `url(${prize?.prize_icon})` }}
              ></div>
            </div>
            <div>
              <p className={styles.prize_winner_card_position_no}>
                {prize?.prize_title}
              </p>
            </div>
            <div>
              <p
                className={styles.prize_winner_card_position}
                dangerouslySetInnerHTML={{ __html: prize?.description }}
              ></p>
            </div>
            <div className={styles.prize_winner_card_sec3}>
              <p className={styles.prize_winner_card_prizing}>
                {prize?.prize_amount}
              </p>
            </div>
          </div>
        ))} */}

        {/* Second Card */}
        {/* <div className={styles.prize_winner_card}>
          <div className={styles.prize_winner_card_sec2}>
            <div className={styles.prize_winner_card2_icon1}></div>
          </div>
          <div>
            <p className={styles.prize_winner_card_position_no}>2nd</p>
          </div>
          <div>
            <p className={styles.prize_winner_card_position}>Position</p>
          </div>
          <div className={styles.prize_winner_card_sec3}>
            <p className={styles.prize_winner_card_prizing}>TBD</p>
          </div>
        </div> */}
        {/* Thrid Card */}
        {/* <div className={styles.prize_winner_card}>
          <div className={styles.prize_winner_card_sec2}>
            <div className={styles.prize_winner_card2_icon1}></div>
          </div>
          <div>
            <p className={styles.prize_winner_card_position_no}>3rd</p>
          </div>
          <div>
            <p className={styles.prize_winner_card_position}>Position</p>
          </div>
          <div className={styles.prize_winner_card_sec3}>
            <p className={styles.prize_winner_card_prizing}>TBD</p>
          </div>
        </div> */}
      </div>
      {/* Checking Start */}
      {/* <div className={styles.winners_sec1}>
        <h1>Winners</h1>
      </div>

      <div className={styles.winners_sec3}>
        <div className={styles.card}>
          <Image
            className={styles.winners_image_sizing}
            src={AlexendraDoe}
            alt="AlexendraDoe"
            loading="lazy"
          />
          <div className={styles.winner_container}>
            <h3 className={styles.winners_name}>Emilia Clerk</h3>
            <div className={styles.winners_flex_Category}>
              <p className={styles.winners_category}>Category: </p>
              <p className={styles.winners_singing}>Singing</p>
            </div>

            <p className={styles.winners_paragraph}>
              Lorem Ipsum is a non-profit initiative by Lorem ipsum. Under this
              project, the organization will be Lorem ipsum on
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <Image
            className={styles.winners_image_sizing}
            src={EmiliaClerk}
            loading="lazy"
            alt="EmiliaClerk"
          />

          <div className={styles.winner_container}>
            <h3 className={styles.winners_name}>Emilia Clerk</h3>
            <div className={styles.winners_flex_Category}>
              <p className={styles.winners_category}>Category: </p>
              <p className={styles.winners_singing}>Singing</p>
            </div>

            <p className={styles.winners_paragraph}>
              Lorem Ipsum is a non-profit initiative by Lorem ipsum. Under this
              project, the organization will be Lorem ipsum on
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <Image
            className={styles.winners_image_sizing}
            src={JohnDoe}
            loading="lazy"
            alt="JohnDoe"
          />
          <div className={styles.winner_container}>
            <h3 className={styles.winners_name}>Emilia Clerk</h3>
            <div className={styles.winners_flex_Category}>
              <p className={styles.winners_category}>Category: </p>
              <p className={styles.winners_singing}>Singing</p>
            </div>

            <p className={styles.winners_paragraph}>
              Lorem Ipsum is a non-profit initiative by Lorem ipsum. Under this
              project, the organization will be Lorem ipsum on
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <Image
            className={styles.winners_image_sizing}
            src={JohnDoe}
            alt="JohnDoe"
            loading="lazy"
          />
          <div className={styles.winner_container}>
            <h3 className={styles.winners_name}>Emilia Clerk</h3>
            <div className={styles.winners_flex_Category}>
              <p className={styles.winners_category}>Category: </p>
              <p className={styles.winners_singing}>Singing</p>
            </div>

            <p className={styles.winners_paragraph}>
              Lorem Ipsum is a non-profit initiative by Lorem ipsum. Under this
              project, the organization will be Lorem ipsum on
            </p>
          </div>
        </div>
      </div> */}
      {/* Checking End  */}
      <Footer />
    </div>
  );
}
