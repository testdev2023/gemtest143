import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import React, { useState } from "react";
import FacebookLogin from "react-facebook-login";

import { reactLocalStorage } from "reactjs-localstorage";

function FacebookAuth() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [facebookdata, setFacebookData] = useState();
  const [facebookprovidedata, setFacebookProvideData] = useState();

  // This function will be called when the user successfully logs in via Facebook.
  const responseFacebook = (response) => {
    if (response.status === "unknown") {
      toast.error("Please grant permission to access your Facebook data.");
      return;
    }

    console.log(response, "checking");

    const { name, email, userID } = response;
    const facebookprovide = response;
    setFacebookProvideData(facebookprovide);
    const encodedPropsfbprovide = btoa(JSON.stringify(facebookprovide));

    // Proceed with Facebook authentication
    axios
      .post(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/member/social-auth",

        {
          name: name,
          email: email,
          provider_id: userID,

          provider: "facebook",
        }
      )
      .then((response) => {
        if (response?.data?.status === true) {
          const userData = response?.data?.data;

          // Check if any required fields are null or empty
          if (
            userData?.email === null ||
            userData?.phone === null ||
            userData?.dob === null ||
            userData?.city === null ||
            userData?.country === null

            // ||
            // userData.first_name === null ||
            // userData.last_name === null
            // Add more conditions for other required fields here...
          ) {
            // Redirect to the /completeprofile page
            toast.success(response?.data?.message);
            const alldata = response?.data?.data;
            setFacebookData(alldata);
            const encodedProps = btoa(JSON.stringify(alldata));

            // reactLocalStorage.setObject("loginAuth", response?.data);
            // router.push("/userdashboard");
            router.push({
              pathname: "/compeleteprofilefb",
              query: { props: encodedProps, propsfb: encodedPropsfbprovide },
            });
          } else {
            router.push("/userdashboard");
            reactLocalStorage.setObject("loginAuth", response?.data);
          }
        }
      })
      .catch((error) => {
        console.error("Error during authentication:", error);
      });
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <FacebookLogin
          appId={258486957088685} // Replace with your actual Facebook App ID
          // appId={260943036899304}
          autoLoad={false}
          fields="name,email"
          scope="public_profile,email"
          callback={responseFacebook}
        />
      )}
    </div>
  );
}

export default FacebookAuth;
