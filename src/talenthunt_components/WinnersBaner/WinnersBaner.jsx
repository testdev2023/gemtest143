import styles from "../../../talenthunt_styles/WinnersBaner.module.css";
import Image from "next/image";
import JohnDoe from "../../asset/Winners/John Doe.png";
import AlexendraDoe from "../../asset/Winners/Alexendra Doe.png";
import EmiliaClerk from "../../asset/Winners/Emilia Clerk.png";

import Link from "next/link";
// import { Button } from "react-bootstrap";
export default function WinnersBaner() {
  return (
    <div className={styles.winners_container}>
      <div className={styles.winners_sec1}>
        {/* <div className={styles.winners_project_dashline}></div> */}
        <h1>Winners</h1>
      </div>
      <div className={styles.winners_sec2}>
        <p className={styles.winners_textalign}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
          varius quam quisque id diam vel quam
          <Link href="" className={styles.winners_more}>
            More...
          </Link>
        </p>
      </div>
      <div className={styles.winners_sec3}>
        {/* Latest Project Card No 1 */}
        <div className={styles.card}>
          <Image
            className={styles.winners_image_sizing}
            src={AlexendraDoe}
            loading="lazy"
            alt="AlexendraDoe"
          />
          <div className={styles.winner_container}>
            <h3 className={styles.winners_name}>Emilia Clerk</h3>
            <div className={styles.winners_flex_Category}>
              <p className={styles.winners_category}>Category: </p>
              <p className={styles.winners_singing}>Singing</p>
            </div>

            <p className={styles.winners_paragraph}>
              Lorem Ipsum is a non-profit initiative by Lorem ipsum. Under this
              project, the organization will be Lorem ipsum on
            </p>
          </div>
        </div>
        {/* Latest Project Card No 2 */}
        <div className={styles.card}>
          <Image
            className={styles.winners_image_sizing}
            src={EmiliaClerk}
            loading="lazy"
            alt="mypic"
          />

          <div className={styles.winner_container}>
            <h3 className={styles.winners_name}>Emilia Clerk</h3>
            <div className={styles.winners_flex_Category}>
              <p className={styles.winners_category}>Category: </p>
              <p className={styles.winners_singing}>Singing</p>
            </div>

            <p className={styles.winners_paragraph}>
              Lorem Ipsum is a non-profit initiative by Lorem ipsum. Under this
              project, the organization will be Lorem ipsum on
            </p>
          </div>
        </div>
        {/* Latest Project Card No 3 */}
        <div className={styles.card}>
          <Image
            className={styles.winners_image_sizing}
            src={JohnDoe}
            loading="lazy"
            alt="mypic"
          />
          <div className={styles.winner_container}>
            <h3 className={styles.winners_name}>Emilia Clerk</h3>
            <div className={styles.winners_flex_Category}>
              <p className={styles.winners_category}>Category: </p>
              <p className={styles.winners_singing}>Singing</p>
            </div>

            <p className={styles.winners_paragraph}>
              Lorem Ipsum is a non-profit initiative by Lorem ipsum. Under this
              project, the organization will be Lorem ipsum on
            </p>
          </div>
        </div>
      </div>
      {/* Cards End  */}
      {/* <button className={styles.view_more_button}>View more</button> */}
      <Link href="prizes" className={styles.view_more_button}>
        View more
      </Link>
    </div>
  );
}
