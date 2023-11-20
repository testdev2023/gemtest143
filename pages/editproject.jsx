import styles from "../talenthunt_styles/SubmitNow.module.css";
import TopBar from "../src/components/TopBar/EntTopBar";
import Footer from "../src/components/Footer/Footer";
import axios from "axios";
import { useEffect, useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import { DropzoneArea } from "material-ui-dropzone";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useRouter } from "next/router";
import { reactLocalStorage } from "reactjs-localstorage";
// import { InboxOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import ScrollToTopButton from "../src/components/ScrollToTopButton/ScrollToTopButton";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Upload, message, Progress } from "antd";
// import { DeleteOutlined } from "@ant-design/icons";
import Dropzone from "react-dropzone";
// import { baseUrl } from "../src/config/Config";
import Loder from "../src/components/Loder";
import InnerBaner from "../src/components/Baner/innerBaner";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import pdfIcon from "../src/asset/icon/PDF_file_icon.svg";
import Image from "next/image";

export default function EditProject() {
  const router = useRouter();
  const {
    competetion_id,
    // competetions_name,
    // competetion_category,
    // competetion_title,
    // competetion_brief,
    // competetion_cover_image,
    // competetion_files,
  } = router.query;

  const [competitionData, setCompetitionData] = useState();

  useEffect(() => {
    // Check if competition_id is available
    if (competetion_id) {
      // Construct the API URL with the competition_id
      const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/competition/participant-details?user_competition_id=${competetion_id}`;

      // Make an Axios GET request to fetch competition data
      axios
        .get(apiUrl)
        .then((response) => {
          // Handle successful API response and update competitionData state
          const responseData = response?.data?.response?.data;

          setCompetitionData(responseData);
          setTitle(responseData?.title || "");
          setBrief(responseData?.brief || "");
          setFiles(responseData.files);
          setCompetetion(responseData?.competition?.title);
          setCategory(responseData?.category?.name);
          setDescription(responseData?.brief || "");
          setParsed(responseData?.files);
          // Initialize fileList with the coverImage from the API response
          setFileList([
            {
              uid: "-1",
              name: "image.png",
              status: "done",
              url: responseData?.cover_image || "", // Set the URL here
            },
          ]);
        })
        .catch((error) => {
          // Handle API error
          console.error("Error fetching competition data:", error);
        });
    }
  }, [competetion_id]);

  // const [fileList, setFileList] = useState([
  //   {
  //     uid: "-1",
  //     name: "image.png",
  //     status: "done",
  //     url: coverImage,
  //     // url: ,
  //   },
  // ]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);

    setCover_image(fileList[0]?.originFileObj);
  };
  const onPreview = async (file) => {
    let src = file?.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader?.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [id, setId] = useState(competetion_id);
  const [competetion, setCompetetion] = useState();
  const [category, setCategory] = useState();
  const [title, setTitle] = useState();
  const [brief, setBrief] = useState();
  const [cover_image, setCover_image] = useState();
  const [description, setDescription] = useState();
  const [files, setFiles] = useState([]);
  const [loder, setLoder] = useState(false);
  const [banner, setBanner] = useState();
  const [bannerLoader, setBannerLoader] = useState(false);
  // const [coverImage, setCoverImage] = useState("");
  const [coverImage, setCoverImage] = useState("");

  // const [fileList, setFileList] = useState([
  //   {
  //     uid: "-1",
  //     name: "image.png",
  //     status: "done",
  //     url: coverImage,
  //   },
  // ]);
  const [fileList, setFileList] = useState([]);

  //start video
  const [parsed, setParsed] = useState(null);

  const [videos, setVideos] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const GetBanner = async () => {
    try {
      await axios
        .get(
          // `${baseUrl}/api/banners?s[page]=invest&s[type]=Landing`
          process.env.NEXT_PUBLIC_BASE_URL +
            "/api/banners?s[page]=Edit Project&s[type]=Landing"
        )
        .then((response) => {
          setBanner(response?.data?.response?.data[0]);
          setBannerLoader(true);
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

    const uploaders = videos?.map((video) => {
      setFiles(list);
    });

    // Wait for all videos to finish uploading
    axios.all(uploaders).then(() => {
      setUploading(false);
      // toast.success("All videos uploaded successfully!");
    });
  };

  useEffect(() => {
    // Monitor changes in the videos state and trigger upload
    if (videos.length > 0 && !uploading) {
      handleUpload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videos]);
  const handleDelete = (index) => {
    // Clone the list of files
    const newList = [...list];
    // Remove the file from the list
    newList.splice(index, 1);
    // Update the list state
    setList(newList);

    // Clone the videos state
    const newVideos = [...videos];
    // Remove the file from the videos state if it exists
    if (newVideos[index]) {
      newVideos.splice(index, 1);
      // Update the videos state
      setVideos(newVideos);
    }

    // Get the file to be deleted
    const fileToDelete = parsed[index];

    // Remove the file from the parsed state if it exists
    if (fileToDelete) {
      const newParsed = parsed.filter((file) => file.id !== fileToDelete.id);
      // Update the parsed state
      setParsed(newParsed);
    } // Notify the user that the file has been deleted
    toast.success("File deleted successfully!", { autoClose: 5000 });
  };

  const handleVideoDuration = (e, index) => {
    const newVideos = [...videos];
    newVideos[index].duration = e?.target?.duration;

    // newVideos[index].file_extension = "pdf";

    // Get the video Blob object from the video source
    const audioBlob = newVideos[index].file; // Assuming you have the audio file directly in the newVideos array

    if (audioBlob) {
      // Extract the file extension from the Blob's type property
      const mimeType = audioBlob.type;
      let extension;

      if (mimeType === "audio/mpeg" || mimeType === "audio/mp3") {
        extension = "mp3"; // Handle both generic "audio/mpeg" and specific "audio/mp3" MIME types
      } else {
        // If the MIME type is not available or is not recognized as MP3,
        // try to get the file extension from the file name itself
        extension = newVideos[index].name.split(".").pop();
      }

      newVideos[index].file_extension = extension.toLowerCase(); // Convert to lowercase for consistency
    }

    setVideos(newVideos);
  };
  const MAX_FILE_SIZE_MB = 50;
  const handleDrop = (acceptedFiles) => {
    const allowedExtensions = ["pdf", "mp3", "mp4"];
    const validFiles = acceptedFiles.filter((file) => {
      const extension = file.name.split(".").pop().toLowerCase();

      if (!allowedExtensions.includes(extension)) {
        toast.error("Please upload valid PDF, MP3, or MP4 files.", {
          autoClose: 5000,
        });
        return false;
      }
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        toast.error(
          `File size exceeds the maximum limit of ${MAX_FILE_SIZE_MB}MB.`,
          { autoClose: 5000 }
        );
        return false;
      }
      // Check if a file of the same type already exists in 'list', 'parsed', or 'videos'
      if (
        list.some(
          (existingFile) => getFileExtension(existingFile.name) === extension
        ) ||
        parsed.some(
          (existingFile) =>
            getFileExtension(existingFile.file_url) === extension
        ) ||
        videos.some((existingFile) => existingFile.file_extension === extension)
      ) {
        toast.error(
          `You have already uploaded a file with the ${extension} extension.`,
          { autoClose: 5000 }
        );
        return false;
      }

      return true;
    });

    if (validFiles.length === 0) {
      // toast.error("Please upload valid PDF, MP3, or MP4 files.", {
      //   autoClose: 5000,
      // });
      return;
    }
    setList([...list, ...validFiles]);
    const totalFiles = parsed.length + videos.length + validFiles.length;
    // Check if the total number of files exceeds the limit (3)
    if (totalFiles > 3) {
      // Display an error message or notification to the user
      toast.error("You can upload a maximum of 3 files.", { autoClose: 5000 });
      return;
    }
    // Get the unique file extensions of existing files
    const existingExtensions = new Set(
      [...parsed, ...videos].map((file) => getFileExtension(file.file_url))
    );

    // Filter out new files that have extensions matching existing extensions
    const newFiles = validFiles.filter((file) => {
      // const extension = file.name.split(".").pop().toLowerCase();
      const extension = getFileExtension(file.name);
      // Check if the file with the same extension exists in the list
      const existingFileIndex = list.findIndex(
        (existingFile) => getFileExtension(existingFile.name) === extension
      );

      if (existingFileIndex !== -1) {
        // File with the same extension exists in list; don't include it
        toast.error(
          `You have already uploaded a file with the ${extension} extension.`,
          { autoClose: 5000 }
        );
        return false;
      }
      if (existingExtensions.has(extension)) {
        toast.error(
          `You have already uploaded a file with the ${extension} extension.`,
          { autoClose: 5000 }
        );
        return false;
      }
      // Check if the extension is in parsed or videos
      if (
        parsed.some(
          (existingFile) =>
            getFileExtension(existingFile.file_url) === extension
        ) ||
        videos.some((existingFile) => existingFile.file_extension === extension)
      ) {
        toast.error(
          `You have already uploaded a file with the ${extension} extension.`,
          { autoClose: 5000 }
        );
        return false; // Do not include this file in the newFiles array
      }
      // Add the extension to the existingExtensions set
      existingExtensions.add(extension);

      return true;
    });

    // Update the state with the list of new files
    setList([...list, ...newFiles]);
    if (newFiles.length === 0) {
      // toast.error("You have already uploaded a file with this extension.");
      return;
    }

    const newVideos = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name.replace(/\s/g, ""),
      file_extension: file.type.split("/").pop(), // Dynamically set file extension

      // file_extension: "pdf", // Remove spaces from filename
    }));
    // Check if the total number of videos (existing + new) exceeds the limit (3)
    if (parsed.length + videos.length + newVideos.length <= 3) {
      setVideos([...videos, ...newVideos]);
      handleUpload();
    } else {
      toast.error("You can upload a maximum of 3 files.", { autoClose: 5000 });
    }
  };

  const getFileExtension = (url) => {
    // Check if 'url' is defined and not empty
    if (url) {
      // Extract the file extension from the URL using regex
      const extension = url.split(".").pop();
      if (extension) {
        return extension.toLowerCase();
      }
    }
    // If 'url' or 'extension' is undefined, return a default value or handle the situation as needed
    return "";
  };

  // useEffect to monitor changes in the 'videos' state and trigger upload
  useEffect(() => {
    // Check if videos exist and 'uploading' state is false
    if (videos.length > 0 && !uploading) {
      handleUpload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videos]);
  //end video

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      toast.error("Please fill in the Project Title.", { autoClose: 5000 });
      return;
    }

    if (!brief) {
      toast.error("Please provide a brief about the project.", {
        autoClose: 5000,
      });
      return;
    }

    if (videos.length === 0 && parsed.length === 0) {
      toast.error("Please upload at least one Project File.", {
        autoClose: 5000,
      });
      return;
    }

    // Set the loading state to true to show the loading indicator
    setLoading(true);
    const updatedProject = {
      user_compeition_id: id,
      title: title,
      brief: brief,
      category: category,
      competetion: competetion,
      description: description,
      cover_image: cover_image,
      files: files,
    };

    await axios
      .post(
        process.env.NEXT_PUBLIC_BASE_URL +
          "/api/member/user-competition/update",

        updatedProject,
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
        toast.success(response?.data?.message, { autoClose: 5000 });
        setLoder(false);

        setTimeout(() => {
          router.push("competitionentry");
        }, 5000);
      })
      // .catch((error) => {
      //   console.error(error);
      // });
      .catch((error) => {
        // toast.error(error?.message);
        if (error?.message === "Request failed with status code 413") {
          toast.warn(
            "File size exceeds the maximum limit of 10MB. Please choose a smaller file.",
            { autoClose: 5000 }
          );
          setLoder(false);
        } else {
          toast.error(error?.message, { autoClose: 5000 });
          setLoder(false);
        }
      });
  };

  const deleteCompetetionFile = async (fileID) => {
    try {
      await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL +
          "/api/member/user-competition-file/delete?file_id=" +
          fileID,

        {
          headers: {
            Authorization:
              "Bearer " +
              reactLocalStorage.getObject("loginAuth").data?.api_token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Remove the deleted file from the 'parsed' state
      setParsed((prevParsed) =>
        prevParsed.filter((file) => file.id !== fileID)
      );

      // console.log("Updated parsed state after deletion:", parsed);

      toast.success("File deleted successfully!", { autoClose: 5000 });
    } catch (error) {
      toast.error("Error deleting file.", { autoClose: 5000 });
      console.error(error);
    }
  };
  useEffect(() => {
    GetBanner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleChangeBrief = (e) => {
    const inputText = e.target.value;
    if (inputText.length <= 500) {
      setBrief(inputText);
    }
  };

  return (
    <div className={styles.submit_now_main}>
      <ScrollToTopButton />
      <TopBar />
      {!loder || <Loder />}

      <InnerBaner
        source={
          banner?.file_type == "image" ? banner?.imageURL : banner?.videoURL
        }
        fileType={banner?.file_type}
        headingBanner={banner?.title}
      />

      <div className={styles.project_submit_sec}>
        <div className={styles.submit_sec}>
          {/* competetion */}
          <div className={styles.submit_sec1_sub1}>
            <p>Your Competition</p>
            <select
              className={styles.select}
              name="competetion"
              id=""
              placeholder="Select Competition"
              disabled
            >
              <option className={styles.option}>{competetion}</option>
            </select>
          </div>

          <div className={styles.submit_sec1_sub1}>
            <p>Your Category</p>
            <select
              className={styles.select}
              name="category"
              id=""
              placeholder="Select Category"
              disabled
            >
              <option className={styles.option}>{category}</option>
            </select>
          </div>
        </div>

        <div className={styles.project_submit_sec_sub1}>
          <p>Entry Title</p>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e?.target?.value)}
          />
        </div>
        <div className={styles.project_submit_sec_sub2}>
          <p>Brief About Entry</p>
          <p
          // style={{
          //   fontWeight: "400",
          //   fontSize: "14px;",
          //   lineHeight: "27px",
          //   color: "#C2C2C2",
          // }}
          >
            Tell your story in a way that’s clear, concise, and creative. Check
            our Guidelines for proven tips from other campaigns that have
            crowdfunded on ENT!
          </p>
          <textarea
            type="text"
            value={brief}
            // onChange={(e) => setBrief(e?.target?.value)}
            onChange={handleChangeBrief}
            maxLength={500}
          />
          <p
            style={{
              fontWeight: "400",
              fontSize: "14px;",
              lineHeight: "27px",
              color: "#C2C2C2",
            }}
          >
            {/* 500 Words Maximum */}
            {500 - brief?.length} characters remaining
          </p>
        </div>
        <div className={styles.project_submit_sec_sub3}>
          <p>Edit Cover Image (width 1008px X Height 567px)</p>

          <ImgCrop
            aspect={16 / 9}
            rotationSlider
            // rotate
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
        </div>
        <div className={styles.project_submit_sec_sub4}>
          <p>Edit Entry File</p>
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
                      File must be PDF, Video, Audio
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>

            {parsed?.map((video, index) => (
              <div key={index} className={styles.preview_parent}>
                <div className={styles.sub_parent}>
                  {getFileExtension(video.file_url) === "pdf" && (
                    // <embed src={video.file_url} width="200px" height="150px" />
                    <div className={styles.preview}>
                      <a
                        className={styles.pdfButton}
                        onClick={() => window.open(video.file_url, "_blank")}
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
                  {(getFileExtension(video.file_url) === "mp4" ||
                    getFileExtension(video.file_url) === "webm") && (
                    <video
                      className={styles.preview}
                      src={video.file_url}
                      style={{
                        width: "200px",
                        height: "150px",
                        marginRight: "16px",
                      }}
                      controls
                    />
                  )}
                  {getFileExtension(video.file_url) === "mp3" && (
                    <audio className={styles.preview} controls>
                      <source src={video.file_url} type="audio/mpeg" />
                    </audio>
                  )}
                  {getFileExtension(video.file_url) === "wav" && (
                    <audio className={styles.preview} controls>
                      <source src={video.file_url} type="audio/wav" />
                    </audio>
                  )}
                  <div className={styles.flex}>
                    <button onClick={() => deleteCompetetionFile(video.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {/* Display new videos being uploaded */}
            {videos?.map((video, index) => (
              <div
                key={index}
                // style={{
                //   display: "flex",
                //   alignItems: "center",
                //   marginTop: "16px",
                // }}
                className={styles.preview_parent}
              >
                <div className={styles.sub_parent}>
                  {video.file_extension === "pdf" && (
                    //  <embed src={video.preview} width="200px" height="150px" />

                    <a onClick={() => window.open(video.preview, "_blank")}>
                      <Image alt="pdf" src={pdfIcon} className={styles.icon} />

                      {/* <PictureAsPdfIcon className={styles.icon} /> */}
                    </a>
                  )}
                  {(video.file_extension === "mp4" ||
                    video.file_extension === "webm") && (
                    <video
                      className={styles.preview}
                      src={video.preview}
                      style={{
                        width: "200px",
                        height: "150px",
                        marginRight: "16px",
                      }}
                      controls
                      onLoadedMetadata={(e) => handleVideoDuration(e, index)}
                    />
                  )}
                  {video.file_extension === "mpeg" && (
                    <audio className={styles.preview} controls>
                      <source src={video.preview} type="audio/mpeg" />
                    </audio>
                  )}
                  {video.file_extension === "wav" && (
                    <audio className={styles.preview} controls>
                      <source src={video.preview} type="audio/wav" />
                    </audio>
                  )}
                  {/* <div className={styles.content}> */}
                  <p>{/* <strong>{video?.name}</strong> */}</p>
                  <div className={styles.flex}>
                    <p>
                      ({(video?.file?.size / 1024 / 1024).toFixed(2)} MB)
                      {/* {video?.duration ? video?.duration?.toFixed(2) : 0}{" "} */}
                      {/* seconds */}
                    </p>
                    <button onClick={() => handleDelete(index)}>
                      {/* <DeleteOutlined /> */}
                      Delete
                    </button>
                    {/* </div> */}
                  </div>
                </div>
              </div>
            ))}
            {uploading && <Progress percent={progress} />}
            {/* <div className={styles.btn_div1}>
              <button
                className={styles.upload_btn}
                onClick={handleUpload}
                disabled={videos.length === 0 || uploading}
              >
                Upload Videos
              </button>
            </div> */}
          </div>
        </div>
      </div>

      <div className={styles.btn_sec}>
        <div className={styles.btn_div}>
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
        <ToastContainer className="tost" />
        {/* <ToastContainer/> */}
      </div>

      <Footer />
    </div>
  );
}
