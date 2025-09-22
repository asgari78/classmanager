import { ErrorMessage, Field, Form, Formik } from "formik";
import { studentSchema } from "../../validations/studentValidation";
import styles from "../../styles/teacher/myForm.module.css"
import { useEffect, useRef, useState } from "react";

const MyForm = ({ formikRef, fileInputRef, userData, eventForm, student }) => {

    const formRef = useRef()

    const [formData, setFormData] = useState(student)

    useEffect(() => {
        const targetInputNums = [1, 3, 6, 7, 8]
        const fildes = [...formRef.current.children];
        targetInputNums.map(num => fildes.map((filde, index) => (index === num) && handleFocus(filde.children[0])))
        document.addEventListener("jdp:change", function (e) {
            if (e.target.name === "dateBirth") {
                setFormData(prev => ({
                    ...prev,
                    dateBirth: e.target.value
                }))
            }
        });
    }, [])
    const handleImage = () => {
        const file = fileInputRef.current.files[0];
        if (!file) return;
        const previewUrl = URL.createObjectURL(file);
        setFormData(prev => ({
            ...prev,
            profileImage: previewUrl,
            profileFile: file
        }));
    };
    const handleFocus = (inp) => {
        const parent = inp.parentNode;
        if (inp.value !== "") {
            parent.classList.add(styles.active);
        }
    };
    const handleBlur = (e) => {
        const parent = e.target.closest("div")
        if (e.target.value === "") {
            parent.classList.remove(styles.active);
        }
    }


    return (
        <Formik
            innerRef={formikRef}
            initialValues={formData}
            validationSchema={studentSchema}
            onSubmit={(values) => eventForm(values)} >
            {
                formik => (
                    <Form className={styles.myFormCss} ref={formRef}>
                        <div className={
                            `${styles.profileImage} ${formData.profileImage !== null && styles.uploadedImg}`
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
                        <div className={styles.namefamily}>
                            <Field
                                type="text"
                                name="namefamily"
                                onFocus={(e) => handleFocus(e.target)}
                                onBlur={handleBlur}
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
                                onFocus={(e) => handleFocus(e.target)}
                                onBlur={handleBlur}
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
                                onFocus={(e) => { jalaliDatepicker.startWatch(); handleFocus(e.target) }}
                                onBlur={handleBlur}
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
                                onFocus={(e) => handleFocus(e.target)}
                                onBlur={handleBlur}
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
                                onFocus={(e) => handleFocus(e.target)}
                                onBlur={handleBlur}
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
                                onFocus={(e) => handleFocus(e.target)}
                                onBlur={handleBlur}
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
                                value={formData.password}
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