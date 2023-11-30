// Import necessary dependencies
import React, { useEffect, useState } from "react";
import Image from "next/image";

import styles from "../../../styles/Footer.module.css";
import logo from "../../asset/logo.png";
import Link from "next/link";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import NewsLetter from "../../talenthunt_components/NewsLetter/NewsLetter";
import moment from "moment";
import fblogo from "../../asset/icon/socialicon/facebook.svg";
import xlogo from "../../asset/icon/socialicon/twitter.svg";
import instalogo from "../../asset/icon/socialicon/instagram.svg";
import ytlogo from "../../asset/icon/socialicon/youtube.svg";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Footer() {
  const [shouldRenderIframe, setShouldRenderIframe] = useState(true);
  const currentYear = moment().format("YYYY");

  useEffect(() => {
    const loadEmbedSocialScript = () => {
      const script = document.createElement("script");
      script.src = "https://embedsocial.com/cdn/ht.js";
      script.id = "EmbedSocialHashtagScript";
      script.setAttribute(
        "data-ref",
        "cf0c2c0321d5bfb1a9db8f463c93f6fb224be16f"
      );
      const head = document.head || document.getElementsByTagName("head")[0];

      if (head) {
        head.appendChild(script);
      }
    };
    loadEmbedSocialScript();

    return () => {
      const script = document.getElementById("EmbedSocialHashtagScript");
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    const loadTwitterScriprt = () => {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      const body = document.body;
      if (body) {
        body.appendChild(script);
      }

      return () => {
        if (body) {
          body.removeChild(script);
        }
      };
    };
    loadTwitterScriprt();
  }, []);

  return (
    <div className={styles.footer_main}>
      <ToastContainer />
      <footer className={styles.footer}>
        <div className={styles.flex}>
          {/* First Row */}
          <section className={styles.footer_sec}>
            <Link href="/">
              <Image src={logo} loading="lazy" alt="Logo" />
            </Link>
            <p>
              GEM is an innovative entertainment company of the people, for the
              people and by the people just like democracy, GEM will provide an
              opportunity for everyone to connect and grow, and it is the first
              of its kind entity by the foundation up, which is OWNED BY THE FANS
            </p>
          </section>
          {/* Second Row */}
          <section className={styles.footer_sec}>
            <ul>
              <li>
                Home
              </li>
            </ul>
          </section>
          {/* Third Row */}
          <section className={styles.footer_sec}>
          <ul>
              <li>
                About Us
              </li>
            </ul>
          </section>
          {/* Fourth Row */}
          <section className={styles.footer_sec}>
          <ul>
              <li>
                Social
              </li>
            </ul>
          </section>
        </div>
      </footer>
      <div className={styles.copy_right}>
        <div>
          <p>Copyright © {currentYear} Global Entertainment Movement</p>
        </div>
      </div>
    </div>
  );
}
