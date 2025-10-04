import Login from "./Login";
import { StudentPage, Teacher } from "./teacher";

import styles from "../styles/container.module.css"

import Loading from "./general/Loading.jsx";
import { useEffect, useState } from "react";
import ExitAlert from "./general/ExitAlert.jsx";
import { CallUs, AboutUs, Setting, MenuRight } from "./teacher/MenuRight"
import { putTeacher } from "../services/axiosApi.js";

const Container = ({
    setUserData,
    userData,
    requestLogin,
    errorServer,
    checkTeacher,
    setCheckTeacher,
}) => {
    const [showMenuRight, setShowMenuRight] = useState(false)
    const [menuPage, setMenuPage] = useState(0)
    const [showStPage, setShowStPage] = useState({ active: false, st: null })
    const [allStudents, setAllStudents] = useState([])
    const [loading, setLoading] = useState(false)
    const [showLogOut, setShowLogOut] = useState(false)


    useEffect(() => {
        window.history.pushState(null, "", window.location.href);
        const handleBackButton = (e) => {
            e.preventDefault();
            window.history.pushState(null, "", window.location.href);
            setMenuPage(4)
        }
        window.addEventListener("popstate", handleBackButton);
        return () => {
            window.removeEventListener("popstate", handleBackButton);
        };
    }, [])

    const logOutAccount = async () => {
        setMenuPage(0)
        const copyUserData = JSON.parse(JSON.stringify(userData))
        copyUserData.login = false;
        putTeacher(copyUserData)
        localStorage.clear()
        setUserData([])
    }
    // حالت لاگین نشده  
    if (!userData?.id) {
        return (
            <Login
                requestLogin={requestLogin}
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
                <div className={styles.Container}>
                    <section className={styles.header}>
                        <i className="fas fa-bars" onClick={() => setShowMenuRight(true)}></i>
                        <p>
                            نقش : <span>{userData.isTeacher ? "آموزگار" : "دانش آموز"}</span>
                        </p>
                        <div className={styles.profile}>
                            <i className="fa fa-user"></i>
                            <p onClick={() => setShowLogOut(!showLogOut)}>{userData.namefamily}</p>
                            {showLogOut ? <div onClick={() => setShowLogOut(false)} className={styles.logoutContainer}><span className={styles.logOutBtn} onClick={logOutAccount}>خروج از حساب</span><i className="fas fa-sign-out"></i> </div> : null}
                        </div>
                    </section>

                    {userData.isTeacher ? (
                        showStPage.active ? <StudentPage userData={userData} st={showStPage.st} allStudents={allStudents} setShowStPage={setShowStPage} /> :
                            <Teacher userData={userData} setShowStPage={setShowStPage} allStudents={allStudents} setAllStudents={setAllStudents} />
                    ) : (
                        <StudentPage
                            st={userData}
                            setShowStPage={setShowStPage}
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
