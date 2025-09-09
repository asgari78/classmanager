import { useEffect, useState } from "react";
import styles from "../../styles/teacher/newStudent.module.css"

const NewStudent = ({ show, onClose }) => {

    const [visible, setVisible] = useState(show)
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        if (show) {
            setVisible(true)
            const timer = setTimeout(() => setAnimate(true), 20);
            return () => clearTimeout(timer);
        } else if (visible) {
            setAnimate(false)
            const timer = setTimeout(() => setVisible(false), 300)
            return () => clearTimeout(timer)
        }
    }, [show])

    if (!visible) return null

    const focusStatus = (inp, val, t) => {
        if (t === "focus") {
            inp.nextSibling.style.transform = "translate(-0.5rem , -.9rem)"
            inp.nextSibling.style.color = "#0000006e"
            inp.nextSibling.style.fontSize = ".75rem"
            if (inp.name == "dateBirth") {
                jalaliDatepicker.startWatch();
            }
        } else if (t === "blur") {
            if (val !== "") {
                inp.nextSibling.style.transform = "translate(-0.5rem , -.9rem)"
                inp.nextSibling.style.color = "#1f1f1f23!important"
                inp.nextSibling.style.fontSize = ".75rem"
            } else {
                inp.nextSibling.style.transform = "translate(-0.7rem , 0rem)"
                inp.nextSibling.style.color = "#1f1f1fe7"
                inp.nextSibling.style.fontSize = ".9rem"
            }
        }

    }
    const handleForm = (e) => {
        let inputEl = e.target;
        let value = e.target.value;
        let type = e.type
        focusStatus(inputEl, value, type)
    }



    return (
        <div className={`${styles.container} ${animate ? styles.showin : styles.fadeout}`}>
            <section className={styles.header}>
                <h6>ثبت دانش آموز جدید</h6>
                <p>مرحله : <span>1</span></p>
            </section>
            <section className={styles.main}>
                <form>
                    <div className={styles.username}>
                        <input type="text" name="username" id="username" onFocus={handleForm} onBlur={handleForm} />
                        <label htmlFor="username">نام و نام خانوادگی</label>
                    </div>
                    <div className={styles.dateBirth}>
                        <input data-jdp name="dateBirth" id="dateBirth" dir="ltr" onFocus={handleForm} onBlur={handleForm} />
                        <label htmlFor="dateBirth">تاریخ تولد</label>
                    </div>
                    <div className={styles.selfCode}>
                        <input type="number" name="selfCode" id="selfCode" dir="ltr" onFocus={handleForm} onBlur={handleForm} />
                        <label htmlFor="selfCode">کدملی</label>
                    </div>
                    <div className={styles.dadName}>
                        <input lang="fa-IR" type="text" name="dadName" id="dadName" onFocus={handleForm} onBlur={handleForm} />
                        <label htmlFor="dadName">نام پدر</label>
                    </div>
                    <div className={styles.mobile}>
                        <input type="tel" name="phonenumber" id="phonenumber" onFocus={handleForm} onBlur={handleForm} />
                        <label htmlFor="phonenumber">شماره موبایل</label>
                    </div>
                </form>
            </section>
            <section className={styles.footer}>
                <button className={`${styles.footerBtn} ${styles.closeBtn}`} onClick={onClose}>لغو</button>
                <button className={`${styles.footerBtn} ${styles.prevBtn}`}>مرحله قبل</button>
                <button className={`${styles.footerBtn} ${styles.nextBtn}`}>مرحله بعد</button>
                <button className={`${styles.footerBtn} ${styles.submitBtn}`}>ثبت</button>
            </section>
        </div>
    )
}
export default NewStudent;