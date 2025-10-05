import { useEffect, useState, useRef } from "react"
import styles from "../../styles/teacher/teacher.module.css"

import { getAllStudents, getTeacher } from "../../services/axiosApi"
import { NewStudent, StudentBar } from "./"
import Loading from "../general/Loading"

const Teacher = ({ userData, setShowStPage, allStudents, setAllStudents }) => {
    const [activeSection, setActiveSection] = useState(1)
    const [teacher, setTeacher] = useState({})
    const [serverError, setServerError] = useState(false)
    const [showNewStPage, setShowNewStPage] = useState(false)
    const [loading, setLoading] = useState(false)

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
            setAllStudents(null)
            console.log("Server error:", err);
        } finally {
            setLoading(false)
        }
    };
    useEffect(() => {
        getTeacherData()
    }, [])

    return (
        <>
            <NewStudent getTeacherData={getTeacherData} userData={userData} show={showNewStPage} setShow={setShowNewStPage} />
            {loading && <Loading />}
            <section className={styles.teacherContent}>
                {/* بخش تب‌ها */}
                <section className={styles.groupsList}>
                    <ul>
                        <li
                            className={activeSection === 1 ? `${styles.groupLi} ${styles.activegroupLi}` : styles.groupLi}
                            onClick={() => setActiveSection(1)}
                        >
                            دانش آموزان
                        </li>
                        <li
                            className={activeSection === 2 ? `${styles.groupLi} ${styles.activegroupLi}` : styles.groupLi}
                            onClick={() => setActiveSection(2)}
                        >
                            دروس
                        </li>
                    </ul>
                </section>

                {/* بخش دانش آموزان */}
                <div className={activeSection === 1 ? styles.studentListContainer : null}>
                    {activeSection === 1 ?
                        allStudents.length > 0 ?
                            allStudents.map((st, index) => (
                                <StudentBar
                                    setShowStPage={setShowStPage}
                                    allStudents={allStudents}
                                    userData={userData}
                                    st={st}
                                    key={index}
                                    index={index}
                                    setLoading={setLoading}
                                />
                            ))
                            :
                            <div className={styles.noStudentContainer}>
                                <img
                                    src="https://gghxnqfwfnkjkwnhzfpn.supabase.co/storage/v1/object/public/test/general/noStudent.jpg"
                                    alt="noStudentImage"
                                />
                                <h2>دانش آموزی ندارید</h2>
                                <div>
                                    <span>با زدن</span>
                                    <span className={styles.addStSpan}>+</span>
                                    <span>دانش آموزان خود را اضافه کنید</span>
                                </div>
                            </div>
                        : null
                    }
                </div>

                {/* بخش دروس */}
                {activeSection === 2 && (
                    <section className={styles.lessonsContainer}>
                        {(!serverError && teacher?.lessons) ? (
                            teacher.lessons.map(lesson => (
                                <div className={styles.lesson} key={lesson.id}>
                                    <img src={lesson.image} alt="lessonImg" />
                                    <span>{lesson.name}</span>
                                </div>
                            ))
                        ) : (
                            <div className={styles.errorContainer}>
                                <p>درسی یافت نشد!</p>
                                <button className={styles.tryButton} onClick={getTeacherData}>تلاش مجدد</button>
                            </div>
                        )}
                    </section>
                )}

                {activeSection === 1 && (
                    <button
                        className={styles.addStBtn}
                        onClick={() => { setShowNewStPage(true); }}
                    >
                        +
                    </button>
                )}
            </section>
        </>
    )
}

export default Teacher