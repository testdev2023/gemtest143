import styles from "../styles/ForgetPassword.module.css";
// import Slider from "@/src/components/slider/Slider";
import Slider from "../src/components/slider/Slider";
import ForgetPasswordStep1 from "../src/components/ForgetPasswordSteps/ForgetPasswrodStep1";

export default function ForgetPassword() {
  return (
    <div className={styles.forget_password_main}>
      <Slider />
      <ForgetPasswordStep1 />
    </div>
  );
}
