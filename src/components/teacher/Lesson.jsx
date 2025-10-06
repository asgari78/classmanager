import { useEffect, useState } from "react";
import styles from "../../styles/teacher/lesson.module.css"
import { updateLesson, getStudent } from "../../services/axiosApi";
import Loading from "../general/Loading"

const Lesson = ({ userData, lesson, setLessonData, st }) => {

    const [saveMode, setSaveMode] = useState(false)
    const [loadingFetch, setLoadingFetch] = useState(false)
    const [loadingSave, setLoadingSave] = useState(false)
    const [currentLesson, setCurrentLesson] = useState(null)
    const [copyCurrentLesson, setCopyCurrentLesson] = useState()
    const VALUE_STATES = [null, "نیاز به تلاش", "قابل قبول", "خوب", "خیلی خوب",];

    useEffect(() => {
        window.history.pushState(null, "", window.location.href);
        const handleBackButton = (e) => {
            e.preventDefault();
            window.history.pushState(null, "", window.location.href);
            setLessonData(null)
        }
        window.addEventListener("popstate", handleBackButton);
        return () => {
            window.removeEventListener("popstate", handleBackButton);
        };
    }, [])
    useEffect(() => {
        let fetchLesson = async () => {
            setLoadingFetch(true);
            try {
                const { data } = await getStudent(st.id);
                const freshLesson = data.lessons.find(l => l.id === lesson.id);
                setCopyCurrentLesson(freshLesson);
                setCurrentLesson(freshLesson);
            } catch (err) {
                console.error("خطا در گرفتن درس:", err);
            } finally {
                setLoadingFetch(false);
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
        if (!userData) return;

        const newLesson = {
            ...currentLesson,
            score: currentLesson.score.map((month, mIdx) => {
                if (mIdx !== monthIndex) return month;
                const newWeeks = month.value.map((week, wIdx) => {
                    if (wIdx !== weekIndex) return week;
                    return { ...week, value: getNextValue(week.value) };
                });
                return { ...month, value: newWeeks };
            })
        };
        setCurrentLesson(newLesson);
        const isDifferent = JSON.stringify(newLesson) !== JSON.stringify(copyCurrentLesson);
        setSaveMode(isDifferent);
    };

    const handleSave = async () => {
        try {
            setLoadingSave(true);
            setSaveMode(false);

            const { status } = await updateLesson(st.id, currentLesson);

            if (status === 200) {
                setLoadingFetch(true);

                setTimeout(() => {
                    setLessonData(null);
                    setLoadingFetch(false);
                    setLoadingSave(false);
                }, 900);
            }
        } catch (err) {
            console.error(err);
            setLoadingSave(false);
            setSaveMode(true);
            setLoadingFetch(false);
        }
    };


    return (
        <>
            {(loadingFetch || currentLesson === null) ? <Loading /> :
                <div className={styles.lessonContainer}>
                    {userData ? <section className={styles.header}>
                        <span>ثبت نمرات {currentLesson.name}</span>
                        <div className={styles.btnsContainer}>
                            <button className={`${loadingSave ? styles.loadingBtn : styles.saveBtn}`} disabled={!saveMode} onClick={handleSave}>{loadingSave ? " صبرکنید..." : "ذخیره"}</button>
                            <button className={styles.cancelBtn} onClick={() => setLessonData(null)}>لغو</button>
                        </div>
                    </section > : null}
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
            }
        </>
    )
}
export default Lesson;