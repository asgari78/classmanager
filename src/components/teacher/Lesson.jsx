import { useEffect, useState } from "react";
import styles from "../../styles/teacher/lesson.module.css"
import { updateLesson } from "../../services/axiosApi";
import Loading from "../general/Loading"

const Lesson = ({ lesson, closeOneLesoon, st, refreshStudent }) => {

    const [saveMode, setSaveMode] = useState(false)
    const [copyLesson, setCopyLesson] = useState(lesson)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const isEqual = JSON.stringify(copyLesson) === JSON.stringify(lesson);
        setSaveMode(!isEqual);
    }, [copyLesson, lesson]);

    const VALUE_STATES = [
        null,
        "نیاز به تلاش",
        "قابل قبول",
        "خوب",
        "خیلی خوب",
    ];
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
        setCopyLesson(prev => {
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

            return { ...prev, score: newScore };
        });
    };
    const handleSave = async () => {
        try {
            setLoading(true)
            await updateLesson(st.id, copyLesson);
            await refreshStudent();
            setSaveMode(false);
            closeOneLesoon()
        } catch (err) {
            console.error(err);
            setSaveMode(false);
            closeOneLesoon()
        }
        finally {
            setLoading(false);
        }
    };


    return (
        <div className={styles.lessonContainer}>
            {loading && <Loading />}
            <section className={styles.header}>
                <span>ثبت نمرات {lesson.name}</span>
                <div className={styles.btnsContainer}>
                    <button className={styles.saveBtn} disabled={!saveMode} onClick={handleSave}>ذخیره</button>
                    <button className={styles.cancelBtn} onClick={closeOneLesoon}>لغو</button>
                </div>
            </section >
            <section className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>{lesson.score.length > 2 ? "نام ماه" : "نام نوبت"}</th>
                            {
                                lesson.score.length > 2 ? lesson.score[0].value.map((week, index) => (
                                    <th key={index}>{week.name}</th>
                                )) : lesson.score[0].value.map((exam, index) => (
                                    <th key={index}>{exam.name}</th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {copyLesson.score.length > 2 ? copyLesson.score.map((month, mIdx) => (
                            <tr key={mIdx}>
                                <td>{month.name}</td>
                                {month.value.map((week, wIdx) => (
                                    <td key={wIdx}>
                                        <button
                                            className={styles.inputTable}
                                            onClick={() => handleTable(mIdx, wIdx)}
                                        >
                                            {renderValue(week.value)}
                                        </button>
                                    </td>
                                ))}
                            </tr>
                        )) : copyLesson.score.map((term, index) => (
                            <tr key={index}>
                                <td>{term.name}</td>
                                {term.value.map((exam, idx) => (
                                    <td key={idx}>
                                        <button
                                            className={styles.inputTable}
                                            onClick={() => handleTable(index, idx)}
                                        >
                                            {renderValue(exam.value)}
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