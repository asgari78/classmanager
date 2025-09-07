import { Link } from "react-router-dom"
import styles from "../../styles/teacher/myStudent.module.css"
import { useState } from "react"
import MyStPage from "./MyStPage"

const MyStudent = ({ st, index }) => {
    const [showStPage, setShowStPage] = useState(false)
    return (
        <>
            <Link className={styles.student} key={index} onClick={() => { setShowStPage(true) }}>
                <img src={st.image} alt="studentImage" />
                <div className={styles.infoContainer}>
                    <p>{st.name} {<span style={{ color: st.roleId == 1 || st.roleId == 2 ? "#1d6c91" : "#2b2b2be5", fontWeight: st.roleId == 1 || st.roleId == 2 ? "bold" : 0 }} >({st.role})</span>}</p>
                    <span> گروه {st.group}</span>
                </div>
            </Link>
            {showStPage === true ? <MyStPage setShowStPage={setShowStPage} st={st} /> : null}
        </>
    )
}

export default MyStudent