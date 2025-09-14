import { useEffect, useState } from "react"
import styles from "../../styles/teacher/profile.module.css"

import profileFake from "../../../public/images/emptyProfile.avif"

const Profile = ({ student, userData, onUpdateStudent }) => {
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({})

    useEffect(() => {
        setFormData(student);
    }, [student]);

    const handleChange = (e) => {
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
        <div className={styles.container}>
            {
                student &&
                <section className={styles.profileContent}>
                    <img src={student.profileImage || profileFake} alt="studentAvatar" className={styles.avatar} />
                    <h2>{student.namefamily}</h2>
                    <p><strong>کلاس: </strong>{student.classCode || "نامشخص"}</p>
                    <p><strong>تاریخ تولد: </strong>{student.dateBirth}</p>
                    <p><strong>کدملی: </strong>{student.selfCode}</p>
                    <p><strong>نام پدر: </strong>{student.dadName}</p>
                    <p><strong>گروه: </strong>{student.groupName}</p>
                    <p><strong>نقش: </strong>{student.roleName}</p>
                    <p><strong>وضعیت: </strong>{student.login ? "وارد شده" : "وارد نشده"}</p>
                    <p><strong>نام کاربری: </strong>{student.username}</p>
                    <p><strong>رمز عبور: </strong>{student.password}</p>
                    <button className={styles.editBtn} onClick={() => setShowModal(true)}>ویرایش</button>
                </section>
            }

            {
                showModal &&
                <section className={styles.modalOverlay} onClick={(e) => { (e.target.nodeName == "SECTION") && setShowModal(false) }}>
                    <div className={styles.modal}>
                        <h3>ویرایش پروفایل</h3>
                        <label>
                            نام و نام خانوادگی:
                            <input
                                type="text"
                                name="namefamily"
                                value={formData.namefamily || ""}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            نام پدر:
                            <input
                                type="text"
                                name="dadName"
                                value={formData.dadName || ""}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            نام کاربری:
                            <input
                                type="text"
                                name="username"
                                value={formData.username || ""}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            رمز عبور:
                            <input
                                type="password"
                                name="password"
                                value={formData.password || ""}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            تاریخ تولد:
                            <input
                                data-jdp
                                type="text"
                                id="dateBirth"
                                dir="ltr"
                                name="dateBirth"
                                value={formData.dateBirth || ""}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            نقش:
                            <div className={styles.buttonsContainer}>
                                <button onClick={() => setFormData((prev) => { return { ...prev, roleId: 3, roleName: "زیرگروه" } })} type="button" className={formData.roleId == 3 ? styles.active : null}>زیر گروه</button>
                                <button onClick={() => setFormData((prev) => { return { ...prev, roleId: 2, roleName: "معاون" } })} type="button" className={formData.roleId == 2 ? styles.active : null}>معاون</button>
                                <button onClick={() => setFormData((prev) => { return { ...prev, roleId: 1, roleName: "سرگروه" } })} type="button" className={formData.roleId == 1 ? styles.active : null}>سرگروه</button>
                            </div>
                        </label>
                        <select name="groupId" onChange={handleChange} value={formData.groupId}>
                            {userData.groups.map((g, index) =>
                                <option name={g.name} key={index} value={g.id}>
                                    {g.name}
                                </option>
                            )}
                        </select>
                        <div className={styles.actions}>
                            <button onClick={handleSave}>ثبت</button>
                            <button className={styles.cancelBtn} onClick={() => setShowModal(false)}>انصراف</button>
                        </div>
                    </div>
                </section>
            }
        </div >
    )
}

export default Profile