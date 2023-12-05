import styles from "../../../styles/HomeBaner.module.css";
import Link from "next/link";
import Banner from "../../asset/Logo-1.jpg"
import Banner2 from "../../asset/Logo-2.jpg"

export default function HomeBaner({ dataBanner }) {
  return (
    <div className={styles.home_baner_container}>
      <div className={styles.section}>
        <h2 className="yellow">Our Brand Partners</h2>
      </div>
      <img src="../../asset/Logo-1.jpg"/>
      <img src="../../asset/Logo-2.jpg"/>
      {/* <Link
        href={dataBanner?.url}
        style={{
          background: `url(${dataBanner.image})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        target="_blank"
        className={styles.section1}
      >
        <div>
          <h3>{dataBanner?.title}</h3>
          <Link className="color_yellow" target="_blank" href={dataBanner?.url}>
            More Details
          </Link>
        </div>
      </Link> */}
      {/* </Link> */}
    </div>
  );
}
