import Login from "./Login";
import { StudentPage, Teacher } from "./teacher";

import styles from "../styles/container.module.css"

import Loading from "./general/Loading.jsx";
import { useEffect, useState } from "react";
import MenuRight from "./teacher/MenuRight.jsx";
import Setting from "./teacher/Setting.jsx";
import ExitAlert from "./general/ExitAlert.jsx";
import { getAllStudents } from "../services/axiosApi.js";

const Container = ({ setUserData, userData = null, requestLogin, errorServer, loading, checkTeacher, setCheckTeacher, setLoading }) => {

    const [showMenuRight, setShowMenuRight] = useState(false)
    const [menuPage, setMenuPage] = useState(0)



    return (
        <>
            {
                loading &&
                <Loading />
            }
            {userData.length == 0 ?
                <Login requestLogin={requestLogin} errorServer={errorServer} checkTeacher={checkTeacher} setCheckTeacher={setCheckTeacher} />
                :
                <div className={`${styles.Container} ${loading ? styles.blueContainer : null}`}>
                    <section className={styles.header}>
                        <i className="fas fa-bars" onClick={() => setShowMenuRight(true)}></i>
                        <p>نقش : <span>{userData.isTeacher ? "آموزگار" : "دانش آموز"}</span></p>
                        <div className={styles.profile}>
                            <i className="fa fa-user"></i>
                            <p>{userData.namefamily}</p>
                        </div>
                    </section>
                    {
                        userData.isTeacher ?
                            <Teacher userData={userData} setLoading={setLoading} />
                            :
                            <StudentPage setLoading={setLoading} userData={null} st={userData} setShowStPage={null} refreshStudents={null} />
                    }
                </div>
            }
            <MenuRight userData={userData} setMenuPage={setMenuPage} showMenuRight={showMenuRight} setShowMenuRight={setShowMenuRight} />
            {menuPage === 1 ? <Setting setMenuPage={setMenuPage} /> : null}
            {menuPage === 2 ? <Setting setMenuPage={setMenuPage} /> : null}
            {menuPage === 3 ? <Setting setMenuPage={setMenuPage} /> : null}
            {menuPage === 4 ? <ExitAlert setUserData={setUserData} userData={userData} setMenuPage={setMenuPage} /> : null}
        </>
    );
}

export default Container