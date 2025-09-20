import { ErrorMessage, Field, Form, Formik } from "formik";
import { studentSchema } from "../../validations/studentValidation";
import styles from "../../styles/teacher/myForm.module.css"
import { useEffect } from "react";

const MyForm = ({ formikRef, fileInputRef, userData, eventForm, show, student, setStudent }) => {


    useEffect(() => {
        document.addEventListener("jdp:change", function (e) {
            if (e.target.name === "dateBirth") {
                setStudent(prev => ({
                    ...prev,
                    dateBirth: e.target.value
                }))
            }
        });
        let words = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        let word1 = words[Math.floor(Math.random() * 26)] + words[Math.floor(Math.random() * 26)]
        let word2 = words[Math.floor(Math.random() * 26)]
        let number = Math.floor(10000 + Math.random() * 90000);
        let pass = (word1 + number + word2).toUpperCase()
        setStudent(prev => {
            return {
                ...prev,
                password: pass
            }
        })
    }, [show])

    const handleImage = () => {
        const file = fileInputRef.current.files[0];
        if (!file) return;
        const previewUrl = URL.createObjectURL(file);
        setStudent(prev => ({
            ...prev,
            profileImage: previewUrl,
            profileFile: file
        }));
    };

    const handleFocusBlur = (e) => {
        const parent = e.target.closest("div");
        if (!parent) return;
        if (e.type === "focus" || e.target.value !== "") {
            parent.classList.add(styles.active);
        } else if (e.type === "blur" && e.target.value === "") {
            parent.classList.remove(styles.active);
        }
    };


    return (
        <Formik
            innerRef={formikRef}
            initialValues={student}
            validationSchema={studentSchema}
            onSubmit={(valuse) => eventForm(valuse)} >
            {
                formik => (
                    <Form className={styles.myFormCss}>
                        <div className={
                            `${styles.profileImage} ${student.profileImage !== null && styles.uploadedImg}`
                        }>
                            <input
                                ref={fileInputRef}
                                type="file"
                                name="profileImage"
                                id="profileImage"
                                accept="image/png, image/jpg, image/jpeg, image/svg"
                                onChange={handleImage}
                            />
                            <img
                                onClick={() => fileInputRef.current.click()}
                                style={{ display: student.profileImage !== null ? "flex" : "none" }}
                                src={student.profileImage}
                                alt="studentProfileImage"
                            />
                            <label
                                style={{ display: student.profileImage === null ? "flex" : "none" }} htmlFor="profileImage">
                                تصویر دانش آموز
                                <i className="fas fa-upload"></i>
                            </label>
                            <i
                                style={{ display: student.profileImage !== null ? "flex" : "none" }}
                                className="fas fa-trash-alt"
                                onClick={() => {
                                    setStudent((prev) => ({ ...prev, profileImage: null }));
                                    fileInputRef.current.value = "";
                                }}>
                            </i>
                        </div>
                        <div className={styles.namefamily}>
                            <Field
                                type="text"
                                name="namefamily"
                                onFocus={handleFocusBlur}
                                onBlur={handleFocusBlur}
                            />
                            <label htmlFor="namefamily">
                                نام و نام خانوادگی *
                            </label>
                            <ErrorMessage name="namefamily" render={msg => <span className={styles.errText}>{msg}</span>} />
                        </div>
                        <div className={styles.groupId}>
                            <i className="fas fa-angle-down"></i>
                            <select
                                id="groupId"
                                onChange={(e) => {
                                    const selectedId = e.target.value;
                                    const selectedGroup = userData.groups.find(g => g.id == selectedId);
                                    formik.setFieldValue("groupId", selectedId);
                                    formik.setFieldValue("groupName", selectedGroup?.name || "");
                                }}
                                {...formik.getFieldProps("groupId")}
                                style={{ color: formik.values.groupId ? "#000000" : "#5d5d5d" }}
                            >
                                <option value="">گروه کلاسی... *</option>
                                {userData.groups.map((g) => (
                                    <option key={g.id} value={g.id}>
                                        {g.name}
                                    </option>
                                ))}
                            </select>
                            <ErrorMessage name="groupId" render={msg => <span className={styles.errText}>{msg}</span>} />
                        </div>
                        <div className={styles.username}>
                            <Field
                                type="text"
                                name="username"
                                dir="ltr"
                                onFocus={handleFocusBlur}
                                onBlur={handleFocusBlur}
                            />
                            <label htmlFor="username">
                                نام کاربری دانش آموز *
                            </label>
                            <ErrorMessage name="username" render={msg => <span className={styles.errText}>{msg}</span>} />
                        </div>
                        <div className={styles.studentRole}>
                            <button
                                type="button"
                                onClick={() => {
                                    formik.setFieldValue("roleId", 3);
                                    formik.setFieldValue("roleName", "زیرگروه")
                                }}
                                className={formik.values.roleId == 3 ? styles.active : null}
                            >
                                زیر گروه
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    formik.setFieldValue("roleId", 2);
                                    formik.setFieldValue("roleName", "معاون")
                                }}
                                className={formik.values.roleId == 2 ? styles.active : null}
                            >
                                معاون
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    formik.setFieldValue("roleId", 1);
                                    formik.setFieldValue("roleName", "سرگروه")
                                }}
                                className={formik.values.roleId == 1 ? styles.active : null}
                            >
                                سرگروه
                            </button>
                            <ErrorMessage name="roleId" render={msg => <span className={styles.errText}>{msg}</span>} />
                        </div>
                        <div className={styles.dateBirth}>
                            <Field
                                data-jdp
                                type="text"
                                name="dateBirth"
                                dir="ltr"
                                onFocus={(e) => { jalaliDatepicker.startWatch(); handleFocusBlur(e) }}
                                onBlur={handleFocusBlur}
                            />
                            <label htmlFor="dateBirth">
                                تاریخ تولد
                            </label>
                            <ErrorMessage name="dateBirth" render={msg => <span className={styles.errText}>{msg}</span>} />
                        </div>
                        <div className={styles.selfCode}>
                            <Field
                                type="number"
                                name="selfCode"
                                dir="ltr"
                                onFocus={handleFocusBlur}
                                onBlur={handleFocusBlur}
                            />
                            <label htmlFor="selfCode">
                                کدملی
                            </label>
                            <ErrorMessage name="selfCode" render={msg => <span className={styles.errText}>{msg}</span>} />
                        </div>
                        <div className={styles.dadName}>
                            <Field
                                type="text"
                                name="dadName"
                                onFocus={handleFocusBlur}
                                onBlur={handleFocusBlur}
                            />
                            <label htmlFor="dadName">
                                نام پدر
                            </label>
                            <ErrorMessage name="dadName" render={msg => <span className={styles.errText}>{msg}</span>} />
                        </div>
                        <div className={styles.mobile}>
                            <Field
                                type="tel"
                                name="phoneNumber"
                                onFocus={handleFocusBlur}
                                onBlur={handleFocusBlur}
                            />
                            <label htmlFor="phoneNumber">
                                شماره موبایل
                            </label>
                            <ErrorMessage name="phoneNumber" render={msg => <span className={styles.errText}>{msg}</span>} />
                        </div>
                        <div className={styles.password}>
                            <input
                                type="text"
                                readOnly
                                dir="ltr"
                                name="password"
                                id="password"
                                value={student.password}
                            />
                            <label htmlFor="password">
                                رمز عبور دانش آموز :
                            </label>
                        </div>
                        <button type="submit" className={styles.submitBtn}>ثبت</button>
                    </Form>
                )
            }
        </Formik>
    )
}

export default MyForm