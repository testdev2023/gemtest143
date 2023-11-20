import React from "react";
import styles from "../../../styles/ProfileCard.module.css";
import Image from "next/image";
import hire from "../../asset/icon/hire_request.png";
import applied from "../../asset/icon/Job_Applied.png";
import events from "../../asset/icon/Events_Participated.png";
import projects from "../../asset/icon/Project_Submitted.png";
import favrets from "../../asset/icon/Favourites.png";
import share from "../../asset/icon/Total_Shares.png";

const Stats = () => {
  return (
    <div className={styles.stats_parent}>
      <div className={styles.card}>
        <Image height={50} width={50} src={hire} alt="stats" />
        <h4>Hire request </h4>
        <h4>(15)</h4>
      </div>
      <div className={styles.card}>
        <Image
          height={50}
          width={50}
          src={applied}
          loading="lazy"
          alt="stats"
        />
        <h4>Jobs applied</h4>
        <h4>(20)</h4>
      </div>
      <div className={styles.card}>
        <Image height={50} width={50} src={events} loading="lazy" alt="stats" />
        <h4>Events participated </h4>
        <h4>(45)</h4>
      </div>
      <div className={styles.card}>
        <Image
          height={50}
          width={50}
          src={projects}
          loading="lazy"
          alt="stats"
        />
        <h4>Projects submited </h4>
        <h4>(12)</h4>
      </div>
      <div className={styles.card}>
        <Image
          height={50}
          width={50}
          src={favrets}
          loading="lazy"
          alt="stats"
        />
        <h4>Favourites </h4>
        <h4>(98)</h4>
      </div>
      <div className={styles.card}>
        <Image height={50} width={50} src={share} loading="lazy" alt="stats" />
        <h4>Total shares </h4>
        <h4>(54)</h4>
      </div>
    </div>
  );
};

export default Stats;
