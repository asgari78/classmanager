import styles from "../../styles/teacher/studentPage.module.css"

import { useEffect, useState } from "react"
import Lesson from "./Lesson"
import { getStudent } from "../../services/axiosApi"
import Loading from "../general/Loading"

const StudentPage = ({ st, setShowStPage }) => {
    const [saveMode, setSaveMode] = useState(true)
    const [page, setpage] = useState(3)
    const [lessonData, setLessonData] = useState(null)
    const [showOneLesson, setShowOneLesson] = useState(false)
    const [student, setStudent] = useState(st);
    const [copyHomeWork, setCopyHomeWork] = useState(null)

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
        setShowOneLesson(false)
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
        setCopyHomeWork(student.homework)
    }, [])
    const handleSave = async () => {

    }
    const handleSum = (index) => {
        let sum = student.homework[index].months.reduce((sum, month) => sum + month.count, 0)
        return sum
    }
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
                        <div className={styles.homeworkContainer}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>نام ماه</th>
                                        <th>تعداد تکالیف انجام شده</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {student.homework[0].months.map((month, idx) => (
                                        <tr key={idx}>
                                            <td>{month.name}</td>
                                            <td>
                                                <div className={styles.countContainer}>
                                                    <button><i className="fas fa-plus"></i></button>
                                                    <span>{month.count.toLocaleString("fa-IR")}</span>
                                                    <button><i className="fas fa-minus"></i></button>
                                                    <button><i className="fas fa-undo-alt"></i></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td className={styles.mainTerm}>نوبت اول</td>
                                        <td className={styles.mainTerm}>مجموعا {handleSum(0).toLocaleString("fa-IR")} تکلیف انجام شده</td>
                                    </tr>
                                    {student.homework[1].months.map((month, idx) => (
                                        <tr key={idx}>
                                            <td>{month.name}</td>
                                            <td>
                                                <div className={styles.countContainer}>
                                                    <button><i className="fas fa-plus"></i></button>
                                                    <span>{month.count.toLocaleString("fa-IR")}</span>
                                                    <button><i className="fas fa-minus"></i></button>
                                                    <button><i className="fas fa-undo-alt"></i></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td className={styles.mainTerm}>نوبت دوم</td>
                                        <td className={styles.mainTerm}>مجموعا {handleSum(1).toLocaleString("fa-IR")} تکلیف انجام شده</td>
                                    </tr>
                                </tbody>
                            </table>
                            <button className={styles.saveBtn} onClick={handleSave} disabled={!saveMode}>ذخیره</button>
                        </div>
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