import Link from "next/link";
import styles from "../../../styles/GemCommunity.module.css";
import Image from "next/image";
import fblogo from "../../asset/icon/socialicon/facebook.svg";
import xlogo from "../../asset/icon/socialicon/twitter.svg";
import instalogo from "../../asset/icon/socialicon/instagram.svg";
import ytlogo from "../../asset/icon/socialicon/youtube.svg";

export default function GemCommunity() {
  return (
    <div className={styles.gem_community_container}>
      <div className={styles.gem_community_sec1}>
        {/* <div className={styles.dashline}></div> */}
        <h1 className="big_light_heading">
          ARE YOU READY TO BE A PART OF GEM’S COMMUNITY?
        </h1>
        <Link href="signup">
          <h3>SIGN UP</h3>
        </Link>
      </div>

      {/* <div className={styles.gem_community_sec3}></div> */}
    </div>
  );
}
