import styles from "../styles/Signup.module.css";
// import Slider from "@/src/components/slider/Slider";
import Slider from "../src/components/slider/Slider";
import SignupStep1 from "../src/components/SignupSteps/SignupStep1";

export default function Signup() {
  return (
    <div className={styles.g_parnt}>
      <div className={styles.parent}>
        <Slider />
        <div className={styles.signup_sub}>
          <SignupStep1 />
        </div>
      </div>
    </div>
  );
}
