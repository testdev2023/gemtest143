import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styles from "../../../styles/Modal.module.css";
import Link from "next/link";
const PopupModal = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const user = localStorage.getItem("loginAuth")?.data?.api_token;

      if (!user) {
        setOpen(true);
      }
    }, 30000); // 5 minutes in milliseconds

    return () => clearTimeout(timeout);
  }, []);

  const handleOpenClose = () => {
    setOpen(!open);
  };

  return (
    <Modal
      open={open}
      onClose={handleOpenClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={styles.box}>
        <div className={styles.btn_div_mob}>
          <button
            className={styles.unitX_mob}
            variant="contained"
            onClick={handleOpenClose}
          >
            X
          </button>
        </div>
        <div className={styles.box_div1}>
          <p>
            Unlock exclusive content. Join for free or log in to access the
            members-only area.
          </p>
          <div className={styles.box_div2}>
            <Link href="/login"> Login </Link>
            <Link href="/signup"> Sign Up </Link>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default PopupModal;
