import styles from "../../../talenthunt_styles/ApplyBaner.module.css";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export default function ApplyBaner() {
  return (
    <div className={styles.apply_baner_container}>
      <div className={styles.apply_baner_sec1}>
        {/* <div className={styles.dashline}></div> */}
        <h2 className="yellow">Want to apply for competition?</h2>
      </div>
      <div className={styles.apply_baner_sec2}>
        <p>
          Follow these simple steps to submit your entry and compete for the
          prize.
        </p>
      </div>

      <div className={styles.apply_baner_sec3}>
        <div className={styles.card}>
          <div className={styles.card_sec1}></div>
          <div className={styles.card_sec2}>
            <div className={styles.card1_icon1}></div>
            <div className={styles.card1_icon2}></div>
          </div>
          <div className={styles.card_sec3}>
            <h3>Register yourself:</h3>
          </div>
          <div className={styles.card_sec4}>
            <p>
              Sign up on the competition website by providing your basic details
              such as name, email, and password.
            </p>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.card_sec1}></div>
          <div className={styles.card_sec2}>
            <div className={styles.card2_icon1}></div>
            <div className={styles.card2_icon2}></div>
          </div>
          <div className={styles.card_sec3}>
            <h3>Select Category</h3>
          </div>
          <div className={styles.card_sec4}>
            <p>
              Choose the category of your entry from the available options such
              as acting, singing, dancing, or other performing arts
            </p>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.card_sec1}></div>
          <div className={styles.card_sec2}>
            <div className={styles.card3_icon1}></div>
            <div className={styles.card3_icon2}></div>
          </div>
          <div className={styles.card_sec3}>
            <h3>Submit your work:</h3>
          </div>
          <div className={styles.card_sec4}>
            <p>
              Upload your entry as per the guidelines mentioned on the website,
              along with any required details such as title, description, and
              duration.
            </p>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.card_sec1}></div>
          <div className={styles.card_sec2}>
            <div className={styles.card4_icon1}></div>
            <div className={styles.card4_icon2}></div>
          </div>
          <div className={styles.card_sec3}>
            <h3>Be a winner:</h3>
          </div>
          <div className={styles.card_sec4}>
            <p>
              Wait for the results to be announced and see if your entry is
              selected as a winner. Winners will be notified by email and will
              receive various prizes and opportunities to further their careers
              in the performing arts.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.apply_baner_sec4}>
        <div className={styles.dash}>
          <div className={styles.dash_child}>
            {" "}
            <KeyboardArrowRightIcon />
          </div>
        </div>
        <div className={styles.dash}>
          <div className={styles.dash_child}>
            {" "}
            <KeyboardArrowRightIcon />
          </div>
        </div>
        <div className={styles.dash}>
          <div className={styles.dash_child}>
            {" "}
            <KeyboardArrowRightIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
