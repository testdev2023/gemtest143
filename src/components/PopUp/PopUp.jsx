import React from "react";
import styles from "../../../styles/PopUp.module.css";

const PopUp = ({ message, onClose }) => {
  return (
    <div className={styles.popup}>
      <div className={styles.popupContent}>
        <button className={styles.close_btn} onClick={onClose}>
          X
        </button>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default PopUp;
