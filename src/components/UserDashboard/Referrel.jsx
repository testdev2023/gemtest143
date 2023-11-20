import React, { useEffect, useState } from "react";
import styles from "../../../styles/ProfileCard.module.css";
import Button from "./Button";
import { reactLocalStorage } from "reactjs-localstorage";
// import { baseUrl } from "../../config/Config";
import localStorage from "local-storage";
import axios from "axios";
// import { toast } from "react-toastify";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Referrel = () => {
  const [isCopying, setIsCopying] = useState(false);
  const [user, setUser] = useState(null);
  const [copylink, setCopyLink] = useState(null);
  const [email, setEmail] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Add new state variable

  const userToken = localStorage.get("loginAuth")?.data?.api_token;
  const handleCopy = async () => {
    if (!isCopying && !isButtonDisabled) {
      try {
        setIsCopying(true);
        const response = await axios.post(
          // `${baseUrl}/api/member/copy-refer`,
          process.env.NEXT_PUBLIC_BASE_URL + "/api/member/copy-refer",

          {},
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        // alert(response.data.message);
        if (response?.data?.status === true) {
          setCopyLink(response?.data?.link);
          toast.success(response?.data?.message, {
            autoClose: 5000,
          });
          setIsButtonDisabled(true);
        }
        // setCopyLink(response?.data?.link);
        // toast.success("Link copied successfully");
      } catch (error) {
        console.error(error);
        // alert(error.message);
        toast.error(error.message, {
          autoClose: 5000,
        });
      } finally {
        setIsCopying(false);
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        // `${baseUrl}/api/member/refer`
        process.env.NEXT_PUBLIC_BASE_URL + "/api/member/refer",
        { email: email },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      if (response?.data?.status === true) {
        // alert(response?.data?.mail_message);
        toast.success(response?.data?.mail_message);
        setEmail(""); // Clear the email input field
      } else if (
        response?.data?.status === false &&
        response?.data?.message === "The user with this email is already exist"
      ) {
        // alert("The user with this email is already exist");
        toast.warn("The user with this email is already exist");
      }
    } catch (error) {
      // alert.error(error?.response?.data?.message);
      toast.error(error?.response?.data?.message, {
        autoClose: 5000,
      });
    }
  };

  useEffect(() => {
    setUser(reactLocalStorage.getObject("loginAuth").data);
  }, []);
  useEffect(() => {
    if (copylink) {
      handleCopy();

      console.log("Copy link value:", copylink);
    }
  }, [copylink]);
  return (
    <div className={styles.referrel_parent}>
      <form className={styles.referrel_parent2} onSubmit={handleSubmit}>
        <h3>Refer Friend</h3>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
          required
        />
        <button>Submit</button>
      </form>
      <Button
        text="Copy Link"
        onClick={handleCopy}
        link={copylink}
        isButtonDisabled={isButtonDisabled}
      />
      {/* <ToastContainer className="tost" /> */}
    </div>
  );
};

export default Referrel;
