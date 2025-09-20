import MyForm from "./MyForm"

import styles from "../../styles/teacher/modalProfileEdit.module.css"
import { useRef } from "react"

const ModalProfileEdit = ({ student, setStudent, setShowModal, userData }) => {

    const formikRef = useRef()
    const fileInputRef = useRef()

    const onClose = () => {
        setShowModal(false)
        formikRef.current.resetForm();
    }


    const editCurrentStudent = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (e.target.name == "dateBirth") {
            jalaliDatepicker.startWatch();
        }
        if (e.target.name === "groupId") {
            const listOptions = [...e.target.children]
            const clickedLi = listOptions.filter(li => li.getAttribute("value") === e.target.value)
            setFormData(prev => {
                return {
                    ...prev,
                    groupId: e.target.value,
                    groupName: clickedLi[0].getAttribute("name")
                }
            })
        }
    }

    const handleSave = async () => {
        try {
            setShowModal(false)
            await onUpdateStudent(formData);
        } catch (err) {
            console.error("خطا در ذخیره پروفایل:", err)
        }
    }

    return (
        <div className={styles.modal}>
            <section className={styles.header}>
                <span>ویرایش پروفایل</span>
                <button className={styles.closeBtn} onClick={onClose}>لغو</button>
            </section>
            <MyForm formikRef={formikRef} fileInputRef={fileInputRef} userData={userData} eventForm={editCurrentStudent} setStudent={setStudent} student={student} />
        </div>
    )
}

export default ModalProfileEdit