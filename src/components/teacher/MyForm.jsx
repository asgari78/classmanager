import { ErrorMessage, Field, Form, Formik } from "formik";
import { studentSchema } from "../../validations/studentValidation";
import styles from "../../styles/teacher/myForm.module.css"
import { useEffect, useRef, useState } from "react";
import Loading from "../general/Loading";

const MyForm = ({ formikRef, fileInputRef, userData, eventForm, student, loading }) => {

    const formRef = useRef()

    const [formData, setFormData] = useState(student)

    useEffect(() => {
        const targetInputNums = [1, 3, 6, 7, 8]
        const fildes = [...formRef.current.children];
        targetInputNums.map(num => fildes.map((filde, index) => (index === num) && handleFocus(filde.children[0])))
    }, [])

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
            enableReinitialize
            validationSchema={studentSchema}
            onSubmit={(values) => eventForm(values)} >
            {
                formik => {
                    const handleImage = () => {
                        const file = fileInputRef.current.files[0];
                        if (!file) return;
                        const previewUrl = URL.createObjectURL(file);
                        setFormData(prev => ({
                            ...prev,
                            profileImage: previewUrl,
                            profileFile: file
                        }));
                        formik.setFieldValue("profileFile", file);
                        formik.setFieldValue("profileImage", previewUrl);
                    };
                    useEffect(() => {
                        document.addEventListener("jdp:change", (e) => {
                            if (e.target.name === "dateBirth") {
                                formik.setFieldValue("dateBirth", e.target.value);
                            }
                        });
                    }, [formik]);
                    return (
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
                                    onChange={() => handleImage(formik)}
                                    disabled={loading}
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
                                    disabled={loading}
                                />
                                <label htmlFor="namefamily">
                                    نام و نام خانوادگی *
                                </label>
                                <ErrorMessage name="namefamily" render={msg => <span className={styles.errText}>{msg}</span>} />
                            </div>
                            <div className={styles.selction}>
                                <i className="fas fa-angle-down"></i>
                                <select
                                    id="groupId"
                                    name="groupId"
                                    value={formik.values.groupId}
                                    disabled={loading}
                                    onChange={(e) => {
                                        const selectedId = e.target.value;
                                        const selectedGroup = userData.groups.find(g => g.id == selectedId);
                                        formik.setFieldValue("groupId", selectedId);
                                        formik.setFieldValue("groupName", selectedGroup?.name || "");
                                    }}
                                    style={{ color: formik.values.groupId ? "#000000" : "#5d5d5d" }}
                                >

                                    <option value="">گروه کلاسی *</option>
                                    {userData.groups.map((g) => (
                                        <option key={g.id} value={g.id}>
                                            {g.name}
                                        </option>
                                    ))}
                                </select>
                                <ErrorMessage name="groupId" render={msg => <span className={styles.errText}>{msg}</span>} />
                            </div>
                            <div className={styles.selction}>
                                <i className="fas fa-angle-down"></i>
                                <select
                                    id="roleId"
                                    name="roleId"
                                    value={formik.values.roleId}
                                    disabled={loading}
                                    onChange={(e) => {
                                        const selectedId = e.target.value;
                                        const selectedRole = userData.roles.find(g => g.id == selectedId);
                                        formik.setFieldValue("roleId", selectedId);
                                        formik.setFieldValue("roleName", selectedRole?.name || "");
                                    }}
                                    style={{ color: formik.values.roleId ? "#000000" : "#5d5d5d" }}
                                >

                                    <option value="">نقش دانش آموز *</option>
                                    {userData.roles.map((r) => (
                                        <option key={r.id} value={r.id}>
                                            {r.name}
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
                                    disabled={loading}
                                />
                                <label htmlFor="username">
                                    نام کاربری دانش آموز *
                                </label>
                                <ErrorMessage name="username" render={msg => <span className={styles.errText}>{msg}</span>} />
                            </div>
                            <div className={styles.dateBirth}>
                                <Field
                                    data-jdp
                                    type="text"
                                    name="dateBirth"
                                    dir="ltr"
                                    onFocus={(e) => { jalaliDatepicker.startWatch(); handleFocus(e.target) }}
                                    onBlur={handleBlur}
                                    disabled={loading}
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
                                    disabled={loading}
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
                                    disabled={loading}
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
                                    disabled={loading}
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
                            {
                                loading ?
                                    <button type="button" className={styles.pendingLoading}>
                                        <img src="https://gghxnqfwfnkjkwnhzfpn.supabase.co/storage/v1/object/public/test/general/loading.gif" alt="loading-image" />
                                    </button>
                                    :
                                    <button type="submit" className={styles.submitBtn}>ثبت</button>
                            }
                        </Form>
                    )
                }
            }
        </Formik>
    )
}

export default MyForm