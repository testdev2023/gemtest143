import React, { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import styles from "../../../styles/NavTop.module.css";
import { reactLocalStorage } from "reactjs-localstorage";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Test from "./DropDown";
import DropDown from "./DropDown";
import localStorage from "local-storage";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import Loder from "../Loder";
// import Link from "next/link";

const NavTop = ({ loder, setLoder }) => {
  const router = useRouter();

  // const [loder, setLoder] = useState(false);
  const { pathname } = router;

  const userToken = localStorage.get("loginAuth")?.data?.api_token;
  const settings = [
    // token &
    {
      name: "Profile",
      Link: "userprofile",
      method: () => {},
    },

    {
      name: "Competition Entry",
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
    router.push("/login");
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
              <FacebookIcon className={styles.icon} />
            </Link>
            <Link href="https://twitter.com/iamgemglobal" target={"blank"}>
              <TwitterIcon className={styles.icon} />
            </Link>
            <Link
              href="https://www.instagram.com/iamgemglobal/"
              target={"blank"}
            >
              <InstagramIcon className={styles.icon} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/global-entertainment-movement-530198213/"
              target={"blank"}
            >
              <LinkedInIcon className={styles.icon} />
            </Link>
            <Link
              href="https://www.youtube.com/channel/UCzo6KFlfAzTVXHbBinP9fAw"
              target={"blank"}
            >
              <YouTubeIcon className={styles.icon} />
            </Link>
            <Link href="/contactus">
              <PhoneInTalkIcon className={styles.icon} />
            </Link>
          </div>
          {user ? (
            <div className={styles.nav_top_right2}>
              <DropDown loder={loder} setLoder={setLoder} />
              <div className={styles.divider}></div>
              <Link href="/missionshe" className={styles.link} legacyBehavior>
                <a
                  style={{ color: "#fcc100" }}
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
              <div className={styles.divider}></div>
              <Link href="/store" className={styles.link} legacyBehavior>
                <a
                  style={{ color: "#fcc100" }}
                  onClick={() => {
                    pathname === "/store" ? setLoder(false) : setLoder(true);
                  }}
                  className={pathname === "/store" ? styles.activeOption : ""}
                >
                  STORE
                </a>
              </Link>
              <div className={styles.divider}></div>
              <Link href="/invest" className={styles.link} legacyBehavior>
                <a
                  style={{ color: "#fcc100" }}
                  onClick={() => {
                    pathname === "/invest" ? setLoder(false) : setLoder(true);
                  }}
                  className={pathname === "/invest" ? styles.activeOption : ""}
                >
                  INVEST
                </a>
              </Link>
              <div className={styles.divider}></div>

              <Box className={styles.box} sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => {
                        setting.method();
                        handleCloseUserMenu();
                      }}
                    >
                      <Typography textAlign="center" style={{ color: "black" }}>
                        <Link href={setting.Link}>{setting.name}</Link>
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>

              {/* END CHECKING  */}
            </div>
          ) : (
            <div className={styles.nav_top_right}>
              <DropDown loder={loder} setLoder={setLoder} />
              <div className={styles.divider}></div>
              <Link href="/missionshe" className={styles.link} legacyBehavior>
                <a
                  style={{ color: "#fcc100" }}
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
              <div className={styles.divider}></div>
              <Link href="/store" className={styles.link} legacyBehavior>
                <a
                  style={{ color: "#fcc100" }}
                  onClick={() => {
                    pathname === "/store" ? setLoder(false) : setLoder(true);
                  }}
                  className={pathname === "/store" ? styles.activeOption : ""}
                >
                  STORE
                </a>
              </Link>
              <div className={styles.divider}></div>
              <Link href="/invest" className={styles.link} legacyBehavior>
                <a
                  style={{ color: "#fcc100" }}
                  onClick={() => {
                    pathname === "/invest" ? setLoder(false) : setLoder(true);
                  }}
                  className={pathname === "/invest" ? styles.activeOption : ""}
                >
                  INVEST
                </a>
              </Link>
              <div className={styles.divider}></div>
              <Link href="/login" className={styles.link} legacyBehavior>
                <a
                  style={{ color: "#fcc100" }}
                  onClick={() => {
                    pathname === "/login" ? setLoder(false) : setLoder(true);
                  }}
                  className={pathname === "/login" ? styles.activeOption : ""}
                >
                  LOGIN
                </a>
              </Link>
              <div className={styles.divider}></div>
              <Link href="/signup" className={styles.link} legacyBehavior>
                <a
                  style={{ color: "#fcc100" }}
                  onClick={() => {
                    pathname === "/signup" ? setLoder(false) : setLoder(true);
                  }}
                  className={pathname === "/signup" ? styles.activeOption : ""}
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
