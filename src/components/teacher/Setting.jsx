import styles from "../../styles/teacher/setting.module.css"
const Setting = ({ setMenuPage }) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span>تنظیمات</span>
                <i className="fas fa-close" onClick={() => setMenuPage(0)}></i>
            </div>
        </div>
    )
}

export default Setting;