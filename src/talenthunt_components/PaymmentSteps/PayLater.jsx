import styles from "../../../talenthunt_styles/PayLater.module.css";

export default function PayLater() {
  return (
    <div className={styles.payment_main}>
      <div className={styles.select_payment}>
        <div className={styles.payment_sec1}>
          <h1>Pay Later</h1>

          <div className={styles.payment_sec1_sub1}>
            <p>Describe</p>
            <p>
              Tell your story in a way that’s clear, concise, and creative.
              Check our Guidelines for proven tips from other campaigns that
              have crowdfunded on ENT!
            </p>
            <form className={styles.from}>
              <textarea name="" id="" cols="30" rows="10"></textarea>
            </form>
            <p>500 Words Maximum</p>
          </div>
        </div>
      </div>
    </div>
  );
}
