import styles from "../../../styles/HomeBaner.module.css";
import Link from "next/link";

export default function HomeBaner({ dataBanner }) {
  return (
    <div className={styles.home_baner_container}>
      <div className={styles.section}>
        <h2 className="yellow">Our Company</h2>
      </div>
      <Link
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
      </Link>
      {/* </Link> */}
    </div>
  );
}
