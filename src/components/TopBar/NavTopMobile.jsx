/* eslint-disable jsx-a11y/alt-text */
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
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import axios from "axios";
import { useRef } from "react";
import DropDown from "./DropDown";
import AvatarDropDown from "./AvatarDropdown";
import fblogo from "../../asset/icon/socialicon/facebook-yellow.svg";
import xlogo from "../../asset/icon/socialicon/twitter-yellow.svg";
import instalogo from "../../asset/icon/socialicon/instagram-yellow.svg";
import ytlogo from "../../asset/icon/socialicon/youtube-yellow.svg";
import Image from "next/image";
// import Link from "next/link";

const NavTopMobile = () => {
  const [isScrolled, setIsScrolled] = useState(false); // Add this line to define the isScrolled state

  const [profileImage, setProfileImage] = useState(null);
  const [profileImageLoader, setProfileImageLoader] = useState(false);

  const logoRef = useRef(null);
  const [logoSize, setLogoSize] = useState({ width: 80, height: 80 });

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
  // const settings = ["Profile", "Account", "Dashboard", "Logout"];
  // const token = reactLocalStorage.getObject("loginAuth").data.api_token;
  const settings = [
    {
      name: "Profile",
      Link: "userprofile",
      method: () => {},
    },

    {
      name: "Competition Entry",
      Link: "competitionentry",
      method: () => {},
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

  const router = useRouter();
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
    <div style={{ width: "100%" }}>
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
          <Link href="https://www.instagram.com/iamgemglobal/" target={"blank"}>
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
        {/* <div className={styles.nav_top_center}>
          <Link href="/">
            <Image
              id="js-logo1"
              src={logo}
              alt="logo"
              loading="lazy"
              style={{
                width: `${logoSize.width}px`,
                height: `${logoSize.height}px`,
                cursor: "pointer",
              }}
              ref={logoRef}
            />
          </Link>
        </div> */}
        {user ? (
          <div className={styles.nav_top_right2}>
            <DropDown />

            {/* <Box className={styles.box} sx={{ flexGrow: 0 }}>
              {profileImageLoader ? (
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src={profileImage || ""} />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src={logo || ""} />
                  </IconButton>
                </Tooltip>
              )}
              <Menu
                sx={{ mt: "25px" }}
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
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" style={{ color: "black" }}>
                      <Link href={setting.Link}>{setting.name}</Link>
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box> */}
            <AvatarDropDown />
            {/* END CHECKING  */}
          </div>
        ) : (
          <div className={styles.nav_top_right}>
            <Link href="login" className={styles.link}>
              LOGIN
            </Link>
            <div className={styles.divider}></div>
            <Link href="signup" className={styles.link}>
              SIGNUP
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavTopMobile;
