/* eslint-disable @next/next/no-img-element */
import styles from "../../../styles/AddBaner.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
// import { baseUrl } from "@/src/config/Config";
// import { baseUrl } from "../../../src/config/Config";
import Link from "next/link";
import Image from "next/image";
import Loder from "../Loder";

export default function AddBaner({ page }) {
  const [ad, setAd] = useState();
  const [devUrl, setDevUrl] = useState();

  const [adLoader, setAdLoader] = useState(false);
  const [loder, setLoder] = useState(true);

  const GetAd = async () => {
    try {
      await axios
        .get(
          // `${baseUrl}/api/advertisements?page=${encodeURIComponent(page)}`
          process.env.NEXT_PUBLIC_BASE_URL +
            "/api/advertisements?page=" +
            encodeURIComponent(page)
        )
        .then((response) => {
          setAd(response?.data?.advertisements[0]);
          // console.log("check url", response?.data.base_url);
          setDevUrl(response?.data.base_url);
          setAdLoader(true);
          setLoder(false);
          // console.log(response?.data?.advertisements[0]);
        })
        .catch((error) => {
          // alert(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetAd();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!loder || <Loder />}
      {adLoader ? (
        <>
          {ad && (
            <Link
              href={ad?.url}
              target="_blank"
              className={styles.add_baner_main}
            >
              <Image
                src={`${devUrl}/${ad?.banner}`}
                alt={ad?.title}
                loading="lazy"
                height={2000}
                width={2000}
              />
            </Link>
          )}
        </>
      ) : (
        ""
      )}
    </>
  );
}
