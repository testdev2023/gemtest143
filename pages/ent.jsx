import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import TopBar from "../src/components/TopBar/EntTopBar";
import HomeBaner from "../src/components/Baner/HomeBaner";
import AboutBaner from "../src/components/AboutBaner/AboutBaner";
import TalentsBaner from "../src/components/TalentsBaner/TalentsBaner";
import NewsBaner from "../src/components/NewsBaner/NewsBaner";
import EventsBaner from "../src/components/EventsBaner/EventsBaner";
import FindWorkBaner from "../src/components/FindWorkBaner/FindWorkBaner";
import WhatYouCanBaner from "../src/components/WhatYouCanBaner/WhatYouCanBaner";
import ELearningBaner from "../src/components/MasterClass/MasterClass";
import Footer from "../src/components/Footer/Footer";
import ScrollToTopButton from "../src/components/ScrollToTopButton/ScrollToTopButton";
import axios from "axios";
import MainBaner from "../src/components/Baner/MainBaner";
import Loder from "../src/components/Loder";
import GemCommunity from "../src/components/GemCommunity/GemCommunity";
// import { toast } from "react-toastify";
import { toast, ToastContainer } from "react-toastify";

export default function Ent() {
  const [banner, setBanner] = useState();
  const [sliderSection, setSliderSection] = useState([]);
  const [sliderSectionLoader, setSliderSectionLoader] = useState(false);
  const [loader, setLoader] = useState(true);

  const GetBanner = async () => {
    try {
      await axios
        .get(process.env.NEXT_PUBLIC_BASE_URL + "/api/landing_page")
        .then((response) => {
          setBanner(response.data);
          setSliderSection(response?.data?.slider_section);
          setLoader(false);

          setSliderSectionLoader(true);
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
  }, []);

  return (
    <>
      <div className={styles.ent_main}>
        {!loader || <Loder />}

        <ScrollToTopButton />
        <TopBar />
        {/* <VideoComponent videoSource={videorUrl} /> */}
        {sliderSectionLoader ? (
          <MainBaner dataBanner={banner?.slider_section} />
        ) : (
          ""
        )}
        {/* <Baner /> */}
        <AboutBaner />
        <TalentsBaner />
        {/* <AddBaner page="team" /> */}
        <NewsBaner />
        <EventsBaner />
        <FindWorkBaner />
        {sliderSectionLoader ? (
          <HomeBaner dataBanner={banner?.banner_section} />
        ) : (
          ""
        )}
        <WhatYouCanBaner />
        <ELearningBaner />
        <GemCommunity />
        <Footer />
        {/* <GoogleAuth /> */}
        <ToastContainer className="tost" />
      </div>
    </>
  );
}
