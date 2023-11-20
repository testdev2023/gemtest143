import React, { useState } from 'react'
import Footer from "../src/components/Footer/Footer";
import TopBar from "../src/components/TopBar/EntTopBar";
import ScrollToTopButton from "../src/components/ScrollToTopButton/ScrollToTopButton";
import styles from "../styles/EnrollAsTalent.module.css";
import AboutMe from '../src/components/Talent/AboutMe';
import Skills from '../src/components/Talent/Skills';
import Experience from '../src/components/Talent/Experience';
import Achievements from '../src/components/Talent/Achievements';
import Projects from '../src/components/Talent/Projects';
import Images from '../src/components/Talent/Images';
import Videos from '../src/components/Talent/Videos';

const EnrollAsTalent = () => {

    const [aboutme, setAboutMe] = useState(true)
    const [skills, setSkills] = useState(false)
    const [experience, setExperience] = useState(false)
    const [achievements, setAchievements] = useState(false)
    const [projects, setProjects] = useState(false)
    const [images, setImages] = useState(false)
    const [videos, setVideos] = useState(false)


    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <ScrollToTopButton />
            <TopBar />
            <div className={styles.parentContainer}>
                <h1>Enroll as Talent</h1>

                <ul className={styles.ul}>
                    <li onClick={() => {
                        setAboutMe(true),
                            setSkills(false),
                            setExperience(false),
                            setAchievements(false),
                            setProjects(false),
                            setImages(false),
                            setVideos(false)

                    }}>About Me</li>
                    <li onClick={() => {
                        setAboutMe(false),
                            setSkills(true),
                            setExperience(false),
                            setAchievements(false),
                            setProjects(false),
                            setImages(false),
                            setVideos(false)
                    }}>Skills</li>
                    <li onClick={() => {
                        setAboutMe(false),
                            setSkills(false),
                            setExperience(true),
                            setAchievements(false),
                            setProjects(false),
                            setImages(false),
                            setVideos(false)
                    }}>Experience</li>
                    <li onClick={() => {
                        setAboutMe(false),
                            setSkills(false),
                            setExperience(false),
                            setAchievements(true),
                            setProjects(false),
                            setImages(false),
                            setVideos(false)
                    }} >Achievements</li >
                    <li onClick={() => {
                        setAboutMe(false),
                            setSkills(false),
                            setExperience(false),
                            setAchievements(false),
                            setProjects(true),
                            setImages(false),
                            setVideos(false)
                    }}> Projects</li>
                    <li onClick={() => {
                        setAboutMe(false),
                            setSkills(false),
                            setExperience(false),
                            setAchievements(false),
                            setProjects(false),
                            setImages(true),
                            setVideos(false)
                    }} >Images</li>
                    <li onClick={() => {
                        setAboutMe(false),
                            setSkills(false),
                            setExperience(false),
                            setAchievements(false),
                            setProjects(false),
                            setImages(false),
                            setVideos(true)
                    }}>
                        Videos
                    </li>

                </ul>

                {!aboutme || (
                    <AboutMe />
                )}

                {!skills || (
                    <Skills />
                )}

                {!experience || (
                    <Experience />
                )}

                {!achievements || (
                    <Achievements />
                )}
                {!projects || (
                    <Projects />
                )}
                {!images || (
                    <Images />
                )}
                {!videos || (
                    <Videos />
                )}



                {/* {!step1 || (
          <SignupStep1
            setStep1={setStep1}
            setStep2={setStep2}
            setStep1Value={setStep1Value}
            setSignup={setSignup}
            signup={signup}
          />
        )} */}
            </div>

            {/* <Footer /> */}


        </div>
    )
}

export default EnrollAsTalent