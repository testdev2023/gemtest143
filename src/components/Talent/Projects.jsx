import React, { useState } from 'react'

import styles from "../../../styles/EnrollAsTalent.module.css"

const Projects = () => {

    const [display, setDisplay] = useState(false)
    return (
        <div className={styles.aboutme_parent}>

            <div className={styles.child1}>
                <h1>Projects</h1>

                <div className={styles.flex}>
                    <label htmlFor="name" >Project Name</label>
                    <input type="text" />
                </div>

                <div className={styles.flex}>
                    <label htmlFor="name" >Category</label>
                    <input type="text" />
                </div>

                <div className={styles.flex}>
                    <label htmlFor="name" >Directors</label>
                    <input type="text" />
                </div>
                <div className={styles.flex}>
                    <label htmlFor="name" >Authors</label>
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

                {/* iska preiew is lye nhi banayaq k input me image nhi ly rhy ye sir se discuss */}

            </div>


        </div>
    )
}

export default Projects