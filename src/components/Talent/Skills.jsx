import React, { useState } from 'react'
import styles from "../../../styles/EnrollAsTalent.module.css"

const Skills = () => {
    return (
        <div className={styles.aboutme_parent}>

            <div className={styles.child1}>
                <h1>Skills</h1>
                <p></p>

                <div className={styles.flex}>
                    <label htmlFor="name" >Talent</label>
                    <select name="" id="">
                        <option value="">Dance</option>
                        <option value="">Music</option>
                    </select>
                </div>
                <div className={styles.flex}>
                    <label htmlFor="name" >Talent type</label>
                    <select name="" id="">
                        <option value="">Clasic Dance</option>
                        <option value="">Music</option>
                    </select>
                </div>



                <div className={styles.flex2}>
                    <button>Add</button>
                </div>



                <div className={styles.flex4}>
                    <label htmlFor="name" >Dance</label>
                    <p>Classic Dance</p>
                </div>
                <div className={styles.flex4}>
                    <label htmlFor="name" >Singing</label>
                    <p>Pop singer</p>
                </div>
            </div>

            {/* <div className={styles.child1}>


        <div className={styles.flex3}>
            <h1>Social Media Links</h1>
            <button onClick={() => {
                setDisplay(true);
            }}>+ Add links</button>
        </div>

        {!display || (
            <div className={styles.flex3}>
                <div className={styles.flex}>
                    <label htmlFor="name" >Shocial plateform name</label>
                    <input type="text" />
                </div>

                <div className={styles.flex}>
                    <label htmlFor="name" >Shocial link</label>
                    <input type="text" />
                </div>

                <div className={styles.flex}>
                    <button onClick={() => {
                        setDisplay(false);
                    }}>ADD</button>
                </div>

            </div>
        )}


        <div className={styles.flex3}>
            <div className={styles.flex}>
                <label htmlFor="name" >Shocial plateform name</label>
                    <p>web link</p>
            </div>

            <div className={styles.flex}>
                <label htmlFor="name" >Shocial link</label>
                <p>https://sidat.net</p>
            </div>

            <div className={styles.flex}>
                <button >Edit</button>
            </div>
            <div className={styles.flex}>
                <button >Delete</button>
            </div>

        </div>


    </div> */}


        </div>
    )
}

export default Skills