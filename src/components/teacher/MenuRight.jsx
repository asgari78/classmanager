import { useEffect } from "react"
import styles from "../../styles/teacher/menuRight.module.css"
import iconApp from "../../../public/icons/icon192.png"

const MenuRight = ({ showMenuRight, setShowMenuRight, userData }) => {
    return (
        <>
            <div className={`${styles.overLay} ${showMenuRight ? styles.active : null}`} onClick={() => setShowMenuRight(false)}></div>
            <div className={`${styles.menuRightContainer} ${showMenuRight ? styles.active : null}`}>
                <div className={styles.header}>
                    <img className={styles.iconApp} src={iconApp} alt="" />
                    <p>دلفین</p>
                    <i className="fa fa-close" onClick={() => setShowMenuRight(false)}></i>
                </div>
                <div className={styles.main}>
                    <ul>
                        <li>
                            <i className="fas fa-cog"></i>
                            <span>تنظیمات</span>
                        </li>
                        <li>
                            <i className="fas fa-info"></i>
                            <span>درباره ما</span>
                        </li>
                        <li>
                            <i className="fas fa-phone"></i>
                            <span>تماس با ما</span>
                        </li>
                        <li>
                            <i className="fas fa-sign-out"></i>
                            <span>خروج</span>
                        </li>
                    </ul>
                </div>
                <div className={styles.footer}>
                    <span>ساخته شده با <i className="fa fa-heart"></i>mdjd CopyRight© 2025</span>
                </div>
            </div>
        </>
    )
}
export default MenuRight