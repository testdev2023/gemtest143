import React, { useState } from "react";
import styles from "../../../talenthunt_styles/AboutBaner.module.css";
import styles1 from "../../../styles/Modal.module.css";
import Link from "next/link";
import localStorage from "local-storage";
// import { toast } from "react-toastify";
// import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { useEffect } from "react";
import Loder from "../../components/Loder";
// import ModalComponent from "@/src/components/ModalComponent";
// import ModalComponent from ""

export default function AboutBaner() {
  const [open, setOpen] = useState(false);
  const handleOpenClose = () => setOpen(!open);
  const router = useRouter();
  const user = localStorage.get("loginAuth")?.data?.api_token;
  const [content, setContent] = useState();
  // const [loder, setLoder] = useState(true);
  const [abountBanner, setAboutBanner] = useState(false);
  // const buttonRedirect = () => {
  //   setTimeout(() => {
  //     toast.error("Please login to Access");
  //   }, 3000);
  //   router.push({
  //     pathname: user ? "/aboutcompetetion" : "/login",
  //   });
  // };
  const buttonRedirect = () => {
    if (!user) {
      setTimeout(() => {
        toast.error("Please login to access.", {
          autoClose: 5000,
        });
      }, 3000);
    }
    router.push({
      pathname: user ? "/aboutcompetition" : "/login",
    });
  };

  const GetContent = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/page/Talent-competition-home"
      );
      setContent(response?.data?.response);
      // console.log(response.data);
      setAboutBanner(true);
      // setLoder(false);
    } catch (error) {
      console.error("Error Fetching Content:", error);
      setContent(null);
      setAboutBanner(true);
    }
  };
  useEffect(() => {
    GetContent();
  }, []);
  const backgroundImageUrl = content?.thumbnailUrl || ""; // Use empty string as default if thumbnailUrl is undefined

  return (
    <div className={styles.about_baner_main}>
      {abountBanner ? (
        <>
          <div className={styles.about_baner_sec1}>
            <h2 className="color_yellow">
              <Link href="/aboutcompetition">{content?.title}</Link>
            </h2>
          </div>
          <div className={styles.about_baner_sec2}>
            <div className={styles.about_baner_sec2_sub1}>
              <p dangerouslySetInnerHTML={{ __html: content?.tagline }}></p>
              <span
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: content?.content }}
              ></span>
            </div>

            {content?.thumbnailUrl && (
              <div
                style={{
                  backgroundImage: `url(${content.thumbnailUrl})`,
                }}
                className={styles.about_baner_sec2_sub2}
              ></div>
            )}
            {/* <div
              style={{
                // background: `url(${content?.thumbnailUrl})`
                backgroundImage: `url(${backgroundImageUrl})`,
              }}
              className={styles.about_baner_sec2_sub2}
            ></div> */}
          </div>
          <div className={styles.about_baner_sec3}>
            <button
              onClick={() => {
                !user ? handleOpenClose() : router.push("/aboutcompetition");
              }}
              className={styles.view_more_button}
            >
              View more
            </button>
            <ToastContainer className="tost" />
          </div>
          <Modal
            open={open}
            onClose={handleOpenClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className={styles1.box}>
              <div className={styles1.btn_div_mob}>
                <button
                  className={styles1.unitX_mob}
                  variant="contained"
                  onClick={handleOpenClose}
                >
                  X
                </button>
              </div>
              <div className={styles1.box_div1}>
                <p>
                  Unlock exclusive content. Join for free or log in to access
                  the members-only area.
                </p>
                <div className={styles1.box_div2}>
                  <Link href="/login"> Login </Link>
                  <Link href="/signup"> Sign Up </Link>
                </div>
              </div>
            </Box>
          </Modal>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
