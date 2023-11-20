import styles from "../../../styles/SignupStep1.module.css";
import stylestep2 from "../../../styles/SignupStep2.module.css";
import stylestep3 from "../../../styles/SignupStep3.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
// import { isValidPhoneNumber } from "react-phone-number-input";
import PhoneInput, { isValidPhoneNumber } from "react-phone-input-2";
import "react-phone-number-input/style.css";
import axios from "axios";
import logo from "../../../src/asset/gemlogo.png";
import Image from "next/image";
import localStorage from "local-storage";
// import LocalStorage from "react-localstorage";/
// import { useLocalStorage } from "reactjs-localstorage";
import { reactLocalStorage } from "reactjs-localstorage";

import { useDispatch, useSelector } from "react-redux";
import { Api } from "../../config/Config";
// import { signUp } from "../../../src/redux/actions/userActions";
import { signUp } from "../../redux/actions/authActions";
// import { baseUrl } from "../../config/Config";
// import { baseUrl } from "@/src/config/Config";
import Otp from "../OTP/Otp";
import { useRouter } from "next/router";
import "react-phone-input-2/lib/style.css";
import { parse, isBefore, subYears, format, isValid } from "date-fns";
import Promise from "bluebird";

const SignupStep1 = ({}) => {
  const router = useRouter();
  const [code, setCode] = useState(null);

  useEffect(() => {
    const { code } = router.query;

    // if (typeof window !== "undefined") {
    //   const myValue = reactLocalStorage.getObject("myValue");
    //   console.log(myValue);
    // }
    if (typeof window !== "undefined") {
      setCode(code);
    }
  }, [router.query]);

  useEffect(() => {
    if (code) {
      setPromoCode(code);
    }
  }, [code]);
  // useEffect(() => {}, [myValue]);

  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [promo_code, setPromoCode] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDateOfBirth] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const phoneInputRef = useRef(null); // Create a ref for the PhoneInput component

  const [password, setPassword] = useState("");
  const [repeat_password, setRepeatPassword] = useState("");
  const [kprivate, setKPrivate] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // 1st step
  const [countryList, setCountryList] = useState([]);
  const [cityList, setCityList] = useState([]);
  // const isValid = phone && isValidPhoneNumber(phone.toString());
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const [termsconditions, setTermsAndConditions] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setIsLoading(true);
    if (password === "") {
      toast.error("Please Enter Your Password.", {
        autoClose: 5000,
      });
      return;
    }
    if (repeat_password === "") {
      toast.error("Please Enter Your Password Again.", {
        autoClose: 5000,
      });
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
    if (termsconditions !== 1) {
      toast.error("Please agree to the Terms and Conditions.", {
        autoClose: 5000,
      });
      return;
    }

    try {
      const response = await axios.post(
        // Api?.SIGN_UP,
        process.env.NEXT_PUBLIC_SIGN_UP,

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
          kprivate,
          promo_code,
          code,
        }
      );

      dispatch(signUp(response.data));
      // console.log(dispatch(signUp(response.data)), "SiguUP k Resoponse");

      // setIsLoading(false);

      setStep(4);
    } catch (error) {
      console.log(error);
      // setIsLoading(false);
    }
  };
  useEffect(() => {
    const { code } = router.query;

    if (code) {
      setCode(code);
    }
  }, [router.query, setCode]);
  useEffect(() => {
    axios
      .get(
        // `${baseUrl}/api/ajax/countries`
        process.env.NEXT_PUBLIC_BASE_URL + "/api/ajax/countries"
      )
      .then((response) => {
        // handle the response here
        setCountryList(response.data);
      })
      .catch((error) => {
        // handle any errors here
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        // `${baseUrl}/api/ajax/cities/${country}`
        process.env.NEXT_PUBLIC_BASE_URL + "/api/ajax/cities/" + country
      )
      .then((response) => {
        // Sort the response data before setting it in cityList state
        const sortedCities = response.data.sort((a, b) =>
          a.label.localeCompare(b.label)
        );
        // setCityList(response.data);
        setCityList(sortedCities);
      })
      .catch((error) => {
        // handle any errors here
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
    e.preventDefault(); // prevent form submission
    // Validate first name, last name, email, and phone number
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
    if (!promo_code || promo_code.length > 20) {
      toast.error("Please Enter (maximam 20 characters). in Promo Code", {
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
    // if (!isValid) {
    //   toast.error("Invalid phone number");
    //   return;
    // }
    if (
      phoneInputRef.current &&
      !phoneInputRef.current.isValidPhoneNumber(phone)
    ) {
      toast.error("Invalid phone number", {
        autoClose: 5000,
      });
      return;
    }

    // ------------------------
    // axios
    //   .post(
    //     // "https://a.iamgemglobal.com/api/check-user"
    //     process.env.NEXT_PUBLIC_BASE_URL + "/api/check-user-phone",
    //     {
    //       phone: phone,
    //     }
    //   )
    //   .then((response) => {
    //     if (response.data.status === false) {
    //       setStep(step + 1);
    //     } else {
    //       toast.warn(phone + " is already taken.");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    // ========================
    // axios
    //   .post(
    //     // "https://a.iamgemglobal.com/api/check-user"
    //     process.env.NEXT_PUBLIC_BASE_URL + "/api/check-user",
    //     {
    //       email: email,
    //     }
    //   )
    //   .then((response) => {
    //     if (response.data.status === false) {
    //       setStep(step + 1);
    //     } else {
    //       toast.warn(email + " is already taken.");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

    Promise.all([
      axios.post(process.env.NEXT_PUBLIC_BASE_URL + "/api/check-user-phone", {
        phone: phone,
      }),
      axios.post(process.env.NEXT_PUBLIC_BASE_URL + "/api/check-user", {
        email: email,
      }),
    ])
      .then(([phoneResponse, emailResponse]) => {
        if (
          phoneResponse.data.status === false &&
          emailResponse.data.status === false
        ) {
          setStep(step + 1);
        } else {
          if (phoneResponse.data.status === true) {
            toast.warn(phone + " is already taken.", {
              autoClose: 5000,
            });
          }
          if (emailResponse.data.status === true) {
            toast.warn(email + " is already taken.", {
              autoClose: 5000,
            });
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleNextStep2 = (e) => {
    e.preventDefault(); // prevent form submission

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

    // const dateRegex = /^(0[1-9]|[12][0-9]|3[01]) (0[1-9]|1[0-2]) \d{4}$/;
    // if (!dateRegex.test(dob)) {
    //   console.log("Invalid date format:", dob);
    //   toast.error("Invalid date format. Please use DD MM YYYY format.");
    //   return;
    // }

    // const [year, month, day] = dob.split("-");
    // console.log("Year:", year, "Month:", month, "Day:", day);

    // const currentDate = new Date();
    // const selectedDate = new Date(`${year}-${month}-${day}`);

    // if (isBefore(selectedDate, subYears(currentDate, 13))) {
    //   // User is at least 13 years old
    //   setStep(step + 1);
    // } else {
    //   toast.error("You must be at least 13 years old to sign up.");
    // }

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

    // if (isBefore(selectedDate, subYears(new Date(), 13))) {
    //   setStep(step + 1);
    // } else {
    //   toast.error("You must be at least 13 years old to sign up.");
    // }
    if (
      isValid(selectedDate) &&
      isBefore(selectedDate, subYears(new Date(), 10))
    ) {
      setStep(step + 1);
    } else {
      toast.error(
        "Please enter a valid date of birth. You must be at least 10 years old.",
        {
          autoClose: 5000,
        }
      );
    }
  };
  const handleNextStep3 = (e) => {
    e.preventDefault(); // prevent form submission
    if (!password) {
      toast.error("please Create Password", {
        autoClose: 5000,
      });
      return;
    }

    setStep(step + 1);
  };
  const handlePrevious = () => {
    setStep(step - 1);
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
      {/* 1st Step  */}
      {step === 1 && (
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

            <form onSubmit={handleNext} className={styles.signup_form}>
              <div className={styles.signup_form_sec1}>
                <h2 className="yellow">Create Account</h2>
                <p>Welcome! Please enter your details.</p>
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
                <label>
                  <input
                    max={20}
                    className="input"
                    id="promo_code"
                    type="text"
                    placeholder="Referral Code / Promo Code"
                    name="promo_code"
                    value={promo_code}
                    onChange={(e) => setPromoCode(e.target.value)}
                    disabled={code ? true : false} // Disable the input field if the code has a value
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
                  // onlyCountries={["uaei","us", "ca", "gb", "pk"]}
                  onlyCountries={[
                    "ae",
                    "us",
                    "ca",
                    "gb",
                    "pk",
                    "in",
                    "bd",
                    "sa",
                  ]} // Specify the allowed countries

                  // customLabels={customCountries}
                  // disabled
                />
                {/* {!isValid && (
                  <div style={{ marginBottom: "10px", color: "red" }}>
                    Invalid phone number
                  </div>
                )} */}
              </div>
              <button type="submit" className={styles.signup_form_btn}>
                Next
              </button>
              <div className={styles.signup_form_sec5}>
                <p> Already have an account?</p>
                <Link href="login">Login</Link>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* 2nd Step  */}
      {step === 2 && (
        <div className={stylestep2.signup_step1}>
          <div className={stylestep2.signup_container}>
            <div className={stylestep2.steper_parent}>
              <div className={stylestep2.steps_box}>
                <div className={stylestep2.step1_box}>1</div>
                <div className={stylestep2.steper_dash}></div>
                <div
                  className={stylestep2.step2_box}
                  style={{ background: "#fcc100" }}
                >
                  2
                </div>
                <div className={stylestep2.steper_dash}></div>
                <div className={stylestep2.step3_box}>3</div>
              </div>
              <div className={stylestep2.steper}>
                <div></div>
                <div>Personal data</div>
                <div> </div>
              </div>
            </div>
            <div className={stylestep2.signup_sub_container}>
              <Link href="/" className={stylestep2.link}>
                <Image
                  style={{ height: "130px", width: "130px" }}
                  src={logo}
                  // loading="lazy"
                  priority={true}
                  alt="logo"
                />
              </Link>
            </div>

            <div className={stylestep2.signup_form}>
              <div className={stylestep2.signup_form_sec1}>
                <h2 className="yellow">Create Account</h2>
                <p>Welcome! Please enter your details.</p>
              </div>

              <div className={styles.signup_form_sec2}>
                <div>
                  <p style={{ color: "#C2C2C2" }}>Country</p>
                  <select
                    className={stylestep2.select}
                    value={country}
                    onChange={handleCountryChange}
                  >
                    <option value={"Select"} className={stylestep2.option}>
                      Select
                    </option>
                    {countryList.map((item) => (
                      // eslint-disable-next-line react/jsx-key
                      <option className={stylestep2.option} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <p style={{ color: "#C2C2C2" }}>City</p>

                  <select
                    className={stylestep2.select}
                    value={city}
                    onChange={handleCityChange}
                  >
                    <option value={"Select"} className={stylestep2.option}>
                      Select
                    </option>
                    {cityList.map((item) => (
                      // eslint-disable-next-line react/jsx-key
                      <option className={stylestep2.option} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {/* <div className={stylestep2.signup_form_sec3}>
                <div>
                  <p style={{ color: "#C2C2C2" }}>Date of Birth</p>

                  <input
                    className={stylestep2.date}
                    name="date"
                    type="date"
                    value={dob}
                    placeholder="dd-mm-yyyy"
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    min="1900-01-01" // Set the minimum allowed date
                    max={`${new Date().getFullYear() - 13}-12-31`} // Set the maximum allowed date (13 years ago from today)
                  />
                </div>

                <div className={stylestep2.form_group}>
                  <input
                    type="checkbox"
                    id="javascript"
                    checked={kprivate === 1}
                    onChange={handleCheckboxChange}
                  />
                  <label className={stylestep2.checkbox} for="javascript">
                    Keep it Private
                  </label>
                </div>
              </div> */}
              <div className={stylestep2.signup_form_sec3}>
                <div>
                  <p style={{ color: "#C2C2C2" }}>Date of Birth</p>
                  <div className={stylestep2.datePickerContainer}>
                    <select
                      className={stylestep2.select}
                      value={dob ? dob.split("-")[2] : ""}
                      onChange={(e) => {
                        const selectedDay = e.target.value;
                        const updatedDate = dob ? dob.split("-") : ["", "", ""];
                        updatedDate[2] = selectedDay;
                        setDateOfBirth(updatedDate.join("-"));
                      }}
                    >
                      <option className={stylestep2.option} value="" disabled>
                        Day
                      </option>
                      {Array.from({ length: 31 }, (_, index) => index + 1).map(
                        (day) => (
                          <option
                            className={stylestep2.option}
                            key={day}
                            value={day}
                          >
                            {day}
                          </option>
                        )
                      )}
                    </select>
                    <select
                      className={stylestep2.select}
                      value={dob ? dob.split("-")[1] : ""}
                      onChange={(e) => {
                        const selectedMonth = e.target.value;
                        const updatedDate = dob ? dob.split("-") : ["", "", ""];
                        updatedDate[1] = selectedMonth;
                        setDateOfBirth(updatedDate.join("-"));
                      }}
                    >
                      <option className={stylestep2.option} value="" disabled>
                        Month
                      </option>
                      {Array.from({ length: 12 }, (_, index) => index + 1).map(
                        (month) => (
                          <option
                            className={stylestep2.option}
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
                      className={stylestep2.select}
                      value={dob ? dob.split("-")[0] : ""}
                      onChange={(e) => {
                        const selectedYear = e.target.value;
                        const updatedDate = dob ? dob.split("-") : ["", "", ""];
                        updatedDate[0] = selectedYear;
                        setDateOfBirth(updatedDate.join("-"));
                      }}
                    >
                      <option className={stylestep2.option} value="" disabled>
                        Year
                      </option>
                      {Array.from(
                        { length: 100 },
                        (_, index) => new Date().getFullYear() - index
                      ).map((year) => (
                        <option
                          className={stylestep2.option}
                          key={year}
                          value={year}
                        >
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className={stylestep2.form_group}>
                  <input
                    type="checkbox"
                    id="javascript"
                    checked={kprivate === 1}
                    onChange={handleCheckboxChange}
                  />
                  <label className={stylestep2.checkbox} htmlFor="javascript">
                    Keep it Private
                  </label>
                </div>
              </div>

              <button
                onClick={handleNextStep2}
                className={stylestep2.signup_form_btn}
              >
                Next
              </button>
              <button
                onClick={handlePrevious}
                className={stylestep2.signup_form_btn2}
              >
                Back
              </button>

              <div className={stylestep2.signup_form_sec5}>
                <p style={{ marginRight: "5px" }}> Already have an account?</p>
                <Link href="signup">Login</Link>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* 3rd Step  */}
      {step === 3 && (
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
                  // loading="lazy"
                  priority={true}
                  alt="logo"
                />
              </Link>
            </div>

            <form onSubmit={handleSubmit} className={stylestep3.signup_form}>
              <div className={stylestep3.signup_form_sec1}>
                <h2 className="yellow">Create Password</h2>
              </div>

              <p>Example Password: SecureP@ss1</p>
              <div className={stylestep3.login_form_password}>
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
                  className={stylestep3.passwordvisible_styling}
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </span>
              </div>
              <div className={stylestep3.login_form_password}>
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
                  className={stylestep3.passwordvisible_styling}
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </span>
              </div>

              <div className={stylestep3.signup_form_sec3}>
                <div className={stylestep3.form_group}>
                  <input
                    type="checkbox"
                    id="javascript"
                    className={stylestep3.checkbox}
                    checked={termsconditions === 1}
                    onChange={(e) =>
                      e.target.checked === true
                        ? setTermsAndConditions(1)
                        : setTermsAndConditions(0)
                    }
                  />

                  <label className={stylestep3.checkbox} htmlFor="javascript">
                    Agree to
                    <Link href="/termsandconditions" target="_blank">
                      terms & conditions
                    </Link>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className={stylestep3.signup_form_btn}
                onClick={handleSubmit}
              >
                {isLoading ? "Loading..." : "Create Account"}
              </button>
              <button
                type="submit"
                onClick={handlePrevious}
                className={stylestep3.signup_form_btn2}
              >
                Back
              </button>
            </form>

            {/* <ToastContainer className="tost" /> */}

            {/* <ToastContainer sx={{ color: "red" }} className={stylestep3.data} /> */}
          </div>
        </div>
      )}
      {step === 4 && <Otp />}
      <ToastContainer className="tost" />
    </div>
  );
};

export default SignupStep1;
