import styles from "../styles/Signup.module.css";
// import Slider from "@/src/components/slider/Slider";
import Slider from "../src/components/slider/Slider";
import SignupStep1 from "../src/components/SignupSteps/SignupStep1";
import TopBar from "../src/components/TopBar/EntTopBar";
import Footer from "../src/components/Footer/Footer";
import ScrollToTopButton from "../src/components/ScrollToTopButton/ScrollToTopButton";

export default function Signup() {
  return (
    <div className={styles.g_parnt}>
      <div className={styles.parent}>
        {/* <Slider /> */}
        <div className={styles.signup_sub}>
        <ScrollToTopButton />
        <TopBar />
          <SignupStep1 />
          <Footer />
        </div>
      </div>
    </div>
  );
}
