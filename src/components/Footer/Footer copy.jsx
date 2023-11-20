/* eslint-disable jsx-a11y/alt-text */
import styles from "../../../styles/Footer.module.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import EmailIcon from "@mui/icons-material/Email";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import logo from "../../asset/logo.png";
import { useEffect } from "react";
import { InstagramEmbed } from "react-instagram-embed";

export default function Footer() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://embedsocial.com/cdn/ht.js";
    script.id = "EmbedSocialHashtagScript";
    script.setAttribute("data-ref", "cf0c2c0321d5bfb1a9db8f463c93f6fb224be16f");
    document.getElementsByTagName("head")[0].appendChild(script);

    return () => {
      const script = document.getElementById("EmbedSocialHashtagScript");
      if (script) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className={styles.footer_main}>
      <footer className={styles.footer}>
        <div className={styles.flex}>
          <section className={styles.footer_sec}>
            <Image loading="lazy" src={logo} />
            {/* <h3>LOGO</h3> */}
            <p>
              GEM is using volatile innovation in crowdfunding regulations to
              build an arts and entertainment organization claimed by the FANS,
              as we are positive that an Entertainment entity possessed by its
              customers has an edge to the one whose owners are millionaires and
              billionaires.
            </p>

            <div className={styles.footer_social}>
              <Link
                href="https://www.facebook.com/iamgemglobal/?_rdc=1&_rdr"
                target={"blank"}
              >
                <FacebookIcon />
              </Link>
              <Link href="https://twitter.com/iamgemglobal" target={"blank"}>
                <TwitterIcon />
              </Link>
              <Link
                href="https://www.instagram.com/iamgemglobal/"
                target={"blank"}
              >
                <InstagramIcon />
              </Link>
              <Link
                href="https://www.linkedin.com/in/global-entertainment-movement-530198213/"
                target={"blank"}
              >
                <LinkedInIcon />
              </Link>
              <Link
                href="https://www.youtube.com/channel/UCzo6KFlfAzTVXHbBinP9fAw"
                target={"blank"}
              >
                <YouTubeIcon />
              </Link>
            </div>
          </section>
          <section className={styles.footer_sec}>
            {/* <Link href="ent"> */}
            <h3>Fcebook Feed</h3>
            {/* </Link> */}
            {/* <iframe
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fmlsassuet%2F%3Fviewas%3D100000686899395&tabs=timeline&width=340&height=500&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=false&appId=3456942161238660"
              width="100%"
              height="100%"
              style={{ border: "none", overflow: "hidden" }}
              scrolling="no"
              frameborder="0"
              allowfullscreen="true"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            ></iframe> */}
          </section>

          <section className={styles.footer_sec}>
            {/* <Link href="#"> */}
            <h3>Twitter Feed</h3>
            {/* </Link> */}
            {/* <iframe
              allowfullscreen
              id="wallsio-iframe"
              src="https://my.walls.io/i5aze?nobackground=1&amp;show_header=0"
              style={{ border: "0", height: "100%", width: "100%" }}
              loading="lazy"
              title="My social wall"
            ></iframe> */}
          </section>
          <section className={styles.footer_sec}>
            {/* <Link href="#"> */}
            <h3>Instagram Feed</h3>
            {/* </Link> */}
            {/* <>
              <iframe
                src="https://www.instagram.com/iamgemglobal/embed"
                width="100%"
                height="100%"
                frameborder="0"
                allowtransparency="true"
              ></iframe>
            </> */}
          </section>
        </div>
      </footer>
      <div className={styles.copy_right}>
        <p>Copyright © 2023 Company</p>
        <p>
          All Rights Reserved |
          <Link href="termsandconditions"> Terms and Conditions </Link>|
          <Link href="privacypolicy"> Privacy Policy </Link>
        </p>
      </div>
    </div>
  );
}
