import { useEffect, useRef, useState } from "react";
import styles from "../../styles/teacher/newStudent.module.css"
import { addStudent } from "../../services/axiosApi";
import Loading from "../general/Loading";
import { supabase } from "../../lib/supabaseClient";
import nullStudentData from "../../helpers/dataKeep";
import { useFormik } from "formik"
import { studentSchema } from "../../validations/studentValidation";

const NewStudent = ({ show, setShowNewStPage, userData, refreshStudents }) => {

    const fileInputRef = useRef(null);
    const [visible, setVisible] = useState(show)
    const [animate, setAnimate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(nullStudentData)

    const onClose = () => {
        setShowNewStPage(false)
        formik.resetForm();
        setFormData(nullStudentData)
    }
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
    useEffect(() => {
        if (show) {
            setVisible(true)
            const timer = setTimeout(() => setAnimate(true), 20);
            document.addEventListener("jdp:change", function (e) {
                if (e.target.name === "dateBirth") {
                    setFormData(prev => ({
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
            setFormData(prev => {
                return {
                    ...prev,
                    password: pass
                }
            })
            return () => clearTimeout(timer);
        } else if (visible) {
            setAnimate(false)
            const timer = setTimeout(() => setVisible(false), 300)
            return () => clearTimeout(timer)
        }
    }, [show])
    const handleFocusBlur = (e) => {
        const parent = e.target.closest("div");
        if (!parent) return;
        if (e.type === "focus" || e.target.value !== "") {
            parent.classList.add(styles.active);
        } else if (e.type === "blur" && e.target.value === "") {
            parent.classList.remove(styles.active);
        }
    };
    const formik = useFormik({
        initialValues: formData,
        validationSchema: studentSchema,
        onSubmit: async (values) => {
            try {
                setLoading(true);
                let imageUrl = null;
                if (formData.profileFile) {
                    const fileName = `students/${Date.now()}-${formData.profileFile.name}`;
                    const { data: uploadData, error: uploadError } = await supabase.storage
                        .from("test")
                        .upload(fileName, formData.profileFile, {
                            cacheControl: "3600",
                            upsert: false,
                        });
                    if (uploadError) throw uploadError;
                    const { data: urlData } = supabase.storage.from("test").getPublicUrl(fileName);
                    imageUrl = urlData.publicUrl;
                }
                const submitData = {
                    ...values,
                    profileImage: imageUrl,
                    password: formData.password
                };
                await addStudent(submitData);
                await refreshStudents();
                formik.resetForm();
                setLoading(false);
                onClose();
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        },
    });


    if (!visible) return null
    return (
        <>
            {loading && <Loading />}
            <div className={`${styles.container} ${animate ? styles.showin : styles.fadeout}`}>
                <section className={styles.header}>
                    <div>
                        <i className="fas fa-plus"></i>
                        <h6>ثبت دانش آموز جدید</h6>
                    </div>
                    <button className={styles.closeBtn} onClick={onClose}>لغو</button>
                </section>
                <section className={styles.main}>
                    <form onSubmit={formik.handleSubmit}>
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
                            <input
                                type="text"
                                id="namefamily"
                                onFocus={handleFocusBlur}
                                onBlur={(e) => { handleFocusBlur(e); formik.handleBlur(e) }}
                                {...formik.getFieldProps("namefamily")}
                            />
                            <label htmlFor="namefamily">
                                نام و نام خانوادگی *
                            </label>
                            {formik.touched.namefamily && formik.errors.namefamily ? (<div className={styles.errText}>{formik.errors.namefamily}</div>) : null}
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
                            {formik.touched.groupId && formik.errors.groupId ? (<div className={styles.errText}>{formik.errors.groupId}</div>) : null}
                        </div>
                        <div className={styles.username}>
                            <input
                                type="text"
                                id="username"
                                dir="ltr"
                                onFocus={handleFocusBlur}
                                onBlur={(e) => { handleFocusBlur(e); formik.handleBlur(e) }}
                                {...formik.getFieldProps("username")}
                            />
                            <label htmlFor="username">
                                نام کاربری دانش آموز *
                            </label>
                            {formik.touched.username && formik.errors.username ? (<div className={styles.errText}>{formik.errors.username}</div>) : null}
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
                            {formik.touched.roleId && formik.errors.roleId ? (
                                <div className={styles.errText}>{formik.errors.roleId}</div>
                            ) : null}
                        </div>
                        <div className={styles.dateBirth}>
                            <input
                                data-jdp
                                type="text"
                                name="dateBirth"
                                id="dateBirth"
                                dir="ltr"
                                onFocus={(e) => { jalaliDatepicker.startWatch(); handleFocusBlur(e) }}
                                onBlur={(e) => { formik.handleBlur; handleFocusBlur(e) }}
                                onChange={formik.handleChange}
                                value={formik.values.dateBirth}
                            />
                            <label htmlFor="dateBirth">
                                تاریخ تولد
                            </label>
                            {formik.touched.dateBirth && formik.errors.dateBirth ? (<div className={styles.errText}>{formik.errors.dateBirth}</div>) : null}
                        </div>
                        <div className={styles.selfCode}>
                            <input
                                type="number"
                                name="selfCode"
                                id="selfCode"
                                dir="ltr"
                                onFocus={handleFocusBlur}
                                onBlur={(e) => { handleFocusBlur(e); formik.handleBlur(e) }}
                                onChange={formik.handleChange}
                                value={formik.values.selfCode}
                            />
                            <label htmlFor="selfCode">
                                کدملی
                            </label>
                            {formik.touched.selfCode && formik.errors.selfCode ? (<div className={styles.errText}>{formik.errors.selfCode}</div>) : null}
                        </div>
                        <div className={styles.dadName}>
                            <input
                                type="text"
                                name="dadName"
                                id="dadName"
                                onFocus={handleFocusBlur}
                                onBlur={(e) => { handleFocusBlur(e); formik.handleBlur(e) }}
                                onChange={formik.handleChange}
                                value={formik.values.dadName}
                            />
                            <label htmlFor="dadName">
                                نام پدر
                            </label>
                            {formik.touched.dadName && formik.errors.dadName ? (<div className={styles.errText}>{formik.errors.dadName}</div>) : null}
                        </div>
                        <div className={styles.mobile}>
                            <input
                                type="tel"
                                name="phoneNumber"
                                id="phoneNumber"
                                onFocus={handleFocusBlur}
                                onBlur={(e) => { handleFocusBlur(e); formik.handleBlur(e) }}
                                onChange={formik.handleChange}
                                value={formik.values.phoneNumber}
                            />
                            <label htmlFor="phoneNumber">
                                شماره موبایل
                            </label>
                            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (<div className={styles.errText}>{formik.errors.phoneNumber}</div>) : null}
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
                    </form>
                </section>
            </div>
        </>
    )
}
export default NewStudent;