import MyForm from "./MyForm"

import styles from "../../styles/teacher/modalProfileEdit.module.css"
import { useRef, useState } from "react"
import { putStudent } from "../../services/axiosApi"
import Loading from "../general/Loading"

const ModalProfileEdit = ({ student, setStudent, setShowModal, userData }) => {

    const formikRef = useRef()
    const fileInputRef = useRef()
    const [loading, setLoading] = useState(false)

    const onClose = () => {
        setShowModal(false)
        formikRef.current.resetForm();
    }

    const editStudent = async (values) => {
        setLoading(true)
        await putStudent(values)
        setLoading(false)
    }

    return (
        <div className={styles.modal}>
            <section className={styles.header}>
                <span>ویرایش پروفایل</span>
                <button className={styles.closeBtn} onClick={onClose}>لغو</button>
            </section>
            <MyForm formikRef={formikRef} fileInputRef={fileInputRef} userData={userData} eventForm={editStudent} setStudent={setStudent} student={student} />
            {loading ? <Loading /> : null}
        </div>
    )
}

export default ModalProfileEdit