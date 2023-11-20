/* eslint-disable @next/next/no-script-component-in-head */
import Head from "next/head";
import styles from "./../styles/Home.module.css";
import Ent from "./ent";

import Script from "next/script";
import ScrollToTopButton from "../src/components/ScrollToTopButton/ScrollToTopButton";
export default function Home() {

  return (
    <div className={`${styles.main} ${styles.dusriclass}`}>
      <Head>
        <title>GEM</title>
       </Head>
      <Script  src="https://accounts.google.com/gsi/client"async defer/>
      <Script src="https://apis.google.com/js/platform.js" async defer/>
      <ScrollToTopButton />      
        <Ent />
      {/* <Protected /> */}
    
    </div>
  );
}
