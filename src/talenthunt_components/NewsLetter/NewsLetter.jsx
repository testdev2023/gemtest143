import axios from "axios";
import { useState } from "react";
import styles from "../../../talenthunt_styles/NewsLetter.module.css";
import { toast, ToastContainer } from "react-toastify";

export default function NewsLetter() {
  const [email, setEmail] = useState("");

  const HandleEmail = () => {
    if (!email) {
      toast.error("Please enter your email before subscribing.");
      return; // Exit the function if email is empty
    }
    axios
      .post(
        // `${baseUrl}/api/subscribers`
        process.env.NEXT_PUBLIC_BASE_URL + "/api/subscribers",
        { email: email }
      )
      .then((response) => {
        toast.success(
          "Newletter Subscription for " + email + " has been Activated",
          {
            autoClose: 5000,
          }
        );
        // alert("Newletter Subscription for " + email + " has been Activated");
      })
      .catch((error) => {
        toast.error(
          "Newletter Subscription for " + email + " Already Activated",
          {
            autoClose: 5000,
          }
        );
        // console.error(error);
        // alert(error.message);
      });
  };
  return (
    <>
      <div className={styles.news_letter_main}>
        <div className={styles.news_letter_sub}>
          <h4>Subscribe to our newsletter</h4>
          <div className={styles.flex}>
            <input
              required
              placeholder="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={HandleEmail} type="submit">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
