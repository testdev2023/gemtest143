import Link from "next/link";
import styles from "../../../styles/GemCommunity.module.css";
export default function GemCommunity() {
  return (
    <div className={styles.gem_community_container}>
      <div className={styles.gem_community_sec1}>
        {/* <div className={styles.dashline}></div> */}
        <h1 className="big_light_heading">
          ARE YOU READY TO BE A PART OF GEM’S COMMUNITY?
        </h1>
        <Link href="signup">
          <h3>SIGN UP NOW</h3>
        </Link>
      </div>

      {/* <div className={styles.gem_community_sec3}></div> */}
    </div>
  );
}
