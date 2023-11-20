/* eslint-disable @next/next/no-img-element */
import styles from "../talenthunt_styles/TalentBord.module.css";
import TopBar from "../src/components/TopBar/EntTopBar";
import Image from "next/image";
import mypic from "../src/asset/events/01.png";
import Link from "next/link";
import Footer from "../src/components/Footer/Footer";
import Counter from "../src/talenthunt_components/Counter/counter";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import NewsLetter from "../src/talenthunt_components/NewsLetter/NewsLetter";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import ScrollToTopButton from "../src/components/ScrollToTopButton/ScrollToTopButton";

import localStorage from "local-storage";
import { Pagination } from "antd";
import Loder from "../src/components/Loder";
import InnerBaner from "../src/components/Baner/innerBaner";

import { useRouter } from "next/router";
// import { toast } from "react-toastify";
import { toast, ToastContainer } from "react-toastify";

export default function TalentBord(props) {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState({ name: "", topic: "" });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [projectCategories, setProjectCategories] = useState([]);
  const [projectCategoriesLoader, setProjectCategoriesLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(16);
  const [total, setTotal] = useState(0);
  const [cProjects, setCProjects] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");
  const [banner, setBanner] = useState();
  const [loder, setLoder] = useState(true);
  const [bannerLoader, setBannerLoader] = useState(false);
  // USER Activity
  const router = useRouter();
  const [pageName, setPageName] = useState("");
  const [pageURL, setPageURL] = useState("");
  const [localDateTime, setLocalDateTime] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [selectedCompetitionId, setSelectedCompetitionId] = useState(null);
  const [selectedCategoryNames, setSelectedCategoryNames] = useState([]);

  const [filteredCategories, setFilteredCategories] = useState([]);
  const [hasMore, setHasMore] = useState(true); // Define hasMore in your component state
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [selectedCompetitionName, setSelectedCompetitionName] = useState("");
  const [inputIsChecked, setInputIsChecked] = useState(false);

  useEffect(() => {
    const storedPage = localStorage.get("currentPage");
    if (storedPage) {
      setCurrentPage(parseInt(storedPage));
    }
  }, []);

  useEffect(() => {
    const currentPage = router.route;
    const formattedPageName = currentPage.startsWith("/")
      ? currentPage.substring(1)
      : currentPage;
    setPageName(formattedPageName);
    // Get the page URL
    setPageURL(window.location.href);

    // Get the formatted local date and time
    const getCurrentDateTime = () => {
      const currentDateTime = moment().format("MM/DD/YYYY hh:mm A");
      setLocalDateTime(currentDateTime);
    };
    // Update the local time every second
    const interval = setInterval(getCurrentDateTime, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [router]);
  useEffect(() => {
    const userToken = localStorage.get("loginAuth")?.data?.api_token;
    if (userToken) {
      UserActivity();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageName, pageURL, localDateTime]);

  const UserActivity = async () => {
    const userToken = localStorage.get("loginAuth")?.data?.api_token;
    try {
      if (pageName && pageURL && localDateTime) {
        const requestBody = {
          page_name: pageName,
          page_url: pageURL,
          date_time: localDateTime,
        };
        const response = await axios.post(
          process.env.NEXT_PUBLIC_BASE_URL + "/api/member/add-user-activity",
          requestBody,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        if (response.data.status === true) {
          setPageName("");
          setPageURL("");
          setLocalDateTime("");
        }
      }
    } catch (error) {
      console.error("Error recording user activity:", error);
    }
  };
  const GetBanner = async () => {
    try {
      await axios
        .get(
          // `${baseUrl}/api/banners?s[page]=talenthunt/talent board&s[type]=Landing`
          process.env.NEXT_PUBLIC_BASE_URL +
            "/api/banners?s[page]=Talent Board&s[type]=Landing"
        )

        .then((response) => {
          setBanner(response?.data?.response?.data[0]);
          setBannerLoader(true);
        })
        .catch((error) => {
          // alert(error);
          // toast.error(error);
          toast.error(error, { autoClose: 5000 });
        });
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   GetBanner();
  // }, []);
  const isUserLoggedIn = !!localStorage.get("loginAuth")?.data?.api_token;

  useEffect(() => {
    if (!isUserLoggedIn) {
      // If the user is not logged in, redirect to the login page
      router.push("/login"); // Replace "/login" with your actual login page URL
    } else {
      // If the user is logged in, fetch the page data
      GetBanner();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const Search = async () => {
    try {
      await axios
        .get(
          // `${baseUrl}/api/competition/participants?competition_id=1&name=${name}&topic=${topic}&page=${currentPage}`
          // process.env.NEXT_PUBLIC_BASE_URL +
          //   // "/api/competition/participants?competition_id=1&name=" +
          //   "/api/competition/participants?name=" +
          //   name +
          //   "&topic=" +
          //   topic +
          //   "&page=" +
          //   currentPage
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/competition/participants?name=${searchCriteria.name}&topic=${searchCriteria.topic}`
        )
        .then((response) => {
          setProjects(response.data.response.data);
          // setPerPage(response.data.response.per_page);
          // setTotal(response.data.response.total);
        })
        .catch((error) => {
          // alert(error);
          toast.error(error, { autoClose: 5000 });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleResetFilters = () => {
    setSelectedCompetitionId(null);
    setSelectedCategoryIds([]);
    setName(""); // Reset participant name input
    setTopic(""); // Reset topic/title input
    // GetProjects();
    window.location.reload(); // Reload the page
  };
  // useEffect(() => {
  //   GetProjects();
  // }, []);
  const GetProjects = async (page) => {
    // const token = reactLocalStorage.getObject("loginAuth").data?.api_token;

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_BASE_URL +
          // "/api/competition/participants?competition_id=1&page=" +
          // page
          "/api/competition/participants-all?page=" +
          page
      );

      const responseData = response?.data?.response?.data;
      setProjects(responseData); // Set the projects state with the response data
      setLoder(false);

      return responseData;
    } catch (error) {
      console.error("Error Fetching Projects ", error);
      return [];
    }
  };
  const loadMoreProjects = async () => {
    if (isLoadingMore) {
      return; // Do nothing if data loading is already in progress
    }

    setIsLoadingMore(true); // Set the flag to indicate that data loading is in progress

    const nextPage = currentPage + 1;
    const newProjects = await GetProjects(nextPage);
    if (newProjects && newProjects.length > 0) {
      setProjects([...projects, ...newProjects]);
      // setCurrentPage(nextPage);
    } else {
      setHasMore(false); // No more projects to load
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      if (scrollTop + windowHeight >= documentHeight - 100) {
        loadMoreProjects();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, projects, isLoadingMore]);

  function handleCompetitionSelection(competitionId) {
    const selectedCompetition = projects.find(
      (comp) => comp?.competition?.id === competitionId
    );
    // console.log("Selected Competition Object:", selectedCompetition); // Debugging
    const competitionName = selectedCompetition?.competition?.title || "";
    // console.log("Selected Competition Name:", competitionName); // Debugging

    setSelectedCompetitionId(competitionId);
    setSelectedCompetitionName(competitionName);
    // Clear selected categories when a new competition is selected
    setSelectedCategoryNames([]);

    setSelectedCategoryIds([]);
    // setSelectedCompetitionId([]);
  }
  useEffect(() => {
    // Filter the categories based on the selected competition
    const filteredCategories = (projectCategories || []).filter((category) => {
      return (
        category.competition_id === selectedCompetitionId ||
        selectedCompetitionId === null
      );
    });

    setFilteredCategories(filteredCategories);
  }, [selectedCompetitionId, projectCategories]);

  const GetProjectCategories = async () => {
    try {
      const response = await axios.get(
        // `${baseUrl}/api/competition-categories?competition_id=1`
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/competition-all-categories`
      );
      setProjectCategories(response?.data?.response?.data);
      setProjectCategoriesLoader(true);
    } catch (error) {
      console.error(error);
      // Handle the error here, e.g., show an error message or log it.
      // You can also re-throw the error if you want it to propagate to a higher-level error handler.
    }
  };

  function handleCategorySelection(categoryName) {
    // if (!inputIsChecked) {
    //   // Agar name ya topic mein input hai, to category selection disabled ho
    //   return;
    // }
    const updatedCategories = [...selectedCategoryNames];

    if (updatedCategories.includes(categoryName)) {
      // Category is already selected, remove it
      updatedCategories.splice(updatedCategories.indexOf(categoryName), 1);
    } else {
      // Category is not selected, add it
      updatedCategories.push(categoryName);
    }

    setSelectedCategoryNames(updatedCategories);
  }

  const filteredProjects = projects
    ? projects.filter((item) => {
        const matchesCompetition =
          selectedCompetitionId === null ||
          item.competition.id === selectedCompetitionId;

        const matchesCategories =
          selectedCategoryNames.length === 0 ||
          selectedCategoryNames.includes(item.category ? item.category.id : "");

        const matchesName =
          searchCriteria.name === "" ||
          (!item.user
            ? false
            : item.user.first_name
                .toLowerCase()
                .includes(searchCriteria.name.toLowerCase()) ||
              item.user.last_name
                .toLowerCase()
                .includes(searchCriteria.name.toLowerCase()));

        const matchesTopic =
          searchCriteria.topic === "" ||
          item.title.toLowerCase().includes(searchCriteria.topic.toLowerCase());

        return (
          matchesCompetition && matchesCategories && matchesName && matchesTopic
        );
      })
    : [];

  useEffect(() => {
    GetProjects(currentPage).then((initialProjects) => {
      setProjects(initialProjects);
    });
    GetProjectCategories();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, selectedCompetitionId]);

  function handlePageChange(pageNumber) {
    localStorage.set("TalentBoardCurrentPage", pageNumber);
  }

  useEffect(() => {
    const storedPage = localStorage.get("TalentBoardCurrentPag");
    if (storedPage) {
      setCurrentPage(parseInt(storedPage));
    }
  }, []);

  const DateFormatter = (date) => {
    const formattedDate = moment(date).format("MMM DD, YYYY");
    return formattedDate;
  };

  return (
    <div className={styles.talent_bord_main}>
      <ScrollToTopButton />
      <TopBar />
      {!loder || <Loder />}

      {bannerLoader ? (
        <InnerBaner
          source={
            banner?.file_type == "image" ? banner?.imageURL : banner?.videoURL
          }
          fileType={banner?.file_type}
          headingBanner={banner?.title}
        />
      ) : (
        ""
      )}
      {/* <div className={styles.counter_sec}>
        <div className={styles.conter_sec_containt}>
          <h1>Total Vote Counted</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
            varius quam quisque id diam vel quam.Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt{" "}
          </p>
        </div>
        <div className={styles.counter_sec_center}>
          <p>Statistics</p>
          <h2>Total Votes</h2>
        </div>
        <div>
          <Counter />
        </div>
      </div> */}

      <div className={styles.categories}>
        <div className={styles.categories_heading}>
          {/* <div className={styles.dashline}></div> */}
          <h2 className="yellow">Search Entries</h2>
        </div>

        <div className={styles.search_sec}>
          <div className={styles.search_sec_sub}>
            <h4>Search by </h4>
            <input
              type="text"
              placeholder="Participants name"
              // onChange={(e) => {
              //   setName(e.target.value);
              // }}
              onChange={(e) => {
                setSearchCriteria({ ...searchCriteria, name: e.target.value });
              }}
            />
            <input
              type="text"
              placeholder="Topic / Title"
              // onChange={(e) => {
              //   setTopic(e.target.value);
              // }}
              onChange={(e) => {
                setSearchCriteria({ ...searchCriteria, topic: e.target.value });
              }}
            />
            {/* <button onClick={Search}>Search</button> */}
            <button onClick={handleResetFilters}>Reset Filters</button>
          </div>
        </div>

        <div className={styles.categories2}>
          <div className={styles.categories2_sub}>
            <h2 className={`${styles.categories_heading3} yellow`}>
              Competition
            </h2>
            {/* <button onClick={handleResetFilters}>Reset Filters</button> */}
          </div>
          {/* {newsCategoreisLoader ? ( */}
          <div className={styles.tag_sec}>
            <input
              type="radio"
              id="marking_0"
              name="radio"
              className={styles.check_input}
              // onChange={() => GetNews()}
            />
            {[
              ...new Set(
                projects?.map((competition) => competition?.competition?.id)
              ),
            ].map((competitionId) => {
              const competition = projects.find(
                (comp) => comp?.competition?.id === competitionId
              );

              return (
                <div
                  key={competition?.competition?.id}
                  onClick={() => {
                    handleCompetitionSelection(competition?.competition?.id);
                  }}
                >
                  <input
                    type="radio"
                    name="competition"
                    value={competition?.competition?.id}
                    checked={
                      selectedCompetitionId === competition?.competition?.id
                    }
                    onChange={() => {}}
                    className={styles.check_input}
                  />
                  <label
                    name="radio"
                    htmlFor={`marking_1${competition?.competition?.id}`}
                    className={styles.check_label}
                  >
                    <div className={styles.tag_icon}>
                      <AccessibilityIcon />
                    </div>
                    <p>{competition?.competition?.title}</p>
                  </label>
                </div>
              );
            })}
          </div>
          {/* <button onClick={handleResetFilters}>Reset Filters</button> */}

          {/* ) : ( */}
          {/* "" */}
          {/* )} */}
        </div>

        {selectedCompetitionId !== null && projectCategoriesLoader ? (
          <div className={styles.tag_sec}>
            {projectCategories &&
              projectCategories
                ?.filter((category) => {
                  // Only show categories related to the selected competition
                  return (
                    selectedCompetitionId === null ||
                    category.competition_id === selectedCompetitionId
                  );
                })

                .map((item, index) => (
                  <div key={index}>
                    <input
                      type="checkbox"
                      id={`marking_0${item.id}`}
                      name="check"
                      className={styles.check_input}
                      value={item.id}
                      // ye zohain bhai se pochna he  k unhony q use kiya ??????????????????????

                      // checked={
                      //   selectedCategories.includes(item?.id) || item.id === 0
                      // }
                      onChange={() => handleCategorySelection(item.id)}
                      // onClick={() => setInputIsCheck         ed(true)}
                    />
                    <label
                      name="check"
                      htmlFor={`marking_0${item.id}`}
                      className={`${styles.check_label} `}
                      // onClick={() => setInputIsChecked(true)}
                    >
                      <div className={styles.tag_icon}>
                        <AccessibilityIcon />
                      </div>
                      <p>{item?.name}</p>
                    </label>
                  </div>
                ))}
          </div>
        ) : (
          ""
        )}
      </div>

      <div className={styles.categories_heading}>
        {/* <div className={styles.dashline}></div> */}

        <h2 className="yellow">
          {selectedCompetitionName ? selectedCompetitionName : "All Entries"}
        </h2>
      </div>

      {/* <h1>All projects</h1> */}

      <div className={styles.latest_project_sec3}>
        {filteredProjects?.map((item) => (
          <>
            <Link
              href={{
                pathname: "/talentvote",
                query: {
                  cometetion_id: item.id,
                  competetion_name: item.competition.title,
                  competetion_description:
                    // item.competition.short_description,
                    item?.brief,
                  title: item?.title,
                  created_at: item?.created_at,
                  first_name: item?.user?.first_name,
                  last_name: item?.user?.last_name,
                  category: item?.category ? item?.category?.name : "unknown",
                  added_by_first_name: item?.competition?.added_by?.first_name,
                  added_by_last_name: item?.competition?.added_by?.last_name,
                  competetion_cover_image: item?.cover_image,
                  // submition: projectsSubmition,
                },
              }}
              className={styles.card}
            >
              <div className={styles.img_div}>
                <Image
                  width={10000}
                  height={10000}
                  className={styles.latest_project_image_sizing}
                  src={item.cover_image}
                  // src={mypic}
                  loading="lazy"
                  alt={item?.title}
                />
              </div>
              <div className={styles.content}>
                <h4 className={styles.latest_project_paragraph}>
                  {item.title}
                </h4>

                {/* <span className={styles.latest_project_date}>
                  {DateFormatter(item.created_at)}
                </span> */}
                <span className="name_heading">
                  {item.category ? item.category.name : ""}
                </span>
                <span className="name_heading">
                  {item?.competition ? item.competition.title : ""}
                </span>

                <span className="small_heading">
                  {DateFormatter(item.created_at)} | Submitted by:{" "}
                  <Link href="" className={styles.latest_project_Submitted_by}>
                    {/* {item.competition.added_by.first_name +
                      " " +
                      item.competition.added_by.last_name} */}

                    {item?.user?.first_name +
                      (item?.user?.last_name
                        ? " " + item?.user?.last_name
                        : "")}
                  </Link>
                </span>
              </div>
              {/* <div className={styles.latest_project_view_project}>
                <Link
                  href={{
                    pathname: "/talentvote",
                    query: {
                      competetion_id: item.id,
                      competetion_name: item.competition.title,
                      competetion_description:
                      item.competition.short_description,
                      title: item.title,
                      created_at: item.created_at,
                      first_name: item.user.first_name,
                      last_name: item.user.last_name,
                      category: item.category ? item.category.name : "unknown",
                      added_by_first_name: item.competition.added_by.first_name,
                      added_by_last_name: item.competition.added_by.last_name,
                      competetion_cover_image: item.cover_image,
                    },
                  }}
                  >
                  View Project
                </Link>
              </div> */}
            </Link>
          </>
        ))}

        <ToastContainer className="tost" />
      </div>
      {/* <>
        <Pagination
          className="pagination"
          current={currentPage}
          pageSize={perPage}
          total={total}
          onChange={handlePageChange}
        />
      </> */}
      {/* <NewsLetter /> */}
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  const res = await axios.get(
    // `${baseUrl}/api/competition/participants?competition_id=${1}`
    process.env.NEXT_PUBLIC_BASE_URL +
      "/api/competition/participants?competition_id=" +
      1
  );
  const data = res.data;
  return { props: { data } };
}

// import { useState, useEffect } from 'react';
// import axios from 'axios';

// function CompetitionParticipants() {
//   const [participants, setParticipants] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     fetchParticipants();
//   }, [currentPage]);

//   const fetchParticipants = async () => {
//     const url = `${baseUrl}//api/competition/participants?competition_id=1&page=${currentPage}`;
//     const response = await axios.get(url);
//     const data = response.data;
//     setParticipants(prevParticipants => [...prevParticipants, ...data]);
//   };

//   const handleLoadMore = () => {
//     setCurrentPage(prevPage => prevPage + 1);
//   };

//   return (
//     <div>
//       <ul>
//         {participants.map(participant => (
//           <li key={participant.id}>{participant.name}</li>
//         ))}
//       </ul>
//       <button onClick={handleLoadMore}>Load More</button>
//     </div>
//   );
// }

// export default CompetitionParticipants;
