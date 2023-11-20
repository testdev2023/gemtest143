import { useEffect, useState } from "react";
import styles from "../../../talenthunt_styles/OnlinePayment.module.css";
import { paymob } from "paymob";
// import { Api } from "@/src/config/Config";
import { Api } from "../../config/Config";
import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import React from "react";
import { Button } from "antd";
import Image from "next/image";
import visa from "../../asset/cash/visa_icon.png";
import easy from "../../asset/cash/easypaisa_icon.png";
import jazz from "../../asset/cash/jazzcash_icon.png";

export default function OnlinePayment({ projectDetails }) {
  const [paymentData, setPaymentData] = useState({
    amount_cents: 100, // Replace with the actual amount that you want to charge
    currency: "USD", // Replace with the currency that you want to charge in
    card_number: "",
    card_holder_name: "",
    expiry_month: "",
    expiry_year: "",
    cvv: "",
  });

  const [paymentToken, setPaymentToken] = useState();
  const competetionData = {
    name: projectDetails.competetion_title,
    amount_cents: 200 * 100,
    description: projectDetails.competetion_brief,
    quantity: "1",
  };
  console.log(projectDetails.user_competetion_id);
  console.log(projectDetails);

  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUser(reactLocalStorage?.getObject("loginAuth")?.data);
    }
  }, []);

  console.log(currentUser);
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
  };

  const [selectedMethod, setSelectedMethod] = React.useState(false);
  const [card, setCard] = React.useState(false);
  const [jazzCash, setJazzCash] = React.useState(false);
  const [EasyPaisa, setEasyPaisa] = React.useState(false);

  const handlePayment = () => {
    axios
      .post("https://pakistan.paymob.com/api/auth/tokens", {
        api_key:
          "ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2T0RJeE9URXNJbTVoYldVaU9pSXhOamc0TXpreU1qazJMak00TXpVNEluMC5kcUJYQnJKLU14UUpZaEU2QzNwa2Y5SEdtbXRyNlBUcl9zZzB1eWNzMy1MYU9VRFdJRERVVlVob2ZWS05xa3huNE5iUE1HWGJoRmhhcFRWX25FaHpKUQ==",
      })
      .then(function (response) {
        const TOKEN = response.data.token;
        console.log(TOKEN, "chrcking tim");
        axios
          .post("https://pakistan.paymob.com/api/ecommerce/orders", {
            auth_token: response.data.token,
            delivery_needed: true,
            amount_cents: 10 * 100,
            currency: "PKR",
            merchant_order_id: "00831-" + projectDetails.user_competetion_id,

            items: [competetionData],
            shipping_data: {},
            shipping_details: {},
          })
          .then(function (response) {
            axios
              .post("https://pakistan.paymob.com/api/acceptance/payment_keys", {
                auth_token: TOKEN,
                amount_cents: 122222,
                expiration: 3600,
                order_id: response.data.id,
                billing_data: {
                  email: currentUser?.email,
                  first_name: currentUser?.first_name,
                  street: "NA",
                  building: "NA",
                  phone_number: "09786756564",
                  shipping_method: "NA",
                  postal_code: "NA",
                  city: "NA",
                  country: "NA",
                  last_name: currentUser?.last_name,
                  state: "NA",
                  floor: "NA",
                  apartment: "NA",
                },
                currency: "PKR",
                integration_id: card ? "86016" : jazzCash ? "86563" : "86562",
                lock_order_when_paid: false,
              })
              .then(function (response) {
                setPaymentToken(response.data.token);
              })
              .catch(function (error) {
                console.error(error);
              });
          })
          .catch(function (error) {
            console.error(error);
          });
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    if (selectedMethod) {
      handlePayment();
    }
  }, [selectedMethod]);
  return (
    <div className={styles.payment_main}>
      <div className={styles.select_payment}>
        <div className={styles.payment_sec1}>
          <h1>Online Payment</h1>
          {/* <p>Upload Payment Slip</p> */}

          <div className={styles.payment_sec1_sub1}>
            {/* <button onClick={(e) => handleSumbit(e)}>Pay From Card</button>

            {paymentToken && (
              // eslint-disable-next-line react/jsx-no-target-blank
              <a
                href={`https://pakistan.paymob.com/api/acceptance/iframes/108012?payment_token=${paymentToken}`}
                target="_blank"
              >
                Show Card
              </a>
            )} */}

            {selectedMethod === false && (
              <div className={styles.btn_div}>
                <div>
                  <Button
                    className={styles.btn_Book_Now}
                    variant="outlined"
                    onClick={() => {
                      setSelectedMethod(true);
                      setCard(true);
                      setEasyPaisa(false);
                      setJazzCash(false);
                    }}
                  >
                    {/* Pay Via Card */}
                    <Image src={visa} loading="lazy" alt="visa" />
                  </Button>
                </div>
                <div>
                  <Button
                    className={styles.btn_Book_Now}
                    variant="outlined"
                    onClick={() => {
                      setSelectedMethod(true);
                      setEasyPaisa(true);
                      setJazzCash(false);
                      setCard(false);
                    }}
                  >
                    <Image src={easy} loading="lazy" alt="easy_logo" />
                    {/* Pay Via Easy Paisa */}
                  </Button>
                </div>
                <div>
                  <Button
                    className={styles.btn_Book_Now}
                    variant="outlined"
                    onClick={() => {
                      setSelectedMethod(true);
                      setJazzCash(true);
                      setCard(false);
                      setEasyPaisa(false);
                    }}
                  >
                    <Image src={jazz} loading="lazy" alt="jazz_logo" />
                    {/* Pay Via Jazz Cash */}
                  </Button>
                </div>
              </div>
            )}

            {selectedMethod === true && (
              <div className={styles.btn_div}>
                <div>
                  <Button
                    className={styles.btn_Book_Now}
                    variant="outlined"
                    onClick={() => {
                      setSelectedMethod(false);
                    }}
                  >
                    Change Payment Method
                  </Button>
                </div>
                {/* <div>
                  <Button
                    className={styles.btn_Book_Now}
                    variant="outlined"
                    onClick={handlePayment}
                  >
                    Book Now
                  </Button>
                </div> */}
              </div>
            )}

            {paymentToken && jazzCash ? (
              <>
                <div>
                  <a
                    href={`https://pakistan.paymob.com/iframe/${paymentToken}`}
                    variant="outlined"
                  >
                    Pay Via Jazzcash
                  </a>
                </div>
              </>
            ) : null}
            {paymentToken && EasyPaisa ? (
              <>
                <div>
                  <a
                    href={`https://pakistan.paymob.com/iframe/${paymentToken}`}
                    className={styles.btn_Book_Now}
                    variant="outlined"
                  >
                    Pay Via EasyPaisa
                  </a>
                </div>
              </>
            ) : null}
            {paymentToken && card ? (
              <>
                <div>
                  <a
                    href={`https://pakistan.paymob.com/api/acceptance/iframes/108012?payment_token=${paymentToken}`}
                    className={styles.btn_Book_Now}
                    variant="outlined"
                  >
                    Pay Via Card
                  </a>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
