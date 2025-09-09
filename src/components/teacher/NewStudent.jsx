import { useEffect, useRef, useState } from "react";
import styles from "../../styles/teacher/newStudent.module.css"

const NewStudent = ({ show, onClose, teacherData }) => {

    const [visible, setVisible] = useState(show)
    const [animate, setAnimate] = useState(false);
    const [formData, setFormData] = useState({
        profileImage: null,
        username: "",
        dateBirth: "",
        selfCode: "",
        dadName: "",
        phoneNmber: "",
        groupId: "",
        role: ""
    })
    const fileInputRef = useRef(null);


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

    const focusStatus = (e) => {
        let inp = e.target;
        let val = e.target.value;
        let t = e.type;
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

    const validationForm = (e) => {
        if (e.target.type === "file") {
            console.log(formData);
            const imgFile = e.target.files[0];
            const imgScr = URL.createObjectURL(imgFile)
            setFormData(prev => { return { ...prev, profileImage: imgScr } })
        } else {
            switch (e.target.name) {
                case "username":
                    console.log(formData);
                    setFormData(prev => { return { ...prev, username: e.target.value } })
            }

        }
    }


    return (
        <div className={`${styles.container} ${animate ? styles.showin : styles.fadeout}`}>
            <section className={styles.header}>
                <h6>ثبت دانش آموز جدید</h6>
                <i className="fas fa-question-circle"></i>
            </section>
            <section className={styles.main}>
                <form>
                    <div className={
                        `${styles.profileImage} ${formData.profileImage !== null && styles.uploadedImg}`
                    }>
                        <input
                            ref={fileInputRef}
                            type="file"
                            name="profileImage"
                            id="profileImage"
                            accept="image/png, image/jpg, image/jpeg, image/svg"
                            onChange={validationForm}
                        />
                        <img
                            onClick={() => fileInputRef.current.click()}
                            style={{ display: formData.profileImage !== null ? "flex" : "none" }}
                            src={formData.profileImage}
                            alt="studentProfileImage"
                        />
                        <label
                            style={{ display: formData.profileImage === null ? "flex" : "none" }} htmlFor="profileImage">
                            تصویر دانش آموز
                            <i className="fas fa-upload"></i>
                        </label>
                        <i
                            style={{ display: formData.profileImage !== null ? "flex" : "none" }}
                            className="fas fa-trash-alt"
                            onClick={() => {
                                setFormData((prev) => ({ ...prev, profileImage: null }));
                                fileInputRef.current.value = "";
                            }}>
                        </i>
                    </div>
                    <div className={styles.username}>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            onFocus={focusStatus}
                            onBlur={focusStatus}
                            onChange={validationForm}
                        />
                        <label htmlFor="username">
                            نام و نام خانوادگی
                        </label>
                    </div>
                    <div className={styles.dateBirth}>
                        <input data-jdp name="dateBirth" id="dateBirth" dir="ltr" onFocus={focusStatus} onBlur={focusStatus} />
                        <label htmlFor="dateBirth">تاریخ تولد</label>
                    </div>
                    <div className={styles.selfCode}>
                        <input type="number" name="selfCode" id="selfCode" dir="ltr" onFocus={focusStatus} onBlur={focusStatus} />
                        <label htmlFor="selfCode">کدملی</label>
                    </div>
                    <div className={styles.dadName}>
                        <input lang="fa-IR" type="text" name="dadName" id="dadName" onFocus={focusStatus} onBlur={focusStatus} />
                        <label htmlFor="dadName">نام پدر</label>
                    </div>
                    <div className={styles.mobile}>
                        <input type="tel" name="phonenumber" id="phonenumber" onFocus={focusStatus} onBlur={focusStatus} />
                        <label htmlFor="phonenumber">شماره موبایل</label>
                    </div>
                    <div className={styles.selectGroup}>
                        <i className="fas fa-angle-down"></i>
                        <select name="selectGroup" id="selectGroup">
                            <option value="g00">گروه کلاسی</option>
                            {
                                teacherData.groups.map((g, index) => (
                                    <option key={index} value={g.id}>{g.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className={styles.studentRole}>
                        <button onClick={() => setFormData((prev) => { return { ...prev, role: 3 } })} type="button" className={formData.role == 3 ? styles.active : null}>زیر گروه</button>
                        <button onClick={() => setFormData((prev) => { return { ...prev, role: 2 } })} type="button" className={formData.role == 2 ? styles.active : null}>معاون</button>
                        <button onClick={() => setFormData((prev) => { return { ...prev, role: 1 } })} type="button" className={formData.role == 1 ? styles.active : null}>سرگروه</button>
                    </div>
                </form>
            </section>
            <section className={styles.footer}>
                <button className={`${styles.footerBtn} ${styles.closeBtn}`} onClick={onClose}>لغو</button>
                <button className={`${styles.footerBtn} ${styles.submitBtn}`}>ثبت</button>
            </section>
        </div>
    )
}
export default NewStudent;