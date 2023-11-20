/* eslint-disable jsx-a11y/alt-text */
import Link from "next/link";
import styles from "../styles/Login.module.css";

import SliderKids from "../src/components/slider/SliderKids";
import ThanksBox from "../src/components/ThanksBox/ThanksBoxLogin";
import Slider from "../src/components/slider/Slider";

export default function Thanks() {
  // const router = useRouter();
  // setTimeout(() => {
  //   router.push("competitionentry");
  // }, 3000);
  return (
    <div className={styles.parent}>
      <div className={styles.login_main}>
        <SliderKids />
        <ThanksBox />
      </div>
    </div>
  );
}
