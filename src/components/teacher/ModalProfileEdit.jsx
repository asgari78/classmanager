import MyForm from "./MyForm"

import styles from "../../styles/teacher/modalProfileEdit.module.css"
import { useRef, useState } from "react"

const ModalProfileEdit = ({ handleUpdateStudent, student, userData, setShowModal }) => {

    const formikRef = useRef()
    const fileInputRef = useRef()

    const onClose = () => {
        setShowModal(false)
        formikRef.current.resetForm();
    }

    const editStudent = async (values) => {
        await handleUpdateStudent(values)
        onClose()
    }

    return (
        <div className={styles.modal}>
            <section className={styles.header}>
                <span>ویرایش پروفایل</span>
                <button className={styles.closeBtn} onClick={onClose}>لغو</button>
            </section>
            <MyForm formikRef={formikRef} fileInputRef={fileInputRef} userData={userData} eventForm={editStudent} student={student} />
        </div>
    )
}

export default ModalProfileEdit