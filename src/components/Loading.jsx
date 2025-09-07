import styles from "../styles/loading.module.css"

const Loading = () => {
    return (
        <div className={styles.loadingImg}>
            <img src="https://gghxnqfwfnkjkwnhzfpn.supabase.co/storage/v1/object/public/test/general/loading.gif" alt="loading-image" />
        </div>
    )
}

export default Loading