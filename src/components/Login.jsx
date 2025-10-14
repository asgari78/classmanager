import { useEffect, useState } from "react";
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
    const [showErrServer, setShowErrServer] = useState(false)
    const [allowed, setAllowed] = useState(false)
    const [pending, setPending] = useState(false)
    const [viewPass, setViewPass] = useState(false)

    useEffect(() => {
        if (formData.username != '' && formData.password != '') {
            setAllowed(true)
        } else {
            setAllowed(false)
        }
    }, [formData])
    useEffect(() => {
        if (errorServer) {
            setShowErrServer(true)
            setPending(false)
            setAllowed(false)
        } else {
            setShowErrServer(false)
        }
    }, [errorServer])

    const setUsername = (event) => {
        setShowErrServer(false)
        let value = event.target.value;
        setFormData(prev => ({ ...prev, username: value }))
        if (errors.username && value.trim() !== "") {
            setErrors(prev => ({ ...prev, username: false }));
        }
    }
    const setPassword = (event) => {
        setShowErrServer(false)
        let value = event.target.value;
        setFormData(prev => ({ ...prev, password: value }))
        if (errors.password && value.trim() !== "") {
            setErrors(prev => ({ ...prev, password: false }));
        }
    }
    const formValidation = (e) => {
        const nameValid = () => {
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
        }
        const passValid = () => {
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
        }
        if (e && e.target.name === "username") { nameValid() }
        if (e && e.target.name === "password") { passValid() }
        if (!e) { nameValid(); passValid() }
    }
    const submitForm = () => {
        if (allowed) {
            setPending(true)
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
                        <input disabled={pending} onBlur={formValidation} onChange={setUsername} type="text" name="username" id="username" placeholder="نام کاربری" />
                        <span className={errors.username ? styles.errorTxtYes : styles.errorTxtNo}>نام کاربری وارد نشده است</span>
                    </div>
                    <div className="password-section">
                        <input disabled={pending} onBlur={formValidation} onChange={setPassword} type={viewPass ? "text" : "password"} name="password" id="password" placeholder="رمز عبور" />
                        <i className={`${viewPass ? "fas fa-eye-slash" : "fas fa-eye"} ${styles.eyeBtn}`} onClick={() => { setViewPass(!viewPass) }}></i>
                        <span className={errors.password ? styles.errorTxtYes : styles.errorTxtNo}>رمز عبور وارد نشده است</span>
                    </div>
                    {
                        showErrServer &&
                        <span className={styles.errorServer}>نام کاربری یا رمز عبور اشتباه است</span>
                    }
                    {pending
                        ?
                        showErrServer === false && <button
                            type="button"
                            className={styles.pendingBtn}>
                            <img src="https://gghxnqfwfnkjkwnhzfpn.supabase.co/storage/v1/object/public/test/general/loading.gif" alt="loading-image" />
                        </button>
                        :
                        <button
                            type="button"
                            onClick={submitForm}
                            className={`${styles.submitBtn} ${allowed ? styles.active : null}`}>
                            ورود
                        </button>
                    }

                </form>
            </section>
        </div>
    );
}

export default Login