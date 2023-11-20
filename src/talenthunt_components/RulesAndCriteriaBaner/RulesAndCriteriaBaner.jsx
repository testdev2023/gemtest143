import React, { useEffect, useState } from "react";
import styles from "../../../talenthunt_styles/RulesBaner.module.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import Loder from "../../components/Loder";
import Link from "next/link";
// import { toast } from "react-toastify";
import { toast, ToastContainer } from "react-toastify";

export default function RulesBaner({ page }) {
  const [rules, setRules] = useState();
  const [rulesLoader, setRulesLoader] = useState(false);
  const [loder, setLoder] = useState(true);

  const GetRules = async () => {
    try {
      await axios
        .get(
          // `${baseUrl}/api/faqs?page=${page}`
          process.env.NEXT_PUBLIC_BASE_URL + "/api/faqs?page=" + page
        )
        .then((response) => {
          setRules(response.data.faqs[0].list);
          setRulesLoader(true);
          setLoder(false);
        })
        .catch((error) => {
          // alert(error);
          toast.error(error, {
            autoClose: 5000,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetRules();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={styles.rules_baner_main}>
      {!loder || <Loder />}
      <div className={styles.rules_baner_sub}>
        <div className={styles.rules_baner_sec1}>
          <div
          // className={styles.dashline}
          // style={{ borderBottom: "5px solid #fcc100", width: "76px" }}
          ></div>
          <h2 className="color_yellow">
            {" "}
            <Link href="rulesandcriteria">Rules & Criteria</Link>{" "}
          </h2>
        </div>
        {rulesLoader ? (
          <div className={styles.rules_baner_sec2}>
            {rules?.map((rule, index) => (
              <React.Fragment key={index}>
                <Accordion className={styles.accordion}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon className={styles.icon} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={styles.accordion_heading}>
                      {rule?.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails className={styles.box_details}>
                    <Typography className={styles.box_pra}>
                      {rule?.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </React.Fragment>
            ))}
          </div>
        ) : (
          ""
        )}
        <ToastContainer className="tost" />
      </div>
    </div>
  );
}
