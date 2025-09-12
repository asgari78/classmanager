import Login from "./Login";
import Teacher from "./teacher/Teacher";

import styles from "../styles/container.module.css"
import { useState } from "react";

import Loading from "./general/Loading.jsx";
import NewStudent from "./teacher/NewStudent.jsx"

const Container = ({ userData, requestLogin, errorServer, loading, checkTeacher, setCheckTeacher }) => {

    const [showNewStPage, setShowNewStPage] = useState(false)

    return (
        <>
            {
                loading &&
                <Loading />
            }
            {userData.length == 0 ?
                <Login requestLogin={requestLogin} errorServer={errorServer} checkTeacher={checkTeacher} setCheckTeacher={setCheckTeacher} />
                :
                <>
                    <NewStudent userData={userData} show={showNewStPage} onClose={() => setShowNewStPage(false)} />
                    <div className={styles.Container}>
                        <section className={styles.header}>
                            <i className="fas fa-bars"></i>
                            <p>نقش : <span>{userData.isTeacher ? "آموزگار" : "دانش آموز"}</span></p>
                            <div className={styles.profile}>
                                <i className="fa fa-user"></i>
                                <p>{userData.namefamily}</p>
                            </div>
                        </section>
                        {
                            userData.isTeacher ?
                                <Teacher setShowNewStPage={setShowNewStPage} userData={userData} />
                                :
                                <p><span>{userData.namefamily}</span> خوش آمدید </p>
                        }
                    </div>
                </>
            }
        </>
    );
}

export default Container