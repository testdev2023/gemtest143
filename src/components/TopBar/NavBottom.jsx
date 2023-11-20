/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useCallback, useRef } from "react";
import styles from "../../../styles/NavBottom.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../asset/gemlogo.png";
import Logo from "./Logo";
import { useRouter } from "next/router";
import Loder from "../../components/Loder";

const NavBottom = () => {
  const router = useRouter();
  const { pathname } = router;
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Global");
  const [loder, setLoder] = useState(false);

  return (
    <>
      {!loder || <Loder />}
      <div id="container">
        <nav className={`${styles.nav}  ${isScrolled ? styles.nav_dark : ""}`}>
          <ul>
            <li className={styles.li}>
              <Link href="/overview" legacyBehavior>
                <a
                  onClick={() => {
                    pathname === "/overview" ? setLoder(false) : setLoder(true);
                  }}
                  className={
                    pathname === "/overview"
                      ? styles.activeOption
                      : "color_white"
                  }
                >
                  OVERVIEW
                </a>
              </Link>
            </li>
            <li className={styles.li}>
              <Link href="/team" legacyBehavior>
                <a
                  onClick={() => {
                    pathname === "/team" ? setLoder(false) : setLoder(true);
                  }}
                  className={
                    pathname === "/team" ? styles.activeOption : "color_white"
                  }
                >
                  TEAM
                </a>
              </Link>
            </li>

            <li className={styles.li}>
              <Link href="/benefits" legacyBehavior>
                <a
                  onClick={() => {
                    pathname === "/benefits" ? setLoder(false) : setLoder(true);
                  }}
                  className={
                    pathname === "/benefits"
                      ? styles.activeOption
                      : "color_white"
                  }
                >
                  BENEFITS
                </a>
              </Link>
            </li>
            <li className={styles.li}>
              <Link href="/partners" legacyBehavior>
                <a
                  onClick={() => {
                    pathname === "/partners" ? setLoder(false) : setLoder(true);
                  }}
                  className={
                    pathname === "/partners"
                      ? styles.activeOption
                      : "color_white"
                  }
                >
                  PARTNERS
                </a>
              </Link>
            </li>
            <li className={styles.li_img}>
              <Logo
                loder={loder}
                setLoder={setLoder}
                setIsScrolled={setIsScrolled}
              />
            </li>
            <li className={styles.li}>
              <Link href="/news" legacyBehavior>
                <a
                  onClick={() => {
                    pathname === "/news" ? setLoder(false) : setLoder(true);
                  }}
                  className={
                    pathname === "/news" ? styles.activeOption : "color_white"
                  }
                >
                  NEWS
                </a>
              </Link>
            </li>
            <li className={styles.li}>
              <Link href="/events" legacyBehavior>
                <a
                  onClick={() => {
                    pathname === "/events" ? setLoder(false) : setLoder(true);
                  }}
                  className={
                    pathname === "/events" ? styles.activeOption : "color_white"
                  }
                >
                  EVENTS
                </a>
              </Link>
            </li>
            <li className={styles.li}>
              <Link href="/talent" legacyBehavior>
                <a
                  onClick={() => {
                    pathname === "/talent" ? setLoder(false) : setLoder(true);
                  }}
                  className={
                    pathname === "/talent" ? styles.activeOption : "color_white"
                  }
                >
                  TALENT
                </a>
              </Link>
            </li>
            <li className={styles.li}>
              <Link href="/projects" legacyBehavior>
                <a
                  onClick={() => {
                    pathname === "/projects" ? setLoder(false) : setLoder(true);
                  }}
                  className={
                    pathname === "/projects"
                      ? styles.activeOption
                      : "color_white"
                  }
                >
                  PROJECTS
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default NavBottom;
