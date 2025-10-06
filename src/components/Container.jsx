import Login from "./Login";
import { StudentPage, Teacher } from "./teacher";

import styles from "../styles/container.module.css"

import Loading from "./general/Loading.jsx";
import { useEffect, useState } from "react";
import ExitAlert from "./general/ExitAlert.jsx";
import { CallUs, AboutUs, Setting, MenuRight } from "./teacher/MenuRight"
import { getAllStudents, getTeacher, putTeacher } from "../services/axiosApi.js";

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
    const [teacher, setTeacher] = useState({})
    const [serverError, setServerError] = useState(false)

    const getTeacherData = async () => {
        try {
            setLoading(true)
            const { data: studentsData } = await getAllStudents();
            setAllStudents(studentsData)
            const { data: teacherData } = await getTeacher(userData.id);
            setTeacher(teacherData);
            setServerError(false)
        } catch (err) {
            setServerError(true)
            setAllStudents([])
            console.log("Server error:", err);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        if (userData?.id) {
            getTeacherData();
        }
    }, [userData]);


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
                        <div className={styles.profile} onClick={() => { setMenuPage(4) }}>
                            <i className="fa fa-sign-out"></i>
                            <p>{userData.namefamily}</p>
                        </div>
                    </section>

                    {userData.isTeacher ? (
                        showStPage.active ? <StudentPage userData={userData} st={showStPage.st} allStudents={allStudents} setShowStPage={setShowStPage} getTeacherData={getTeacherData} /> :
                            <Teacher userData={userData} setShowStPage={setShowStPage} allStudents={allStudents} teacher={teacher} serverError={serverError} getTeacherData={getTeacherData} />
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
