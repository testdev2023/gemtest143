import Link from "next/link";
import styles from "../../../styles/SignupStep3.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import React, { useState } from "react";
// import Link from "next/link";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { Api } from "../../config/Config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import logo from "../../../src/asset/gemlogo.png";
import Image from "next/image";

export default function SignupStep3({
  setStep2,
  setStep3,
  setStep4,
  setPassword,
  setSignup,
  signup,
  setUserId,
}) {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const [terms_and_conditions, setTermsAndConditions] = useState();

  const apiCall = () => {};
  const fmrk = useFormik({
    initialValues: {
      password: "",
      repeat_password: "",
    },

    validationSchema: yup.object({
      password: yup
        .string("Enter your Password")
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
      let margedata = {
        password,
        terms_and_conditions,
        ...signup,
      };
      // console.log(margedata);
      setSignup(margedata);
      try {
        const res = await axios.post(Api?.SIGN_UP, margedata);
        // setResponse(res);
        // console.log("Signup successful", res);
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success">{res?.data?.message}</Alert>
        </Stack>;
        if (res.data.status === true) {
          setUserId(res?.data?.data?.id);
          setStep3(false);
          setStep4(true);
        }

        //   toast(`${res.data.message}`); //https://www.npmjs.com/package/react-toastify
      } catch (err) {
        toast.error(err.response.data.message, {
          autoClose: 5000,
        });
        //   toast(`${err.response.data.message}`);
      }
      //do something like there you can call API or send data to firebase
      //if (errors) console.log("error is", errors);
      //console.log(errors);
    },
  });

  return (
    <div className={styles.signup_step1}>
      <div className={styles.signup_container}>
        <div className={styles.steper_parent}>
          <div className={styles.steps_box}>
            <div className={styles.step1_box}>1</div>
            <div className={styles.steper_dash}></div>
            <div className={styles.step2_box}>2</div>

            <div className={styles.steper_dash}></div>

            <div className={styles.step3_box} style={{ background: "#fcc100" }}>
              3
            </div>
          </div>
          <div className={styles.steper}>
            <div> </div>
            <div></div>
            <div>Create Password</div>
          </div>
        </div>

        <div className={styles.signup_sub_container}>
          {/* <Link href="ent" className={styles.link}> */}
          <Link href="/" className={styles.link}>
            <Image
              style={{ height: "130px", width: "130px" }}
              src={logo}
              loading="lazy"
              alt="logo"
            />
          </Link>
          {/* <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p> */}
        </div>

        <form onSubmit={fmrk.handleSubmit} className={styles.signup_form}>
          <div className={styles.signup_form_sec1}>
            <h1>Create Password</h1>
          </div>

          <div className={styles.login_form_password}>
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              id="userPassword"
              placeholder="Password"
              value={fmrk.values.password}
              onChange={fmrk.handleChange}
              onBlur={fmrk.handleBlur}
              required
            />
            <span
              className={styles.passwordvisible_styling}
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </span>
          </div>

          {fmrk.touched.password && Boolean(fmrk.errors.password) ? (
            <p className={styles.errorPra}>{fmrk.errors.password}</p>
          ) : null}

          <div className={styles.login_form_password}>
            <input
              type={passwordVisible ? "text" : "password"}
              name="repeat_password"
              id="repeat_password"
              placeholder="Confirm Password"
              value={fmrk.values.repeat_password}
              onChange={fmrk.handleChange}
              onBlur={fmrk.handleBlur}
              required
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

          {/* <div className={styles.signup_form_sec2}>
            <div>
              <label>
                <input
                  id="userPassword"
                  // className="input"
                  className={styles.password}
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={fmrk.values.password}
                  onChange={fmrk.handleChange}
                  onBlur={fmrk.handleBlur}
                />
              </label>
            </div>
            {fmrk.touched.password && Boolean(fmrk.errors.password) ? (
              <p className={styles.errorPra}>{fmrk.errors.password}</p>
            ) : null}

            <div>
              <label>
                <input
                  id="repeat_password"
                  className={styles.password}
                  type="password"
                  placeholder="Confirm Password"
                  name="repeat_password"
                  value={fmrk.values.repeat_password}
                  onChange={fmrk.handleChange}
                  onBlur={fmrk.handleBlur}
                />
              </label>
            </div>
            {fmrk.touched.repeat_password &&
            Boolean(fmrk.errors.repeat_password) ? (
              <span className={styles.errorPra}>
                {fmrk.errors.repeat_password}
              </span>
            ) : null}
          </div> */}

          <div className={styles.signup_form_sec3}>
            {/* <div>
              <label className={styles.label}>
                <input
                  className={styles.checkbox}
                  placeholder="Confirm Your Password"
                  type="checkbox"
                />
                <p>Accept Terms & Conditions</p>
              </label> 
            </div> */}
            <div className={styles.form_group}>
              <input
                type="checkbox"
                id="javascript"
                className={styles.checkbox}
                onChange={(e) =>
                  e.target.checked === true
                    ? setTermsAndConditions(1)
                    : setTermsAndConditions(0)
                }
              />
              <label className={styles.checkbox} for="javascript">
                Agree to <span>Terms and Codition</span>
              </label>
            </div>
          </div>

          <button type="submit" className={styles.signup_form_btn}>
            Create Account
          </button>
          <button
            onClick={() => {
              setStep2(true);
              setStep3(false);
            }}
            type="submit"
            className={styles.signup_form_btn}
          >
            Back
          </button>
          <ToastContainer sx={{ color: "red" }} className={styles.data} />
        </form>
      </div>
    </div>
  );
}
