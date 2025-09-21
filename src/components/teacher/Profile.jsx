import styles from "../../styles/teacher/profile.module.css"
import profileFake from "../../../public/images/emptyProfile.avif"

const Profile = ({ student, setShowModal }) => {

    return (
        <>
            <div className={styles.profileContainer}>
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
            </div >
        </>
    )
}

export default Profile