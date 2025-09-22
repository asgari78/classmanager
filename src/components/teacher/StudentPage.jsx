import styles from "../../styles/teacher/studentPage.module.css"
import { useEffect, useState } from "react"
import { Lesson, HomeWork, Activity, Discipline, Profile } from "./"
import profileFake from "../../../public/images/emptyProfile.avif"
import Loading from "../general/Loading"
import { deleteStudent, getStudent, putStudent } from "../../services/axiosApi"
import ModalProfileEdit from "./ModalProfileEdit"

const StudentPage = ({ userData, st, setShowStPage, refreshStudents }) => {
    const [page, setpage] = useState(3)
    const [lessonData, setLessonData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [showMore, setShowMore] = useState(false)
    const [student, setStudent] = useState(st)
    const [showModal, setShowModal] = useState(false)

    const fetchStudent = async () => {
        try {
            setLoading(true);
            const { data } = await getStudent(st.id);
            setStudent(data);
            setLoading(false);
        } catch (err) {
            console.error("خطا در گرفتن دانش‌آموز:", err);
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchStudent()
    }, [st]);
    const handleUpdateStudent = async (updatedData) => {
        try {
            setLoading(true);
            await putStudent(updatedData);
            setLoading(false);
            await fetchStudent();
        } catch (err) {
            console.error("خطا در آپدیت دانش‌آموز:", err);
            setLoading(false);
        }
    };
    const formatData = async () => {
        const confirmFormat = window.confirm(`آیا مطمئن هستی می‌خواهی ${student.namefamily} را حذف کنی؟`);
        if (!confirmFormat) return;
        try {
            st.homework.map(term => term.months.map(month => month.count = 0))
            st.activity.map(term => term.months.map(month => month.count = 0))
            st.lessons.map(less => less.score.map(month => month.value.map(week => week.value = null)))
            st.discipline = [];
            setShowMore(false)
            await handleUpdateStudent(st)
        } catch (err) {
            console.log(err);
            setShowMore(false)
        }
    }
    const logoutAccount = async () => {
        try {
            st.login = false
            setShowMore(false)
            await handleUpdateStudent(st)
        } catch (err) {
            console.log(err);
            setShowMore(false)
        }
    }
    const removeStudent = async () => {
        const confirmDelete = window.confirm(`آیا مطمئن هستی می‌خواهی ${student.namefamily} را حذف کنی؟`);
        if (!confirmDelete) return;
        try {
            setLoading(true);
            await deleteStudent(student.id);
            setLoading(false);
            setShowStPage(false);
            await refreshStudents()
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
                {page !== 5 ? <>
                    <p>{st.namefamily} {<span style={st.roleId == 1 || st.roleId == 2 ? { color: "#1d6c91", fontWeight: "bold" } : { color: "#2b2b2be5", fontWeight: 0 }}>({st.roleName})</span>}</p>
                    <img src={st.profileImage || profileFake} alt="studentImage" />
                </> : null}
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
                                    <div className={styles.lesson} key={index} onClick={() => setLessonData(lesson)}>
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
                        <Profile student={student} setShowModal={setShowModal} />
                    }
                </section>
                {
                    lessonData !== null ?
                        <Lesson lesson={lessonData} setLessonData={setLessonData} st={student} /> : null
                }
            </section>
            <section className={styles.footer}>
                <button className={page == 1 ? styles.active : ""} onClick={() => setpage(1)}>
                    <i className="fas fa-pen"></i>
                    <span>تکالیف</span>
                </button>
                <button className={page == 2 ? styles.active : ""} onClick={() => setpage(2)}>
                    <i className="fa fa-calendar-check"></i>
                    <span>فعالیت ها</span>
                </button>
                <button className={page == 3 ? styles.active : ""} onClick={() => setpage(3)}>
                    <i className="fa fa-pie-chart"></i>
                    <span>نمرات</span>
                </button>
                <button className={page == 4 ? styles.active : ""} onClick={() => setpage(4)}>
                    <i className="fas fa-theater-masks"></i>
                    <span>انضباط</span>
                </button>
                <button className={page == 5 ? styles.active : ""} onClick={() => setpage(5)}>
                    <i className="fa fa-user"></i>
                    <span>پروفایل</span>
                </button>
            </section>
            {showModal && <ModalProfileEdit handleUpdateStudent={handleUpdateStudent} student={student} userData={userData} setShowModal={setShowModal} />}
        </div>
    )
}

export default StudentPage