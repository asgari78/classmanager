import { useEffect, useState } from "react";
import styles from "../../styles/general/exitAlert.module.css"

const ExitAlert = ({ setMenuPage }) => {
    const [realyExit, setRealyExit] = useState(true)
    useEffect(() => {
        window.history.pushState(null, "", window.location.href);
        const handleBackButton = (e) => {
            e.preventDefault();
            window.history.pushState(null, "", window.location.href);
            setMenuPage(0)
        }
        if (realyExit) {
            window.addEventListener("popstate", handleBackButton);
        }
        return () => {
            window.removeEventListener("popstate", handleBackButton);
        };
    }, [])

    const exitApp = async () => {
        setRealyExit(false)
        for (let i = 1; i < 100; i++) {
            window.history.back()
        }
    }
    return (
        <div className={styles.overLay}>
            <div className={styles.container}>
                <p><i className="fas fa-exclamation-circle"></i>آیا خارج می شوید؟</p>
                <div className={styles.buttonsContainer}>
                    <button onClick={exitApp}>خروج</button>
                    <button onClick={() => setMenuPage(0)}>لغو</button>
                </div>
            </div>
        </div>
    )
}
export default ExitAlert;