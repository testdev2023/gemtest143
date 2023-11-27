import React, { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import styles from "../../../styles/NavTop.module.css";
import { reactLocalStorage } from "reactjs-localstorage";
import InputBase from "@mui/material/InputBase";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import DropDown from "./DropDown";
import localStorage from "local-storage";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import axios from "axios";
// import PopupModal from "../ModalAllOverSite";
import AvatarDropDown from "./AvatarDropdown";
import Image from "next/image";
import fblogo from "../../asset/icon/socialicon/facebook-yellow.svg";
import xlogo from "../../asset/icon/socialicon/twitter-yellow.svg";
import instalogo from "../../asset/icon/socialicon/instagram-yellow.svg";
import ytlogo from "../../asset/icon/socialicon/youtube-yellow.svg";

const NavTop = ({ loder, setLoder }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageLoader, setProfileImageLoader] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logoutTimer, setLogoutTimer] = useState(null);

  // Function to reset the logout timer and log out the user
  const resetLogoutTimer = () => {
    // Clear the existing timer
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }

    // Set a new timer for 30 minutes (30 * 60 * 1000 milliseconds)
    const newTimer = setTimeout(() => {
      // Automatically log the user out after 30 minutes of inactivity
      setIsLoggedIn(false);

      // Remove the token from local storage
      reactLocalStorage.remove("loginAuth");

      // Redirect to the login page or perform additional logout-related actions
      router.push("/login"); // You can customize this based on your needs
    }, 30 * 60 * 1000);

    // Update the logoutTimer state with the new timer
    setLogoutTimer(newTimer);
  };

  useEffect(() => {
    // Event handler for user interactions (e.g., mousemove or keydown)
    const handleUserInteraction = () => {
      // console.log("User interaction detected");
      resetLogoutTimer();
    };
    // console.log("Setting up event listeners"); // Add this line for debugging

    // Attach an event listener to the document for user interactions
    document.addEventListener("mousemove", handleUserInteraction);
    document.addEventListener("keydown", handleUserInteraction);

    // When the component unmounts, remove the event listeners
    return () => {
      // console.log("Removing event listeners"); // Add this line for debugging
      document.removeEventListener("mousemove", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // If the user is logged in, reset the logout timer
    if (isLoggedIn) {
      resetLogoutTimer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  useEffect(() => {
    // Check if the user is logged in (you can modify this logic)
    const userToken = reactLocalStorage.getObject("loginAuth")?.data?.api_token;

    if (userToken) {
      setIsLoggedIn(true);
      resetLogoutTimer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getUser = () => {
    axios
      .get(
        // `${baseUrl}/api/member/user_profile`
        process.env.NEXT_PUBLIC_BASE_URL + "/api/member/user_profile",
        {
          headers: {
            Authorization:
              "Bearer " +
              reactLocalStorage.getObject("loginAuth").data?.api_token,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        const photoURL = response?.data?.data?.photoURL;
        const profileImageUrl =
          typeof photoURL === "object" ? photoURL.url : photoURL;
        setProfileImage(profileImageUrl);
        setProfileImageLoader(true);
      })
      .catch((error) => {
        // console.error(error);
      });
  };

  useEffect(() => {
    const UserToken = reactLocalStorage.getObject("loginAuth").data?.api_token;
    if (UserToken) {
      getUser();
    }
  }, []);
  const router = useRouter();

  // const [loder, setLoder] = useState(false);
  const { pathname } = router;

  const userToken = localStorage.get("loginAuth")?.data?.api_token;

  const settings = [
    // token &
    {
      name: "User Dashboard",
      Link: "",
      method: () => {
        userToken ? router.push("userdashboard") : router.push("login");
      },
    },
    {
      name: "Profile",
      Link: "userprofile",
      method: () => {},
    },

    {
      name: "Competition Entry",
      // name: "Compitation Entry",
      Link: "",
      method: () => {
        userToken ? router.push("competitionentry") : router.push("login");
      },
    },

    {
      name: "Logout",
      Link: "login",
      method: () => {
        localStorage.clear();
        router.push("/login");
      },
    },
  ];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(reactLocalStorage.getObject("loginAuth").data);
  }, []);

  // const router = useRouter();

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  const handleLogout = async (event) => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <>
      {/* {!loder || <Loder />} */}
      <div
        style={{
          width: "100%",
          backgroundColor: "#424242",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className={styles.nav_top}>
          <div className={styles.nav_top_left}>
            <Link
              href="https://www.facebook.com/iamgemglobal/?_rdc=1&_rdr"
              target={"blank"}
            >
              <Image
                className={styles.icon}
                src={fblogo}
                width={100}
                height={100}
                alt="fblogo"
              />
              {/* <FacebookIcon className={styles.icon} /> */}
            </Link>
            <Link href="https://twitter.com/iamgemglobal" target={"blank"}>
              <Image
                className={styles.icon}
                src={xlogo}
                width={100}
                height={100}
                alt="fblogo"
              />
              {/* <TwitterIcon className={styles.icon} /> */}
            </Link>
            <Link
              href="https://www.instagram.com/iamgemglobal/"
              target={"blank"}
            >
              <Image
                className={styles.icon}
                src={instalogo}
                width={100}
                height={100}
                alt="fblogo"
              />
              {/* <InstagramIcon className={styles.icon} /> */}
            </Link>
            {/* <Link
              href="https://www.linkedin.com/in/global-entertainment-movement-530198213/"
              target={"blank"}
            >
              <LinkedInIcon className={styles.icon} />
            </Link> */}
            <Link
              href="https://www.youtube.com/channel/UCzo6KFlfAzTVXHbBinP9fAw"
              target={"blank"}
            >
              <Image
                className={styles.icon}
                src={ytlogo}
                width={100}
                height={100}
                alt="fblogo"
              />
              {/* <YouTubeIcon className={styles.icon} /> */}
            </Link>
            {/* <Link href="/contactus">
              <PhoneInTalkIcon className={styles.icon} />
            </Link> */}
          </div>

          {user ? (
            <div className={styles.nav_top_right2}>
              <DropDown loder={loder} setLoder={setLoder} />
              <div className={styles.divider}></div>
              <Link href="/missionshe" className={styles.link} legacyBehavior>
                <a
                  onClick={() => {
                    pathname === "/missionshe"
                      ? setLoder(false)
                      : setLoder(true);
                  }}
                  className={
                    pathname === "/missionshe"
                      ? styles.activeOption
                      : "color_yellow "
                  }
                >
                  MISSION SHE
                </a>
              </Link>
              <div className={styles.divider}></div>
              <Link href="/store" className={styles.link} legacyBehavior>
                <a
                  onClick={() => {
                    pathname === "/store" ? setLoder(false) : setLoder(true);
                  }}
                  className={
                    pathname === "/store"
                      ? styles.activeOption
                      : "color_yellow "
                  }
                >
                  STORE
                </a>
              </Link>
              <div className={styles.divider}></div>
              <Link href="/invest" className={styles.link} legacyBehavior>
                <a
                  onClick={() => {
                    pathname === "/invest" ? setLoder(false) : setLoder(true);
                  }}
                  className={
                    pathname === "/invest"
                      ? styles.activeOption
                      : "color_yellow "
                  }
                >
                  INVEST
                </a>
              </Link>
              <div className={styles.divider}></div>

              <AvatarDropDown />
            </div>
          ) : (
            <div className={styles.nav_top_right}>
              {/* <Link href="/talenthunt" legacyBehavior>
                <a
                  onClick={() => {
                    pathname === "/talenthunt"
                      ? setLoder(false)
                      : setLoder(true);
                  }}
                  className={
                    pathname === "/talenthunt"
                      ? styles.activeOption
                      : "color_yellow "
                  }
                >
                  COMPETITION ----
                </a>
              </Link> */}

              {/* ---------------------- */}
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
                          pathname === "/talenthunt" ? styles.activeOption : ""
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
                            : ""
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
                            : ""
                        }
                      >
                        RULES & CRITERIA
                      </a>
                    </Link>
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
                          pathname === "/aboutjurry" ? styles.activeOption : ""
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
                          pathname === "/submitnow" ? styles.activeOption : ""
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
                          pathname === "/winners" ? styles.activeOption : ""
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
                          pathname === "/talentbord" ? styles.activeOption : ""
                        }
                      >
                        LATEST ENTRIES
                      </a>
                    </Link>
                  </div>
                </div>
              </div>

              {/* -------------------------- */}
              <div className={styles.divider}></div>
              <Link href="/missionshe" className={styles.link} legacyBehavior>
                <a
                  onClick={() => {
                    pathname === "/missionshe"
                      ? setLoder(false)
                      : setLoder(true);
                  }}
                  className={
                    pathname === "/missionshe"
                      ? styles.activeOption
                      : "color_yellow "
                  }
                >
                  MISSION SHE
                </a>
              </Link>
              <div className={styles.divider}></div>
              <Link href="/store" className={styles.link} legacyBehavior>
                <a
                  onClick={() => {
                    pathname === "/store" ? setLoder(false) : setLoder(true);
                  }}
                  className={
                    pathname === "/store"
                      ? styles.activeOption
                      : "color_yellow "
                  }
                >
                  STORE
                </a>
              </Link>
              <div className={styles.divider}></div>
              <Link href="/invest" className={styles.link} legacyBehavior>
                <a
                  onClick={() => {
                    pathname === "/invest" ? setLoder(false) : setLoder(true);
                  }}
                  className={
                    pathname === "/invest"
                      ? styles.activeOption
                      : "color_yellow "
                  }
                >
                  INVEST
                </a>
              </Link>
              <div className={styles.divider}></div>
              <Link href="/login" className={styles.link} legacyBehavior>
                <a
                  onClick={() => {
                    pathname === "/login" ? setLoder(false) : setLoder(true);
                  }}
                  className={
                    pathname === "/login"
                      ? styles.activeOption
                      : "color_yellow "
                  }
                >
                  LOGIN
                </a>
              </Link>
              <div className={styles.divider}></div>
              <Link href="/signup" className={styles.link} legacyBehavior>
                <a
                  onClick={() => {
                    pathname === "/signup" ? setLoder(false) : setLoder(true);
                  }}
                  className={
                    pathname === "/signup"
                      ? styles.activeOption
                      : "color_yellow "
                  }
                >
                  SIGNUP
                </a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NavTop;
