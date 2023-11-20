import styles from "../styles/Signup.module.css";
import SliderKids from "../src/components/slider/SliderKids";
import GemKidsSignup from "../src/components/SignupSteps/GemKidsSignup";

const gemkids = () => {
  return (
    <div className={styles.g_parnt}>
      <div className={styles.parent}>
        <SliderKids />
        <div className={styles.Mobile_image}></div>

        <div className={styles.signup_sub}>
          <GemKidsSignup />
        </div>
      </div>
    </div>
  );
};

export default gemkids;
