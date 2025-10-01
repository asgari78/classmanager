import { useEffect } from "react";
import styles from "../../../styles/teacher/MenuRight/setting.module.css"
import HeaderPages from "./HeaderPages";
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
            <HeaderPages setMenuPage={setMenuPage} title="تنظیمات" />
        </div>
    )
}

export default Setting;