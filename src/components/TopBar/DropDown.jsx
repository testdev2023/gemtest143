import React from "react";
import styles from "../../../styles/DropDown.module.css";
import Link from "next/link";

import localStorage from "local-storage";
import { useRouter } from "next/router";
import Loder from "../Loder";
import { useEffect, useState } from "react";

const DropDown = ({ loder, setLoder }) => {
  const router = useRouter();
  const { pathname } = router;
  // const [loder, setLoder] = useState(false);

  const user = localStorage.get("loginAuth")?.data?.api_token;
  return (
    <>
      {/* {!loder || <Loder />} */}
      <div>
        {user ? (
          <div className={styles.navbar}>
            <div className={styles.dropdown}>
              <button className={styles.dropbtn}>
                {/* TALENT COMPETITION */}
                COMPETITIONS
              </button>
              <div className={styles.dropdown_content}>
                <Link href="/talenthunt" legacyBehavior>
                  <a
                    onClick={() => {
                      pathname === "/talenthunt"
                        ? setLoder(false)
                        : setLoder(true);
                    }}
                    className={
                      pathname === "/talenthunt"
                        ? styles.activeOption
                        : "color_yellow"
                    }
                  >
                    HOME
                  </a>
                </Link>
                <Link href="/aboutcompetition" legacyBehavior>
                  <a
                    onClick={() => {
                      pathname === "/aboutcompetition"
                        ? setLoder(false)
                        : setLoder(true);
                    }}
                    className={
                      pathname === "/aboutcompetition"
                        ? styles.activeOption
                        : "color_yellow"
                    }
                  >
                    ABOUT COMPETITION
                  </a>
                </Link>
                <Link href="/rulesandcriteria" legacyBehavior>
                  <a
                    onClick={() => {
                      pathname === "/rulesandcriteria"
                        ? setLoder(false)
                        : setLoder(true);
                    }}
                    className={
                      pathname === "/rulesandcriteria"
                        ? styles.activeOption
                        : "color_yellow"
                    }
                  >
                    RULES & CRITERIA
                  </a>
                </Link>
                <Link href="/prizes" legacyBehavior>
                  <a
                    onClick={() => {
                      pathname === "/prizes" ? setLoder(false) : setLoder(true);
                    }}
                    className={
                      pathname === "/prizes"
                        ? styles.activeOption
                        : "color_yellow"
                    }
                  >
                    {/* PRICE & WINNERS */}
                    PRIZES
                  </a>
                </Link>

                <Link href="/aboutjurry" legacyBehavior>
                  <a
                    onClick={() => {
                      pathname === "/aboutjurry"
                        ? setLoder(false)
                        : setLoder(true);
                    }}
                    className={
                      pathname === "/aboutjurry"
                        ? styles.activeOption
                        : "color_yellow"
                    }
                  >
                    JURY & MENTORS
                  </a>
                </Link>
                <Link
                  href="/submitnow"
                  legacyBehavior
                  // href={user ? "submitnow" : "login"}
                >
                  <a
                    onClick={() => {
                      pathname === "/submitnow"
                        ? setLoder(false)
                        : setLoder(true);
                    }}
                    className={
                      pathname === "/submitnow"
                        ? styles.activeOption
                        : "color_yellow"
                    }
                  >
                    SUBMIT NOW
                  </a>
                </Link>

                <Link
                  href="/winners"
                  legacyBehavior
                  // href={user ? "submitnow" : "login"}
                >
                  <a
                    onClick={() => {
                      pathname === "/winners"
                        ? setLoder(false)
                        : setLoder(true);
                    }}
                    className={
                      pathname === "/winners"
                        ? styles.activeOption
                        : "color_yellow"
                    }
                  >
                    WINNERS
                  </a>
                </Link>

                <Link href="/talentbord" legacyBehavior>
                  <a
                    onClick={() => {
                      pathname === "/talentbord"
                        ? setLoder(false)
                        : setLoder(true);
                    }}
                    className={
                      pathname === "/talentbord"
                        ? styles.activeOption
                        : "color_yellow"
                    }
                  >
                    LATEST ENTRIES
                  </a>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.navbar}>
            <div className={styles.dropdown}>
              <button className={styles.dropbtn}>
                {/* TALENT COMPETITION */}
                COMPETITIONS
              </button>
              <div className={styles.dropdown_content}>
                <Link href="/talenthunt" legacyBehavior>
                  <a
                    onClick={() => {
                      pathname === "/talenthunt"
                        ? setLoder(false)
                        : setLoder(true);
                    }}
                    className={
                      pathname === "/talenthunt"
                        ? styles.activeOption
                        : "color_yellow"
                    }
                  >
                    HOME
                  </a>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DropDown;
