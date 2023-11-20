import Link from "next/link";
import stylestep3 from "../../../styles/SignupStep3.module.css";
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
      console.log(margedata);
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
    <div className={stylestep3.signup_step1}>
      <div className={stylestep3.signup_container}>
        <div className={stylestep3.steper_parent}>
          <div className={stylestep3.steps_box}>
            <div className={stylestep3.step1_box}>1</div>
            <div className={stylestep3.steper_dash}></div>
            <div className={stylestep3.step2_box}>2</div>

            <div className={stylestep3.steper_dash}></div>

            <div
              className={stylestep3.step3_box}
              style={{ background: "#fcc100" }}
            >
              3
            </div>
          </div>
          <div className={stylestep3.steper}>
            <div> </div>
            <div></div>
            <div>Create Password</div>
          </div>
        </div>

        <div className={stylestep3.signup_sub_container}>
          {/* <Link href="ent" className={stylestep3.link}> */}
          <Link href="/" className={stylestep3.link}>
            <Image
              style={{ height: "130px", width: "130px" }}
              src={logo}
              loading="lazy"
              alt="logo"
            />
          </Link>
          {/* <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p> */}
        </div>

        <form onSubmit={fmrk.handleSubmit} className={stylestep3.signup_form}>
          <div className={stylestep3.signup_form_sec1}>
            <h1>Create Password</h1>
          </div>

          <div className={stylestep3.login_form_password}>
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
              className={stylestep3.passwordvisible_styling}
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </span>
          </div>

          {fmrk.touched.password && Boolean(fmrk.errors.password) ? (
            <p className={stylestep3.errorPra}>{fmrk.errors.password}</p>
          ) : null}

          <div className={stylestep3.login_form_password}>
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
              className={stylestep3.passwordvisible_styling}
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </span>
          </div>

          {fmrk.touched.repeat_password &&
          Boolean(fmrk.errors.repeat_password) ? (
            <p className={stylestep3.errorPra}>{fmrk.errors.repeat_password}</p>
          ) : null}

          {/* <div className={stylestep3.signup_form_sec2}>
            <div>
              <label>
                <input
                  id="userPassword"
                  // className="input"
                  className={stylestep3.password}
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
              <p className={stylestep3.errorPra}>{fmrk.errors.password}</p>
            ) : null}

            <div>
              <label>
                <input
                  id="repeat_password"
                  className={stylestep3.password}
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
              <span className={stylestep3.errorPra}>
                {fmrk.errors.repeat_password}
              </span>
            ) : null}
          </div> */}

          <div className={stylestep3.signup_form_sec3}>
            {/* <div>
              <label className={stylestep3.label}>
                <input
                  className={stylestep3.checkbox}
                  placeholder="Confirm Your Password"
                  type="checkbox"
                />
                <p>Accept Terms & Conditions</p>
              </label> 
            </div> */}
            <div className={stylestep3.form_group}>
              <input
                type="checkbox"
                id="javascript"
                className={stylestep3.checkbox}
                onChange={(e) =>
                  e.target.checked === true
                    ? setTermsAndConditions(1)
                    : setTermsAndConditions(0)
                }
              />
              <label className={stylestep3.checkbox} for="javascript">
                Agree to <span>Terms and Codition</span>
              </label>
            </div>
          </div>

          <button type="submit" className={stylestep3.signup_form_btn}>
            Create Account
          </button>
          <button
            onClick={() => {
              setStep2(true);
              setStep3(false);
            }}
            type="submit"
            className={stylestep3.signup_form_btn}
          >
            Back
          </button>
          <ToastContainer sx={{ color: "red" }} className={stylestep3.data} />
        </form>
      </div>
    </div>
  );
}
