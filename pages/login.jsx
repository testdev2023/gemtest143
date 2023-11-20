import styles from "../styles/Login.module.css";
import Slider from "../src/components/slider/Slider";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { reactLocalStorage } from "reactjs-localstorage";
import React, { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Image from "next/image";
import logo from "../src/asset/gemlogo.png";
import GoogleAuth from "../src/components/GoogleAuth/google";
import FacebookAuth from "../src/components/FacebookAuth/facebook";
export default function Login() {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        // Api?.LOGIN
        process.env.NEXT_PUBLIC_LOGIN,

        {
          email: email,
          password: password,
        }
      );

      if (response?.data?.status === true) {
        reactLocalStorage.setObject("loginAuth", response?.data);
        router.push("/userdashboard");
      } else if (
        response?.data?.message === "Your account has been under review!"
      ) {
        // alert(response?.data?.message); // Replace `someProperty` with the specific property you want to display

        toast.warn(response?.data?.message, { autoClose: 5000 });
        setTimeout(() => {
          router.push("/forgetpassword");
        }, 3000);
      } else if (
        response?.data?.errors?.email === "The email field is required."
      ) {
        // alert("Email field is required.");
        toast.warn("Email field is required.", { autoClose: 5000 });
      } else if (response?.data?.message) {
        // alert(response?.data?.message);
        toast.warn(response?.data?.message, { autoClose: 5000 });
      } else {
        // alert(response?.data?.errors.email || response?.data?.errors?.password);
        toast.error(
          response?.data?.errors.email || response?.data?.errors?.password,
          { autoClose: 5000 }
        );
      }
      // alert(response?.data?.errors.email || response?.data?.errors?.password);
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        autoClose: 5000,
      });
    }
  };

  // const onSubmit = async (data) => {};

  useEffect(() => {
    reactLocalStorage.clear();
  }, []);

  return (
    <div className={styles.parent}>
      <div className={styles.login_main}>
        <Slider />

        <div className={styles.login_container}>
          <div className={styles.login_sub_container}>
            <Link className={styles.link} href="/">
              <Image
                style={{ height: "130px", width: "130px" }}
                src={logo}
                priority={true}
                alt="logo"
              />
            </Link>

            <form onSubmit={handleSubmit} className={styles.login_form}>
              <div className={styles.login_form_sec1}>
                <h2 className="yellow">Login</h2>
                <p>Welcome! Please enter your details.</p>
              </div>

              <div className={styles.login_social_links}>
                <Link href="">
                  {/* <GoogleIcon /> */}
                  <GoogleAuth />
                </Link>
              </div>

              {/* <div className={styles.login_social_links}>
                <Link href="">
                  <FacebookAuth />
                </Link>
              </div> */}

              <div className={styles.login_form_seprate}>
                <div
                  style={{
                    borderBottom: "1px solid rgba(42, 42, 42, 1)",
                    width: "50%",
                  }}
                ></div>
                <p style={{ color: "rgba(42, 42, 42, 1)", fontWeight: "bold" }}>
                  Or
                </p>
                <div
                  style={{
                    borderBottom: "1px solid rgba(42, 42, 42, 1)",
                    width: "50%",
                  }}
                ></div>
              </div>

              <div className={styles.login_form_sec3}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                />

                <div className={styles.login_form_password}>
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                  />

                  <div
                    className={styles.login_form_passwordVisible}
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </div>
                </div>
              </div>

              <div className={styles.login_form_sec4}>
                <div className={styles.form_group}>
                  {/* <input type="checkbox" id="javascript" /> */}
                  {/* <label className={styles.checkbox} htmlFor="javascript">
                    Remember me
                  </label> */}
                </div>
                <Link href="forgetpassword">Forgot Password</Link>
              </div>

              <button className={styles.login_form_btn} onClick={handleSubmit}>
                Log in
              </button>
              <div className={styles.login_form_sec5}>
                <p>Don’t have an account?</p>
                <Link href="signup">Sign up now</Link>
              </div>
              <ToastContainer className="tost" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
