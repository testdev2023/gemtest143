import styles from "../styles/ForgetPassword.module.css";
// import Slider from "@/src/components/slider/Slider";
import Slider from "../src/components/slider/Slider";

import { useState } from "react";
import ThanksBox from "../src/components/ThanksBox/ThanksBox";
import ForgetPasswordStep1 from "../src/components/ForgetPasswordSteps/ForgetPasswrodStep1";
import ForgetPasswordStep2 from "../src/components/ForgetPasswordSteps/ForgetPasswrodStep2";
// import OtpForget from "@/src/components/OTP/OtpForget";
import OtpForget from "../src/components/OTP/OtpForget";

export default function ForgetPassword() {
  const [forget, setForget] = useState();
  const [userId, setUserId] = useState();
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(null);
  const [step3, setStep3] = useState(null);
  const [step4, setStep4] = useState(null);
  const [step1Value, setStep1Value] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  return (
    <div className={styles.forget_password_main}>
      <Slider />

      {!step1 || (
        <ForgetPasswordStep1
          setStep1={setStep1}
          setStep2={setStep2}
          setEmail={setEmail}
          setForget={setForget}
          userId={userId}
          forget={forget}
          setUserId={setUserId}
        />
      )}

      {!step2 || (
        <OtpForget
          setStep2={setStep2}
          setStep3={setStep3}
          setUserId={setUserId}
          userId={userId}
          forget={forget}
          setForget={setForget}
        />
      )}

      {!step3 || (
        <ForgetPasswordStep2
          setStep3={setStep3}
          setStep4={setStep4}
          forget={forget}
          setForget={setForget}
          setPassword={setPassword}
          userId={userId}
          setUserId={setUserId}
        />
      )}
      {!step4 || <ThanksBox setStep4={setStep4} />}
    </div>
  );
}
