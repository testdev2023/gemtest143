import { useFormik } from "formik";
import * as yup from "yup";
import styles from "../../../styles/SignupStep1.module.css";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Link from "next/link";
import { useState } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import axios from "axios";
import logo from "../../../src/asset/gemlogo.png";
import Image from "next/image";
// import { toast } from "react-toastify";
import { toast, ToastContainer } from "react-toastify";

// import { baseUrl } from "../../config/Config";

// import {userimg} from 'https://tse3.mm.bing.net/th?id=OIP.N_3Ps4vy5T3VXVycq8OEFwHaHa&pid=Api&P=0';

export default function SignupStep1({
  setStep1,
  setStep2,
  setStep1Value,
  setSignup,
  signup,
}) {
  const [phone, setPhoneNumber] = useState("");
  const isValid = phone && isValidPhoneNumber(phone.toString()); // check if phoneNumber exists
  const fmrk = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      // phone: "",
      // // photo: userimg,
    },

    validationSchema: yup.object({
      first_name: yup
        .string("Enter your name")
        .required("First Name is required")
        .min(4, "Please enter more then 4 characters ")
        .max(15, "Please enter within 15 characters "),
      last_name: yup
        .string("Enter your name")
        .required("Last name is required")
        .min(4, "Please enter more then 4 characters ")
        .max(15, "Please enter within 15 characters "),
      email: yup
        .string("Enter your email")
        .email("Enter your email")
        .required("Email is required")
        .min(1)
        .max(35, "Please enter within 25 characters"),
      // phone: yup
      //   .string("Enter your phone")
      //   .required("phone is required")
      //   .min(10, "phone enter more then 10 characters ")
      //   .max(11, "phone enter within 11 characters "),
    }),

    onSubmit: async (step1Values) => {
      await axios
        .post(
          // `${baseUrl}/api/check-user`
          process.env.NEXT_PUBLIC_BASE_URL + "/api/check-user",
          {
            email: step1Values?.email,
          }
        )
        .then((response) => {
          if (response?.data?.status === false) {
            setStep1Value(step1Values);
            // setSignup({ ...step1Values, phone });
            setSignup({ ...step1Values, phone });

            setStep1(false);
            setStep2(true);
          } else {
            // alert(step1Values?.email + " is already taken.");
            toast.warn(step1Values?.email + " is already taken.");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
  });

  return (
    <div className={styles.signup_step1}>
      <div className={styles.signup_container}>
        <div className={styles.steper_parent}>
          <div className={styles.steps_box}>
            <div
              onClick={() => {}}
              className={styles.step1_box}
              style={{ background: "#fcc100" }}
            >
              1
            </div>
            <div className={styles.steper_dash}></div>
            <div className={styles.step2_box}>2</div>

            <div className={styles.steper_dash}></div>

            <div className={styles.step3_box}>3</div>
          </div>
          <div className={styles.steper}>
            <div>Profile data</div>
            <div> </div>
            <div> </div>
          </div>
        </div>

        <div className={styles.signup_sub_container}>
          {/* <Link href="ent" className={styles.link}> */}
          <Link href="/" className={styles.link}>
            <Image
              style={{ height: "130px", width: "130px" }}
              // xs={{ height: "80px", width: "80px" }}
              src={logo}
              loading="lazy"
              alt="logo"
            />
          </Link>
        </div>

        <form onSubmit={fmrk.handleSubmit} className={styles.signup_form}>
          <div className={styles.signup_form_sec1}>
            <h1>Create Account</h1>
            <p>Welcome! Please enter your details.</p>
          </div>
          <div className={styles.signup_form_sec2}>
            {/* <label name="profilepicture" className={styles.label}>
              <input
                className="imgInput"
                // type="file"
                name="profilepicture"
                // accept="image/*"
                style={{ display: "none" }}
              />
              <AddPhotoAlternateIcon className={styles.AddPhotoAlternateIcon} />
              <span>upload image</span>
            </label> */}
          </div>
          <div className={styles.signup_form_sec3}>
            <div>
              <label>
                <input
                  className="input"
                  type="first_name"
                  autoComplete="off"
                  id="first_name"
                  // placeholder="First Name"
                  placeholder={"First Name"}
                  name="first_name"
                  value={fmrk.values.first_name}
                  // value={back ? back?.first_name : fmrk.values.first_name}
                  onChange={fmrk.handleChange}
                  onBlur={fmrk.handleBlur}
                />
                {fmrk.touched.first_name && Boolean(fmrk.errors.first_name) ? (
                  <p className={styles.errorPra}>{fmrk.errors.first_name}</p>
                ) : null}
              </label>
              <label>
                <input
                  className="input"
                  type="last_name"
                  autoComplete="off"
                  id="last_name"
                  placeholder={"Last Name"}
                  // placeholder="Last Name"
                  name="last_name"
                  value={fmrk.values.last_name}
                  // value={back ? back.last_name : fmrk.values.last_name}
                  onChange={fmrk.handleChange}
                  onBlur={fmrk.handleBlur}
                />
                {fmrk.touched.last_name && Boolean(fmrk.errors.last_name) ? (
                  <p className={styles.errorPra}>{fmrk.errors.last_name}</p>
                ) : null}
              </label>
            </div>
          </div>
          <div className={styles.signup_form_sec4}>
            <label>
              <input
                className="input"
                id="email"
                type="email"
                placeholder={"Email Address"}
                // placeholder="Email Address"
                name="email"
                value={fmrk.values.email}
                // value={back ? back.email : fmrk.values.email}
                onChange={fmrk.handleChange}
                onBlur={fmrk.handleBlur}
              />
              {fmrk.touched.email && Boolean(fmrk.errors.email) ? (
                <p className={styles.errorPra}>{fmrk.errors.email}</p>
              ) : null}
            </label>
            {/* <label>
              <input
                className="input"
                id="phone"
                type="number"
                placeholder="Phone Number"
                name="phone"
                value={fmrk.values.phone}
                onChange={fmrk.handleChange}
                onBlur={fmrk.handleBlur}
              />
              {fmrk.touched.phone && Boolean(fmrk.errors.phone) ? (
                <p className={styles.errorPra}>{fmrk.errors.phone}</p>
              ) : null}
            </label> */}
            <PhoneInput
              // placeholder="Enter phone number"
              placeholder={"Enter phone number"}
              withCountryCallingCode
              value={phone}
              // value={phone}
              defaultCountry="PK"
              onChange={setPhoneNumber}
              className={styles.p_number}
            />
            {!isValid && (
              <div style={{ marginBottom: "10px", color: "red" }}>
                Invalid phone number
              </div>
            )}
          </div>

          <button type="submit" className={styles.signup_form_btn}>
            Next
          </button>
          <div className={styles.signup_form_sec5}>
            <p>back to</p>
            <Link href="login">Login</Link>
          </div>
        </form>
      </div>
      <ToastContainer className="tost" />
    </div>
  );
}
