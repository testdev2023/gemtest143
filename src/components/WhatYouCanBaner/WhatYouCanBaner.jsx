import styles from "../../../styles/WhatYouCanBaner.module.css";
import Image from "next/image";
import Link from "next/link";
import icon1 from "../../asset/WhatYouCan/icon1.png";
import icon2 from "../../asset/WhatYouCan/icon2.png";
import icon3 from "../../asset/WhatYouCan/icon3.png";
import icon4 from "../../asset/WhatYouCan/icon4.png";
import icon5 from "../../asset/WhatYouCan/icon5.png";
import icon6 from "../../asset/WhatYouCan/icon6.png";
import { height } from "@mui/system";

export default function WhatYouCanBaner() {
  return (
    <>
      <div className={styles.what_you_can_baner_container}>
        <div className={styles.what_you_can_baner_sec1}>
          {/* <div className={styles.what_you_can_baner_dashline}></div> */}
          <h2 className="yellow">WHAT YOU CAN DO ON GEM?</h2>
        </div>
        <div className={styles.what_you_can_baner_sec2}>
          <Link href="#" className={styles.what_you_can_baner_card}>
            <div className={styles.what_you_can_baner_card_link} href="#">
              <div className={styles.card_link_icon_div}>
                <Image src={icon1} loading="lazy" alt="card_icon"></Image>
              </div>
              <h4>BOOK A TALENT</h4>
            </div>
          </Link>

          <Link href="#" className={styles.what_you_can_baner_card}>
            <div className={styles.what_you_can_baner_card_link} href="#">
              <div className={styles.card_link_icon_div}>
                <Image src={icon2} loading="lazy" alt="card_icon"></Image>
              </div>
              <h4>SELL YOUR SERVICES</h4>
            </div>
          </Link>

          <Link href="#" className={styles.what_you_can_baner_card}>
            <div className={styles.what_you_can_baner_card_link} href="#">
              <div className={styles.card_link_icon_div}>
                <Image src={icon3} loading="lazy" alt="card_icon"></Image>
              </div>
              <h4>CREATIVE COLLABORATIONS</h4>
            </div>
          </Link>

          <Link href="#" className={styles.what_you_can_baner_card}>
            <div className={styles.what_you_can_baner_card_link} href="#">
              <div className={styles.card_link_icon_div}>
                <Image src={icon4} loading="lazy" alt="card_icon"></Image>
              </div>
              <h4>PITCH YOUR FILM PROJECTS</h4>
            </div>
          </Link>

          <Link href="#" className={styles.what_you_can_baner_card}>
            <div className={styles.what_you_can_baner_card_link} href="#">
              <div className={styles.card_link_icon_div}>
                <Image src={icon5} loading="lazy" alt="card_icon"></Image>
              </div>
              <h4>SIGN TALENT & CREATORS</h4>
            </div>
          </Link>

          <Link href="#" className={styles.what_you_can_baner_card}>
            <div className={styles.what_you_can_baner_card_link} href="#">
              <div className={styles.card_link_icon_div}>
                <Image src={icon6} loading="lazy" alt="card_icon"></Image>
              </div>
              <h4>SUPPORT NEW TALENT</h4>
            </div>
          </Link>
        </div>

        {/* <Link href="#" className={styles.view_more_button}>
        View more
      </Link> */}
      </div>
    </>
  );
}
