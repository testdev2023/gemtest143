/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import styles from "../.././../talenthunt_styles/Counter.module.css";

const counter = () => {
  const [count, setCount] = useState(9490);
  const minCount = 0;
  const maxCount = 9500;

  useEffect(() => {
    const interval = setInterval(() => {
      if (count < maxCount) {
        setCount((prevCount) => prevCount + 1);
      }
    }, 1000); // Increment every 1 second

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [count, maxCount]);
  // const decrement = () => {
  //   if (count > minCount) {
  //     setCount((prevCount) => prevCount - 1);
  //   }
  // };
  return (
    <div className={styles.half_arc}>
      <p>Total Vote Count</p>
      {/* <span>9500</span> */}
      <span>{count}</span>
      {/* <button onClick={decrement}>Decrement</button> */}
    </div>
  );
};

export default counter;
