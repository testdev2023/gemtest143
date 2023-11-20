import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useState, useEffect } from "react";
// import { baseUrl } from "@/src/config/Config";
// import { baseUrl } from "../../config/Config";
import styles from "../../../talenthunt_styles/EditProfile.module.css";
import SaveIcon from "@mui/icons-material/Save";
import { reactLocalStorage } from "reactjs-localstorage";
// import EditProfileForm from "./editprofileform";
// import EditProfileForm from "../Profile/EditProfileForm";
import EditProfileForm from "../../../src/talenthunt_components/Profile/EditProfileForm";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

const EditProfile = ({
  editProfile,
  setProfile,
  setEditProfile,
  setEditPicture,
}) => {
  const [user, setUser] = useState(null);

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
        setUser(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className={styles.edit_profile_main_parent}>
      {user ? (
        <EditProfileForm
          setEditProfile={setEditProfile}
          setProfile={setProfile}
          setEditPicture={setEditPicture}
          user={user}
        />
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default EditProfile;
