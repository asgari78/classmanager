import styles from "../../../styles/teacher/MenuRight/headerPages.module.css"

const HeaderPages = ({ setMenuPage, title }) => {
    return (
        <div className={styles.header}>
            <span>{title}</span>
            <i className="fas fa-close" onClick={() => setMenuPage(0)}></i>
        </div>
    )
}
export default HeaderPages;