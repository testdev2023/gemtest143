import React from "react";
import { useState } from "react";
import styles from "../../../styles/ProfileCard.module.css";
import { useEffect } from "react";

const Button = ({ text, onClick, link, isButtonDisabled }) => {
  console.log(isButtonDisabled, "disa");
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    if (link) {
      try {
        navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 3000);
      } catch (error) {
        console.error("Unable to copy to clipboard:", error);
      }
    } else {
      console.error("No link provided for copying.");
    }

    if (onClick) {
      onClick();
    }
  };
  useEffect(() => {
    if (link) {
      handleClick();
    }
  }, [link]);

  return (
    <div>
      {/* <button onClick={handleClick}> */}

      <button
        onClick={handleClick}
        disabled={isButtonDisabled}
        className={isButtonDisabled ? styles.disabledButton : ""}
      >
        {text}
      </button>
      {/* {copied && <div className={styles.message}>Link copied!</div>} */}
      {/* Render the message component */}
    </div>
  );
};

export default Button;
