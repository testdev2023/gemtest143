import styles from "../../../styles/HomeBaner.module.css";
import Link from "next/link";
import Banner from "../../asset/Logo-1.jpg";
import Banner2 from "../../asset/Logo-2.jpg";

export default function HomeBaner({ dataBanner }) {
  return (
    <div className={styles.home_baner_container}>
      <div className={styles.section}>
        <h2 className="yellow">Our Brand Partners</h2>
      </div>
      <img src={Banner} alt="Banner 1" />
      {/* If you have a second banner, you can use it like this */}
      <img src={Banner2} alt="Banner 2" />
      {/* Rest of your code */}
    </div>
  );
}
