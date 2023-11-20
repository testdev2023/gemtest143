import styles from "../../../styles/TopBar1.module.css";
import Link from "next/link";
import NavTop from "../NavTop/NavTop";
import { useEffect, useState } from "react";
import { reactLocalStorage } from "reactjs-localstorage";

export default function TopBar() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(reactLocalStorage.getObject("loginAuth").data);
  }, []);

  return (
    <div className={styles.nav_main}>
      <NavTop />
      <div className={styles.nav_botom}>
        {user ? (
          <div className={styles.nav}>
            <input className={styles.input} type="checkbox" id="nav-check" />
            {/* <div className={styles.nav_header}>
              <div className={styles.nav_title}>JoGeek</div>
            </div> */}
            <div className={styles.nav_btn}>
              <label htmlFor="nav-check">
                <span></span>
                <span></span>
                <span></span>
              </label>
            </div>

            <div className={styles.nav_links}>
              {/* <Link href="ent">Home</Link> */}
              <Link href="/">Home</Link>
              <Link href="talenthunt">Talent Hunt</Link>
              <Link href="aboutcompetition">About Competition</Link>
              <Link href="submitnow">Submit Now</Link>
              <Link href="rulesandcriteria">Rules & Criteria</Link>
              <Link href="aboutjurry">Jury & Mentors</Link>
              <Link href="talentbord">Talent Board</Link>
              <Link href="prizes">Prizes</Link>
            </div>
          </div>
        ) : (
          <div className={styles.nav}>
            <input className={styles.input} type="checkbox" id="nav-check" />

            <div className={styles.nav_btn}>
              <label htmlFor="nav-check">
                <span></span>
                <span></span>
                <span></span>
              </label>
            </div>

            <div className={styles.nav_links}>
              {/* <Link href="ent">Home</Link> */}
              <Link href="/">Home</Link>
              <Link href="talenthunt">Talent Hunt</Link>
              <Link href="aboutcompetition">About Competition</Link>
              <Link href="login">Submit Now</Link>
              <Link href="rulesandcriteria">Rules & Criteria</Link>
              <Link href="aboutjurry">Jury & Mentors</Link>
              <Link href="talentbord">Talent Board</Link>
              <Link href="prizes">Prizes</Link>
            </div>
          </div>

          // <div>
          //   <Link href="ent">Home</Link>
          //   <Link href="talenthunt">Talent Hunt</Link>
          //   <Link href="aboutcompetition">About Competition</Link>
          //   <Link href="login">Submit Now</Link>
          //   <Link href="rulesandcriteria">Rules & Criteria</Link>
          //   <Link href="aboutjurry">Jury & Mentors</Link>
          //   <Link href="talentbord">Talent Board</Link>
          //   <Link href="prizesandwinners">Prizes & Winners</Link>
          // </div>
        )}
      </div>
    </div>
  );
}
