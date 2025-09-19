import { useEffect, useState } from "react"
import styles from "../../styles/teacher/teacher.module.css"

import { getAllStudents, getTeacher } from "../../services/axiosApi"
import Loading from "../general/Loading"
import { NewStudent, StudentBar } from "./"

const Teacher = ({ userData }) => {

    const [activeSection, setActiveSection] = useState(1)
    const [teacher, setTeacher] = useState({})
    const [allStudents, setAllStudents] = useState([])
    const [serverError, setServerError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showNewStPage, setShowNewStPage] = useState(false)

    const refreshStudents = async () => {
        try {
            setLoading(true)
            const { data } = await getAllStudents();
            setAllStudents(data);
            setLoading(false)
        } catch (err) {
            console.error("خطا در دریافت دانش‌آموز:", err);
        }
    };

    const getTeacherData = async () => {
        try {
            setLoading(true)
            const { data: teacherData } = await getTeacher(userData.id);
            const { data: studentsData } = await getAllStudents();
            setTeacher(teacherData);
            setAllStudents(studentsData)
            setServerError(false)
            setLoading(false)
        } catch (err) {
            setLoading(false)
            setServerError(true)
            console.log("Server error:", err);
        }
    };
    useEffect(() => {
        getTeacherData()
        refreshStudents()
    }, [])

    return (
        <>
            <NewStudent userData={userData} show={showNewStPage} setShowNewStPage={setShowNewStPage} refreshStudents={refreshStudents} />
            <section className={styles.teacherContent}>
                <section className={styles.groupsList}>
                    <ul>
                        <li style={{ backgroundColor: activeSection === 1 ? "#e9e9e9ff" : "white" }} className={styles.groupLi} onClick={() => setActiveSection(1)}>دانش آموزان</li>
                        <li style={{ backgroundColor: activeSection === 2 ? "#e9e9e9ff" : "white" }} className={styles.groupLi} onClick={() => setActiveSection(2)}>دروس</li>
                    </ul>
                </section>
                {loading ? <Loading /> : null}
                {activeSection === 1 ?
                    allStudents.length > 0 ?
                        allStudents.map((st, index) => (
                            <StudentBar allStudents={allStudents} userData={userData} st={st} key={index} refreshStudents={refreshStudents} />
                        ))
                        :
                        <div className={styles.noStudentContainer}>
                            <img src="https://gghxnqfwfnkjkwnhzfpn.supabase.co/storage/v1/object/public/test/general/noStudent.jpg" alt="noStudentImage" />
                            <h2>دانش آموزی ندارید</h2>
                            <div>
                                <span>با زدن</span>
                                <span className={styles.addStSpan}>+</span>
                                <span>دانش آموزان خود را اضافه کنید</span>
                            </div>
                        </div>
                    : null
                }
                {activeSection === 2 &&
                    <section className={styles.lessonsContainer}>
                        {!serverError ? teacher.lessons.map(lesson => (
                            <div className={styles.lesson} key={lesson.id}>
                                <img src={lesson.image} alt="lessonImg" />
                                <span>{lesson.name}</span>
                            </div>
                        )) :
                            (
                                <div className={styles.errorContainer}>
                                    <p>درسی یافت نشد!</p>
                                    <button className={styles.tryButton} onClick={getTeacherData}>تلاش مجدد</button>
                                </div>
                            )
                        }
                    </section>
                }
                {activeSection === 1 ? <button className={styles.addStBtn} onClick={() => { setShowNewStPage(true); }}>+</button> : null}
            </section>
        </>
    )
}

export default Teacher