import Link from "next/link";
import styles from "../../../styles/ThanksBox.module.css";
import Image from "next/image";
import logo from "../../asset/gemlogo.png";
import { useRouter } from "next/router";

export default function ThanksBox() {
  const router = useRouter();

  // setTimeout(() => {
  //   router.push("/login");
  // }, 3000);

  return (
    <div className={styles.done_main}>
      <div className={styles.done_container}>
        <div className={styles.done_sub_container}>
          {/* <h1>LOGO</h1> */}
          {/* <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p> */}
          <Link className={styles.link} href="/">
            <Image
              style={{ height: "130px", width: "130px" }}
              src={logo}
              alt="logo"
              loading="lazy"
            />
          </Link>
          <h2 className="yellow">Congratulations</h2>
          <div className={styles.done_sec1}></div>
          <div className={styles.done_sec2}>
            <p>
              Your password has been successfully reset. You can now log in
              using your new password.
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
                width: "100%",
              }}
            >
              <p>Back to</p>
              <Link href="login">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
