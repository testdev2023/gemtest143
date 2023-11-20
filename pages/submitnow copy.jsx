import styles from "../talenthunt_styles/SubmitNow.module.css";
import TopBar from "../src/components/TopBar/EntTopBar";
import Footer from "../src/components/Footer/Footer";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { reactLocalStorage } from "reactjs-localstorage";
import Link from "next/link";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
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
import { basUrl } from "../src/config/Config";
const { Dragger } = Upload;

export default function SubmitNow(props) {
  const [isVerified, setIsVerified] = useState(false);
  const [banner, setBanner] = useState();
  const handleRecaptcha = (value) => {
    setIsVerified(!!value);
  };
  const router = useRouter();
  // const [files, setFiles] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [list, setList] = useState([]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setProject({ ...project, cover_image: fileList[0]?.originFileObj });
    console.log(project.cover_image?.originFileObj);
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

  // const filesprops = {
  //   name: "file",
  //   multiple: true,
  //   onChange(info) {
  //     const { status } = info.file;
  //     if (status !== "uploading") {
  //       console.log(info.file.originFileObj);
  //     }
  //     if (status === "done") {
  //       console.log(info.file.originFileObj);
  //       // setFiles([...files, info.file.originFileObj]);
  //       setProject({ ...project, files: info.file.originFileObj });
  //       console.log(project);
  //     } else if (status === "error") {
  //       alert(`${info.file.name} file upload failed.`);
  //     }
  //   },
  //   onDrop(e) {
  //     console.log("Dropped files", e.dataTransfer.files);
  //   },
  //   progress: {
  //     strokeColor: {
  //       "0%": "#108ee9",
  //       "100%": "#87d068",
  //     },
  //     strokeWidth: 3,
  //     format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
  //   },
  // };

  const [videos, setVideos] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const GetBanner = async () => {
    try {
      await axios
        .get(
          // `${baseUrl}/api/banners?s[page]=talenthunt/submit now&s[type]=Landing`
          process.env.NEXT_PUBLIC_BASE_URL +
            "/api/banners?s[page]=talenthunt/submit now&s[type]=Landing"
        )

        .then((response) => {
          setBanner(response?.data?.response?.data[0]);
        })
        .catch((error) => {
          // alert(error);
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
      // const formData = new FormData();
      // formData.append('video', video.file);
      setProject({ ...project, files: list });
    });

    // Wait for all videos to finish uploading
    axios.all(uploaders).then(() => {
      setUploading(false);
      toast.success("Videos Uploaded Successfully");
    });
  };

  const handleDelete = (index) => {
    const newVideos = [...videos];
    newVideos.splice(index, 1);
    setVideos(newVideos);
  };

  const handleVideoDuration = (e, index) => {
    const newVideos = [...videos];
    newVideos[index].duration = e.target.duration;
    setVideos(newVideos);
  };

  const handleDrop = (acceptedFiles) => {
    setList([...list, acceptedFiles[0]]);
    const newVideos = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name.replace(/\s/g, ""), // Remove spaces from filename
    }));
    setVideos([...videos, ...newVideos]);
  };

  //end of video

  const [categories, setCategories] = useState(props.data1.response.data);
  // console.log(props.data2);
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

  const handleChangeBrief = (e) => {
    setProject({ ...project, brief: e.target.value });
  };

  const handleChangeCategory = (e) => {
    setProject({ ...project, category_id: e.target.value });
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
    const matchingObject = await competetions?.find(
      (obj) => obj.id == categoryId
    );
    setProject({
      ...project,
      competition_id: matchingObject?.id,
      fee: matchingObject?.fee,
    });
  };

  const onSubmit = async () => {
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
        toast.success(response?.data?.message);
        setTimeout(() => {
          router.push({
            pathname: "payment",
            query: {
              user_competetion_id: response.data.data.user_competition_id,
              competetion_id: project.competition_id,
              competetion_category: project.category_id,
              competetion_title: project.title,
              competetion_brief: project.brief,
              competetion_fees: project.fee,
            },
          });
        }, 3000);

        // console.log(response);
      })
      .catch((error) => {
        toast.error(error?.message, { autoClose: 5000 });
      });
  };

  const PayLater = async () => {
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
        toast.success(response?.data?.message);
        setTimeout(() => {
          router.push("competitionentry");
        }, 3000);
      })
      .catch((error) => {
        toast.error(error?.message, { autoClose: 5000 });
      });
  };

  //getting competetion id

  // console.log(project);
  useEffect(() => {
    GetBanner();
  }, []);
  return (
    <div className={styles.submit_now_main}>
      <ScrollToTopButton />
      <TopBar />
      <div
        // className={styles.cover_baner}
        style={{
          width: "100%",
          maxWidth: "100vw",
          height: "650px",
          maxHeight: "100vh",
          backgroundImage: `linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 100%), url(${banner?.imageURL})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "50px",
        }}
      >
        {/* <div className={styles.dashline}></div> */}
        {/* <h1>Submit Now</h1> */}
        <h1>{banner?.title}</h1>
      </div>

      <div className={styles.select_categories}>
        <div className={styles.select_categories_heading}>
          {/* <div className={styles.dashline}></div> */}
          <h1>Submit Your Project</h1>
        </div>
        {/* <form onSubmit={handleSubmit}> */}
        <div className={styles.submit_sec1}>
          <p>Select Your Competetion</p>
          <div className={styles.submit_sec1_sub1}>
            <select
              className={styles.select}
              name="category"
              id=""
              onChange={(e) => {
                handleCategoryChange(e);
              }}
              placeholder="Select Competetion"
            >
              <option className={styles.option}>select</option>
              {competetions?.map((item) => (
                <>
                  <option
                    className={styles.option}
                    key={item.id}
                    value={item.id}
                  >
                    {item.title}
                  </option>
                </>
              ))}
            </select>
          </div>

          <p>Select Your Category</p>
          <div className={styles.submit_sec1_sub1}>
            <select
              className={styles.select}
              name="category"
              id=""
              onChange={(e) => handleChangeCategory(e)}
              placeholder="Select Category"
            >
              <option className={styles.option}>select</option>
              {categories.map((item) => (
                <>
                  <option className={styles.option} value={item.id}>
                    {item.name}
                  </option>
                </>
              ))}
            </select>
          </div>

          <div
            className={styles.submit_sec1_sub2}
            onChange={(e) => console.log(e.target.value)}
          >
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
              varius quam quisque id diam vel quam.
            </p>
          </div>

          <p style={{ color: "white" }}>Submission Guidline</p>
          <div className={styles.submit_sec1_sub3}>
            <PictureAsPdfIcon />
            <Link
              href="/guide.pdf"
              alt="alt text"
              target="_blank"
              rel="noopener noreferrer"
            >
              File Titlr.PDF
            </Link>
          </div>

          <div className={styles.submit_sec1_sub4}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
              varius quam quisque id diam vel quam.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.devider}></div>

      <div className={styles.project_submit_sec}>
        <div className={styles.project_submit_sec_sub1}>
          <p>Project Title</p>
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => handleChangeTitle(e)}
          />
        </div>
        <div className={styles.project_submit_sec_sub2}>
          <p>Brief About Project</p>
          <p>
            Tell your story in a way that’s clear, concise, and creative. Check
            our Guidelines for proven tips from other campaigns that have
            crowdfunded on ENT!
          </p>
          <textarea type="text" onChange={(e) => handleChangeBrief(e)} />
          <p>500 Words Maximum</p>
        </div>
        <div className={styles.project_submit_sec_sub3}>
          <p>Upload Cover Image (width 1024px X Height 768px)</p>
          <ImgCrop
            // className={styles.sapn}
            // style={{ backgroundColor: "green" }}
            // rotate
            rotationSlider
          >
            <Upload
              // style={{ba}}
              className={styles.span}
              // style={{ height: "300px", backgroundColor: "green" }}
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
          <p>Attach Project File</p>

          {/* <Dragger className={styles.span1} {...filesprops}>
            <p className="ant-upload-text">Select or drag file</p>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-hint">
              File must be PDF, Doc. Video, Audio
            </p>
          </Dragger> */}
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
                      File must be PDF, Doc. Video, Audio
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>

            {videos?.map((video, index) => (
              <div
                className={styles.preview_parent}
                key={index}
                // style={{
                //   display: "flex",
                //   alignItems: "center",
                //   marginTop: "16px",
                // }}
              >
                <video
                  className={styles.preview}
                  src={video.preview}
                  controls
                  onLoadedMetadata={(e) => handleVideoDuration(e, index)}
                />
                <div className={styles.content}>
                  <p>
                    <strong>{video.name}</strong>
                  </p>
                  <div className={styles.flex}>
                    <p>
                      ({(video.file.size / 1024 / 1024).toFixed(2)} MB) -{" "}
                      {video.duration ? video.duration.toFixed(2) : 0} seconds
                    </p>
                    <button onClick={() => handleDelete(index)}>
                      {/* <DeleteOutlined /> */}
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {uploading && <Progress percent={progress} />}
            <div className={styles.btn_div1}>
              <button
                className={styles.upload_btn}
                onClick={handleUpload}
                disabled={videos.length === 0 || uploading}
              >
                Upload Videos
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.promo_code_sec}>
        <p>Add a promo code</p>
        <div>
          <div>
            <input type="text" placeholder="Promo Code" />
            {/* <button>Apply</button> */}
          </div>
        </div>
      </div>

      <div className={styles.terms_and_conditions_sec}>
        <h5>Terms & Conditions</h5>
        <p>
          Your privacy is important to us. It is Brainstormings policy to
          respect your privacy regarding any information we may collect from you
          across our website, and other sites we own and operate. <br /> <br />{" "}
          We only ask for personal information when we truly need it to provide
          a service to you. We collect it by fair and lawful means, with your
          knowledge and consent. We also let you know why we’re collecting it
          and how it will be used.
        </p>
        <label htmlFor="">
          <input type="checkbox" />
          Accept
        </label>

        <div className={styles.capcha_sec}>
          <Recaptcha
            className={styles.capcha}
            style={
              {
                // fontWeight: 400,
                // fontSize: "12px",
                // lineHeight: "13px",
                // display: "flex",
                // alignItems: "center",
                // width: "100%",
                // letterSpacing: "-0.5px",
                // color: "#FF0101",
              }
            }
            // sitekey="6LcLP5klAAAAAEr1F_Ybb1A4A3kK70_PcP6ePii2"
            sitekey="6LfmywImAAAAAHE7hFKAVQmVIIg2UVZPWx7dxvr2"
            onChange={handleRecaptcha}
          />
        </div>
        {/* <p
          style={{
            fontWeight: 400,
            fontSize: "12px",
            lineHeight: "13px",
            display: "flex",
            alignItems: "center",
            letterSpacing: "-0.5px",
            color: "#FF0101",
          }}
        >
          Please verify that you are not a robot
        </p> */}

        {/* <div>
          <Recaptcha
            sitekey="6LcLP5klAAAAAEr1F_Ybb1A4A3kK70_PcP6ePii2"
            onChange={handleRecaptcha}
          />
          {isVerified && <p>Recaptcha verified!</p>}
        </div> */}
      </div>

      <div className={styles.btn_sec}>
        <div className={styles.btn_div}>
          <button onClick={(e) => PayLater(e)}>Save As Draft</button>
          {/* <Link href={{ pathname: "/payment", query: userComepetetionId }}> */}
          {isVerified && <button onClick={(e) => onSubmit(e)}>Next</button>}
          {/* </Link> */}
        </div>
        {/* <ToastContainer /> */}
        <ToastContainer className="tost" />
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  const res1 = await axios.get(
    // `${baseUrl}/api/competition-categories?competition_id=${1}`
    process.env.NEXT_PUBLIC_BASE_URL +
      " /api/competition-categories?competition_id=" +
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
