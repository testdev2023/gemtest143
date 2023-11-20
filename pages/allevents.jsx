// /* eslint-disable jsx-a11y/alt-text */
// /* eslint-disable @next/next/no-img-element */
// import styles from "../talenthunt_styles/TalentBord.module.css";
// import TopBar from "../src/components/TopBar/EntTopBar";
// import Image from "next/image";
// import Link from "next/link";
// import Footer from "../src/components/Footer/Footer";
// import AccessibilityIcon from "@mui/icons-material/Accessibility";
// // import NewsLetter from "@/src/talenthunt_components/NewsLetter/NewsLetter";
// import NewsLetter from "../src/talenthunt_components/NewsLetter/NewsLetter";
// import ScrollToTopButton from "../src/components/ScrollToTopButton/ScrollToTopButton";

// // import cardimg1 from "../src/asset/cardimg1.png";
// // import cardimg2 from "../src/asset/cardimg2.png";
// // import cardimg3 from "../src/asset/cardimg3.png";
// import cardimg1 from "../src/asset/events/01.png";
// import cardimg2 from "../src/asset/events/02.png";
// import cardimg3 from "../src/asset/events/03.png";
// import cardimg4 from "../src/asset/events/04.png";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import localStorage from "local-storage";
// import moment from "moment/moment";
// // import CircularProgress from "@mui/material/CircularProgress";
// import { CircularProgress } from "@mui/material";

// import Box from "@mui/material/Box";
// import { Key } from "@mui/icons-material";
// import { Pagination } from "antd";
// // import { baseUrl } from "../src/config/Config";
// import Loder from "../src/components/Loder";

// const cardData = [
//   {
//     id: "1",
//     title: "2022 Austin Trail of Lights",
//     category: "Dance",
//     date: "Mar,08,2023",
//     day: "Monday",
//     image: cardimg1,
//   },
//   {
//     id: "2",
//     title: "2022 Austin Trail of Lights",
//     category: "Music",
//     date: "Mar,08,2023",
//     day: "Monday",
//     image: cardimg2,
//   },
//   {
//     id: "3",
//     title: "2022 Austin Trail of Lights",
//     category: "Darama",
//     date: "Mar,08,2023",
//     day: "Monday",
//     image: cardimg3,
//   },
//   {
//     id: "4",
//     title: "2022 Austin Trail of Lights",
//     category: "Dance",
//     date: "Mar,08,2023",
//     day: "Monday",
//     image: cardimg4,
//   },
// ];

// export default function Events() {
//   const router = useRouter();
//   const [events, setEvents] = useState();
//   const [currentPage, setCurrentPage] = useState(1);
//   const [perPage, setPerPage] = useState(16);
//   const [total, setTotal] = useState(0);
//   const [eventCategoreis, setEventCategories] = useState();
//   const [cEvents, setCEvents] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [loadingDiv, setLoadingDiv] = useState();
//   const [banner, setBanner] = useState();
//   const [allEventsLoader, setAllEventLoader] = useState(false);
//   const [loder, setLoder] = useState(true);

//   const GetBanner = async () => {
//     try {
//       await axios
//         .get(
//           // `${baseUrl}/api/banners?s[page]=Events&s[type]=Landing`

//           process.env.NEXT_PUBLIC_BASE_URL +
//             "/api/banners?s[page]=Events&s[type]=Landing"
//         )
//         .then((response) => {
//           setBanner(response?.data?.response?.data[0]);
//         })
//         .catch((error) => {
//           alert(error);
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const GetEvents = async () => {
//     try {
//       await axios
//         .get(
//           // `${baseUrl}/api/events?category_id=${localStorage.get(
//           //   "allEventsCategory"
//           // )}&page=${currentPage}`

//           process.env.NEXT_PUBLIC_BASE_URL +
//             "/api/events?category_id=" +
//             localStorage.get("allEventsCategory") +
//             "&page=" +
//             currentPage
//         )
//         .then((response) => {
//           setEvents(response.data.response.data);
//           setPerPage(response.data.response.per_page);
//           setTotal(response.data.response.total);
//           setAllEventLoader(true);
//           setLoder(false);
//         })
//         .catch((error) => {
//           alert(error);
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     GetBanner();
//     GetEvents();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [currentPage]);

//   function handlePageChange(pageNumber) {
//     localStorage.set("EventCurrentPage", pageNumber);
//   }

//   useEffect(() => {
//     const storedPage = localStorage.get("EventCurrentPage");
//     if (storedPage) {
//       setCurrentPage(parseInt(storedPage));
//     }
//   }, []);

//   const timeDate = (timeDate) => moment(timeDate).format("MMM DD, YYYY");

//   return (
//     <div className={styles.talent_bord_main}>
//       <ScrollToTopButton />
//       <TopBar />
//       {!loder || <Loder />}
//       <div
//         style={{
//           width: "100%",
//           maxWidth: "100vw",
//           height: "650px",
//           maxHeight: "100vh",
//           backgroundImage: `url(${banner?.imageURL})`,
//           backgroundPosition: "center",
//           backgroundSize: "cover",
//           backgroundRepeat: "no-repeat",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           marginBottom: "50px",
//         }}
//       >
//         <h1>{banner?.title}</h1>
//       </div>
//       {allEventsLoader ? (
//         <div className={styles.latest_project_sec3}>
//           {events?.map((cardData, index) => (
//             <div
//               key={index}
//               onClick={() => {
//                 setLoadingDiv(index);
//                 localStorage.set("eventsSlug", cardData?.slug);
//                 router.push("/eventsdetails");
//               }}
//               className={styles.card}
//             >
//               <div>
//                 <Image
//                   width={10000}
//                   height={10000}
//                   alt="images"
//                   loading="lazy"
//                   className={styles.latest_project_image_sizing}
//                   src={cardData?.thumbURL}
//                 />
//                 <CircularProgress
//                   className={
//                     index === loadingDiv ? styles.display : styles.display_none
//                   }
//                 />
//               </div>

//               <h3 className={styles.latest_project_paragraph}>
//                 {cardData?.title}
//               </h3>

//               <div className={styles.flex}>
//                 <h3>{timeDate(cardData?.start_date)}</h3>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         ""
//       )}

//       <>
//         <Pagination
//           className="pagination"
//           current={currentPage}
//           pageSize={perPage}
//           total={total}
//           onChange={handlePageChange}
//         />
//       </>
//       <Footer />
//     </div>
//   );
// }

import React from "react";

const allevents = () => {
  return <div>allevents</div>;
};

export default allevents;
