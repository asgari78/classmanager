import HeaderPages from "./HeaderPages";
import styles from "../../../styles/teacher/MenuRight/aboutUs.module.css"
import { useEffect } from "react";

const AboutUs = ({ setMenuPage }) => {

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
            <HeaderPages setMenuPage={setMenuPage} title="درباره ما" />
        </div>
    )
}
export default AboutUs;