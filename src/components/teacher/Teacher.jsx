import { useEffect, useState, useRef } from "react"
import styles from "../../styles/teacher/teacher.module.css"

import { NewStudent, StudentBar } from "./"
import Loading from "../general/Loading"

import { putStudent } from "../../services/axiosApi.js"

const Teacher = ({ userData, setShowStPage, allStudents, teacher, serverError, getTeacherData }) => {
    const [activeSection, setActiveSection] = useState(1)
    const [showNewStPage, setShowNewStPage] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const deleteTwoLessons = async () => {
            for (const st of allStudents) {

                const updatedLesson = [
                    {
                        name: "ریاضی",
                        score: [
                            {
                                name: "مهر",
                                value: [
                                    {
                                        name: "هفته اول",
                                        value: null
                                    },
                                    {
                                        name: "هفته دوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته سوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته چهارم",
                                        value: null
                                    }
                                ]
                            },
                            {
                                name: "آبان",
                                value: [
                                    {
                                        name: "هفته اول",
                                        value: null
                                    },
                                    {
                                        name: "هفته دوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته سوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته چهارم",
                                        value: null
                                    }
                                ]
                            },
                            {
                                name: "آذر",
                                value: [
                                    {
                                        name: "هفته اول",
                                        value: null
                                    },
                                    {
                                        name: "هفته دوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته سوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته چهارم",
                                        value: null
                                    }
                                ]
                            },
                            {
                                name: "دی",
                                value: [
                                    {
                                        name: "هفته اول",
                                        value: null
                                    },
                                    {
                                        name: "هفته دوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته سوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته چهارم",
                                        value: null
                                    }
                                ]
                            },
                            {
                                name: "بهمن",
                                value: [
                                    {
                                        name: "هفته اول",
                                        value: null
                                    },
                                    {
                                        name: "هفته دوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته سوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته چهارم",
                                        value: null
                                    }
                                ]
                            },
                            {
                                name: "اسفند",
                                value: [
                                    {
                                        name: "هفته اول",
                                        value: null
                                    },
                                    {
                                        name: "هفته دوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته سوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته چهارم",
                                        value: null
                                    }
                                ]
                            },
                            {
                                name: "فروردین",
                                value: [
                                    {
                                        name: "هفته اول",
                                        value: null
                                    },
                                    {
                                        name: "هفته دوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته سوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته چهارم",
                                        value: null
                                    }
                                ]
                            },
                            {
                                name: "اردیبهشت",
                                value: [
                                    {
                                        name: "هفته اول",
                                        value: null
                                    },
                                    {
                                        name: "هفته دوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته سوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته چهارم",
                                        value: null
                                    }
                                ]
                            },
                            {
                                name: "خرداد",
                                value: [
                                    {
                                        name: "هفته اول",
                                        value: null
                                    },
                                    {
                                        name: "هفته دوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته سوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته چهارم",
                                        value: null
                                    }
                                ]
                            }
                        ],
                        image: "https://gghxnqfwfnkjkwnhzfpn.supabase.co/storage/v1/object/public/test/lessons/riazi.jpg",
                        id: "L01"
                    },
                    {
                        name: "علوم",
                        score: [
                            {
                                name: "مهر",
                                value: [
                                    {
                                        name: "هفته اول",
                                        value: null
                                    },
                                    {
                                        name: "هفته دوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته سوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته چهارم",
                                        value: null
                                    }
                                ]
                            },
                            {
                                name: "آبان",
                                value: [
                                    {
                                        name: "هفته اول",
                                        value: null
                                    },
                                    {
                                        name: "هفته دوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته سوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته چهارم",
                                        value: null
                                    }
                                ]
                            },
                            {
                                name: "آذر",
                                value: [
                                    {
                                        name: "هفته اول",
                                        value: null
                                    },
                                    {
                                        name: "هفته دوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته سوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته چهارم",
                                        value: null
                                    }
                                ]
                            },
                            {
                                name: "دی",
                                value: [
                                    {
                                        name: "هفته اول",
                                        value: null
                                    },
                                    {
                                        name: "هفته دوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته سوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته چهارم",
                                        value: null
                                    }
                                ]
                            },
                            {
                                name: "بهمن",
                                value: [
                                    {
                                        name: "هفته اول",
                                        value: null
                                    },
                                    {
                                        name: "هفته دوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته سوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته چهارم",
                                        value: null
                                    }
                                ]
                            },
                            {
                                name: "اسفند",
                                value: [
                                    {
                                        name: "هفته اول",
                                        value: null
                                    },
                                    {
                                        name: "هفته دوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته سوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته چهارم",
                                        value: null
                                    }
                                ]
                            },
                            {
                                name: "فروردین",
                                value: [
                                    {
                                        name: "هفته اول",
                                        value: null
                                    },
                                    {
                                        name: "هفته دوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته سوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته چهارم",
                                        value: null
                                    }
                                ]
                            },
                            {
                                name: "اردیبهشت",
                                value: [
                                    {
                                        name: "هفته اول",
                                        value: null
                                    },
                                    {
                                        name: "هفته دوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته سوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته چهارم",
                                        value: null
                                    }
                                ]
                            },
                            {
                                name: "خرداد",
                                value: [
                                    {
                                        name: "هفته اول",
                                        value: null
                                    },
                                    {
                                        name: "هفته دوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته سوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته چهارم",
                                        value: null
                                    }
                                ]
                            }
                        ],
                        image: "https://gghxnqfwfnkjkwnhzfpn.supabase.co/storage/v1/object/public/test/lessons/olom.jpg",
                        id: "L02"
                    },
                    {
                        name: "فارسی",
                        score: [
                            {
                                name: "مهر",
                                value: [
                                    {
                                        name: "هفته اول",
                                        value: null
                                    },
                                    {
                                        name: "هفته دوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته سوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته چهارم",
                                        value: null
                                    }
                                ]
                            },
                            {
                                name: "آبان",
                                value: [
                                    {
                                        name: "هفته اول",
                                        value: null
                                    },
                                    {
                                        name: "هفته دوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته سوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته چهارم",
                                        value: null
                                    }
                                ]
                            },
                            {
                                name: "آذر",
                                value: [
                                    {
                                        name: "هفته اول",
                                        value: null
                                    },
                                    {
                                        name: "هفته دوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته سوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته چهارم",
                                        value: null
                                    }
                                ]
                            },
                            {
                                name: "دی",
                                value: [
                                    {
                                        name: "هفته اول",
                                        value: null
                                    },
                                    {
                                        name: "هفته دوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته سوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته چهارم",
                                        value: null
                                    }
                                ]
                            },
                            {
                                name: "بهمن",
                                value: [
                                    {
                                        name: "هفته اول",
                                        value: null
                                    },
                                    {
                                        name: "هفته دوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته سوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته چهارم",
                                        value: null
                                    }
                                ]
                            },
                            {
                                name: "اسفند",
                                value: [
                                    {
                                        name: "هفته اول",
                                        value: null
                                    },
                                    {
                                        name: "هفته دوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته سوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته چهارم",
                                        value: null
                                    }
                                ]
                            },
                            {
                                name: "فروردین",
                                value: [
                                    {
                                        name: "هفته اول",
                                        value: null
                                    },
                                    {
                                        name: "هفته دوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته سوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته چهارم",
                                        value: null
                                    }
                                ]
                            },
                            {
                                name: "اردیبهشت",
                                value: [
                                    {
                                        name: "هفته اول",
                                        value: null
                                    },
                                    {
                                        name: "هفته دوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته سوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته چهارم",
                                        value: null
                                    }
                                ]
                            },
                            {
                                name: "خرداد",
                                value: [
                                    {
                                        name: "هفته اول",
                                        value: null
                                    },
                                    {
                                        name: "هفته دوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته سوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته چهارم",
                                        value: null
                                    }
                                ]
                            }
                        ],
                        image: "https://gghxnqfwfnkjkwnhzfpn.supabase.co/storage/v1/object/public/test/lessons/farsi.jpg",
                        id: "L03"
                    },
                    {
                        name: "فناوری",
                        score: [
                            {
                                name: "نوبت اول",
                                value: [
                                    {
                                        name: "ارزشیابی اول",
                                        value: null
                                    },
                                    {
                                        name: "ارزشیابی دوم",
                                        value: null
                                    },
                                    {
                                        name: "ارزشیابی سوم",
                                        value: null
                                    },
                                    {
                                        name: "ارزشیابی چهارم",
                                        value: null
                                    }
                                ]
                            },
                            {
                                name: "نوبت دوم",
                                value: [
                                    {
                                        name: "ارزشیابی اول",
                                        value: null
                                    },
                                    {
                                        name: "ارزشیابی دوم",
                                        value: null
                                    },
                                    {
                                        name: "ارزشیابی سوم",
                                        value: null
                                    },
                                    {
                                        name: "ارزشیابی چهارم",
                                        value: null
                                    }
                                ]
                            }
                        ],
                        image: "https://gghxnqfwfnkjkwnhzfpn.supabase.co/storage/v1/object/public/test/lessons/fanavari.jpg",
                        id: "L04"
                    },
                    {
                        name: "هنر و خوش نویسی",
                        score: [
                            {
                                name: "نوبت اول",
                                value: [
                                    {
                                        name: "ارزشیابی اول",
                                        value: null
                                    },
                                    {
                                        name: "ارزشیابی دوم",
                                        value: null
                                    },
                                    {
                                        name: "ارزشیابی سوم",
                                        value: null
                                    },
                                    {
                                        name: "ارزشیابی چهارم",
                                        value: null
                                    }
                                ]
                            },
                            {
                                name: "نوبت دوم",
                                value: [
                                    {
                                        name: "ارزشیابی اول",
                                        value: null
                                    },
                                    {
                                        name: "ارزشیابی دوم",
                                        value: null
                                    },
                                    {
                                        name: "ارزشیابی سوم",
                                        value: null
                                    },
                                    {
                                        name: "ارزشیابی چهارم",
                                        value: null
                                    }
                                ]
                            }
                        ],
                        image: "https://gghxnqfwfnkjkwnhzfpn.supabase.co/storage/v1/object/public/test/lessons/honar.jpg",
                        id: "L05"
                    },
                    {
                        name: "مطالعات",
                        score: [
                            {
                                name: "مهر",
                                value: [
                                    {
                                        name: "هفته اول",
                                        value: null
                                    },
                                    {
                                        name: "هفته دوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته سوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته چهارم",
                                        value: null
                                    }
                                ]
                            },
                            {
                                name: "آبان",
                                value: [
                                    {
                                        name: "هفته اول",
                                        value: null
                                    },
                                    {
                                        name: "هفته دوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته سوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته چهارم",
                                        value: null
                                    }
                                ]
                            },
                            {
                                name: "آذر",
                                value: [
                                    {
                                        name: "هفته اول",
                                        value: null
                                    },
                                    {
                                        name: "هفته دوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته سوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته چهارم",
                                        value: null
                                    }
                                ]
                            },
                            {
                                name: "دی",
                                value: [
                                    {
                                        name: "هفته اول",
                                        value: null
                                    },
                                    {
                                        name: "هفته دوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته سوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته چهارم",
                                        value: null
                                    }
                                ]
                            },
                            {
                                name: "بهمن",
                                value: [
                                    {
                                        name: "هفته اول",
                                        value: null
                                    },
                                    {
                                        name: "هفته دوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته سوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته چهارم",
                                        value: null
                                    }
                                ]
                            },
                            {
                                name: "اسفند",
                                value: [
                                    {
                                        name: "هفته اول",
                                        value: null
                                    },
                                    {
                                        name: "هفته دوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته سوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته چهارم",
                                        value: null
                                    }
                                ]
                            },
                            {
                                name: "فروردین",
                                value: [
                                    {
                                        name: "هفته اول",
                                        value: null
                                    },
                                    {
                                        name: "هفته دوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته سوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته چهارم",
                                        value: null
                                    }
                                ]
                            },
                            {
                                name: "اردیبهشت",
                                value: [
                                    {
                                        name: "هفته اول",
                                        value: null
                                    },
                                    {
                                        name: "هفته دوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته سوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته چهارم",
                                        value: null
                                    }
                                ]
                            },
                            {
                                name: "خرداد",
                                value: [
                                    {
                                        name: "هفته اول",
                                        value: null
                                    },
                                    {
                                        name: "هفته دوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته سوم",
                                        value: null
                                    },
                                    {
                                        name: "هفته چهارم",
                                        value: null
                                    }
                                ]
                            }
                        ],
                        image: "https://gghxnqfwfnkjkwnhzfpn.supabase.co/storage/v1/object/public/test/lessons/motaleat.jpg",
                        id: "L06"
                    }
                ]
                const updatedStudent = { ...st, lessons: updatedLesson }
                const { data } = await putStudent(updatedStudent)
            }
        }
        deleteTwoLessons()
    }, [])


    return (
        <>
            <NewStudent getTeacherData={getTeacherData} userData={userData} show={showNewStPage} setShow={setShowNewStPage} />
            {loading && <Loading />}
            <section className={styles.teacherContent}>
                {/* بخش تب‌ها */}
                <section className={styles.groupsList}>
                    <ul>
                        <li
                            className={activeSection === 1 ? `${styles.groupLi} ${styles.activegroupLi}` : styles.groupLi}
                            onClick={() => setActiveSection(1)}
                        >
                            دانش آموزان
                        </li>
                        <li
                            className={activeSection === 2 ? `${styles.groupLi} ${styles.activegroupLi}` : styles.groupLi}
                            onClick={() => setActiveSection(2)}
                        >
                            دروس
                        </li>
                    </ul>
                </section>

                {/* بخش دانش آموزان */}
                <div className={activeSection === 1 ? styles.studentListContainer : null}>
                    {activeSection === 1 ?
                        allStudents.length > 0 ?
                            allStudents.map((st, index) => (
                                <StudentBar
                                    setShowStPage={setShowStPage}
                                    allStudents={allStudents}
                                    userData={userData}
                                    st={st}
                                    key={index}
                                    index={index}
                                    setLoading={setLoading}
                                />
                            ))
                            :
                            <div className={styles.noStudentContainer}>
                                <img
                                    src="https://gghxnqfwfnkjkwnhzfpn.supabase.co/storage/v1/object/public/test/general/noStudent.jpg"
                                    alt="noStudentImage"
                                />
                                <h2>دانش آموزی ندارید</h2>
                                <div>
                                    <span>با زدن</span>
                                    <span className={styles.addStSpan}>+</span>
                                    <span>دانش آموزان خود را اضافه کنید</span>
                                </div>
                            </div>
                        : null
                    }
                </div>

                {/* بخش دروس */}
                {activeSection === 2 && (
                    <section className={styles.lessonsContainer}>
                        {(!serverError && teacher?.lessons) ? (
                            teacher.lessons.map(lesson => (
                                <div className={styles.lesson} key={lesson.id}>
                                    <img src={lesson.image} alt="lessonImg" />
                                    <span>{lesson.name}</span>
                                </div>
                            ))
                        ) : (
                            <div className={styles.errorContainer}>
                                <p>درسی یافت نشد!</p>
                                <button className={styles.tryButton} onClick={getTeacherData}>تلاش مجدد</button>
                            </div>
                        )}
                    </section>
                )}

                {activeSection === 1 && (
                    <button
                        className={styles.addStBtn}
                        onClick={() => { setShowNewStPage(true); }}
                    >
                        +
                    </button>
                )}
            </section>
        </>
    )
}

export default Teacher