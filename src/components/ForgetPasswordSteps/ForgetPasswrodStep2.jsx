// import { Api } from "@/src/config/Config";
import { Api } from "../../config/Config";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "../../../styles/ForgetPasswordStep2.module.css";
import { connect, useDispatch } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useRouter } from "next/router";
import Signup from "../../../pages/signup";
import ThanksBox from "../ThanksBox/ThanksBox";
import { toast, ToastContainer } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import logo from "../../asset/gemlogo.png";
const ForgetPasswordStep2 = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showStep4, setshowStep4] = useState(false);
  const { signUpData } = props;
  const userId = signUpData.user.id;
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  useEffect(() => {
    // console.log(signUpData, "this is Forget Password Step 2");
  }, [signUpData]);
  const [password, setPassword] = useState();
  const [repeatpassword, setPasswordRepeats] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === "") {
      toast.error("Please Enter Your Password.", { autoClose: 5000 });
      return;
    }
    if (repeatpassword === "") {
      toast.error("Please Enter Your Password Again.", { autoClose: 5000 });
      return;
    }
    if (password !== repeatpassword) {
      toast.error("Passwords Do Not Match.", { autoClose: 5000 });
      return;
    }
    if (
      !/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&!+=]).*$/.test(
        password
      )
    ) {
      toast.error(
        "Password must have at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.",
        { autoClose: 5000 }
      );
      return;
    }

    try {
      const response = await axios.post(
        // Api?.CHANGEPASSWORD
        process.env.NEXT_PUBLIC_CHANGEPASSWORD,
        {
          user_id: Number(userId),
          password: String(password),
          password_repeat: String(repeatpassword),
        }
      );
      dispatch(Signup(response.data));
      // console.log("checking Forgetpassword Step 2 api response", response.data);
      if (response.data.status === true) {
        setshowStep4(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {showStep4 ? (
        <ThanksBox />
      ) : (
        <div className={styles.forget_password_step2}>
          <div className={styles.forget_password_container}>
            <div className={styles.forget_password_sub_container}>
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
              <form
                onSubmit={handleSubmit}
                className={styles.forget_password_form}
              >
                <div className={styles.forget_password_form_sec1}>
                  <h2 className="yellow">Reset Your Password </h2>
                  <p>Create New Password</p>
                </div>
                <div className={styles.forget_password_form_sec2}>
                  <div className={styles.login_form_password}>
                    <input
                      id="userpassword"
                      type={passwordVisible ? "text" : "password"}
                      name="password"
                      required
                      placeholder="Enter New Password"
                      autoComplete="off"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      className={styles.passwordvisible_styling}
                      onClick={togglePasswordVisibility}
                    >
                      {passwordVisible ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </span>
                    <br />
                  </div>

                  <div className={styles.login_form_password}>
                    <input
                      type={passwordVisible ? "text" : "password"}
                      name="repeat_password"
                      id="repeat_password"
                      required
                      placeholder="Confirm New Password"
                      autoComplete="off"
                      value={repeatpassword}
                      onChange={(e) => setPasswordRepeats(e.target.value)}
                    />
                    <span
                      className={styles.passwordvisible_styling}
                      onClick={togglePasswordVisibility}
                    >
                      {passwordVisible ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  // onClick={() => handleSubmit()}
                  onClick={handleSubmit}
                  // onSubmit={() => handleSubmit()}
                  className={styles.forget_password_form_btn}
                >
                  Reset
                </button>

                <div className={styles.forget_password_form_sec3}></div>
              </form>
              <ToastContainer className="tost" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
// export default ForgetPasswordStep2;
const mapStateToProps = (state) => ({
  signUpData: state.authReducer.signUpData,
});
export default connect(mapStateToProps)(ForgetPasswordStep2);
