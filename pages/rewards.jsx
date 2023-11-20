import React, { useEffect, useState } from "react";
import TopBar from "../src/components/TopBar/EntTopBar";
import Footer from "../src/components/Footer/Footer";
import ScrollToTopButton from "../src/components/ScrollToTopButton/ScrollToTopButton";
import styles from "../styles/Rewards.module.css";
import localStorage from "local-storage";
import { Pagination } from "antd";
import { reactLocalStorage } from "reactjs-localstorage";
import axios from "axios";
import moment from "moment";

// import { baseUrl } from "../src/config/Config";
import Loder from "../src/components/Loder";
// import { toast } from "react-toastify";
import { toast, ToastContainer } from "react-toastify";

const Rewards = () => {
  const [allRewardsData, setAllRewardData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(15);
  const [total, setTotal] = useState(0);
  const [rewardsLoader, setRewardLoader] = useState(false);
  const [loder, setLoder] = useState(true);
  const datetime = (dtStr) => {
    let dt = moment.utc(dtStr);
    let formattedDtStr = dt.format("MMM DD, YYYY");
    return formattedDtStr;
  };

  const reward_data = () => {
    axios
      .get(
        // `${baseUrl}/api/member/reward-report?page=${currentPage}`
        process.env.NEXT_PUBLIC_BASE_URL +
          "/api/member/reward-report?page=" +
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
        setAllRewardData(response?.data?.response?.data);
        console.log(response?.data?.response?.data, "checkng");
        setPerPage(response?.data.response?.per_page);
        setTotal(response?.data.response?.total);
        setLoder(false);
        setRewardLoader(true);
      })
      .catch((err) => {
        toast.error(err, { autoClose: 5000 });
      });
  };
  useEffect(() => {
    reward_data();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber);
    localStorage.set("RewardsCurrentPage", pageNumber);
  }

  useEffect(() => {
    const storedPage = localStorage.get("RewardsCurrentPage");
    if (storedPage) {
      setCurrentPage(parseInt(storedPage));
    }
  }, []);
  const calculateSerialNumber = (index) => {
    return (currentPage - 1) * perPage + index + 1;
  };
  // const reward_data = [
  //   {
  //     serial_number: 1,
  //     reward_type: "Reffrel",
  //     email: "example1@example.com",
  //     points: 100,
  //   },
  //   {
  //     serial_number: 2,
  //     reward_type: "Reffrel",
  //     email: "example2@example.com",
  //     points: 50,
  //   },
  //   {
  //     serial_number: 3,
  //     reward_type: "Reffrel",
  //     email: "example3@example.com",
  //     points: 200,
  //   },
  //   {
  //     serial_number: 4,
  //     reward_type: "Reffrel",
  //     email: "example4@example.com",
  //     points: 150,
  //   },
  //   {
  //     serial_number: 5,
  //     reward_type: "Reffrel",
  //     email: "example5@example.com",
  //     points: 75,
  //   },
  // ];

  return (
    <div className={styles.gparent}>
      <TopBar />
      {!loder || <Loder />}

      <div className={styles.reward_parent}>
        <h1>Reward Report</h1>
        <div className={styles.container}>
          <table className={styles.rwd_table}>
            <thead>
              <tr>
                <th>S.NO</th>
                <th>Reward Type</th>
                <th>Email</th>
                <th>Points</th>
              </tr>
            </thead>
            {rewardsLoader ? (
              <tbody>
                {allRewardsData &&
                  allRewardsData.map((reward, index) => (
                    <tr key={index}>
                      <td data-th="S.NO">
                        {/* {reward?.id ? index + 1 : <p>-</p>} */}
                        {calculateSerialNumber(index)}
                      </td>

                      <td data-th="Reward Type">
                        {/* {reward.reward_type} */}
                        {reward?.type ? reward.type : <p>-</p>}
                      </td>
                      <td data-th="Email">
                        {reward?.email ? reward.email : <p>-</p>}
                      </td>
                      <td data-th="Points">
                        {reward?.points ? reward.points : <p>-</p>}
                      </td>
                    </tr>
                  ))}
                {/* {reward_data.map((reward) => (
               <tr key={reward.serial_number}>
                 <td data-th="S.NO">{reward.serial_number}</td>
                 <td data-th="Reward Type">{reward.reward_type}</td>
                 <td data-th="Email">{reward.email}</td>
                 <td data-th="Points">{reward.points}</td>
               </tr>
             ))} */}
              </tbody>
            ) : (
              ""
            )}
          </table>
        </div>
        <ToastContainer className="tost" />
      </div>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default Rewards;
