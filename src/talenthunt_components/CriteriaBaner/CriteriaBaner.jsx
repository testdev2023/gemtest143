import React from "react";
import styles from "../../../talenthunt_styles/CriteriaBaner.module.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function CriteriaBaner() {
  return (
    <div className={styles.Criteria_baner_main}>
      <div className={styles.Criteria_baner_sub}>
        <div className={styles.Criteria_baner_sec1}>
          <div
          // className={styles.dashline}
          // style={{ borderBottom: "5px solid #fcc100", width: "76px" }}
          ></div>
          <h1>Criteria</h1>
        </div>
        <div className={styles.Criteria_baner_sec2}>
          <Accordion className={styles.accordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className={styles.icon} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={styles.accordion_heading}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={styles.box_details}>
              <Typography className={styles.box_pra}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion className={styles.accordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className={styles.icon} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={styles.accordion_heading}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={styles.box_details}>
              <Typography className={styles.box_pra}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion className={styles.accordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className={styles.icon} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={styles.accordion_heading}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={styles.box_details}>
              <Typography className={styles.box_pra}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion className={styles.accordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className={styles.icon} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={styles.accordion_heading}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={styles.box_details}>
              <Typography className={styles.box_pra}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion className={styles.accordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className={styles.icon} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={styles.accordion_heading}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={styles.box_details}>
              <Typography className={styles.box_pra}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
