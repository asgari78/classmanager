import HeaderPages from "./HeaderPages";
import styles from "../../../styles/teacher/MenuRight/callUs.module.css"
import { useEffect } from "react";

const CallUs = ({ setMenuPage, backPage }) => {
    useEffect(() => {
        backPage("menuRight")
    }, [])
    return (
        <div className={styles.container}>
            <HeaderPages setMenuPage={setMenuPage} title="تماس با ما" />
        </div>
    )
}
export default CallUs;