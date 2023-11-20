/* eslint-disable @next/next/no-img-element */
import styles from "../../../styles/EntTopBar.module.css";
import Link from "next/link";
import NavTop from "./NavTop";
import { useEffect, useState } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import SideBar from "./SideBar";
import NavTopMobile from "./NavTopMobile";

import * as React from "react";
import NavBottom from "./NavBottom";
import Loder from "../Loder";
// import { WindowsFilled } from "@ant-design/icons";

export default function TopBar() {
  const [loder, setLoder] = useState(false);

  // useEffect(() => {
  //   const onScroll = () => {
  //     const logo1 = document.getElementById("js-logo");
  //     if (logo1) {
  //       const theta = (document.documentElement.scrollTop / 50) % Math.PI;
  //       logo1.style.transform = `rotate(${theta}rad)`;
  //     }
  //   };

  //   window.addEventListener("scroll", onScroll);

  //   return () => {
  //     window.removeEventListener("scroll", onScroll);
  //   };
  // }, []);

  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(reactLocalStorage.getObject("loginAuth").data);
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  function handleClickLoder() {
    setLoder(true);
  }
  return (
    <>
      <div className={styles.nav_main}>
        {!loder || <Loder />}

        <div className={styles.nav_top}>
          <NavTop loder={loder} setLoder={setLoder} />
        </div>
        <div className={styles.nav_top_mobile}>
          <NavTopMobile />
        </div>
        <SideBar />

        <div className={styles.nav_botom}>
          <NavBottom />
        </div>
      </div>
    </>
  );
}
