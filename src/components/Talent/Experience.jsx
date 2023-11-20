import React, { useState } from 'react'

import styles from "../../../styles/EnrollAsTalent.module.css"

const Experience = () => {

    const [display, setDisplay] = useState(false)
    return (
        <div className={styles.aboutme_parent}>

            <div className={styles.child1}>
                <h1>Experience</h1>

                <div className={styles.flex}>
                    <label htmlFor="name" >Title</label>
                    <input type="text" />
                </div>
                <div className={styles.flex5}>
                    <div className={styles.flex}>
                        <label htmlFor="name" >Start</label>
                        <input type="date" />
                    </div>
                    <div className={styles.flex}>
                        <label htmlFor="name" >End</label>
                        <input type="date" />
                    </div>
                </div>


                <div className={styles.flex}>
                    <label htmlFor="name" >Address</label>
                    <input type="text" />
                </div>

                <div className={styles.flex}>
                    <label htmlFor="name" >Discription</label>
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                </div>

                <div className={styles.flex2}>
                    <button>Add</button>
                </div>
            </div>


            {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}

            <div className={styles.child1}>


                <div className={styles.flex6}>
                    <h1 className={styles.h1}>InfoTech Technology</h1>
                    <div>

                        <button >Edit</button>
                        <button >Delete</button>
                    </div>

                </div>

                <div className={styles.flex5}>
                    <p>9 May, 2022 - 9 Dec, 2022</p>
                    <p>Street 4th, chicago, USA</p>
                </div>

                <div className={styles.flex}>
                    <p>There are many variations of There are many variations of There are many variations of There are many variations of There are many variations of There are many variations of There are many variations of There are many variations of There are There are many variations of There are many variations of There are many variations of There are many variations of There are many variations of There are many variations of There are many variations of There are many variations of There are There are many variations of There are many variations of There are many variations of There are many variations of There are many variations of There are many variations of There are many variations of There are many variations of There</p>
                </div>





            </div>


        </div >
    )
}

export default Experience