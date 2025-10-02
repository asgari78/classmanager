import { useEffect, useRef, useState } from "react";
import styles from "../../styles/teacher/newStudent.module.css"
import { addStudent } from "../../services/axiosApi";
import Loading from "../general/Loading";
import { supabase } from "../../lib/supabaseClient";
import nullStudentData from "../../helpers/dataKeep";
import MyForm from "./MyForm";

const NewStudent = ({ show, setShow, userData, refreshStudents }) => {

    const [visible, setVisible] = useState(show)
    const [animate, setAnimate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(nullStudentData)

    const formikRef = useRef();
    const fileInputRef = useRef(null);


    useEffect(() => {
        const s = 'abcdefghijklmnopqrstuvwxyz', r = n => crypto.getRandomValues(new Uint32Array(1))[0] % n, pass = (s[r(26)] + s[r(26)] + (10000 + r(90000)) + s[r(26)]).toUpperCase();
        setFormData(prev => {
            return {
                ...prev,
                password: pass
            }
        })
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
    const addNewStudent = async (values) => {
        try {
            setLoading(true);
            let imageUrl = null;
            if (values.profileFile) {
                const fileName = `students/${Date.now()}-${values.profileFile.name}`;
                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from("test")
                    .upload(fileName, values.profileFile, {
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
            setLoading(false);
            onClose();
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    }
    const onClose = () => {
        setShow(false)
        formikRef.current.resetForm();
        setFormData(nullStudentData)
    }


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
                    <MyForm formikRef={formikRef} fileInputRef={fileInputRef} userData={userData} eventForm={addNewStudent} student={formData} />
                </section>
            </div >
        </>
    )
}
export default NewStudent;