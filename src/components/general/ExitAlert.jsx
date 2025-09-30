import { putTeacher } from "../../services/axiosApi"
import styles from "../../styles/general/exitAlert.module.css"

const ExitAlert = ({ setUserData, setMenuPage, userData }) => {
    const exitApp = async () => {
        setMenuPage(0)
        const copyUserData = JSON.parse(JSON.stringify(userData))
        copyUserData.login = false;
        putTeacher(copyUserData)
        localStorage.clear()
        setUserData([])
    }
    return (
        <div className={styles.overLay}>
            <div className={styles.container}>
                <p><i className="fas fa-exclamation-circle"></i>آیا خارج می شوید؟</p>
                <div className={styles.buttonsContainer}>
                    <button onClick={exitApp}>خروج</button>
                    <button onClick={() => setMenuPage(0)}>لغو</button>
                </div>
            </div>
        </div>
    )
}
export default ExitAlert;