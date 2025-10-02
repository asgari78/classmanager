import { Link } from "react-router-dom"
import styles from "../../styles/teacher/studentBar.module.css"
import { useState } from "react"
import { StudentPage } from "./"
import profileFake from "../../../public/images/emptyProfile.avif"

const StudentBar = ({ st, index, setShowStPage }) => {
    return (
        <div className={styles.student} key={index} onClick={() => { setShowStPage({ active: true, st: st }) }}>
            <img src={st.profileImage || profileFake} alt="studentImage" />
            <div className={styles.infoContainer}>
                <p>{st.namefamily} {<span style={{ color: st.roleId == 1 || st.roleId == 2 ? "#1d6c91" : "#2b2b2be5", fontWeight: st.roleId == 1 || st.roleId == 2 ? "bold" : 0 }} >({st.roleName})</span>}</p>
                <span>{st.groupName}</span>
            </div>
        </div>
    )
}

export default StudentBar