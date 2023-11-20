// import { Api } from "@/src/config/Config";
import { Api } from "../../config/Config";
import Link from "next/link";
import axios from "axios";
import React, { useState } from "react";
import styles from "../../../styles/ForgetPasswordStep2.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
export default function ForgetPasswordStep2({
  setStep3,
  setStep4,
  setPassword,
  setForget,
  setUserId,
  forget,
  userId,
}) {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const fmrk = useFormik({
    initialValues: {
      password: "",
      repeat_password: "",
    },
    validationSchema: yup.object({
      password: yup
        .string("Enter Your New Password")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        )
        .min(8, "Please enter more then 8 characters ")
        .max(65, "Please enter within 65 characters ")
        .required("Password is required"),
      repeat_password: yup
        .string("Enter your password again")
        .required("Please enter your password again")
        .min(8, "Please enter more then 8 characters ")
        .max(65, "Please enter within 65 characters ")
        .oneOf([yup.ref("password"), null], "Passwords must match"),
    }),
    onSubmit: async (values) => {
      setPassword(values);

      const password = values?.password;
      const passwordrepeat = values?.password_repeat;
      let margedata = {
        password,
        passwordrepeat,
        ...forget,
      };

      setForget(margedata);

      try {
        const res = await axios.post(
          // Api?.CHANGEPASSWORD,
          process.env.NEXT_PUBLIC_CHANGEPASSWORD,

          {
            user_id: Number(userId),
            password: String(password),
          }
        );

        if (res.data.status === true) {
          setStep3(false);
          setStep4(true);
          router.push("login");
        }
      } catch (err) {
        // console.log(err);
        console.log(err.response.data.message);
      }
    },
  });
  return (
    <div className={styles.forget_password_step2}>
      <div className={styles.forget_password_container}>
        <div className={styles.forget_password_sub_container}>
          <h1>LOGO</h1>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>

          <form
            onSubmit={fmrk.handleSubmit}
            className={styles.forget_password_form}
          >
            <div className={styles.forget_password_form_sec1}>
              <h1>Reset Your Password</h1>
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
                  value={fmrk.values.password}
                  onChange={fmrk.handleChange}
                  onBlur={fmrk.handleBlur}
                />
                <span
                  className={styles.passwordvisible_styling}
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </span>
                <br />
              </div>
              {fmrk.touched.password && Boolean(fmrk.errors.password) ? (
                <p className={styles.errorPra}>{fmrk.errors.password}</p>
              ) : null}
              <br />
              <div className={styles.login_form_password}>
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="repeat_password"
                  id="repeat_password"
                  required
                  placeholder="Confirm New Password"
                  autoComplete="off"
                  value={fmrk.values.repeat_password}
                  onChange={fmrk.handleChange}
                  onBlur={fmrk.handleBlur}
                />
                <span
                  className={styles.passwordvisible_styling}
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </span>
              </div>
              {fmrk.touched.repeat_password &&
              Boolean(fmrk.errors.repeat_password) ? (
                <p className={styles.errorPra}>{fmrk.errors.repeat_password}</p>
              ) : null}
            </div>
            {/* <div className={styles.forget_password_form_sec2}>
              <input
                id="userpassword"
                type="password"
                name="password"
                placeholder="Enter New Password"
                autoComplete="off"
                value={fmrk.values.password}
                onChange={fmrk.handleChange}
                onBlur={fmrk.handleBlur}
              />
              {fmrk.touched.password && Boolean(fmrk.errors.password) ? (
                <p className={styles.errorPra}>{fmrk.errors.password}</p>
              ) : null}
              <input
                id="repeat_password"
                name="repeat_password"
                type="password"
                autoComplete="off"
                placeholder="Confirm New Password"
                value={fmrk.values.repeat_password}
                onChange={fmrk.handleChange}
                onBlur={fmrk.handleBlur}
              />
              {fmrk.touched.repeat_password &&
              Boolean(fmrk.errors.repeat_password) ? (
                <p className={styles.errorPra}>{fmrk.errors.repeat_password}</p>
              ) : null}
            </div> */}

            <button
              type="submit"
              // href="forgetpasswordthankbox"
              className={styles.forget_password_form_btn}
            >
              Reset
            </button>

            <div className={styles.forget_password_form_sec3}></div>
          </form>
        </div>
      </div>
    </div>
  );
}
