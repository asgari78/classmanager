import { Link } from "react-router-dom"
import styles from "../../styles/teacher/studentBar.module.css"
import { useState } from "react"
import StudentPage from "./StudentPage"

const StudentBar = ({ st, index }) => {
    const [showStPage, setShowStPage] = useState(false)
    return (
        <>
            <Link className={styles.student} key={index} onClick={() => { setShowStPage(true) }}>
                <img src={st.profileImage} alt="studentImage" />
                <div className={styles.infoContainer}>
                    <p>{st.namefamily} {<span style={{ color: st.roleId == 1 || st.roleId == 2 ? "#1d6c91" : "#2b2b2be5", fontWeight: st.roleId == 1 || st.roleId == 2 ? "bold" : 0 }} >({st.roleName})</span>}</p>
                    <span>{st.groupName}</span>
                </div>
            </Link>
            {showStPage === true ? <StudentPage setShowStPage={setShowStPage} st={st} /> : null}
        </>
    )
}

export default StudentBar