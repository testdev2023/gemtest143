/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import axios from "axios";
import { Api } from "../../config/Config";
import { reactLocalStorage } from "reactjs-localstorage";
import Script from "next/script";
import { yellow } from "@mui/material/colors";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function GoogleAuth() {
  const router = useRouter();
  const [user, setUser] = React.useState({});
  const [message, setMessage] = React.useState("");

  function fetchAbout(data) {
    axios
      //   .post(Api?.Social_Auth_Register, {
      .post(
        // "http://ent.prologixit.com/api/member/social-auth",
        process.env.NEXT_PUBLIC_BASE_URL + "/api/member/social-auth",
        {
          name: data?.name,
          email: data?.email,
          provider_id: data?.nbf,
          provider: "google",
        }
      )
      .then((response) => {
        if (response?.data?.message === "Your account has been under review!") {
          // alert(response?.data?.message);
          toast.warn(response?.data?.message);
          setMessage(response?.data?.message);
        }
        if (response?.data?.status === true) {
          // alert(response?.data.message);
          toast.success(response?.data?.message);
          reactLocalStorage.setObject("loginAuth", response?.data);
          router.push("/userdashboard");
        }

        // console.log("check Response >>", response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCallbackResponse(response) {
    // console.log("Emcode JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    fetchAbout(userObject);

    document.getElementById("signInDiv").hidden = true;
  }
  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  const initializeGoogleSignIn = () => {
    if (
      typeof google !== "undefined" &&
      google.accounts &&
      google.accounts.id
    ) {
      google.accounts.id.initialize({
        client_id:
          // "645651761854-6su90c255m6mjbfcia0vqs13dduu9pl7.apps.googleusercontent.com",
          "645651761854-r560h1knfglnqg6h6oke2erbo9ceb9er.apps.googleusercontent.com",

        callback: handleCallbackResponse,
      });
      google.accounts.id.renderButton(document.getElementById("signInDiv"), {
        // theme: "outline",
        // size: "large",
        // theme: "dark",
      });
    } else {
      // Handle the case when the Google API library is not loaded
      console.error("Google API library not loaded.");
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogleSignIn;
    document.body.appendChild(script);

    return () => {
      // Cleanup: Remove the script tag when the component is unmounted
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const fetchAbout = () => {
      axios
        .post(
          // Api?.Social_Auth_Register
          process.env.NEXT_PUBLIC_Social_Auth_Register,
          data
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Script src="https://accounts.google.com/gsi/client" async defer></Script>

      <div id="signInDiv"></div>
    </div>
  );
}
