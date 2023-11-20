import styles from "../talenthunt_styles/SubmitNow.module.css";
import TopBar from "../src/components/TopBar/EntTopBar";
import Footer from "../src/components/Footer/Footer";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { reactLocalStorage } from "reactjs-localstorage";
import Link from "next/link";
import axios from "axios";

import React, { useEffect, useState } from "react";
// import { Box } from "@mui/material";
// import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
// import { InboxOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import ScrollToTopButton from "../src/components/ScrollToTopButton/ScrollToTopButton";
import { Upload, message, Progress } from "antd";
// import { DeleteOutlined } from "@ant-design/icons";
import Dropzone from "react-dropzone";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Recaptcha from "react-google-recaptcha";
// import { baseUrl } from "@/src/config/Config";
// import { baseUrl } from "../src/config/Config";
import Loder from "../src/components/Loder";
import InnerBaner from "../src/components/Baner/innerBaner";
import moment from "moment/moment";
import localStorage from "local-storage";
import pdfIcon from "../src/asset/icon/PDF_file_icon.svg";
import Image from "next/image";

const { Dragger } = Upload;

export default function SubmitNow(props) {
  // USER Activity
  const [selectedCompetetion, setSelectedCompetetion] = useState("");
  const [isCategorySelected, setIsCategorySelected] = useState(false);
  // New state to store the file name extracted from the file path
  const [pdfFileName, setPdfFileName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [pdfFile, setPdfFile] = useState("");
  const [pageName, setPageName] = useState("");
  const [pageURL, setPageURL] = useState("");
  const [localDateTime, setLocalDateTime] = useState([]);
  const [isVerified, setIsVerified] = useState(false);
  const [banner, setBanner] = useState();
  const [bannerLoader, setBannerLoader] = useState(false);
  const [loder, setLoder] = useState(true);
  const [loadingNext, setLoadingNext] = useState(false);
  const [loadingDraft, setLoadingDraft] = useState(false);

  const handleRecaptcha = (value) => {
    setIsVerified(!!value);
  };
  const router = useRouter();

  const [fileList, setFileList] = useState([]);
  const [list, setList] = useState([]);

  const onChange = ({ fileList: newFileList }) => {
    // Filter out files larger than 2MB
    const filteredFileList = newFileList.filter((file) => {
      const fileSizeMB = file.size / (1024 * 1024); // Convert size to MB
      if (fileSizeMB > 2) {
        // Display an error message if the file size exceeds 2MB
        toast.warning(`${file.name} is too large, maximum size is 2MB.`);
        return false;
      }
      return true;
    });
    // setFileList(newFileList);
    setFileList(filteredFileList);
    setProject({ ...project, cover_image: fileList[0]?.originFileObj });
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const [videos, setVideos] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [handleDropUpdated, setHandleDropUpdated] = useState(false);
  const [videosUpdated, setVideosUpdated] = useState(false);

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
          // `${baseUrl}/api/banners?s[page]=talenthunt/submit now&s[type]=Landing`
          process.env.NEXT_PUBLIC_BASE_URL +
            "/api/banners?s[page]=Submit Now&s[type]=Landing"
        )

        .then((response) => {
          setBanner(response?.data?.response?.data[0]);
          setBannerLoader(true);
          setLoder(false);
        })
        .catch((error) => {
          toast.error(error, { autoClose: 5000 });
        });
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpload = () => {
    setUploading(true);
    setProgress(0);

    // You can use axios or any other library to upload videos to the server
    // Here's an example using axios:
    const uploaders = videos.map((video) => {
      setProject({ ...project, files: list });
    });

    // Wait for all videos to finish uploading
    axios.all(uploaders).then(() => {
      setUploading(false);
      // toast.success("Videos Uploaded Successfully");
    });
  };

  const handleDelete = (index) => {
    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
  };

  const handleVideoDuration = (e, index) => {
    const newVideos = [...videos];
    newVideos[index].duration = e.target.duration;
    setVideos(newVideos);
  };
  const ALLOWED_EXTENSIONS = ["pdf", "mp4", "webm", "mp3", "wav"];
  const MAX_FILES = 3;
  const MAX_FILE_SIZE_MB = 50; // Maximum file size in megabytes

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleDrop = (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      // Display a message for rejected files (unsupported extensions)
      const rejectedExtensions = rejectedFiles
        .map((file) => file.name.split(".").pop().toLowerCase())
        .join(", ");
      // toast.error(`Unsupported file type(s): ${rejectedExtensions}`);
      toast.error(`Unsupported file type(s): ${rejectedExtensions}`, {
        autoClose: 5000,
      });
    }

    // Filter out files with unsupported extensions
    const filteredFiles = acceptedFiles.filter((file) => {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      const fileSizeMB = file.size / (1024 * 1024); // Convert size to MB
      if (fileSizeMB > MAX_FILE_SIZE_MB) {
        toast.error(`File size exceeds ${MAX_FILE_SIZE_MB}MB: ${file.name}`, {
          autoClose: 5000,
        });
        return false;
      }
      return ALLOWED_EXTENSIONS.includes(fileExtension);
    });

    const existingFileExtensions = list.map((file) =>
      file.name.split(".").pop().toLowerCase()
    );
    // Check if the filtered files contain any existing file extensions
    // const duplicateExtensions = filteredFiles.some((file) =>
    //   existingFileExtensions.includes(file.name.split(".").pop().toLowerCase())
    // );
    const duplicateExtensions = filteredFiles.reduce(
      (acc, file, index, array) => {
        const fileExtension = file.name.split(".").pop().toLowerCase();
        // if (existingFileExtensions.includes(fileExtension)) {
        //   acc.push(fileExtension);
        // }
        if (
          array.some(
            (otherFile, otherIndex) =>
              otherIndex !== index &&
              otherFile.name.split(".").pop().toLowerCase() === fileExtension
          )
        ) {
          acc.push(fileExtension);
        }
        return acc;
      },
      []
    );
    // Show toast message if there are duplicate file extensions
    if (duplicateExtensions.length > 0) {
      const duplicateExtensionNames = duplicateExtensions
        .map((extension) => extension.toUpperCase())
        .join(", ");
      toast.warning(
        `You can upload only one file of each type. Duplicate types: ${duplicateExtensionNames}`
      );
      return;
    }
    // Filter out excess files if needed
    const remainingSlots = MAX_FILES - list.length;
    if (filteredFiles.length > remainingSlots) {
      toast.warning(`You can only upload up to ${MAX_FILES} files.`);
      return;
    }
    const filesToUpload = filteredFiles.slice(0, remainingSlots);
    // Check if there are any files of each type in the list already
    const existingMp3 = list.some(
      (file) => file.name.split(".").pop().toLowerCase() === "mp3"
    );
    const existingMp4 = list.some(
      (file) => file.name.split(".").pop().toLowerCase() === "mp4"
    );
    const existingPdf = list.some(
      (file) => file.name.split(".").pop().toLowerCase() === "pdf"
    );

    // Check if the new files contain files of each type
    const hasNewMp3 = filesToUpload.some(
      (file) => file.name.split(".").pop().toLowerCase() === "mp3"
    );
    const hasNewMp4 = filesToUpload.some(
      (file) => file.name.split(".").pop().toLowerCase() === "mp4"
    );
    const hasNewPdf = filesToUpload.some(
      (file) => file.name.split(".").pop().toLowerCase() === "pdf"
    );

    // If a file of the same type already exists or is being uploaded, show a message
    // if ((existingMp3 || hasNewMp3) && hasNewMp3) {
    //   toast.warning("You can upload only one mp3 file.");
    // }
    // if ((existingMp4 || hasNewMp4) && hasNewMp4) {
    //   toast.warning("You can upload only one mp4 file.");
    // }
    // if ((existingPdf || hasNewPdf) && hasNewPdf) {
    //   toast.warning("You can upload only one pdf file.");
    // }
    // Show toast messages for each file type
    if (hasNewMp3 && existingMp3) {
      toast.warning("You can upload only one mp3 file.");
      return;
    }
    if (hasNewMp4 && existingMp4) {
      toast.warning("You can upload only one mp4 file.");
      return;
    }
    if (hasNewPdf && existingPdf) {
      toast.warning("You can upload only one pdf file.");
      return;
    }

    setList([...list, ...filesToUpload]);

    // Add the filtered videos to the state
    const newVideos = filesToUpload.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name.replace(/\s/g, ""), // Remove spaces from filename
    }));
    setVideos([...videos, ...newVideos]);
  };

  const [categories, setCategories] = useState(props.data1.response.data);

  const [project, setProject] = useState({
    competition_id: "",
    category_id: "",
    title: "",
    brief: "",
    cover_image: {},
    files: [],
    fee: "",
  });

  const handleChangeTitle = (e) => {
    setProject({ ...project, title: e.target.value });
  };

  // const handleChangeBrief = (e) => {
  //   setProject({ ...project, brief: e.target.value });
  // };
  const handleChangeBrief = (e) => {
    const inputText = e.target.value;
    if (inputText.length <= 500) {
      setProject({ ...project, brief: e.target.value });
    }
  };

  const handleChangeCategory = (e) => {
    setProject({ ...project, category_id: e.target.value });
    setSelectedCategory(e.target.value);

    const selectedCategoryObject = categories.find(
      (category) => category.id === parseInt(e.target.value)
    );

    // Update the state with the category's description
    setCategoryDescription(selectedCategoryObject?.description || "");
    setPdfFile(selectedCategoryObject?.requirements_file || "");

    // Update the isCategorySelected state based on whether a category is selected or not
    setIsCategorySelected(!!e.target.value);
  };

  const handleChangeCompetetion = (e) => {
    setProject({ ...project, competition_id: e.target.value });
  };

  const handleChangeFees = (e) => {
    setProject({ ...project, fee: e.target.value });
  };
  const [competetions, setCompetetions] = useState(props.data2);
  const handleCategoryChange = async (e) => {
    const categoryId = e.target.value;

    // Send the selected competition ID to the server to fetch categories
    const response = await axios.get(
      process.env.NEXT_PUBLIC_BASE_URL +
        `/api/competition-categories?competition_id=${categoryId}`
    );
    // Update the state with the fetched categories
    // setCategories(response?.data?.response?.data);

    const sortedCategories = response?.data?.response?.data.sort((a, b) => {
      // Replace 'a.name' and 'b.name' with the actual properties you want to sort by
      return a.name.localeCompare(b.name);
    });

    setCategories(sortedCategories);

    // console.log(response?.data?.response?.data, "testing");
    const matchingObject = await competetions?.find(
      (obj) => obj.id == categoryId
    );
    setProject({
      ...project,
      competition_id: matchingObject?.id,
      fee: matchingObject?.fee,
    });
    setSelectedCompetetion(categoryId);

    setSelectedCategory("");
  };
  // useEffect hook to extract the file name from the pdfFile path
  useEffect(() => {
    if (pdfFile) {
      const fileName = pdfFile.split("/").pop();
      setPdfFileName(fileName);
    }
  }, [pdfFile]);
  const onSubmit = async () => {
    let missingFields = [];

    if (!isCategorySelected) missingFields.push("Category");
    if (!project.title) missingFields.push("Title");
    if (!project.brief) missingFields.push("Brief");
    if (fileList.length === 0) missingFields.push("File");

    if (missingFields.length > 0) {
      const errorMessage = `Please complete the following required fields: ${missingFields.join(
        ", "
      )}`;
      toast.warning(errorMessage);
      return;
    }
    if (list.length === 0) {
      toast.warning("Please attach at least one file before proceeding.");
      return;
    }
    setLoadingNext(true);
    await axios
      .post(
        // `${baseUrl}/api/member/user-competition/store`
        process.env.NEXT_PUBLIC_BASE_URL + "/api/member/user-competition/store",

        project,
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
        if (
          response.data &&
          response.data.data &&
          response.data.data.user_competition_id
        ) {
          // Access the user_competition_id property
          const userCompetitionId = response.data.data.user_competition_id;
          toast.success(response?.data?.message);
          setLoadingNext(false);
          setTimeout(() => {
            // Clear the form data
            setProject({
              competition_id: "",
              category_id: "",
              title: "",
              brief: "",
              cover_image: {},
              files: [],
              fee: "",
            });
            router.push({
              pathname: "payment",
              query: {
                user_competetion_id: userCompetitionId,
                competetion_id: project.competition_id,
                competetion_category: project.category_id,
                competetion_title: project.title,
                competetion_brief: project.brief,
                competetion_fees: project.fee,
              },
            });
          }, 3000);
        } else if (response.data && response.data.errors) {
          // Handle errors: Display error toast
          const errorMessage = Object.values(response.data.errors)
            .flat()
            .join(", ");
          toast.warning(errorMessage);
          setLoadingNext(false);
        } else {
          toast.warning(response?.data?.message);

          setLoadingNext(false);
        }
      })
      .catch((error) => {
        // toast.error(error?.message);
        if (
          (error?.message === "Request failed with status code 413",
          { autoClose: 5000 })
        ) {
          toast.warn(
            "File size exceeds the maximum limit of 50MB. Please choose a smaller file.",
            { autoClose: 5000 }
          );
          setLoadingNext(false);
        } else {
          // toast.error(error?.message);
          toast.error(error?.message, { autoClose: 5000 });
          setLoadingNext(false);
        }
      });
  };

  // const PayLater = async () => {
  //   await axios
  //     .post(
  //       // `${baseUrl}/api/member/user-competition/store`
  //       process.env.NEXT_PUBLIC_BASE_URL + "/api/member/user-competition/store",

  //       project,
  //       {
  //         headers: {
  //           Authorization:
  //             "Bearer " +
  //             reactLocalStorage.getObject("loginAuth").data?.api_token,
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       toast.success(response?.data?.message);
  //       setTimeout(() => {
  //         router.push("competitionentry");
  //       }, 3000);
  //     })
  //     .catch((error) => {
  //       if (error?.message === "Request failed with status code 413") {
  //         toast.warn(
  //           "File size exceeds the maximum limit of 10MB. Please choose a smaller file."
  //         );
  //       } else {
  //         toast.error(error?.message);
  //       }
  //     });
  // };

  const PayLater = async () => {
    try {
      let missingFields = [];

      if (!isCategorySelected) missingFields.push("Category");
      if (!project.title) missingFields.push("Title");
      if (!project.brief) missingFields.push("Brief");
      if (fileList.length === 0) missingFields.push("File");

      if (missingFields.length > 0) {
        const errorMessage = `Please complete the following required fields: ${missingFields.join(
          ", "
        )}`;
        toast.warning(errorMessage);
        return;
      }
      if (list.length === 0) {
        toast.warning("Please attach at least one file before proceeding.");
        return;
      }
      setLoadingDraft(true); // Start loading
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/member/user-competition/store`,
        project,
        {
          headers: {
            Authorization: `Bearer ${
              reactLocalStorage.getObject("loginAuth").data?.api_token
            }`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response?.data?.status === true) {
        setLoadingDraft(false); // Stop loading after the API request is complete
        toast.success(response?.data?.message);
        setTimeout(() => {
          router.push("competitionentry");
        }, 3000);
      } else if (response.data && response.data.errors) {
        // Handle errors: Display error toast
        const errorMessage = Object.values(response.data.errors)
          .flat()
          .join(", ");
        toast.warning(errorMessage);
        setLoadingDraft(false);
      } else {
        toast.error(response?.data?.message || "An error occurred.", {
          autoClose: 5000,
        });
        setLoadingDraft(false); // Stop loading after the API request is complete
      }
    } catch (error) {
      if ((error?.response?.status === 413, { autoClose: 5000 })) {
        toast.warn(
          "File size exceeds the maximum limit of 10MB. Please choose a smaller file.",
          { autoClose: 5000 }
        );
        setLoadingDraft(false); // Stop loading after the API request is complete
      } else {
        toast.error("An error occurred while processing your request.", {
          autoClose: 5000,
        });
        setLoadingDraft(false); // Stop loading after the API request is complete
      }
    }
  };
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
  useEffect(() => {
    if (handleDropUpdated && videosUpdated) {
      handleUpload();
      setHandleDropUpdated(false);
      setVideosUpdated(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleDropUpdated, videosUpdated]);

  useEffect(() => {
    if (handleDrop !== null) {
      setHandleDropUpdated(true);
    }
  }, [handleDrop]);

  useEffect(() => {
    if (videos !== null) {
      setVideosUpdated(true);
    }
  }, [videos]);

  return (
    <>
      {!loder || <Loder />}
      <div className={styles.submit_now_main}>
        <ScrollToTopButton />
        <TopBar />
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

        <div className={styles.select_categories}>
          <div className={styles.select_categories_heading}>
            <h3 className="yellow">Submit Your Entry</h3>
          </div>
          {/* <form onSubmit={handleSubmit}> */}
          <div className={styles.submit_sec1}>
            <p>Select Your Competetion</p>
            <div className={styles.submit_sec1_sub1}>
              <select
                className={styles.select}
                // name="category"
                name="competition"
                id=""
                onChange={(e) => {
                  handleCategoryChange(e);
                }}
                placeholder="Select Competetion"
                value={selectedCompetetion}
              >
                <option className={styles.option} key={-1} value={-1}>
                  Select
                </option>
                {competetions
                  ?.sort((a, b) => a.ordering - b.ordering) // Sort the competitions array by ordering
                  .map((item, i) => (
                    <option className={styles.option} key={i} value={item.id}>
                      {item.title}
                      {/* {`${item.ordering}. ${item.title}`} */}
                      {/* Display ordering number along with title */}
                      {/* {console.log(item, "show competieion id order")} */}
                    </option>
                  ))}
              </select>
            </div>
            {selectedCompetetion && (
              <>
                <p>Select Your Category</p>
                <div className={styles.submit_sec1_sub1}>
                  <select
                    className={styles.select}
                    name="category"
                    id=""
                    onChange={(e) => handleChangeCategory(e)}
                    placeholder="Select Category"
                    value={selectedCategory}
                  >
                    <option className={styles.option}>Select</option>
                    {categories.map((item) => (
                      <option
                        className={styles.option}
                        key={item.id}
                        value={item.id}
                      >
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div
                  className={styles.submit_sec1_sub2}
                  onChange={(e) => console.log(e.target.value)}
                >
                  {selectedCategory && (
                    <p
                      dangerouslySetInnerHTML={{
                        __html: categoryDescription,
                      }}
                    ></p>
                  )}
                </div>
              </>
            )}
            {isCategorySelected && (
              <>
                <p style={{ color: "white" }}>Submission Guidline</p>
                <div className={styles.submit_sec1_sub3}>
                  <Link
                    // href="/guide.pdf"
                    href={selectedCategory ? pdfFile : "/guide.pdf"}
                    // alt="alt text"
                    alt={pdfFileName} // Display the pdf file name as alt text
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {/* File.PDF Related By Category */}
                    {/* {pdfFileName} Display the pdf file name */}
                    <Image alt="pdf" src={pdfIcon} className={styles.icon} />
                    {/* <PictureAsPdfIcon className={styles.icon} /> */}
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>

        <div className={styles.devider}></div>

        <div className={styles.project_submit_sec}>
          <div className={styles.project_submit_sec_sub1}>
            <p>Entry Title</p>
            <input
              type="text"
              placeholder="Title"
              onChange={(e) => handleChangeTitle(e)}
            />
          </div>
          <div className={styles.project_submit_sec_sub2}>
            <p>Brief About Entry</p>
            <p>
              Tell your story in a way that’s clear, concise, and creative.
              Check our Guidelines for proven tips from other campaigns that
              have crowdfunded on ENT!
            </p>

            <textarea
              type="text"
              onChange={handleChangeBrief}
              value={project.brief}
            />

            <p>{500 - project.brief.length}/500 Words Maiximum</p>
          </div>
          <div className={styles.project_submit_sec_sub3}>
            <p>Upload Cover Image (width 1008px X Height 567px)</p>
            <ImgCrop
              aspect={16 / 9}
              // rotate
              rotationSlider // Use the rotationSlider prop for image rotation
            >
              <Upload
                className={styles.span}
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
              >
                {fileList.length < 1 && "+ Upload"}
              </Upload>
            </ImgCrop>

            <p>Upload Cover Image Maximum 2MB</p>
          </div>

          <div className={styles.project_submit_sec_sub4}>
            <p>Attach Entry File</p>
            <p>Total attachment size should be 50mb</p>

            <div>
              <Dropzone onDrop={handleDrop}>
                {({ getRootProps, getInputProps }) => (
                  <section className={styles.span1}>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p className="ant-upload-text">Select or drag file</p>
                      <p className="ant-upload-drag-icon">
                        {/* <InboxOutlined /> */}
                      </p>
                      <p className="ant-upload-hint">
                        File must be PDF,
                        {/* Doc. */}
                        Video, Audio
                      </p>
                    </div>
                  </section>
                )}
              </Dropzone>
              {list.map((file, index) => {
                const fileExtension = file.name.split(".").pop().toLowerCase();
                return (
                  <div key={index} className={styles.preview_parent}>
                    <div className={styles.sub_parent}>
                      {fileExtension === "pdf" && (
                        <div className={styles.preview}>
                          <a
                            href={URL.createObjectURL(file)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Image
                              alt="pdf"
                              src={pdfIcon}
                              className={styles.icon}
                            />

                            {/* <PictureAsPdfIcon className={styles.icon} /> */}
                          </a>
                        </div>
                      )}

                      {(fileExtension === "mp4" ||
                        fileExtension === "webm") && (
                        <video
                          className={styles.preview}
                          src={URL.createObjectURL(file)}
                          controls
                        />
                      )}
                      {(fileExtension === "mp3" || fileExtension === "wav") && (
                        <audio
                          className={styles.preview}
                          src={URL.createObjectURL(file)}
                          controls
                        />
                      )}

                      <div className={styles.flex}>
                        <p>({(file.size / 1024 / 1024).toFixed(2)} MB)</p>
                        <button onClick={() => handleDelete(index)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {uploading && <Progress percent={progress} />}
            </div>
          </div>
        </div>

        <div className={styles.terms_and_conditions_sec}>
          <h5>Terms & Conditions</h5>
          <p>
            Your privacy is important to us. It is Brainstormings policy to
            respect your privacy regarding any information we may collect from
            you across our website, and other sites we own and operate. <br />{" "}
            <br /> We only ask for personal information when we truly need it to
            provide a service to you. We collect it by fair and lawful means,
            with your knowledge and consent. We also let you know why we’re
            collecting it and how it will be used.
          </p>
          <label htmlFor="">
            <input type="checkbox" />
            Accept
          </label>

          <div className={styles.capcha_sec}>
            <Recaptcha
              className={styles.capcha}
              sitekey="6LfmywImAAAAAHE7hFKAVQmVIIg2UVZPWx7dxvr2"
              onChange={handleRecaptcha}
            />
          </div>
        </div>

        <div className={styles.btn_sec}>
          <div className={styles.btn_div}>
            <button onClick={(e) => PayLater(e)} disabled={loadingDraft}>
              {loadingDraft ? "Loading..." : "Save As Draft"}
            </button>
            {/* <Link href={{ pathname: "/payment", query: userComepetetionId }}> */}
            {isVerified && (
              <button onClick={(e) => onSubmit(e)} disabled={loadingNext}>
                {loadingNext ? "Loading..." : "Next"}
              </button>
            )}
          </div>
          {/* <ToastContainer /> */}
          <ToastContainer className="tost" />
        </div>
        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const res1 = await axios.get(
    // `${baseUrl}/api/competition-categories?competition_id=${1}`

    process.env.NEXT_PUBLIC_BASE_URL +
      "/api/competition-categories?competition_id=" +
      1
  );
  const data1 = res1.data;

  const res2 = await axios.get(
    // `${baseUrl}/api/competitions`
    process.env.NEXT_PUBLIC_BASE_URL + "/api/competitions"
  );
  const data2 = res2?.data?.response?.data.filter(
    (obj) => obj.status === "Active"
  );

  return { props: { data1, data2 } };
}
