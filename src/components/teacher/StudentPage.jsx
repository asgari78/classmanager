import styles from "../../styles/teacher/studentPage.module.css"
import { useEffect, useState } from "react"
import { Lesson, HomeWork, Activity, Discipline, Profile } from "./"
import profileFake from "../../../public/images/emptyProfile.avif"
import Loading from "../general/Loading"
import { deleteStudent, getStudent, putStudent } from "../../services/axiosApi"

const StudentPage = ({ allStudents, userData, st, setShowStPage, refreshStudents }) => {
    const [page, setpage] = useState(3)
    const [lessonData, setLessonData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [showOneLesson, setShowOneLesson] = useState(false)
    const [showMore, setShowMore] = useState(false)
    const [student, setStudent] = useState(st)

    const fetchStudent = async () => {
        try {
            setLoading(true);
            const { data } = await getStudent(st.id); // همین API که Profile استفاده می‌کرد
            setStudent(data);
            setLoading(false);
        } catch (err) {
            console.error("خطا در گرفتن دانش‌آموز:", err);
            setLoading(false);
        }
    };
    const handleUpdateStudent = async (updatedData) => {
        try {
            setLoading(true);
            await putStudent(updatedData);
            await fetchStudent();
            await refreshStudents();
            setLoading(false);
        } catch (err) {
            console.error("خطا در آپدیت دانش‌آموز:", err);
            setLoading(false);
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
        refreshStudents()
        allStudents.map(s => s.id === st.id && setStudent(s))
    }, [])
    useEffect(() => {
        const updated = userData.students?.find(s => s.id === st.id);
        if (updated) {
            setStudent(updated);
        }
        fetchStudent()
    }, [allStudents]);
    const formatData = async () => {
        try {
            setLoading(true)
            st.homework.map(term => term.months.map(month => month.count = 0))
            st.activity.map(term => term.months.map(month => month.count = 0))
            st.lessons.map(less => less.score.map(month => month.value.map(week => week.value = null)))
            st.discipline = [];
            setShowMore(false)
            await putStudent(st)
            await refreshStudents()
            setLoading(false)
        } catch (err) {
            console.log(err);
            setShowMore(false)
            setLoading(false)
        }
    }
    const logoutAccount = async () => {
        try {
            setLoading(true)
            st.login = false
            setShowMore(false)
            await putStudent(st)
            await refreshStudents()
            setLoading(false)
        } catch (err) {
            console.log(err);
            setShowMore(false)
            setLoading(false)
        }
    }
    const removeStudent = async () => {
        const confirmDelete = window.confirm(`آیا مطمئن هستی می‌خواهی ${student.namefamily} را حذف کنی؟`);
        if (!confirmDelete) return;

        try {
            setLoading(true);
            await deleteStudent(student.id);
            await refreshStudents();
            setShowStPage(false);
            setLoading(false);
        } catch (err) {
            console.error("خطا در حذف دانش آموز:", err);
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            {loading && <Loading />}
            <section className={styles.header}>
                <i className="fas fa-ellipsis-v" onClick={() => setShowMore(!showMore)}></i>
                {showMore ?
                    <div className={styles.moreLay} onClick={(e) => { e.target.nodeName === "DIV" && setShowMore(false) }}>
                        <ul>
                            <li onClick={formatData}>
                                <i className="fas fa-quidditch"></i>
                                <span>فرمت کردن اطلاعات</span>
                            </li>
                            <li onClick={logoutAccount}>
                                <i className="fas fa-sign-out-alt"></i>
                                <span>خروج از حساب</span>
                            </li>
                            <li onClick={removeStudent}>
                                <i className="fas fa-trash"></i>
                                <span>حذف دانش آموز</span>
                            </li>
                        </ul>
                    </div>
                    : null}
                <p>{st.namefamily} {<span style={st.roleId == 1 || st.roleId == 2 ? { color: "#1d6c91", fontWeight: "bold" } : { color: "#2b2b2be5", fontWeight: 0 }}>({st.roleName})</span>}</p>
                <img src={st.profileImage || profileFake} alt="studentImage" />
                <i id="backToStudentsPage" onClick={() => { setShowStPage(false) }} className="fas fa-arrow-left"></i>
            </section>
            <section className={styles.contentContainer}>
                <section className={styles.content}>
                    {
                        page === 1 &&
                        <HomeWork student={student} />
                    }
                    {
                        page === 2 &&
                        <Activity student={student} />
                    }
                    {
                        page === 3 &&
                        <div className={styles.lessonContainer}>
                            {
                                student.lessons.map((lesson, index) => (
                                    <div className={styles.lesson} key={index} onClick={() => openOneLesson(lesson)}>
                                        <img src={lesson.image} alt="lessonImg" />
                                        <span>{lesson.name}</span>
                                    </div>
                                ))
                            }
                        </div>
                    }
                    {
                        page === 4 &&
                        <Discipline st={student} />
                    }
                    {
                        page === 5 &&
                        <Profile userData={userData} onUpdateStudent={handleUpdateStudent}
                            student={student} />
                    }
                </section>
                {
                    showOneLesson &&
                    <Lesson lesson={lessonData} closeOneLesoon={closeOneLesoon} st={st} refreshStudents={refreshStudents} />
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