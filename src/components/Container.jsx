import Login from "./Login";
import { StudentPage, Teacher } from "./teacher";

import styles from "../styles/container.module.css"

import Loading from "./general/Loading.jsx";
import { useState } from "react";
import MenuRight from "./teacher/MenuRight/MenuRight.jsx";
import Setting from "./teacher/MenuRight/Setting.jsx";
import ExitAlert from "./general/ExitAlert.jsx";
import AboutUs from "./teacher/MenuRight/AboutUs.jsx";
import CallUs from "./teacher/MenuRight/CallUs.jsx";

const Container = ({
    setUserData,
    userData,
    requestLogin,
    errorServer,
    loading,
    checkTeacher,
    setCheckTeacher,
}) => {
    const [showMenuRight, setShowMenuRight] = useState(false)
    const [menuPage, setMenuPage] = useState(0)
    const [showStPage, setShowStPage] = useState(false)
    const [allStudents, setAllStudents] = useState([])

    // حالت لاگین نشده
    if (!userData?.id) {
        return (
            <Login
                requestLogin={requestLogin}
                loading={loading}
                errorServer={errorServer}
                checkTeacher={checkTeacher}
                setCheckTeacher={setCheckTeacher}
            />
        )
    }

    // حالت لاگین شده
    return (
        (loading || userData === null) ? <Loading /> :
            <>
                <div className={`${styles.Container} ${loading ? styles.blurContainer : ""}`}>
                    <section className={styles.header}>
                        <i className="fas fa-bars" onClick={() => setShowMenuRight(true)}></i>
                        <p>
                            نقش : <span>{userData.isTeacher ? "آموزگار" : "دانش آموز"}</span>
                        </p>
                        <div className={styles.profile}>
                            <i className="fa fa-user"></i>
                            <p>{userData.namefamily}</p>
                        </div>
                    </section>

                    {userData.isTeacher ? (
                        showStPage.active ? <StudentPage allStudents={allStudents} userData={userData} setShowStPage={setShowStPage} st={showStPage.st} /> :
                            <Teacher userData={userData} setShowStPage={setShowStPage} allStudents={allStudents} setAllStudents={setAllStudents} />
                    ) : (
                        <StudentPage
                            userData={userData}
                            st={userData}
                            setShowStPage={{ active: false, st: st }}
                            refreshStudents={null}
                        />
                    )}
                </div>
                <MenuRight
                    userData={userData}
                    setMenuPage={setMenuPage}
                    showMenuRight={showMenuRight}
                    setShowMenuRight={setShowMenuRight}
                />
                {menuPage === 1 && <Setting setMenuPage={setMenuPage} />}
                {menuPage === 2 && <AboutUs setMenuPage={setMenuPage} />}
                {menuPage === 3 && <CallUs setMenuPage={setMenuPage} />}
                {
                    menuPage === 4 && (
                        <ExitAlert
                            setUserData={setUserData}
                            userData={userData}
                            setMenuPage={setMenuPage}
                        />
                    )
                }
            </>
    )
}

export default Container
