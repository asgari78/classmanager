import { useEffect, useState } from "react";
import styles from "../../styles/teacher/lesson.module.css"
import { updateLesson, getStudent } from "../../services/axiosApi";
import Loading from "../general/Loading"

const Lesson = ({ lesson, setLessonData, st, refreshStudents }) => {

    const [saveMode, setSaveMode] = useState(false)
    const [loading, setLoading] = useState(false)
    const [currentLesson, setCurrentLesson] = useState(null)
    const VALUE_STATES = [null, "نیاز به تلاش", "قابل قبول", "خوب", "خیلی خوب",];

    useEffect(() => {
        const fetchLesson = async () => {
            setLoading(true);
            try {
                const { data } = await getStudent(st.id);
                const freshLesson = data.lessons.find(l => l.id === lesson.id);
                setCurrentLesson(freshLesson);
            } catch (err) {
                console.error("خطا در گرفتن درس:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchLesson();
    }, [st.id, lesson]);

    const renderValue = (val) => {
        switch (val) {
            case "نیاز به تلاش":
                return <span className={styles.niaz}>نیاز به تلاش</span>;
            case "قابل قبول":
                return <span className={styles.gabel}>قابل قبول</span>;
            case "خوب":
                return <span className={styles.khob}>خوب</span>;
            case "خیلی خوب":
                return <span className={styles.khkhob}>خیلی خوب</span>;
            default:
                return null;
        }
    };
    const getNextValue = (val) => {
        const idx = VALUE_STATES.indexOf(val);
        return VALUE_STATES[(idx + 1) % VALUE_STATES.length];
    };
    const handleTable = (monthIndex, weekIndex) => {
        setCurrentLesson(prev => {
            const newScore = prev.score.map((month, mIdx) => {
                if (mIdx !== monthIndex) return month;

                const newWeeks = month.value.map((week, wIdx) => {
                    if (wIdx !== weekIndex) return week;
                    return {
                        ...week,
                        value: getNextValue(week.value)
                    };
                });
                return { ...month, value: newWeeks };
            });
            setSaveMode(true);
            return { ...prev, score: newScore };
        });
    };
    const handleSave = async () => {
        try {
            setLoading(true)
            await updateLesson(st.id, currentLesson);
            await refreshStudents();
            setSaveMode(false);
            setLessonData(null)
        } catch (err) {
            alert(err);
        }
        finally {
            setLoading(false);
        }
    };

    if (!currentLesson || !currentLesson.score) {
        return <Loading />;
    }
    return (
        <div className={styles.lessonContainer}>
            {loading && <Loading />}
            <section className={styles.header}>
                <span>ثبت نمرات {currentLesson.name}</span>
                <div className={styles.btnsContainer}>
                    <button className={styles.saveBtn} disabled={!saveMode} onClick={handleSave}>ذخیره</button>
                    <button className={styles.cancelBtn} onClick={() => setLessonData(null)}>لغو</button>
                </div>
            </section >
            <section className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>{currentLesson.score.length > 2 ? "نام ماه" : "نام نوبت"}</th>
                            {currentLesson.score[0].value.map((v, i) => (
                                <th key={i}>{v.name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentLesson.score.map((row, mIdx) => (
                            <tr key={mIdx}>
                                <td>{row.name}</td>
                                {row.value.map((cell, wIdx) => (
                                    <td key={wIdx}>
                                        <button
                                            className={styles.inputTable}
                                            onClick={() => handleTable(mIdx, wIdx)}
                                        >
                                            {renderValue(cell.value)}
                                        </button>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>

                </table>
            </section>
        </div >
    )
}
export default Lesson;