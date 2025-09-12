import { useState } from "react";
import styles from "../styles/login.module.css"

const Login = ({ requestLogin, errorServer, checkTeacher, setCheckTeacher }) => {

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })
    const [errors, setErrors] = useState({
        username: false,
        password: false
    })
    const [allowed, setAllowed] = useState(false)

    const setUsername = (event) => {
        let value = event.target.value;
        setFormData(prev => ({ ...prev, username: value }))
        if (errors.username && value.trim() !== "") {
            setErrors(prev => ({ ...prev, username: false }));
        }
    }
    const setPassword = (event) => {
        let value = event.target.value;
        setFormData(prev => ({ ...prev, password: event.target.value }))
        if (errors.password && value.trim() !== "") {
            setErrors(prev => ({ ...prev, password: false }));
        }
    }
    const formValidation = () => {
        if (formData.username == '') {
            setErrors(prev => ({
                ...prev,
                username: true
            }))
        } else {
            setErrors(prev => ({
                ...prev,
                username: false
            }))
        }
        if (formData.password == '') {
            setErrors(prev => ({
                ...prev,
                password: true
            }))
        } else {
            setErrors(prev => ({
                ...prev,
                password: false
            }))
        }
        if (formData.username != '' && formData.password != '') {
            setAllowed(true)
        } else {
            setAllowed(false)
        }
    }
    const submitForm = () => {
        if (allowed) {
            requestLogin(formData)
        } else {
            formValidation()
        }
    }

    return (
        <div className={styles.loginContainer}>
            <section>
                <div className={styles.header}>
                    <span>ورود <span>{checkTeacher ? "آموزگار" : "دانش آموز"}</span></span>
                    <button className={checkTeacher ? styles.onCheck : styles.offCheck} onClick={() => setCheckTeacher(!checkTeacher)}>
                        <p>آموزگار هستم</p>
                        <div></div>
                    </button>
                </div>
                <form method="POST">
                    <div className="username-section">
                        <label htmlFor="username">نام کاربری</label>
                        <input onChange={setUsername} type="text" name="username" id="username" />
                        <span className={errors.username ? styles.errorTxtYes : styles.errorTxtNo}>نام کاربری وارد نشده است</span>
                    </div>
                    <div className="password-section">
                        <label htmlFor="password">رمز عبور</label>
                        <input onChange={setPassword} type="password" name="password" id="password" />
                        <span className={errors.password ? styles.errorTxtYes : styles.errorTxtNo}>رمز عبور وارد نشده است</span>
                    </div>
                    {
                        errorServer !== "" &&
                        <span className={styles.errorServer}>نام کاربری یا رمز عبور اشتباه است</span>
                    }
                    <button type="button" onClick={submitForm} className={styles.submitBtn}>ورود</button>
                </form>
            </section>
        </div>
    );
}

export default Login