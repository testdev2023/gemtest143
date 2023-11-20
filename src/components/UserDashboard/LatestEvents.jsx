/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import styles from "../../../styles/ProfileCard.module.css";
import Image from "next/image";
import axios from "axios";
import Loder from "../Loder";
import localStorage from "local-storage";
import { useRouter } from "next/router";
// import { toast } from "react-toastify";
import { toast, ToastContainer } from "react-toastify";

// import { baseUrl } from "../../config/Config";
export default function LatestEvents() {
  const router = useRouter();
  const [events, setEvents] = useState();
  const [loder, setLoder] = useState(false);
  const [eventsLoader, setEventsLoader] = useState(false);
  const [loderResponse, setLoderResponse] = useState(true);
  const GetEventsUserDashboard = async () => {
    try {
      await axios
        .get(
          // `${baseUrl}/api/events`
          process.env.NEXT_PUBLIC_BASE_URL + "/api/events"
        )
        .then((response) => {
          const lastSixElements = response.data.response.data.slice(0, 3);
          setEvents(lastSixElements);
          setEventsLoader(true);
          setLoderResponse(false);
        })

        .catch((error) => {
          // alert(error);
          toast.error(error, {
            autoClose: 5000,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetEventsUserDashboard();
  }, []);

  return (
    <>
      {!loder || <Loder />}
      {/* {!loderResponse || <Loder />} */}
      {eventsLoader ? (
        <div className={styles.latest_offer_parent}>
          <h3>Latest Events</h3>
          {events?.map((cardData, index) => (
            <div
              key={index}
              className={styles.flex1}
              onClick={() => {
                setLoder(true);
                // localStorage.set("eventsSlug", cardData?.slug);
                router.push({
                  pathname: "/eventsdetails",
                  query: { slug: cardData?.slug },
                });
              }}
            >
              {/* <Image src={img} /> */}
              <Image
                width={10000}
                height={10000}
                className=""
                src={cardData?.thumbURL}
                loading="lazy"
                alt={cardData?.title}
              />
              {/* <p>Gillian Anderson asks women to send her their sexual fantasies</p> */}
              <p className="">{cardData?.title}</p>
            </div>
          ))}

          {/* <div className={styles.flex1}>
        <Image src={img} />
        <p>Gillian Anderson asks women to send her their sexual fantasies</p>
      </div>
      <div className={styles.flex1}>
        <Image src={img} />
        <p>Gillian Anderson asks women to send her their sexual fantasies</p>
      </div> */}
        </div>
      ) : (
        ""
      )}
      <ToastContainer className="tost" />
    </>
  );
}
