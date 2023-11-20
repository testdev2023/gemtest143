import Link from "next/link";
import OtpInput from "react-otp-input";
import styles from "../../../styles/Otp.module.css";
import axios from "axios";
import { Api } from "../../config/Config";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
export default function OtpForget({
  userId,
  setStep2,
  setStep3,
  setForget,
  response,
  forget,
}) {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const otpHandleChange = (otp) => setOtp(otp);
  const otpVerification = () => {
    let margdata = {
      otp,
      ...forget,
    };
    setForget(margdata);
    axios
      .post(
        process.env.NEXT_PUBLIC_OTP_VERIFICATION,
        // Api?.OTP_VERIFICATION,
        {
          user_id: Number(userId),
          otp_code: Number(otp),
        }
      )
      .then(function (response) {
        // console.log("response", response);
        if (response?.data?.status === true) {
          alert(response?.data?.message);
          // console.log(userId, "userid for otp froget-1");
          setStep2(false);
          setStep3(true);
          // router.push("login");
          // setIsOtp(false);
          // router.push("/login");
        } else {
          alert(response?.data?.message);
          router.push("forgetpassword");
        }
      })
      .catch(function (error) {
        // console.log("error", error);
        alert(error?.message);
      });
  };

  const resentOtpVerification = () => {
    window.location.reload();
    axios
      .post(
        // Api?.RESENT_VERIFICATION,
        process.env.NEXT_PUBLIC_RESENT_VERIFICATION,

        {
          user_id: userId,
        }
      )
      .then(function (response) {
        // console.log("response", response);
        if (response?.status === true) {
          alert(response?.data?.message);
          // alert(response?.message);
          // setIsOtp(false);
        }
      })
      .catch(function (error) {
        // console.log("error", error);
        alert(error?.message);
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
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
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
            // className={styles.otp_form_sec}
            inputStyle={{
              borderRadius: "8px",
              background: "transparent",
              width: "54px",
              height: "54px",
              fontSize: "18px",
              // color: "#000",
              margin: "50px 20px",
              fontWeight: "400",
              border: "none",
              otline: "none",
              border: "2px solid #cacaca",
              caretColor: "blue",
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
          </div>
          <div className={styles.otp_form_sec3}>
            <Link href="login">Login with another account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
