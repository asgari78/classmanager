import { useEffect, useState } from "react";
import styles from "../../../styles/teacher/MenuRight/tarhDars.module.css"
import HeaderPages from "./HeaderPages";
import { infoInit } from '../../../helpers/dataKeepTeacher'

const TarhDars = ({ setMenuPage, userData }) => {

    const [todayInfo, setTodayInfo] = useState(infoInit);

    const setCurrentDate = () => {
        if (userData.TarhDars.length === 0) {
            console.log("empty");

            let today = new Date();
            today = today.toISOString().split('T')[0]
            infoInit.date = today;
            setTodayInfo(infoInit)
        } else {

        }
    }
    useEffect(() => {
        setCurrentDate()
        window.history.pushState(null, "", window.location.href);
        const handleBackButton = (e) => {
            e.preventDefault();
            window.history.pushState(null, "", window.location.href);
            setMenuPage(0)
        }
        window.addEventListener("popstate", handleBackButton);
        return () => {
            window.removeEventListener("popstate", handleBackButton);
        };
    }, [])
    useEffect(() => {
        console.log(todayInfo);
    }, [todayInfo])

    return (
        <div className={styles.container}>
            <HeaderPages setMenuPage={setMenuPage} title="طرح درس" />
            <section className={styles.controlMenu}>
                <button className={`${styles.btn} ${styles.nextDay}`} onClick={() => { }}>روز بعد</button>
                <input className={styles.dateInput} value={todayInfo.date} type="date" name="tarhDarsDate" id="tarhDarsDate" onChange={() => setCurrentDate()} />
                <button className={`${styles.btn} ${styles.prevDay}`} onClick={() => { }}>روز قبل</button>
            </section>
            <section className={styles.content}>
                {userData && userData.TarhDars.map((day, index) => (
                    <div key={index} className={styles.item}>
                        {day.dayName}
                    </div>
                ))}
            </section>
            <button className={styles.addBtn}>+</button>
            <section className={styles.modalAdd}>
                <form>
                    <input className={styles.selectDataInp} type="date" name="selectDataInp" id="selectDataInp" />
                    <select className={styles.lessonName} name="lessonName" id="lessonName">
                        {userData.lessons.map((less, index) => (
                            <option key={index}>
                                {less.name}
                            </option>
                        ))}
                    </select>
                    <textarea name="textareaInp" id="textareaInp" className={styles.textareaInp}></textarea>
                    <div className={styles.btnGroup}>
                        <button type="button">اضافه کن</button>
                        <button type="button">لغو</button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default TarhDars