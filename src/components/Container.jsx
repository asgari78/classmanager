import Login from "./Login";
import Teacher from "./teacher/Teacher";

import styles from "../styles/container.module.css"
import { useEffect, useState } from "react";

import { getAllStudents } from "../services/Students.js"
import Loading from "./general/Loading.jsx";
import NewStudent from "./teacher/NewStudent.jsx"

const Container = ({ userData, requestLogin, errorServer, loading }) => {

    const [allStudents, setAllStudents] = useState([])
    const [showNewStPage, setShowNewStPage] = useState(false)
    const [teacherData, setTeacherData] = useState({})

    useEffect(() => {
        const getStudents = async () => {
            let { data: allSt } = await getAllStudents()
            setTeacherData(allSt.filter(st => st.isTeacher)[0])
            allSt = allSt.filter(st => !st.isTeacher)
            setAllStudents(allSt)
        }
        getStudents()
    }, [])

    return (
        <>
            {
                loading &&
                <Loading />
            }
            {userData.length == 0 ?
                <Login requestLogin={requestLogin} errorServer={errorServer} />
                :
                <>
                    <NewStudent show={showNewStPage} onClose={() => setShowNewStPage(false)} teacherData={teacherData} />
                    <div className={styles.Container}>
                        <section className={styles.header}>
                            <i className="fas fa-bars"></i>
                            <p>نقش : <span>{userData.isTeacher ? "آموزگار" : "دانش آموز"}</span></p>
                            <div className={styles.profile}>
                                <i className="fa fa-user"></i>
                                <p>{userData.name}</p>
                            </div>
                        </section>
                        {
                            userData.isTeacher ?
                                <Teacher setShowNewStPage={setShowNewStPage} allStudents={allStudents} userData={userData} />
                                :
                                <p><span>{userData.name}</span> خوش آمدید </p>
                        }
                    </div>
                </>
            }
        </>
    );
}

export default Container