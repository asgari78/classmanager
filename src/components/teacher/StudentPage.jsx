import styles from "../../styles/teacher/studentPage.module.css"

import { useEffect, useState } from "react"
import Lesson from "./Lesson"
import { getStudent } from "../../services/axiosApi"

const StudentPage = ({ st, setShowStPage }) => {
    const [page, setpage] = useState(3)
    const [lessonData, setLessonData] = useState(null)
    const [showOneLesson, setShowOneLesson] = useState(false)
    const [student, setStudent] = useState(st);

    const refreshStudent = async () => {
        try {
            const { data } = await getStudent(student.id);
            setStudent(data);
        } catch (err) {
            console.error("خطا در دریافت دانش‌آموز:", err);
        }
    };
    const changePage = (pageNumber) => {
        setpage(parseInt(pageNumber))
    }
    const openOneLesson = (lesson) => {
        setShowOneLesson(true)
        setLessonData(lesson)
    }
    const closeOneLesoon = () => {
        setShowOneLesson(false)
        setLessonData(null)
    }
    useEffect(() => {
        refreshStudent()
    }, [])

    return (
        <div className={styles.container}>
            <section className={styles.header}>
                <i className="fas fa-ellipsis-v"></i>
                <p>{st.namefamily} {<span style={st.roleId == 1 || st.roleId == 2 ? { color: "#1d6c91", fontWeight: "bold" } : { color: "#2b2b2be5", fontWeight: 0 }}>({st.roleName})</span>}</p>
                <img src={st.profileImage} alt="studentImage" />
                <i id="backToStudentsPage" onClick={() => { setShowStPage(false) }} className="fas fa-arrow-left"></i>
            </section>
            <section className={styles.contentContainer}>
                <section className={styles.content}>
                    {
                        page === 1 &&
                        student.homework.map((work, index) => (
                            <div className={styles.course} key={index}>
                                <span>{work.jobs[0].question}</span>
                            </div>
                        ))
                    }
                    {
                        page === 2 &&
                        student.activity.map((act, index) => (
                            <div className={styles.course} key={index}>
                                <span>{act.jobs[0].question}</span>
                            </div>
                        ))
                    }
                    {
                        page === 3 &&
                        student.lessons.map((lesson, index) => (
                            <div className={styles.lesson} key={index} onClick={() => openOneLesson(lesson)}>
                                <img src={lesson.image} alt="lessonImg" />
                                <span>{lesson.name}</span>
                            </div>
                        ))
                    }
                    {
                        page === 4 && <></>
                    }
                    {
                        page === 5 && <></>
                    }
                </section>
                {
                    showOneLesson &&
                    <Lesson lesson={lessonData} closeOneLesoon={closeOneLesoon} st={student} refreshStudent={refreshStudent} />
                }
            </section>
            <section className={styles.footer}>
                <button className={page == 1 ? styles.active : ""} onClick={() => changePage(1)}>
                    <i className="fas fa-pen"></i>
                    <span>تکالیف</span>
                </button>
                <button className={page == 2 ? styles.active : ""} onClick={() => changePage(2)}>
                    <i className="fa fa-calendar-check"></i>
                    <span>فعالیت ها</span>
                </button>
                <button className={page == 3 ? styles.active : ""} onClick={() => changePage(3)}>
                    <i className="fa fa-pie-chart"></i>
                    <span>نمرات</span>
                </button>
                <button className={page == 4 ? styles.active : ""} onClick={() => changePage(4)}>
                    <i className="fas fa-theater-masks"></i>
                    <span>انضباط</span>
                </button>
                <button className={page == 5 ? styles.active : ""} onClick={() => changePage(5)}>
                    <i className="fa fa-user"></i>
                    <span>پروفایل</span>
                </button>
            </section>
        </div>

    )
}

export default StudentPage