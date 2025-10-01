import { useEffect } from "react";
import styles from "../../../styles/teacher/MenuRight/setting.module.css"
import HeaderPages from "./HeaderPages";
const Setting = ({ setMenuPage, backPage }) => {
    useEffect(() => {
        backPage()
    }, [])
    return (
        <div className={styles.container}>
            <HeaderPages setMenuPage={setMenuPage} title="تنظیمات" />
        </div>
    )
}

export default Setting;