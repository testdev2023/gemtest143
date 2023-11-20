import { useState, useEffect } from "react";
import styles from "../../../styles/ScrollToTopButton.module.css";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsVisible(window.pageYOffset > 20);
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleButtonClick() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <button
      className={styles.myBtn}
      onClick={handleButtonClick}
      style={{ display: isVisible ? "block" : "none" }}
      title="Go to top"
    >
      <ArrowUpwardIcon />
    </button>
  );
}
