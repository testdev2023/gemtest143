import React from "react";
import TopBar from "../src/components/TopBar/EntTopBar";
import Footer from "../src/components/Footer/Footer";
import ScrollToTopButton from "../src/components/ScrollToTopButton/ScrollToTopButton";
import styles from "../styles/Rewards.module.css";
import moment from "moment";
import axios from "axios";
// import { baseUrl } from "../src/config/Config";
import { reactLocalStorage } from "reactjs-localstorage";
import { useEffect, useState } from "react";
import { Pagination } from "antd";
import localStorage from "local-storage";
import Loder from "../src/components/Loder";
// import { toast } from "react-toastify";
import { toast, ToastContainer } from "react-toastify";

const Refferel = () => {
  const [allRefferelData, setAllRefferelData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(15);
  const [total, setTotal] = useState(0);
  const [loder, setLoder] = useState(true);
  const [refferalLoader, setRefferelLoader] = useState(false);

  const datetime = (dtStr) => {
    let dt = moment.utc(dtStr);
    let formattedDtStr = dt.format("MMM DD, YYYY");
    return formattedDtStr;
  };
  const refferel_data = () => {
    axios
      .get(
        // `${baseUrl}/api/member/referrals?page=${currentPage}`
        process.env.NEXT_PUBLIC_BASE_URL +
          "/api/member/referrals?page=" +
          currentPage,

        {
          headers: {
            Authorization:
              "Bearer " +
              reactLocalStorage.getObject("loginAuth").data?.api_token,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        setAllRefferelData(response?.data?.response?.data);
        setPerPage(response?.data.response?.per_page);
        setTotal(response?.data.response?.total);
        setLoder(false);
        setRefferelLoader(true);
      })
      .catch((err) => {
        toast.error(err, { autoClose: 5000 });
      });
  };
  useEffect(() => {
    refferel_data();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);
  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber);
    localStorage.set("RefferelCurrentPage", pageNumber);
  }

  useEffect(() => {
    const storedPage = localStorage.get("RefferelCurrentPage");
    if (storedPage) {
      setCurrentPage(parseInt(storedPage));
    }
  }, []);
  const calculateSerialNumber = (index) => {
    return (currentPage - 1) * perPage + index + 1;
  };
  return (
    <div className={styles.gparent}>
      <TopBar />
      {!loder || <Loder />}
      <div className={styles.reward_parent}>
        <h1>Refferel Report</h1>
        <div className={styles.container}>
          <table className={styles.rwd_table}>
            <thead>
              <tr>
                <th>S.NO</th>
                <th>Refferel Type</th>
                <th>Email</th>
                <th>Reffer date</th>
                <th>Join date</th>
              </tr>
            </thead>
            {refferalLoader ? (
              <tbody>
                {allRefferelData &&
                  allRefferelData.map((refferel, index) => (
                    <tr key={index}>
                      <td data-th="S.NO">
                        {/* {refferel?.id ? index + 1 : <p>-</p>} */}
                        {calculateSerialNumber(index)}
                      </td>
                      <td data-th="Refferel Type">
                        {refferel?.type ? refferel.type : <p>-</p>}
                      </td>
                      <td data-th="Email">
                        {refferel?.email ? refferel.email : <p>-</p>}
                      </td>
                      <td data-th="Reffer date">
                        {/* {datetime(refferel?.referred_date)} */}
                        {refferel?.referred_date ? (
                          datetime(refferel?.referred_date)
                        ) : (
                          <p>-</p>
                        )}
                      </td>
                      <td data-th="Join date">
                        {/* {datetime(refferel?.join_date)} */}

                        {refferel?.join_date ? (
                          datetime(refferel.join_date)
                        ) : (
                          <p>-</p>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            ) : (
              ""
            )}
          </table>
        </div>
        <ToastContainer className="tost" />
      </div>
      <>
        <Pagination
          className="pagination"
          current={currentPage}
          pageSize={perPage}
          total={total}
          onChange={handlePageChange}
        />
      </>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default Refferel;
