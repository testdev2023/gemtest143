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
      <div className={styles.gem_community_sec2}>
        <h5>STAY IN TOUCH WITH US</h5>
        <div className={styles.flex}>
          <Link
            className={styles.icon}
            href="https://www.facebook.com/iamgemglobal/?_rdc=1&_rdr"
            target="_blank"
          >
            <Image src={fblogo} alt="" />
          </Link>
          <Link
            className={styles.icon}
            href="https://twitter.com/iamgemglobal"
            target="_blank"
          >
            <Image src={xlogo} alt="" />
          </Link>
          <Link
            className={styles.icon}
            href="https://www.instagram.com/iamgemglobal/"
            target="_blank"
          >
            <Image src={instalogo} alt="" />
          </Link>
          <Link
            className={styles.icon}
            href="https://www.youtube.com/channel/UCzo6KFlfAzTVXHbBinP9fAw"
            target="_blank"
          >
            <Image src={ytlogo} alt="" />
          </Link>
        </div>
      </div>

      {/* <div className={styles.gem_community_sec3}></div> */}
    </div>
  );
}
