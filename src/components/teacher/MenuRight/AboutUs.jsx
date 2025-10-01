import HeaderPages from "./HeaderPages";
import styles from "../../../styles/teacher/MenuRight/aboutUs.module.css"

const AboutUs = ({ setMenuPage, backPage }) => {
    useEffect(() => {
        backPage()
    }, [])
    return (
        <div className={styles.container}>
            <HeaderPages setMenuPage={setMenuPage} title="درباره ما" />
        </div>
    )
}
export default AboutUs;