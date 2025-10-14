import styles from "../../../styles/teacher/MenuRight/headerPages.module.css"

const HeaderPages = ({ setMenuPage, title }) => {
    return (
        <div className={styles.header}>
            <span>{title}</span>
            <button onClick={() => setMenuPage(0)}>
                <i className="fas fa-close"></i>
            </button>
        </div>
    )
}
export default HeaderPages;