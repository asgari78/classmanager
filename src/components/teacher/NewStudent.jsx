import { useEffect, useRef, useState } from "react";
import styles from "../../styles/teacher/newStudent.module.css"
import { addStudent } from "../../services/axiosApi";
import Loading from "../general/Loading";
import { supabase } from "../../lib/supabaseClient";
import nullStudentData from "../../helpers/dataKeep";
import MyForm from "./MyForm";

const NewStudent = ({ show, setShowNewStPage, userData, refreshStudents }) => {

    const [visible, setVisible] = useState(show)
    const [animate, setAnimate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(nullStudentData)
    const formikRef = useRef();
    const fileInputRef = useRef(null);

    const addNewStudent = async (values) => {
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
            setLoading(false);
            onClose();
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    }
    useEffect(() => {
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
    const onClose = () => {
        setShowNewStPage(false)
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
                    <MyForm formikRef={formikRef} fileInputRef={fileInputRef} show={show} userData={userData} eventForm={addNewStudent} student={formData} setStudent={setFormData} />
                </section>
            </div >
        </>
    )
}
export default NewStudent;