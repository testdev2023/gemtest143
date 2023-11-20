import Image from "next/image";
import React from "react";
import loder from "../asset/loder1.gif";
import styles from "../../styles/Home.module.css";

const Loder = () => {
  return (
    <div className={styles.gif_parent}>
      <Image
        className={styles.gif_img}
        // style={{ height: "9%", width: "5%" }}
        alt="loder"
        src={loder}
        // loading="lazy"
        priority={true}
      />
    </div>
  );
};

export default Loder;
