import React, { useState } from 'react'

import styles from "../../../styles/EnrollAsTalent.module.css"

const Achievements = () => {

    return (
        <div className={styles.aboutme_parent}>

            <div className={styles.child1}>
                <h1>Achievements</h1>

                <div className={styles.flex}>
                    <label htmlFor="name" >Program name</label>
                    <input type="text" />
                </div>
                <div className={styles.flex}>
                    <h4>Tell More About Your Achievements</h4>
                    <p className={styles.ap} >Tell your story in a way that’s clear, concise, and creative. Check our Guidelines for proven tips from other campaigns that have crowdfunded on ENT!</p>
                    {/* <input type="text" /> */}
                </div>


                <div className={styles.flex}>
                    {/* <label htmlFor="name" >Discription</label> */}
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                </div>

                <div className={styles.flex2}>
                    <button>Add</button>
                </div>
            </div>


            {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}

            <div className={styles.child3}>

                <div className={styles.achivments_card}>
                    <div className={styles.flex6}>
                        <h1>Dance Fest</h1>

                        <div>
                            <button>Delete</button>
                            <button>Edit</button>
                        </div>
                    </div>

                        <p>
                        There are many variations of There are many variations of There are many variations of There are many variations of There are many variations of There are many variations of There are many variations of There are many variations of There are 
                        </p>
                </div>

                <div className={styles.achivments_card}>
                    <div className={styles.flex6}>
                        <h1>Dance Fest</h1>

                        <div>
                            <button>Delete</button>
                            <button>Edit</button>
                        </div>
                    </div>

                        <p>
                        There are many variations of There are many variations of There are many variations of There are many variations of There are many variations of There are many variations of There are many variations of There are many variations of There are 
                        </p>
                </div>

                <div className={styles.achivments_card}>
                    <div className={styles.flex6}>
                        <h1>Dance Fest</h1>

                        <div>
                            <button>Delete</button>
                            <button>Edit</button>
                        </div>
                    </div>

                        <p>
                        There are many variations of There are many variations of There are many variations of There are many variations of There are many variations of There are many variations of There are many variations of There are many variations of There are 
                        </p>
                </div>

                <div className={styles.achivments_card}>
                    <div className={styles.flex6}>
                        <h1>Dance Fest</h1>

                        <div>
                            <button>Delete</button>
                            <button>Edit</button>
                        </div>
                    </div>

                        <p>
                        There are many variations of There are many variations of There are many variations of There are many variations of There are many variations of There are many variations of There are many variations of There are many variations of There are 
                        </p>
                </div>


            </div>

        </div >
    )
}

export default Achievements