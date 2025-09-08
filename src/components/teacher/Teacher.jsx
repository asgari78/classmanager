import { useEffect, useState } from "react"
import styles from "../../styles/teacher/teacher.module.css"

import StudentBar from "./StudentBar"
import { getStudent } from "../../services/Students"
import Loading from "../general/Loading"

const Teacher = ({ allStudents, userData, setShowNewStPage }) => {

    const [activeSection, setActiveSection] = useState(1)
    const [teacher, setTeacher] = useState()
    const [serverError, setServerError] = useState(false)
    const [loading, setLoading] = useState(false)

    const getTeacher = async () => {
        try {
            setLoading(true)
            const { data: teacherData } = await getStudent(userData.id);
            setTeacher(teacherData);
            setServerError(false)
            setLoading(false)
        } catch (err) {
            setLoading(false)
            setServerError(true)
            console.log("Server error:", err);
        }
    };
    useEffect(() => {
        getTeacher()
    }, [])

    return (
        <section className={styles.teacherContent}>
            <section className={styles.groupsList}>
                <ul>
                    <li style={{ backgroundColor: activeSection === 1 ? "#e9e9e9ff" : "white" }} className={styles.groupLi} onClick={() => setActiveSection(1)}>دانش آموزان</li>
                    <li style={{ backgroundColor: activeSection === 2 ? "#e9e9e9ff" : "white" }} className={styles.groupLi} onClick={() => setActiveSection(2)}>دروس</li>
                </ul>
            </section>
            {
                loading ? <Loading /> : null
            }
            {activeSection === 1 ?
                allStudents.length > 0 ?
                    allStudents.map((st, index) => (
                        <StudentBar st={st} key={index} />
                    ))
                    :
                    <div className={styles.noStudentContainer}>
                        <img src="https://gghxnqfwfnkjkwnhzfpn.supabase.co/storage/v1/object/public/test/general/noStudent.jpg" alt="noStudentImage" />
                        <h2>دانش آموزی ندارید</h2>
                        <p>با زدن ..+.. <span className={styles.addStSpan}>+</span> دانش آموزان خود را اضافه کنید</p>
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
                                <button className={styles.tryButton} onClick={getTeacher}>تلاش مجدد</button>
                            </div>
                        )
                    }
                </section>
            }
            {activeSection === 1 ? <button className={styles.addStBtn} onClick={() => { setShowNewStPage(true); }}>+</button> : null}
        </section>
    )
}

export default Teacher