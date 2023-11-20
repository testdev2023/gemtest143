import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { Api } from "../../config/Config";
import Link from "next/link";
import OtpInput from "react-otp-input";
import styles from "../../../styles/Otp.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../asset/gemlogo.png";
import Image from "next/image";
const Otp = (props) => {
  // Destructure the signUpData prop from the props
  const { signUpData } = props;
  const router = useRouter();
  const [otps, setOtp] = useState();
  const userId = signUpData?.data?.id;
  const Email = signUpData?.data?.email;
  const otpHandleChange = (otp) => setOtp(otp);
  const otpVerification = () => {
    if (!otps) {
      toast.error("Please Enter Your OTP", { autoClose: 5000 });
      return;
    }
    axios
      .post(
        // Api?.OTP_VERIFICATION
        process.env.NEXT_PUBLIC_OTP_VERIFICATION,
        // "https://a.iamgemglobal.com/api/member/verify-opt",

        // NEXT_PUBLIC_OTP_VERIFICATION
        {
          user_id: Number(userId),
          otp_code: Number(otps),
        }
      )
      .then(function (response) {
        // console.log("response OTP", response);
        if (response?.status === true) {
          toast.success(response?.data?.message);
          router.push("thanks");
        } else if (response?.data?.message === "Your Email Is verified") {
          toast.warn(response?.data?.message);
          router.push("thanks");
        } else if (response?.data?.message === "Your Otp Code Expired") {
          toast.warn(response?.data?.message);
        }
      })
      .catch(function (error) {
        // toast.error(error?.message);
        console.log(error, "checking verfiy error");
      });
  };
  const resentOtpVerification = () => {
    // window.location.reload();
    setTimeLeft(60);
    setTimerActive(true);
    axios
      .post(
        // Api?.RESENT_VERIFICATION,
        process.env.NEXT_PUBLIC_RESENT_VERIFICATION,
        // "https://a.iamgemglobal.com/api/member/resend-opt",
        {
          user_id: userId,
        }
      )
      .then(function (response) {
        // console.log("response for resent verfication", response.data.message);
        if (response?.status === true) {
          toast.success(response?.data?.message);
          // alert(response?.data?.message);
          // alert(response?.message);
          // setIsOtp(false);
        }
      })
      .catch(function (error) {
        toast.error(error?.message, { autoClose: 5000 });

        // toast.error(error?.message);
        // alert(error?.message);
      });
  };
  const [timeLeft, setTimeLeft] = useState(60);
  const [timerActive, setTimerActive] = useState(true);
  useEffect(() => {
    if (!timerActive || !timeLeft) return;
    // Exit early when we reach 0
    // if (!timeLeft) return;

    // Save intervalId to clear the interval when the component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // Clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
  }, [timerActive, timeLeft]);
  // setTimeout(() => {
  //   router.push("signup");
  // }, 1000);
  // Use the signUpData in the component logic as needed
  useEffect(() => {
    // console.log(signUpData, "This otp page"); // Logs the updated sign-up data to the console
  }, [signUpData]);

  return (
    <div className={styles.otp_main}>
      <div className={styles.otp_container}>
        <div className={styles.otp_sub_container}>
          {/* <h1>LOGO</h1> */}
          <Link className={styles.link} href="/">
            <Image
              style={{ height: "130px", width: "130px" }}
              src={logo}
              loading="lazy"
              alt="logo"
            />
          </Link>
        </div>

        <div className={styles.otp_form}>
          <div className={styles.otp_form_sec1}>
            <p>We have sent you One Time Password to your mail</p>
            <h3>Please Enter OTP</h3>
            <h4>{timeLeft} seconds left</h4>
            <h5 style={{ color: "#7a7a7a" }}>{Email}</h5>
          </div>

          <OtpInput
            value={otps}
            onChange={otpHandleChange}
            inputStyle={{
              width: "100%",
            }}
            numInputs={4}
            isInputNum={true}
            // separator={<span>-</span>}
          />
          <>
            {timeLeft === 0 ? (
              <div className={styles.otp_btn_sec}>
                <button
                  className={styles.otp_form_btn1}
                  onClick={() => resentOtpVerification()}
                >
                  Resend OTP
                </button>

                <ToastContainer sx={{ color: "red" }} className={styles.data} />
              </div>
            ) : (
              <div className={styles.otp_btn_sec}>
                <button
                  className={styles.otp_form_btn2}
                  onClick={() => otpVerification()}
                >
                  Verify OTP
                </button>
                <ToastContainer sx={{ color: "red" }} className={styles.data} />
              </div>
            )}
          </>

          <Link href="login">Login with another account</Link>
          {/* <div className={styles.otp_form_sec3}></div> */}
        </div>
      </div>
    </div>
  );
};

// Define the mapStateToProps function to map the relevant state from the Redux store to the component props
const mapStateToProps = (state) => ({
  signUpData: state.authReducer.signUpData,
});

// Connect the component to the Redux store and pass the mapStateToProps function as an argument
export default connect(mapStateToProps)(Otp);
