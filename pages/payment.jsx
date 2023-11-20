import styles from "../talenthunt_styles/Payment.module.css";
import TopBar from "../src/components/TopBar/EntTopBar";
import Footer from "../src/components/Footer/Footer";
import BankPayment from "../src/talenthunt_components/PaymmentSteps/BankPayment";
import OnlinePayment from "../src/talenthunt_components/PaymmentSteps/OnlinePayment";
import ScrollToTopButton from "../src/components/ScrollToTopButton/ScrollToTopButton";
import localStorage from "local-storage";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import InnerBaner from "../src/components/Baner/innerBaner";
import Loder from "../src/components/Loder";
import FreeofCost from "../src/talenthunt_components/PaymmentSteps/FreeofCost";
// import { toast } from "react-toastify";
import { toast, ToastContainer } from "react-toastify";

export default function Payment() {
  const [banner, setBanner] = useState();
  const [bannerLoader, setBannerLoader] = useState(false);
  const [loder, setLoder] = useState(true);

  const router = useRouter();
  const {
    user_competetion_id,
    competetion_id,
    competetion_category,
    competetion_title,
    competetion_brief,
    competetion_cover_image,
    competetion_files,
    competetion_fees,
  } = router.query;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [paymentBank, setPaymentBank] = useState({
    user_competition_id: user_competetion_id,
    payment_type: "",
    amount: competetion_fees,
    bank_name: "",
    payment_slip: null,
  });

  const handlePaymentType = (e) => {
    setPaymentBank({ ...paymentBank, payment_type: e.target.value });
  };

  const onSubmit = async () => {
    const userToken = localStorage.get("loginAuth")?.data?.api_token;

    if (paymentBank.payment_type === "bank") {
      try {
        const res = await axios.post(
          process.env.NEXT_PUBLIC_BASE_URL +
            // "/api/member/user-competition/payment-store",
            "/api/member/user-competition/copy-payment-store",

          paymentBank,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
              "Content-Type": "multipart/form-data", // Set the content type as multipart/form-data for file uploads
            },
          }
        );

        // Handle the response or perform any necessary actions after successful submission
        console.log("Payment submitted successfully:", res.data);

        // Assuming you want to close the modal after submission, you can call handleClose()
        handleClose();
      } catch (error) {
        // Handle any errors that occurred during the submission
        console.error("Error submitting payment:", error);
      }
    }
  };

  const GetBanner = async () => {
    try {
      await axios
        .get(
          // `${baseUrl}/api/banners?s[page]=talenthunt/submit now&s[type]=Landing`
          process.env.NEXT_PUBLIC_BASE_URL +
            "/api/banners?s[page]=Payments&s[type]=Landing"
        )

        .then((response) => {
          setBanner(response?.data?.response?.data[0]);
          setBannerLoader(true);
          setLoder(false);
        })
        .catch((error) => {
          toast.error(error, { autoClose: 5000 });
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetBanner();
  });

  useEffect(() => {
    setPaymentBank((prevState) => ({
      ...prevState,
      user_competition_id: router.query.user_competetion_id,
      amount: router.query.competetion_fees,
    }));
  }, [router.query]);
  return (
    <div className={styles.payment_main}>
      {!loder || <Loder />}

      <ScrollToTopButton />
      <TopBar />
      {bannerLoader ? (
        <InnerBaner
          source={
            banner?.file_type == "image" ? banner?.imageURL : banner?.videoURL
          }
          fileType={banner?.file_type}
          headingBanner={banner?.title}
        />
      ) : (
        ""
      )}

      <div className={styles.select_payment}>
        <div className={styles.select_payment_heading}>
          {/* <div className={styles.dashline}></div> */}
          <h2 className="yellow">Payment</h2>
        </div>

        <div className={styles.payment_sec1}>
          <div className={styles.payment_sec1_sub0}>
            {/* <h3>Prize of Submission</h3> */}
            <h3>Submission Fee</h3>

            {/* payment should be dynamic */}
            {/* <h3 className={styles.price}>$ {competetion_fees}</h3> */}
            <h3 className={styles.price}> {competetion_fees}</h3>
          </div>

          <p>Select Payment Type</p>
          <div className={styles.payment_sec1_sub1}>
            <select
              className={styles.select}
              name="countary"
              id=""
              onChange={(e) => handlePaymentType(e)}
            >
              <option className={styles.option} value="">
                select
              </option>
              <option className={styles.option} value="bank">
                Free
              </option>
              {/* <option className={styles.option} value="bank">
                Bank Payment
              </option> */}
              {/* <option className={styles.option} value="online">
                Online Payment
              </option> */}
            </select>
          </div>
        </div>
      </div>
      {paymentBank.payment_type === "bank" && (
        <FreeofCost
          paymentBank={paymentBank}
          setPaymentBank={setPaymentBank}
          onSubmit={onSubmit} // Pass the onSubmit function as a prop
          projectDetails={router.query}
        />
      )}
      {/* {paymentBank.payment_type === "bank" && (
        <BankPayment
          paymentBank={paymentBank}
          setPaymentBank={setPaymentBank}
          onSubmit={onSubmit} // Pass the onSubmit function as a prop
          projectDetails={router.query}
        />
      )} */}
      {/* {paymentBank.payment_type === "online" && (
        <OnlinePayment projectDetails={router.query} />
      )} */}
      <ToastContainer className="tost" />

      <Footer />
    </div>
  );
}
