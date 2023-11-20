import styles from "../styles/Signup.module.css";
import SliderKids from "../src/components/slider/SliderKids";
import CompleteProfile from "../src/components/SignupSteps/CompeleteProfileFacebook";

const completeprofile = () => {
  return (
    <div className={styles.g_parnt}>
      <div className={styles.parent}>
        <SliderKids />
        <div className={styles.Mobile_image}></div>

        <div className={styles.signup_sub}>
          <CompleteProfile />
        </div>
      </div>
    </div>
  );
};

export default completeprofile;
