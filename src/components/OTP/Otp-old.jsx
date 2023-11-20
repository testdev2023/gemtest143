import Link from "next/link";
import OtpInput from "react-otp-input";
import styles from "../../../styles/Otp.module.css";
import axios from "axios";
import { Api } from "../../config/Config";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Otp({ step4, setStep4, response, userId }) {
  // console.log(response, "rana");
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const otpHandleChange = (otp) => setOtp(otp);
  const otpVerification = () => {
    axios
      .post(
        // Api?.OTP_VERIFICATION
        process.env.NEXT_PUBLIC_OTP_VERIFICATION,
        {
          user_id: Number(userId),
          otp_code: Number(otp),
        }
      )
      .then(function (response) {
        // console.log("response", response);
        if (response?.status === true) {
          toast.success(response?.data?.message);
          router.push("login");
          // setIsOtp(false);
          // router.push("/login");
        } else {
          toast.success(response?.data?.message, { autoClose: 5000 });
          router.push("login");
        }
      })
      .catch(function (error) {
        toast.error(error?.message, { autoClose: 5000 });
      });
  };

  const resentOtpVerification = () => {
    // window.location.reload();
    axios
      .post(
        // Api?.RESENT_VERIFICATION
        process.env.NEXT_PUBLIC_RESENT_VERIFICATION,
        {
          user_id: userId,
        }
      )
      .then(function (response) {
        // console.log("response", response);
        if (response?.status === true) {
          // alert(response?.data?.message);
          toast.success(response?.data?.message, { autoClose: 5000 });
          // alert(response?.message);
          // setIsOtp(false);
        }
      })
      .catch(function (error) {
        // console.log("error", error);
        // alert(error?.message);
        toast.error(error?.message, { autoClose: 5000 });
      });
  };

  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    // Exit early when we reach 0
    if (!timeLeft) return;

    // Save intervalId to clear the interval when the component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // Clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  return (
    <div className={styles.otp_main}>
      <div className={styles.otp_container}>
        <div className={styles.otp_sub_container}>
          <h1>LOGO</h1>
          {/* <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p> */}
        </div>
        <div className={styles.otp_form}>
          <div className={styles.otp_form_sec1}>
            <p>We have sent you One Time Password to your mail</p>
            <h3>Please Enter OTP</h3>
            <h3>{timeLeft} seconds left</h3>
          </div>
          {/* <div className={styles.otp_form_sec2}>
            <input type="number" />
            <input type="number" />
            <input type="number" />
            <input type="number" />
          </div> */}
          <OtpInput
            value={otp}
            onChange={otpHandleChange}
            inputStyle={{
              width: "80%",
            }}
            numInputs={4}
            isInputNum={true}
            separator={<span>-</span>}
          />

          <div className={styles.otp_btn_sec}>
            <button
              className={styles.otp_form_btn1}
              onClick={resentOtpVerification}
            >
              Resend OTP
            </button>
            <button
              // href="signupstep5thanksbox"
              className={styles.otp_form_btn2}
              onClick={() => otpVerification()}
            >
              Verify OTP
            </button>
            <ToastContainer sx={{ color: "red" }} className={styles.data} />
          </div>
          <div className={styles.otp_form_sec3}>
            <Link href="login">Login with another account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
