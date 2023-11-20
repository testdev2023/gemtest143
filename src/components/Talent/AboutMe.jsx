import React, { useState } from 'react'

import styles from "../../../styles/EnrollAsTalent.module.css"

const AboutMe = () => {

    const [display, setDisplay] = useState(false)
    return (
        <div className={styles.aboutme_parent}>

            <div className={styles.child1}>
                <h1>About Me</h1>

                <div className={styles.flex}>
                    <label htmlFor="name" >Name</label>
                    <input type="text" />
                </div>

                <div className={styles.flex}>
                    <label htmlFor="name" >Email</label>
                    <input type="email" />
                </div>

                <div className={styles.flex}>
                    <label htmlFor="name" >Phone</label>
                    <input type="number" />
                </div>
                <div className={styles.flex}>
                    <label htmlFor="name" >Height</label>
                    <input type="number" />
                </div>
                <div className={styles.flex}>
                    <label htmlFor="name" >Weight</label>
                    <input type="number" />
                </div>

                <div className={styles.flex}>
                    <label htmlFor="name" >Hair</label>
                    <input type="text" />
                </div>
                <div className={styles.flex}>
                    <label htmlFor="name" >Eyes</label>
                    <input type="text" />
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
                    <button>Save Changes</button>
                </div>
            </div>


            {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}

            <div className={styles.child1}>


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


            </div>


        </div>
    )
}

export default AboutMe