import React, { useState, useEffect } from "react";

import styles from "../../../styles/NavTop.module.css";
import { reactLocalStorage } from "reactjs-localstorage";

import Link from "next/link";
import { useRouter } from "next/router";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import profilevector from "../../asset/profile_vector.png";
import localStorage from "local-storage";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import axios from "axios";
import logo from "./Logo";

const AvatarDropDown = ({ loder, setLoder }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageLoader, setProfileImageLoader] = useState(false);

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
        console.error(error);
      });
  };

  useEffect(() => {
    const UserToken = reactLocalStorage.getObject("loginAuth").data?.api_token;
    if (UserToken) {
      getUser();
    }
  }, []);
  const router = useRouter();

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

  const handleLogout = async (event) => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <>
      <Box className={styles.box} sx={{ flexGrow: 0 }}>
        {profileImageLoader ? (
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                //  src={profileImage ? profileImage : undefined}
                // src={profileImage ? profileImage : profilevector}
                // alt="Remy Sharp"
                src={profileImageLoader ? profileImage : profilevector}
                alt=""
              />

              <ArrowDropDownIcon style={{ color: "#fcc100" }} />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              {/* <Avatar src={""} alt="no profile" /> */}
              <Avatar src={profilevector} alt="" />

              <ArrowDropDownIcon />
            </IconButton>
          </Tooltip>
        )}
        <Menu
          className={styles.menu}
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
          {settings.map((setting, index) => (
            <MenuItem
              key={index}
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
    </>
  );
};

export default AvatarDropDown;
