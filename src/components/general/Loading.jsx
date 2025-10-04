import styles from "../../styles/general/loading.module.css"

const Loading = () => {
    return (
        <>
            <div className={styles.loadingContainer}>
                <div className={styles.sliderContainer}>
                    <div className={styles.slider}></div>
                </div>
            </div>
        </>
    )
}

export default Loading