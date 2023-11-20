import axios from "axios";
import Link from "next/link";
import { useFormik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../../styles/ForgetPasswordStep1.module.css";
// import { Api } from "@/src/config/Config";
import { Api } from "../../config/Config";
import { toast, ToastContainer } from "react-toastify";

import Image from "next/image";
import logo from "../../asset/gemlogo.png";
import { useDispatch } from "react-redux";
import { signUp } from "../../redux/actions/authActions";
import ForgetPasswordStep2 from "./ForgetPasswrodStep2";
import OtpForget from "../../components/OTP/OtpForget";
// import { toast } from "react-toastify";

const ForgetPasswordStep1 = ({}) => {
  const dispatch = useDispatch();
  const [showStep2, setShowStep2] = useState(false);
  const [email, setEmail] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      // alert("Please Enter Your  Email.");
      toast.error("Please Enter Your Email.", { autoClose: 5000 });
      return;
    }
    try {
      const response = await axios.post(
        // Api?.RESTEMAIL,
        process.env.NEXT_PUBLIC_RESTEMAIL,
        {
          email,
        }
      );

      dispatch(signUp(response.data));
      // console.log("checking response data", response.data);
      if (response.data.status === true) {
        setShowStep2(true);
      } else {
        // alert(response?.data?.message);
        toast.error(response?.data?.message, { autoClose: 5000 });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {showStep2 ? (
        // <OtpForget />
        <OtpForget />
      ) : (
        <div className={styles.forget_password_step1}>
          <div className={styles.forget_password_container}>
            <div className={styles.forget_password_sub_container}>
              <ToastContainer className="tost" />
              <Link className={styles.link} href="/">
                <Image
                  style={{ height: "130px", width: "130px" }}
                  src={logo}
                  alt="logo"
                  loading="lazy"
                />
              </Link>

              <form
                onSubmit={handleSubmit}
                className={styles.forget_password_form}
              >
                <div className={styles.forget_password_form_sec1}>
                  <h2 className="yellow">Forget Your Password?</h2>
                  <p>Confirm your email and we will send you instruction.</p>
                </div>
                <div className={styles.forget_password_form_sec2}>
                  <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button
                  className={styles.forget_password_form_btn}
                  type="submit"
                  OnClick={handleSubmit}
                >
                  Send
                </button>

                <div className={styles.forget_password_form_sec3}>
                  <Link href="login">Back to Login</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ForgetPasswordStep1;
