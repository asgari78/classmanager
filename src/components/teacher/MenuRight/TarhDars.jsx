import { useEffect, useState } from "react";
import styles from "../../../styles/teacher/MenuRight/tarhDars.module.css"
import HeaderPages from "./HeaderPages";
import { infoInit } from '../../../helpers/dataKeepTeacher'

const TarhDars = ({ setMenuPage, userData }) => {

    const [todayInfo, setTodayInfo] = useState();
    const [information, seInformation] = useState(infoInit)

    useEffect(() => {
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
        if (userData.TarhDars.length === 0) {
            let today = new Date();
            today = today.toISOString().split('T')[0]
            infoInit.date = today;
            setTodayInfo(infoInit)
        } else {

        }
    })
    useEffect(() => {
        console.log(todayInfo);
    }, [todayInfo])

    return (
        <div className={styles.container}>
            <HeaderPages setMenuPage={setMenuPage} title="طرح درس" />
            <section className={styles.controlMenu}>
                <button className={`${styles.btn} ${styles.nextDay}`} onClick={() => { }}>روز بعد</button>
                <input className={styles.dateInput} value={todayInfo && todayInfo.date} type="date" name="tarhDarsDate" id="tarhDarsDate" onChange={() => { }} />
                <button className={`${styles.btn} ${styles.prevDay}`} onClick={() => { }}>روز قبل</button>
            </section>
            <section className={styles.content}>
                {userData && userData.TarhDars.map((day, index) => (
                    <div key={index} className={styles.item}>
                        {day.dayName}
                    </div>
                ))}
            </section>
        </div>
    )
}

export default TarhDars