import { useState, useEffect } from "react";
import styles from "../../../styles/EntTopBar.module.css";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import localStorage from "local-storage";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";
import Loder from "../Loder";
import LogoMobile from "./LogoMobile";
import HomeIcon from "@mui/icons-material/Home";
export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [loder, setLoder] = useState(false);

  function toggleSidebar() {
    setIsOpen(!isOpen);
  }
  const router = useRouter();
  const { pathname } = router;

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedLoginAuth = localStorage.get("loginAuth");
    if (storedLoginAuth) {
      const loginAuth = storedLoginAuth;
      setUser(loginAuth?.data?.api_token || null);
    }
  }, []);
  return (
    <>
      {!loder || <Loder />}
      <div className={styles.button_background}>
        <Link href="/" className={styles.home_icon}>
          <HomeIcon />
        </Link>

        <button className={styles.openButton} onClick={toggleSidebar}>
          <MenuIcon />
        </button>
        {/* <div className={styles.logo}>
          <LogoMobile />
        </div> */}
      </div>
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <button className={styles.closeButton} onClick={toggleSidebar}>
          <CloseIcon />
        </button>

        <nav className={styles.nav}>
          <ul>
            <li className={styles.li}>
              <Link href="/" legacyBehavior>
                <a
                  onClick={() => {
                    pathname === "/" ? setLoder(false) : setLoder(true);
                  }}
                  className={pathname === "/" ? styles.activeOption : ""}
                >
                  HOME
                </a>
              </Link>
            </li>

            <li className={styles.li}>
              <Link href="/overview" legacyBehavior>
                <a
                  onClick={() => {
                    pathname === "/overview" ? setLoder(false) : setLoder(true);
                  }}
                  className={
                    pathname === "/overview" ? styles.activeOption : ""
                  }
                >
                  OVERVIEW
                </a>
              </Link>
              {/* <ul>
                <li className={styles.li}>
                  <Link href="aboutcompetition">ABOUT</Link>
                </li>
                <li className={styles.li}>
                  <Link href="press">PRESS</Link>
                </li>
              </ul> */}
            </li>
            <li className={styles.li}>
              <Link href="/team" legacyBehavior>
                <a
                  onClick={() => {
                    pathname === "/team" ? setLoder(false) : setLoder(true);
                  }}
                  className={pathname === "/team" ? styles.activeOption : ""}
                >
                  TEAM
                </a>
              </Link>
            </li>
            <li className={styles.li}>
              <Link href="/benefits" legacyBehavior>
                <a
                  onClick={() => {
                    pathname === "/benefits" ? setLoder(false) : setLoder(true);
                  }}
                  className={
                    pathname === "/benefits" ? styles.activeOption : ""
                  }
                >
                  BENEFITS
                </a>
              </Link>
            </li>
            <li className={styles.li}>
              <Link href="/partners" legacyBehavior>
                <a
                  onClick={() => {
                    pathname === "/partners" ? setLoder(false) : setLoder(true);
                  }}
                  className={
                    pathname === "/partners" ? styles.activeOption : ""
                  }
                >
                  PARTNERS
                </a>
              </Link>
            </li>
            {/* <li className={styles.li}>
            <Link href="#">Web Design</Link>
            <!-- First Tier Drop Down -->
            <ul>
              <li className={styles.li}>
                <Link href="#">Resources</Link>
              </li>
              <li className={styles.li}>
                <Link href="#">Links</Link>
              </li>
              <li className={styles.li}>
                <Link href="#">Tutorials</Link>
                <!-- Second Tier Drop Down -->
                <ul>
                  <li className={styles.li}>
                    <Link href="#">HTML/CSS</Link>
                  </li>
                  <li className={styles.li}>
                    <Link href="#">jQuery</Link>
                  </li>
                  <li className={styles.li}>
                    <Link href="#">Other</Link>
                    <!-- Third Tier Drop Down -->
                    <ul>
                      <li className={styles.li}>
                        <Link href="#">Stuff</Link>
                      </li>
                      <li className={styles.li}>
                        <Link href="#">Things</Link>
                      </li>
                      <li className={styles.li}>
                        <Link href="#">Other Stuff</Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li> */}
            {/* <li className={styles.li_img}>
              <Link href="ent">
                <img
                  id="js-logo"
                  src="assets/admin/images/gemlogo.png"
                />
              </Link>
            </li> */}
            <li className={styles.li}>
              <Link href="/news" legacyBehavior>
                <a
                  onClick={() => {
                    pathname === "/news" ? setLoder(false) : setLoder(true);
                  }}
                  className={pathname === "/news" ? styles.activeOption : ""}
                >
                  NEWS
                </a>
              </Link>
            </li>
            <li className={styles.li}>
              <Link href="/events" legacyBehavior>
                <a
                  onClick={() => {
                    pathname === "/events" ? setLoder(false) : setLoder(true);
                  }}
                  className={pathname === "/events" ? styles.activeOption : ""}
                >
                  EVENTS
                </a>
              </Link>
            </li>
            <li className={styles.li}>
              <Link href="/talent" legacyBehavior>
                <a
                  onClick={() => {
                    pathname === "/talent" ? setLoder(false) : setLoder(true);
                  }}
                  className={pathname === "/talent" ? styles.activeOption : ""}
                >
                  TALENT
                </a>
              </Link>
            </li>
            {/* <li className={styles.li}>
              <Link href="talent">TALENT</Link>
            </li> */}
            {/* <li className={styles.li}>
              <Link href="contactus">CONTACT</Link>
            </li> */}
            <li className={styles.li}>
              <Link href="/projects" legacyBehavior>
                <a
                  onClick={() => {
                    pathname === "/projects" ? setLoder(false) : setLoder(true);
                  }}
                  className={
                    pathname === "/projects" ? styles.activeOption : ""
                  }
                >
                  PROJECTS
                </a>
              </Link>
            </li>

            {/* {user && ( */}
            <li className={styles.li}>
              {user ? (
                <>
                  <button className={styles.dropbtn}>COMPITITIONS</button>
                  <ul>
                    <li className={styles.li}>
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
                              : ""
                          }
                        >
                          HOME
                        </a>
                      </Link>
                    </li>
                    <li className={styles.li}>
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
                              : ""
                          }
                        >
                          ABOUT COMPETITION
                        </a>
                      </Link>
                    </li>
                    <li className={styles.li}>
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
                              : ""
                          }
                        >
                          RULES & CRITERIA
                        </a>
                      </Link>
                    </li>
                    <li className={styles.li}>
                      <Link href="/prizes" legacyBehavior>
                        <a
                          onClick={() => {
                            pathname === "/prizes"
                              ? setLoder(false)
                              : setLoder(true);
                          }}
                          className={
                            pathname === "/prizes" ? styles.activeOption : ""
                          }
                        >
                          {/* PRIZES & WINNERS */}
                          PRIZES
                        </a>
                      </Link>
                    </li>

                    <li className={styles.li}>
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
                              : ""
                          }
                        >
                          JURY & MENTORS
                        </a>
                      </Link>
                    </li>

                    <li className={styles.li}>
                      <Link href="/submitnow" legacyBehavior>
                        <a
                          onClick={() => {
                            pathname === "/submitnow"
                              ? setLoder(false)
                              : setLoder(true);
                          }}
                          className={
                            pathname === "/submitnow" ? styles.activeOption : ""
                          }
                        >
                          SUBMIT NOW
                        </a>
                      </Link>
                    </li>
                    <li className={styles.li}>
                      <Link href="/winners" legacyBehavior>
                        <a
                          onClick={() => {
                            pathname === "/winners"
                              ? setLoder(false)
                              : setLoder(true);
                          }}
                          className={
                            pathname === "/winners" ? styles.activeOption : ""
                          }
                        >
                          WINNERS
                        </a>
                      </Link>
                    </li>
                    <li className={styles.li}>
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
                              : ""
                          }
                        >
                          LATEST ENTRIES
                        </a>
                      </Link>
                    </li>
                  </ul>
                  {/* <div className={styles.dropdown}>
                      <button className={styles.dropdown_button}>
                        TALENT COMPITITION
                      </button>
                      <div className={styles.dropdown_content}>
                        <a href="#">Option 1</a>
                        <a href="#">Option 2</a>
                        <a href="#">Option 3</a>
                      </div>
                    </div> */}
                </>
              ) : (
                <Link href="/talenthunt" legacyBehavior>
                  {/* Home */}
                  {/* TALENT COMPETITION */}
                  COMPETITIONS
                </Link>
              )}
            </li>
            {/* )} */}

            <li className={styles.li}>
              <Link href="/missionshe" legacyBehavior>
                <a
                  onClick={() => {
                    pathname === "/missionshe"
                      ? setLoder(false)
                      : setLoder(true);
                  }}
                  className={
                    pathname === "/missionshe" ? styles.activeOption : ""
                  }
                >
                  MISSION SHE
                </a>
              </Link>
            </li>
            <li className={styles.li}>
              <Link href="/store" legacyBehavior className={styles.link}>
                <a
                  onClick={() => {
                    pathname === "/store" ? setLoder(false) : setLoder(true);
                  }}
                  className={pathname === "/store" ? styles.activeOption : ""}
                >
                  STORE
                </a>
              </Link>
            </li>
            <li className={styles.li}>
              <Link href="/invest" legacyBehavior className={styles.link}>
                <a
                  onClick={() => {
                    pathname === "/invest" ? setLoder(false) : setLoder(true);
                  }}
                  className={pathname === "/invest" ? styles.activeOption : ""}
                >
                  INVEST
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
