import styles from "../../../styles/KidsSignup.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

import PhoneInput, { isValidPhoneNumber } from "react-phone-input-2";
import "react-phone-number-input/style.css";
import axios from "axios";
import logo from "../../../src/asset/gemlogo.png";
import Image from "next/image";

import "react-phone-input-2/lib/style.css";
import { parse, isBefore, subYears, format, isValid } from "date-fns";

const GemKidsSignup = () => {
  const router = useRouter();
  const [code, setCode] = useState(null);
  useEffect(() => {
    const { code } = router.query;

    if (typeof window !== "undefined") {
      setCode(code);
    }
  }, [router.query]);
  useEffect(() => {
    const { code } = router.query;

    if (code) {
      setCode(code);
    }
  }, [router.query, setCode]);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDateOfBirth] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [promo, setPromo] = useState("");
  const phoneInputRef = useRef(null); // Create a ref for the PhoneInput component

  const [password, setPassword] = useState("");
  const [repeat_password, setRepeatPassword] = useState("");
  const [kprivate, setKPrivate] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [countryList, setCountryList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const [terms_and_conditions, setTermsAndConditions] = useState(0);
  // const router = useRouter(); // Initialize the router

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!promo) {
      toast.error("Please enter a promo code.", {
        autoClose: 5000,
      });
      setIsLoading(false);
      return; // Stop further execution
    }

    setIsLoading(true);
    if (!first_name || first_name.length < 3) {
      toast.error("Please Enter Your First Name (minimum 3 characters).", {
        autoClose: 5000,
      });
      setIsLoading(false);

      return;
    }
    if (!last_name || last_name.length < 3) {
      toast.error("Please Enter Your Last Name (minimum 3 characters).", {
        autoClose: 5000,
      });
      setIsLoading(false);

      return;
    }
    if (!email) {
      toast.error("Please Enter Your  Email.", {
        autoClose: 5000,
      });
      setIsLoading(false);

      return;
    }
    if (!phone) {
      toast.error("Please Enter Your Phone Number", {
        autoClose: 5000,
      });
      setIsLoading(false);

      return;
    }

    if (
      phoneInputRef.current &&
      !phoneInputRef.current.isValidPhoneNumber(phone)
    ) {
      toast.error("Invalid phone number", {
        autoClose: 5000,
      });
      setIsLoading(false);

      return;
    }

    if (!country) {
      toast.error("Please Select a Country.", {
        autoClose: 5000,
      });
      setIsLoading(false);

      return;
    }
    if (!city) {
      toast.error("Please Select a City.", {
        autoClose: 5000,
      });
      setIsLoading(false);

      return;
    }
    if (!dob) {
      toast.error("please Select a Date Of Birth", {
        autoClose: 5000,
      });
      setIsLoading(false);

      return;
    }

    const isValidDate = (year, month, day) => {
      const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
        2,
        "0"
      )}`;
      const parsedDate = parse(formattedDate, "yyyy-MM-dd", new Date());

      return (
        isValid(parsedDate) &&
        parsedDate.getFullYear() === Number(year) &&
        parsedDate.getMonth() === Number(month) - 1 &&
        parsedDate.getDate() === Number(day)
      );
    };
    const dateParts = dob.split("-");
    if (dateParts.length !== 3) {
      toast.error("Invalid date format. Please use YYYY-MM-DD format.", {
        autoClose: 5000,
      });
      setIsLoading(false);

      return;
    }

    const [year, month, day] = dateParts;
    if (!isValidDate(year, month, day)) {
      toast.error("Please enter a valid date of birth.", {
        autoClose: 5000,
      });
      setIsLoading(false);

      return;
    }

    const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
      2,
      "0"
    )}`;

    // const selectedDate = new Date(formattedDate);

    // if (
    //   isValid(selectedDate) &&
    //   isBefore(selectedDate, subYears(new Date(), 10))
    // ) {
    // } else {
    //   toast.error(
    //     "Please enter a valid date of birth. You must be at least 10 years old."
    //   );
    // }
    const selectedDate = new Date(formattedDate);
    const currentDate = new Date();
    const minAgeDate = subYears(currentDate, 6); // Minimum age: 15 years
    const maxAgeDate = subYears(currentDate, 15); // Maximum age: 6 years

    if (
      isBefore(selectedDate, maxAgeDate) ||
      isBefore(minAgeDate, selectedDate)
    ) {
      toast.error("Your age range must be between 6 to 15 years to sign up.", {
        autoClose: 5000,
      });
      setIsLoading(false);
      return;
    }

    // promocode sectiom
    if (password === "") {
      toast.error("Please Enter Your Password.", {
        autoClose: 5000,
      });
      setIsLoading(false);

      return;
    }
    if (repeat_password === "") {
      toast.error("Please Enter Your Password Again.", {
        autoClose: 5000,
      });
      setIsLoading(false);

      return;
    }
    if (password !== repeat_password) {
      toast.error("Passwords Do Not Match.", {
        autoClose: 5000,
      });
      return;
    }
    if (
      !/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&!+=]).*$/.test(
        password
      )
    ) {
      toast.error(
        "Password must have at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.",
        {
          autoClose: 5000,
        }
      );
      return;
    }
    if (terms_and_conditions !== 1) {
      toast.error("Please agree to the Terms and Conditions.", {
        autoClose: 5000,
      });
      setIsLoading(false);
      return;
    }

    axios
      .post(
        // "https://a.iamgemglobal.com/api/check-user"
        process.env.NEXT_PUBLIC_BASE_URL + "/api/check-user",
        {
          email: email,
        }
      )
      .then((response) => {
        if (response.data.status === false) {
        } else {
          toast.warn(email + " is already taken.", {
            autoClose: 5000,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
    // Check if the phone number already exists
    try {
      const phoneCheckResponse = await axios.post(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/check-user-phone",
        {
          phone: phone,
        }
      );

      if (phoneCheckResponse.data.status === true) {
        toast.warn(phone + " is already taken.", {
          autoClose: 5000,
        });
        setIsLoading(false);
        return; // Phone number already exists, stop the submission
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      return; // An error occurred, stop the submission
    }

    if (!password) {
      toast.error("please Create Password", {
        autoClose: 5000,
      });
      setIsLoading(false);
      return;
    }

    try {
      // Set loading state to true

      const response = await axios.post(
        process.env.NEXT_PUBLIC_BASE_URL +
          "/api/member/competition-registration",

        {
          first_name,
          last_name,
          password,
          phone,
          email,
          dob,
          country,
          city,
          password,
          private: kprivate,
          promo_code: promo,
          terms_and_conditions,
          code,
        }
      );
      // console.log(response, "checking ");
      if (response.data.status === true) {
        // Success
        toast.success(response.data.message, {
          autoClose: 5000,
        });
        router.push("thankskids");
        // Here you can navigate or perform any other action on success
      } else {
        // Failure
        toast.error(response.data.message, {
          autoClose: 5000,
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.", {
        autoClose: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_BASE_URL + "/api/ajax/countries")
      .then((response) => {
        setCountryList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_BASE_URL + "/api/ajax/cities/" + country)
      .then((response) => {
        const sortedCities = response.data.sort((a, b) =>
          a.label.localeCompare(b.label)
        );

        setCityList(sortedCities);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [country]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleNext = (e) => {
    e.preventDefault();

    if (!first_name || first_name.length < 3) {
      toast.error("Please Enter Your First Name (minimum 3 characters).", {
        autoClose: 5000,
      });
      return;
    }
    if (!last_name || last_name.length < 3) {
      toast.error("Please Enter Your Last Name (minimum 3 characters).", {
        autoClose: 5000,
      });
      return;
    }
    if (!email) {
      toast.error("Please Enter Your  Email.", {
        autoClose: 5000,
      });
      return;
    }
    if (!phone) {
      toast.error("Please Enter Your Phone Number", {
        autoClose: 5000,
      });
      return;
    }

    if (
      phoneInputRef.current &&
      !phoneInputRef.current.isValidPhoneNumber(phone)
    ) {
      toast.error("Invalid phone number", {
        autoClose: 5000,
      });
      return;
    }

    axios
      .post(
        // "https://a.iamgemglobal.com/api/check-user"
        process.env.NEXT_PUBLIC_BASE_URL + "/api/check-user",
        {
          email: email,
        }
      )
      .then((response) => {
        if (response.data.status === false) {
        } else {
          toast.warn(email + " is already taken.", {
            autoClose: 5000,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });

    if (!country) {
      toast.error("Please Select a Country.", {
        autoClose: 5000,
      });
      return;
    }
    if (!city) {
      toast.error("Please Select a City.", {
        autoClose: 5000,
      });
      return;
    }
    if (!dob) {
      toast.error("please Select a Date Of Birth", {
        autoClose: 5000,
      });
      return;
    }

    const isValidDate = (year, month, day) => {
      const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
        2,
        "0"
      )}`;
      const parsedDate = parse(formattedDate, "yyyy-MM-dd", new Date());

      return (
        isValid(parsedDate) &&
        parsedDate.getFullYear() === Number(year) &&
        parsedDate.getMonth() === Number(month) - 1 &&
        parsedDate.getDate() === Number(day)
      );
    };
    const dateParts = dob.split("-");
    if (dateParts.length !== 3) {
      toast.error("Invalid date format. Please use YYYY-MM-DD format.", {
        autoClose: 5000,
      });
      return;
    }

    const [year, month, day] = dateParts;
    if (!isValidDate(year, month, day)) {
      toast.error("Please enter a valid date of birth.", {
        autoClose: 5000,
      });
      return;
    }

    const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
      2,
      "0"
    )}`;

    const selectedDate = new Date(formattedDate);

    if (
      isValid(selectedDate) &&
      isBefore(selectedDate, subYears(new Date(), 10))
    ) {
    } else {
      toast.error(
        "Please enter a valid date of birth. You must be at least 10 years old.",
        {
          autoClose: 5000,
        }
      );
    }

    if (!password) {
      toast.error("please Create Password", {
        autoClose: 5000,
      });
      return;
    }
  };

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setKPrivate(isChecked ? 1 : 0);
  };
  const handleTremsAndConditions = (e) => {
    const isChecked = e.target.checkbox;
    setTermsAndConditions(isChecked ? 1 : 0);
  };
  const customCountries = {
    US: "United States",
    CA: "Canada",
    GB: "United Kingdom",
    PK: "Pakistan",
    // Add more countries as needed
  };
  return (
    <div style={{ width: "100%" }}>
      {" "}
      <div className={styles.signup_step1}>
        <div className={styles.signup_container}>
          <div className={styles.signup_sub_container}>
            <Link href="/" className={styles.link}>
              <Image
                style={{ height: "130px", width: "130px" }}
                src={logo}
                // loading="lazy"
                priority={true}
                alt="logo"
              />
            </Link>
          </div>

          <form className={styles.signup_form}>
            <div className={styles.signup_form_sec1}>
              <h2 className="yellow">Create Account</h2>
            </div>
            <div className={styles.signup_form_sec3}>
              <div>
                <label>
                  <input
                    required
                    min={3}
                    className="input"
                    type="text"
                    autoComplete="off"
                    id="first_name"
                    placeholder="First Name"
                    name="first_name"
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label>
                  <input
                    required
                    min={3}
                    className="input"
                    type="text"
                    autoComplete="off"
                    id="last_name"
                    placeholder="Last Name"
                    name="last_name"
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
              </div>
            </div>

            <div className={styles.signup_form_sec4}>
              <label>
                <input
                  className="input"
                  id="email"
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>

              <label> Phone number</label>
              <PhoneInput
                placeholder={"Enter phone number"}
                withCountryCallingCode
                minLength={10} // Minimum length of phone number (including country code)
                maxLength={15} // Maximum length of phone number (including country code)
                // defaultCountry="PK"
                country="us"
                onChange={setPhone}
                className={styles.p_number}
                value={phone}
                onlyCountries={["ae", "us", "ca", "gb", "pk", "in", "bd", "sa"]} // Specify the allowed countries
              />
            </div>

            <div className={styles.signup_form_sec2}>
              <div>
                <p>Country</p>
                <select
                  className={styles.select}
                  value={country}
                  onChange={handleCountryChange}
                >
                  <option value={"Select"} className={styles.option}>
                    Select
                  </option>
                  {countryList.map((item) => (
                    // eslint-disable-next-line react/jsx-key
                    <option className={styles.option} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <p>City</p>

                <select
                  className={styles.select}
                  value={city}
                  onChange={handleCityChange}
                >
                  <option value={"Select"} className={styles.option}>
                    Select
                  </option>
                  {cityList.map((item) => (
                    // eslint-disable-next-line react/jsx-key
                    <option className={styles.option} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <p>
              Date of birth <br /> (Your age range must be between 6 to 15 years
              to sign up .)
            </p>
            <div className={styles.signup_form_sec3_2}>
              <div>
                {/* <p style={{ color: "#C2C2C2" }}>
                  Date of birth (Your age range must be between 6 to 15 years to
                  sign up.)
                </p> */}
                <div className={styles.datePickerContainer}>
                  <select
                    className={styles.select}
                    value={dob ? dob.split("-")[2] : ""}
                    onChange={(e) => {
                      const selectedDay = e.target.value;
                      const updatedDate = dob ? dob.split("-") : ["", "", ""];
                      updatedDate[2] = selectedDay;
                      setDateOfBirth(updatedDate.join("-"));
                    }}
                  >
                    <option className={styles.option} value="" disabled>
                      Day
                    </option>
                    {Array.from({ length: 31 }, (_, index) => index + 1).map(
                      (day) => (
                        <option className={styles.option} key={day} value={day}>
                          {day}
                        </option>
                      )
                    )}
                  </select>
                  <select
                    className={styles.select}
                    value={dob ? dob.split("-")[1] : ""}
                    onChange={(e) => {
                      const selectedMonth = e.target.value;
                      const updatedDate = dob ? dob.split("-") : ["", "", ""];
                      updatedDate[1] = selectedMonth;
                      setDateOfBirth(updatedDate.join("-"));
                    }}
                  >
                    <option className={styles.option} value="" disabled>
                      Month
                    </option>
                    {Array.from({ length: 12 }, (_, index) => index + 1).map(
                      (month) => (
                        <option
                          className={styles.option}
                          key={month}
                          value={month}
                        >
                          {/* {month} */}
                          {format(new Date(0, month - 1), "MMM")}
                        </option>
                      )
                    )}
                  </select>
                  <select
                    className={styles.select}
                    value={dob ? dob.split("-")[0] : ""}
                    onChange={(e) => {
                      const selectedYear = e.target.value;
                      const updatedDate = dob ? dob.split("-") : ["", "", ""];
                      updatedDate[0] = selectedYear;
                      setDateOfBirth(updatedDate.join("-"));
                    }}
                  >
                    <option className={styles.option} value="" disabled>
                      Year
                    </option>
                    {Array.from(
                      { length: 100 },
                      (_, index) => new Date().getFullYear() - index
                    ).map((year) => (
                      <option className={styles.option} key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label>
                  <input
                    required
                    className="input"
                    id="promocode"
                    type="promocode"
                    placeholder="Referral Code / Promo Code"
                    name="promocode"
                    value={promo}
                    onChange={(e) => setPromo(e.target.value)}
                  />
                </label>
              </div>
            </div>

            <p>Example Password: SecureP@ss1</p>

            <div className={styles.login_form_password}>
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                id="userPassword"
                // placeholder="Password  Ex: Ent@1234"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className={styles.passwordvisible_styling}
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </span>
            </div>

            <div className={styles.login_form_password}>
              <input
                type={passwordVisible ? "text" : "password"}
                name="repeat_password"
                id="repeat_password"
                placeholder="Confirm Password"
                value={repeat_password}
                onChange={(e) => setRepeatPassword(e.target.value)}
                required
              />
              <span
                className={styles.passwordvisible_styling}
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </span>
            </div>

            <div className={styles.signup_form_sec3}>
              <div className={styles.form_group}>
                <input
                  type="checkbox"
                  id="javascript"
                  className={styles.checkbox}
                  checked={terms_and_conditions === 1}
                  onChange={(e) =>
                    e.target.checked === true
                      ? setTermsAndConditions(1)
                      : setTermsAndConditions(0)
                  }
                />

                <label className={styles.checkbox} htmlFor="javascript">
                  Agree to
                  <Link href="/termsandconditions" target="_blank">
                    terms & conditions
                  </Link>
                </label>
              </div>
            </div>

            <button
              type="button"
              className={styles.signup_form_btn}
              onClick={handleSubmit}
            >
              {isLoading ? "Loading..." : "Create Account"}
            </button>
          </form>
          <ToastContainer className="tost" />
        </div>
      </div>
    </div>
  );
};

export default GemKidsSignup;
