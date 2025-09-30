import { useEffect } from "react"
import styles from "../../styles/teacher/menuRight.module.css"

const MenuRight = ({ showMenuRight, setShowMenuRight }) => {
    useEffect(() => {

    }, [])
    return (
        <>
            <div className={`${styles.overLay} ${showMenuRight ? styles.active : null}`} onClick={() => setShowMenuRight(false)}></div>
            <div className={`${styles.menuRightContainer} ${showMenuRight ? styles.active : null}`}>
                <img src="" alt="" />
                <p></p>
            </div>
        </>
    )
}
export default MenuRight