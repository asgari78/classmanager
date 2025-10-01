import { useEffect } from "react";
import styles from "../../styles/teacher/setting.module.css"
const Setting = ({ setMenuPage }) => {

    const handleBackButton = () => {
        setMenuPage(0)
    }
    useEffect(() => {
        window.addEventListener("popstate", handleBackButton);
    }, [])
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