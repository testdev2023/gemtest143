// /* eslint-disable @next/next/no-img-element */
// import React, { useEffect, useState } from "react";
// import TopBar from "../src/components/TopBar/EntTopBar";
// import Footer from "../src/components/Footer/Footer";
// import styles from "../styles/News.module.css";
// import moment from "moment/moment";
// import ScrollToTopButton from "../src/components/ScrollToTopButton/ScrollToTopButton";
// import { Pagination } from "antd";
// import "react-multi-carousel/lib/styles.css";
// import axios from "axios";
// import localStorage from "local-storage";
// import { useRouter } from "next/router";
// import { CircularProgress } from "@mui/material";
// // import { baseUrl } from "../src/config/Config";
// import Loder from "../src/components/Loder";
// import Link from "next/link";
// import Image from "next/image";

// // import CircularProgress from "@mui/material/CircularProgimage.pngress";

// export default function News() {
//   const router = useRouter();
//   const [news, setNews] = useState();
//   const [currentPage, setCurrentPage] = useState(1);
//   const [perPage, setPerPage] = useState(16);
//   const [total, setTotal] = useState(0);
//   const [loadingDiv, setLoadingDiv] = useState();
//   const [loder, setLoder] = useState(false);
//   const [newsLoader, setNewsLoader] = useState(false);

//   const GetNews = async () => {
//     try {
//       await axios
//         .get(
//           // `${baseUrl}/api/news?page=${currentPage}`
//           process.env.NEXT_PUBLIC_BASE_URL + "/api/news?page=" + currentPage
//         )
//         .then((response) => {
//           setNews(response?.data?.response?.data);
//           setPerPage(response.data.response.per_page);
//           setTotal(response.data.response.total);
//           setNewsLoader(true);
//         })
//         .catch((error) => {
//           alert(error);
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     GetNews();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [currentPage]);

//   function handlePageChange(pageNumber) {
//     setCurrentPage(pageNumber);
//     localStorage.set("currentPage", pageNumber);
//   }

//   useEffect(() => {
//     const storedPage = localStorage.get("currentPage");
//     if (storedPage) {
//       setCurrentPage(parseInt(storedPage));
//     }
//   }, []);

//   const datetime = (dtStr) => {
//     let dt = moment.utc(dtStr);
//     let formattedDtStr = dt.format("MMM DD, YYYY");
//     return formattedDtStr;
//   };

//   return (
//     <>
//       {!loder || <Loder />}
//       <div>
//         <TopBar />
//         <ScrollToTopButton />
//         <div className={styles.news_baner_container}>
//           <div className={styles.news_baner_sec1}>
//             {/* <div className={styles.dash}></div> */}
//             <h1>News Center</h1>
//           </div>
//           {newsLoader ? (
//             <div className={styles.news_baner_sec2}>
//               {news &&
//                 news.map((item, index) => (
//                   <div
//                     onClick={() => {
//                       setLoder(true);
//                     }}
//                     key={index}
//                     className={styles.news_image_div}
//                   >
//                     <div
//                     // onClick={() => {
//                     //   router.push({
//                     //     pathname: "/newsdetails",
//                     //     query: { slug: item.slug },
//                     //   });
//                     // }}
//                     >
//                       <Link href={`/newsdetails?slugnews=${item.slug}`}>
//                         <Image
//                           width={10000}
//                           height={10000}
//                           style={{ height: "100%", width: "100%" }}
//                           src={item.thumbURL}
//                           alt="news picture"
//                           loading="lazy"
//                           onClick={() => {
//                             setLoadingDiv(index);
//                             // localStorage.set("newsSlug", item.slug);
//                             // router.push("/newsdetails");
//                             router.push({
//                               pathname: "/newsdetails",
//                               query: { slugnews: item.slug },
//                             });
//                           }}
//                         />

//                         <div className={styles.content}>
//                           <p max={2}>{item.title}</p>
//                           <div className={styles.date_time}>
//                             <p>{datetime(item.created_at)}</p>
//                             <p>{item?.category}</p>
//                           </div>
//                         </div>
//                       </Link>
//                       {/* <CircularProgress
//           className={
//             index === loadingDiv
//               ? styles.display
//               : styles.display_none
//           }
//         /> */}
//                       {/* </div> */}
//                     </div>
//                   </div>
//                 ))}
//               {/* Display the pagination */}
//               <Pagination
//                 className="pagination"
//                 current={currentPage}
//                 pageSize={perPage}
//                 total={total}
//                 onChange={handlePageChange}
//               />
//             </div>
//           ) : (
//             ""
//           )}

//           {/* <>
//             <Pagination
//               className="pagination"
//               current={currentPage}
//               pageSize={perPage}
//               total={total}
//               onChange={handlePageChange}
//             />
//           </> */}
//         </div>
//         {!loder ? <Footer /> : <Loder />}
//       </div>
//     </>
//   );
// }

import React from "react";

const news_pagination_no = () => {
  return <div>news-pagination-no</div>;
};

export default news_pagination_no;
