// import React, { useRef } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import "react-phone-input-2/lib/style.css";
import { isValid, isBefore, subYears, format } from "date-fns";
import React, { useState, useEffect, useRef } from "react";
// import { baseUrl } from "@/src/config/Config";
// import { baseUrl } from "../../config/Config";
import styles from "../../../talenthunt_styles/EditProfile.module.css";
import SaveIcon from "@mui/icons-material/Save";
import { reactLocalStorage } from "reactjs-localstorage";
// import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-input-2";
import { toast, ToastContainer } from "react-toastify";

const EditProfileForm = ({
  user,
  setProfile,
  setEditProfile,
  setEditPicture,
}) => {
  const [first_name, setFirstName] = useState(user?.first_name);
  const [last_name, setLastName] = useState(user?.last_name);
  const [phone, setPhone] = useState(user?.phone);
  const phoneInputRef = useRef(null); // Create a ref for the PhoneInput component

  const [email, setEmail] = useState(user?.email);
  const [dob, setDob] = useState(user?.dob);
  const [country, setCountry] = useState(user?.country);
  const [city, setCity] = useState(user?.city);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [selectedCity, setSelectedCity] = useState("Select");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  // const isValid = phone && isValidPhoneNumber(phone.toString()); // check if phoneNumber exists
  const handleChange = (value) => {
    setPhone(value);
  };

  const handleSubmit = async (e) => {
    // if (!isValid) {
    //   alert(ji);
    // }
    if (
      phoneInputRef.current &&
      !phoneInputRef.current.isValidPhoneNumber(phone)
    ) {
      toast.error("Invalid phone number", {
        autoClose: 5000,
      });
      return;
    } else {
      e.preventDefault();

      const isValidDate = (year, month, day) => {
        const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
          2,
          "0"
        )}`;
        const selectedDate = new Date(formattedDate);

        // Check if the year, month, and day components are valid
        if (
          selectedDate.getFullYear() !== parseInt(year) ||
          selectedDate.getMonth() + 1 !== parseInt(month) ||
          selectedDate.getDate() !== parseInt(day)
        ) {
          toast.error("Invalid date selected.", {
            autoClose: 5000,
          });
          return false;
        }
        // Check if the date is a valid date (not NaN) and if it's before the current date
        if (
          !isNaN(selectedDate) &&
          isBefore(selectedDate, new Date()) &&
          isBefore(selectedDate, subYears(new Date(), 13))
        ) {
          return true; // Valid date
        } else {
          // Show a toast notification for an invalid date
          toast.error("Selected date is not valid.", {
            autoClose: 5000,
          });
          return false;
        }
      };

      if (!isValidDate(year, month, day)) {
        toast.error(
          "Please enter a valid date of birth. You must be at least 13 years old.",
          {
            autoClose: 5000,
          }
        );
        return;
      }
      const dobString = `${year}-${month}-${day}`;
      const updatedUser = {
        first_name: first_name,
        last_name: last_name,
        phone: phone,
        // dob: dob,
        dob: dobString,
        email: email,
        country: country,
        city: city,
        year: year,
        month: month,
        day: day,
      };

      await axios
        .post(
          // `${baseUrl}/api/member/update_profile`
          process.env.NEXT_PUBLIC_BASE_URL + "/api/member/update_profile",
          updatedUser,
          {
            headers: {
              Authorization:
                "Bearer " +
                reactLocalStorage.getObject("loginAuth").data?.api_token,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          setProfile(true);
          setEditProfile(false);
          setEditPicture(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

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
        setCityList(response.data);
      })
      .catch((error) => {
        // handle any errors here
        console.error(error);
      });
  }, [country]);
  useEffect(() => {
    // ... your existing code to fetch country and city data

    if (user?.dob) {
      const dobDate = new Date(user.dob);
      setYear(dobDate.getFullYear().toString());
      setMonth((dobDate.getMonth() + 1).toString());
      setDay(dobDate.getDate().toString());
    }
  }, []);
  return (
    <div className={styles.edit_profile_main_parent}>
      <ToastContainer className="tost" />

      <form onSubmit={handleSubmit}>
        <div className={styles.edit_profile_main}>
          <div className={styles.edit_profile_main_sub}>
            <h3 className="yellow">Edit Profile</h3>
            {/* <button type="submit">
              <SaveIcon />
              Save
            </button> */}
          </div>

          <div className={styles.edit_form_sec1}>
            <div>
              <label>
                First Name:
                <input
                  type="text"
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <label>
                Last Name:
                <input
                  type="text"
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
            </div>
          </div>
          <div className={styles.edit_form_sec2}>
            <label>Email:</label>
            <p>{email}</p>

            <label> Phone number</label>

            {/* <PhoneInput
              placeholder={"Enter phone number"}
              withCountryCallingCode
              country="us"
              onChange={handleChange}
              className={styles.p_number}
              value={phone}
              minLength={10} // Minimum length of phone number (including country code)
              maxLength={15} // Maximum length of phone number (including country code)
              // onlyCountries={["us", "ca", "gb", "pk"]}
              onlyCountries={["ae", "us", "ca", "gb", "pk", "in", "bd", "sa"]} // Specify the allowed countries
            /> */}
            <PhoneInput
              type="text"
              placeholder="Enter phone number"
              className={styles.p_number}
              value={phone}
              disabled
            />
          </div>

          <div className={styles.edit_form_sec3}>
            <div>
              <p>Country</p>
              <select
                className={styles.select}
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option selected className={styles.option}>
                  {country}
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
                onChange={(e) => setCity(e.target.value)}
              >
                <option className={styles.option}>{city}</option>
                {cityList.map((item) => (
                  // eslint-disable-next-line react/jsx-key
                  <option className={styles.option} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.edit_form_sec4}>
            {/* <div>
              <label >
                Date of Birth:
                <input
                  className={styles.date}
                  type="date"
                  value={dob}
                  onChange={(e) => {
                    setDob(e.target.value);
                    const dateObj = new Date(e.target.value);
                    setYear(dateObj.getFullYear());
                    setMonth(dateObj.getMonth() + 1); // Add 1 to get month in 1-12 format
                    setDay(dateObj.getDate());
                  }}
                />
              </label>
            </div> */}
            <div>
              <label>Date of Birth:</label>
              <div className={styles.dob_selectors}>
                <select
                  className={styles.select}
                  // className={styles.dob_select}
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                >
                  <option className={styles.option} value="">
                    Day
                  </option>
                  {/* Generate day options */}
                  {Array.from({ length: 31 }, (_, i) => (
                    <option className={styles.option} key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <select
                  className={styles.select}
                  // className={styles.dob_select}
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                >
                  <option className={styles.option} value="">
                    Month
                  </option>
                  {/* Generate month options */}
                  {Array.from({ length: 12 }, (_, i) => {
                    const monthIndex = i + 1;
                    const monthName = new Date(
                      0,
                      monthIndex - 1
                    ).toLocaleString("default", { month: "short" });
                    return (
                      <option
                        className={styles.option}
                        key={monthIndex}
                        value={monthIndex}
                      >
                        {monthName}
                      </option>
                    );
                  })}
                </select>
                <select
                  className={styles.select}
                  // className={styles.dob_select}
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                >
                  <option className={styles.option} value="">
                    Year
                  </option>
                  {/* Generate year options */}
                  {Array.from({ length: 100 }, (_, i) => (
                    <option
                      className={styles.option}
                      key={2023 - i}
                      value={2023 - i}
                    >
                      {2023 - i}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className={styles.center_button}>
            <button type="submit">
              <SaveIcon />
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;
