import React, { useState } from "react";
import styles from "../../../styles/EnrollAsTalent.module.css";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import pic from "../../asset/events/06.png";
import Image from "next/image";

const Images = () => {
  return (
    <div className={styles.aboutme_parent}>
      <div className={styles.child1}>
        <ImgCrop rotationSlider>
          <Upload
            listType="picture-card"
            // fileList={fileList}
            // onChange={onChange}
            // onPreview={onPreview}
          >
            {/* {fileList.length < 1 && "+ Upload"} */}
          </Upload>
        </ImgCrop>
      </div>

      <div className={styles.child4}>
        <div className={styles.img_card}>
          <Image src={pic} loading="lazy" alt="pic" />
        </div>
        <div className={styles.img_card}>
          <Image src={pic} loading="lazy" alt="pic" />
        </div>
        <div className={styles.img_card}>
          <Image src={pic} loading="lazy" alt="pic" />
        </div>
        <div className={styles.img_card}>
          <Image src={pic} loading="lazy" alt="pic" />
        </div>
        <div className={styles.img_card}>
          <Image src={pic} loading="lazy" alt="pic" />
        </div>
        <div className={styles.img_card}>
          <Image src={pic} loading="lazy" alt="pic" />
        </div>
      </div>
    </div>
  );
};

export default Images;
