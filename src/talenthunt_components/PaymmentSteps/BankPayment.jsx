import styles from "../../../talenthunt_styles/BankPayment.module.css";
import ImgCrop from "antd-img-crop";
import { Upload, message } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function BankPayment({ paymentBank, setPaymentBank, onSubmit }) {
  const router = useRouter();
  const [fileList, setFileList] = useState([]);
  const handleBankName = (e) => {
    setPaymentBank({ ...paymentBank, bank_name: e.target.value });
  };
  const handleDeleteFile = (file) => {
    const updatedFileList = fileList.filter((f) => f.uid !== file.uid);
    setFileList(updatedFileList);
    setPaymentBank({
      ...paymentBank,
      payment_slip: null, // Remove the deleted file from payment_slip
    });
  };

  const handleBankSlip = async ({ fileList: newFileList }) => {
    // Filter out non-image files before updating fileList state
    const imageFiles = newFileList.filter((file) =>
      file.type.includes("image/")
    );

    if (imageFiles.length > 0) {
      setFileList(imageFiles);
      setPaymentBank({
        ...paymentBank,
        payment_slip: imageFiles[0]?.originFileObj,
      });
    } else {
      // Check if there are no valid image files, including the case when files were deleted
      if (newFileList.length === 0) {
        // Display the error message using toast.error
        toast.error(
          "Please upload a valid image file (jpeg, png, jpg, gif, svg).",
          {
            autoClose: 5000,
          }
        );
      }
    }
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  // const handleSubmit = () => {
  //   onSubmit(); // Call the onSubmit function from the parent component
  // };
  const handleSubmit = async () => {
    try {
      // Perform any additional client-side validation before submitting
      if (!paymentBank.bank_name || !paymentBank.payment_slip) {
        toast.error("Please fill in all required fields.", {
          autoClose: 5000,
        });

        return;
      }

      // Call the onSubmit function from the parent component
      await onSubmit();

      // You can handle the submission success here if needed
      // message.success("Payment submitted successfully!");
      toast.success("Payment submitted successfully!", {
        autoClose: 5000,
      });

      router.push("/competitionentry");
    } catch (error) {
      // Handle any errors that occurred during the submission
      console.error("Error submitting payment:", error);
      // message.error("An error occurred while submitting the payment.");
      // alert(error);
      toast.error("An error occurred while submitting the payment.", {
        autoClose: 5000,
      });
    }
  };
  return (
    <div className={styles.payment_main}>
      <ToastContainer className="tost" />
      <div className={styles.select_payment}>
        <div className={styles.payment_sec1}>
          <h1>Bank Payment / Institute</h1>
          <p>Upload Payment Slip</p>
          <div className={styles.input_div}>
            <input
              type="text"
              placeholder="Bank / Institue Name"
              onChange={handleBankName}
            />
          </div>

          <div className={styles.payment_sec1_sub1}>
            <p>Upload Slip</p>

            {/* <ImgCrop
              // rotate
              rotationSlider
            > */}
            <Upload
              className={styles.span}
              listType="picture-card"
              fileList={fileList}
              onChange={handleBankSlip}
              onPreview={onPreview}
              onRemove={handleDeleteFile}
            >
              {fileList.length < 1 && "+ Upload"}
            </Upload>
            {/* </ImgCrop> */}
          </div>
        </div>
        <div className={styles.payment_sec1_sub2}>
          <button className={styles.submit_button} onClick={handleSubmit}>
            Submit Payment
          </button>
        </div>
      </div>
    </div>
  );
}
