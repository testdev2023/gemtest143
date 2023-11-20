import axios from "axios";
import Link from "next/link";
import { useFormik } from "formik";
import * as yup from "yup";
import { Router } from "next/router";
import { useState } from "react";
import styles from "../../../styles/ForgetPasswordStep1.module.css";
// import { Api } from "@/src/config/Config";
import { Api } from "../../config/Config";
import Image from "next/image";
import logo from "../../asset/gemlogo.png";

export default function ForgetPasswordStep1({
  setStep1,
  setStep2,
  setForget,
  forget,
  setUserId,
  setEmail,
}) {
  const fmrk = useFormik({
    initialValues: {
      email: "",
    },
    ValidationSchema: yup.object({
      email: yup
        .string("Enter your email")
        .email("Enter your email")
        .required("Email is required")
        .min(1)
        .max(35, "Please enter within 25 characters"),
    }),
    onSubmit: async (values) => {
      setEmail(values);
      const email = values?.email;

      let margedata = {
        email,
        ...forget,
      };
      // console.log(margedata, "margedata");
      setForget(margedata);

      try {
        const res = await axios.post(
          // Api?.RESTEMAIL
          process.env.NEXT_PUBLIC_RESTEMAIL,

          margedata
        );

        if (res.data.status === true) {
          setUserId(res?.data?.user?.id);
          // console.log(res?.data?.user?.id);
          setStep1(false);
          setStep2(true);
        }
      } catch (err) {
        console.log(err);
        // console.log(err.response.data.message);
      }
    },
  });

  return (
    <div className={styles.forget_password_step1}>
      <div className={styles.forget_password_container}>
        <div className={styles.forget_password_sub_container}>
          <Link className={styles.link} href="/">
            <Image
              style={{ height: "130px", width: "130px" }}
              src={logo}
              loading="lazy"
              alt="logo"
            />
          </Link>

          <form
            onSubmit={fmrk.handleSubmit}
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
                value={fmrk.values.email}
                onChange={fmrk.handleChange}
                onBlur={fmrk.handleBlur}
              />
              {fmrk.touched.email && Boolean(fmrk.errors.email) ? (
                <p className={styles.errorPra}>{fmrk.errors.email}</p>
              ) : null}
            </div>
            <button
              className={styles.forget_password_form_btn}
              // onClick={onSubmit}

              type="submit"
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
  );
}
