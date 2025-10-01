import { useEffect } from "react";
import styles from "../../styles/teacher/setting.module.css"
const Setting = ({ setMenuPage }) => {

    useEffect(() => {
        window.history.pushState(null, "", window.location.href);
        const handleBackButton = (e) => {
            e.preventDefault();
            window.history.pushState(null, "", window.location.href);
            setMenuPage(0)
        }
        window.addEventListener("popstate", handleBackButton);
        return () => {
            window.removeEventListener("popstate", handleBackButton);
        };
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