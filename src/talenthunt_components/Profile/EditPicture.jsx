/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import styles from "../../../talenthunt_styles/EditProfile.module.css";
import DoneIcon from "@mui/icons-material/Done";
import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import profilevector from "../../asset/profile_vector.png";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import Image from "next/image";
import { useRouter } from "next/router";

const EditPicture = ({
  setProfile,
  setEditProfile,
  setEditPicture,
  profileImage,
}) => {
  const isValidImageURL = (url) => {
    return /\.(png|jpg|jpeg)$/i.test(url);
  };
  const showProfileImage = isValidImageURL(profileImage);

  const router = useRouter();
  const [user, setUser] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [fileList, setFileList] = useState(
    //   [
    //   {
    //     uid: "-1",
    //     name: "image.png",
    //     status: "done",
    //     url: profileImage,
    //   },
    // ]
    showProfileImage
      ? [
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: profileImage,
          },
        ]
      : [
          {
            uid: "-2",
            name: "image.png",
            status: "done",
            url: profilevector.src,
          },
        ]
  );

  const defaultimage = profilevector.src;
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);

    // Check if newFileList is empty
    if (newFileList.length === 0) {
      // If fileList length is zero (image removed), set newImage to null
      setNewImage(null);
    } else {
      // Otherwise, set newImage to the first file in the list
      setNewImage(newFileList[0]?.originFileObj);
      // Automatically trigger image upload when a new image is selected
      HandleUpload();
    }
  };
  // useEffect(() => {
  //   // Automatically trigger image upload when newImage is set
  //   if (newImage) {
  //     HandleUpload();
  //   }
  // }, [newImage]);
  const handleRemove = (file) => {
    // Remove the file from the fileList
    const updatedFileList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(updatedFileList);

    // If the removed file was the selected newImage, clear newImage
    if (newImage && newImage.uid === file.uid) {
      setNewImage(null);
    }
    if (updatedFileList.length === 0) {
      setNewImage(null);
    }
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
    const imgWindow = window.open();
    imgWindow?.document.write(`<img src="${src}" alt="Preview" />`);
    imgWindow?.document.close();
  };
  const getUser = () => {
    axios
      .get(
        // `${baseUrl}/api/member/user_profile`
        process.env.NEXT_PUBLIC_BASE_URL + "/api/member/user_profile",
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
        setUser(response?.data?.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  const HandleUpload = async () => {
    let imageToUpload = newImage;

    if (fileList.length === 0) {
      // If no new image is uploaded and fileList is empty, use default image
      imageToUpload = defaultimage;
    }
    // If newImage is null and fileList is empty, apply default image

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/member/update_bio",
        { photo: imageToUpload },
        {
          headers: {
            Authorization:
              "Bearer " +
              reactLocalStorage.getObject("loginAuth").data?.api_token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200 && response.data) {
        console.log(response, "checking ");
        setEditPicture(false);
        setEditProfile(false);
        setProfile(true);
        await handleResponseAndNavigation();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleResponseAndNavigation = async () => {
    try {
      // Navigate and reload
      router.push("/userprofile?reload=true");
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Reload the page
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.edit_picture_main_parent}>
      <div className={styles.edit_picture_main}>
        <div className={styles.edit_picture_main_sub}>
          <h3 className="yellow">Profile Photo</h3>
          {/* <button onClick={HandleUpload}>
            <DoneIcon /> Update
          </button> */}
        </div>

        <div className={styles.edit_picture_main_sub1}>
          <ImgCrop className={styles.testclass} rotationSlider>
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
              onRemove={(file) => handleRemove(file)}
            >
              {/* {fileList.length === 0 && (
                <Image
                  src={defaultimage}
                  width={200}
                  height={200}
                  alt="profile"
                />
              )} */}
              {fileList.length === 0 ? (
                <div className="ant-upload-text"> + Upload</div>
              ) : null}
            </Upload>
          </ImgCrop>
        </div>
      </div>
    </div>
  );
};

export default EditPicture;
