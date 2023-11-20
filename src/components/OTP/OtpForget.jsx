import Link from "next/link";
import Image from "next/image";
import { connect } from "react-redux";
import OtpInput from "react-otp-input";
import styles from "../../../styles/Otp.module.css";
import axios from "axios";
import { Api } from "../../config/Config";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ForgetPasswordStep2 from "../ForgetPasswordSteps/ForgetPasswrodStep2";
import { toast, ToastContainer } from "react-toastify";
import logo from "../../asset/gemlogo.png";
const OtpForget = (props) => {
  const [showStep3, setShowStep3] = useState(false);
  const { signUpData } = props;
  const router = useRouter();
  const [otps, setOtp] = useState("");
  const userId = signUpData.user.id;
  const Email = signUpData.user.email;
  const otpHandleChange = (otp) => setOtp(otp);
  const otpVerification = () => {
    if (!otps) {
      toast.error("Please Enter Your OTP", { autoClose: 5000 });
      return;
    }
    // console.log(process.env.NEXT_PUBLIC_OTP_VERIFICATION, "checking");
    axios
      .post(
        process.env.NEXT_PUBLIC_OTP_VERIFICATION,
        // "https://a.iamgemglobal.com/api/member/verify-opt",

        // "https://a.iamgemglobal.com/api/member/verify-otp"
        // Api?.OTP_VERIFICATION,
        {
          user_id: Number(userId),
          otp_code: Number(otps),
        }
      )
      .then(function (response) {
        if (response?.data?.status === true) {
          toast.success(response?.data?.message);

          setShowStep3(true);
          // console.log(userId, "userid for otp froget-1");
        } else {
          toast.error(response?.data?.message, { autoClose: 5000 });
          router.push("login");
        }
      })
      .catch(function (error) {
        // console.log("error", error);
        toast.error(error?.message, { autoClose: 5000 });
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

        {
          user_id: userId,
        }
      )
      .then(function (response) {
        if (response?.data?.status === true) {
          toast.success(response?.data?.message);
        }
      })
      .catch(function (error) {
        // console.log("error", error);
        toast(error?.message);
      });
  };

  const [timeLeft, setTimeLeft] = useState(60);
  const [timerActive, setTimerActive] = useState(true);

  useEffect(() => {
    // Exit early when we reach 0
    if (!timerActive || !timeLeft) return;

    // Save intervalId to clear the interval when the component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // Clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
  }, [timerActive, timeLeft]);
  // setTimeout(() => {
  //   router.push("login");
  // }, 1000);

  useEffect(() => {
    // console.log(signUpData, "this otp Forget component");
  }, [signUpData]);
  return (
    <>
      {showStep3 ? (
        <ForgetPasswordStep2 />
      ) : (
        <div className={styles.otp_main}>
          <div className={styles.otp_container}>
            <div className={styles.otp_sub_container}>
              {/* <h1>LOGO</h1> */}

              {/* <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p> */}

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
                <h3>{timeLeft} seconds left</h3>
                <h4>{Email}</h4>
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
                  </div>
                ) : (
                  <div className={styles.otp_btn_sec}>
                    <button
                      // href="signupstep5thanksbox"
                      className={styles.otp_form_btn2}
                      onClick={() => otpVerification()}
                    >
                      Verify OTP
                    </button>
                  </div>
                )}
              </>
              {/* <div className={styles.otp_btn_sec}>
                <button
                  className={styles.otp_form_btn1}
                  onClick={() => resentOtpVerification()}
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
              </div> */}

              <div className={styles.otp_form_sec3}>
                <Link href="login">Login with another account</Link>
              </div>
              <ToastContainer className="tost" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
const mapStateToProps = (state) => ({
  signUpData: state.authReducer.signUpData,
});
export default connect(mapStateToProps)(OtpForget);
