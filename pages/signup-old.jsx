import styles from "../styles/Signup.module.css";
// import Slider from "@/src/components/slider/Slider";
import Slider from "../src/components/slider/Slider";
import SignupStep1 from "../src/components/SignupSteps/SignupStep1";
import SignupStep2 from "../src/components/SignupSteps/SignupStep2";
import SignupStep3 from "../src/components/SignupSteps/SignupStep3";
import Otp from "../src/components/OTP/Otp";
import { useState } from "react";

export default function Signup() {
  const [signup, setSignup] = useState();
  const [userId, setUserId] = useState();
  const [back, setBack] = useState();
  // const router = useRouter();
  // const LoginSchema = Yup.object().shape({
  //   email: Yup.string()
  //     .email("Must be a valid email*")
  //     .required("Email Address is required"),
  //   name: Yup.string().required("Name Address is required"),
  //   password: Yup.string()
  //     .required("Password is required*")
  //     .min(6, "Password must be at least 6 character*")
  //     .max(40, "Password must not exceed 40 characters*"),
  // });
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(null);
  const [step3, setStep3] = useState(null);
  const [step4, setStep4] = useState(null);

  const [step1Value, setStep1Value] = useState();

  const [password, setPassword] = useState();

  return (
    <div className={styles.parent}>
      <Slider />
      <div className={styles.signup_sub}>
        {!step1 || (
          <SignupStep1
            setStep1={setStep1}
            setStep2={setStep2}
            setStep1Value={setStep1Value}
            setSignup={setSignup}
            signup={signup}
          />
        )}

        {!step2 || (
          <SignupStep2
            setStep1={setStep1}
            setStep2={setStep2}
            setStep3={setStep3}
            setSignup={setSignup}
            signup={signup}
          />
        )}

        {!step3 || (
          <SignupStep3
            setStep2={setStep2}
            setStep3={setStep3}
            setStep4={setStep4}
            setPassword={setPassword}
            setSignup={setSignup}
            signup={signup}
            setUserId={setUserId}
          />
        )}

        {!step4 || <Otp setUserId={setUserId} userId={userId} />}
      </div>
    </div>
  );
}
