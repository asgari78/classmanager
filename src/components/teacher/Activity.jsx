import { useEffect, useState } from "react"

import styles from "../../styles/teacher/homeworkAndActivity.module.css"
import { getStudent, putStudent } from "../../services/axiosApi"
import Loading from "../general/Loading"

const Activity = ({ student, userData }) => {
    const [copyActivity, setCopyActivity] = useState(null)
    const [loading, setLoading] = useState(null)
    const [currentStudent, setCurrentStudent] = useState(null)
    const [saveMode, setSaveMode] = useState(false)

    const fetchGetStudent = async () => {
        try {
            setLoading(true)
            const { data } = await getStudent(parseInt(student.id))
            setCurrentStudent(data)
            setCopyActivity(data.activity)
            setLoading(false)
        } catch (err) {
            console.log(err);
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchGetStudent()
    }, [student.id])
    const handleSave = async () => {
        try {
            setLoading(true)
            const updatedStudent = {
                ...currentStudent,
                activity: copyActivity
            }
            await putStudent(updatedStudent)
            await fetchGetStudent()
            setSaveMode(false)
            setLoading(false)
        } catch (err) {
            console.error("خطا در ذخیره تکالیف:", err)
            setLoading(false)
            setSaveMode(true)
        }
    }
    const handleSum = (index) => {
        let sum = copyActivity[index].months.reduce((sum, month) => sum + month.count, 0)
        return sum;
    }
    const handleSetCount = (termIndex, monthIndex, operator) => {
        setCopyActivity(prev => {
            const updated = [...prev];
            const updatedMonths = [...updated[termIndex].months];
            switch (operator) {
                case "+":
                    updatedMonths[monthIndex] = {
                        ...updatedMonths[monthIndex],
                        count: updatedMonths[monthIndex].count + 1,
                    };
                    break;
                case "-":
                    if (updatedMonths[monthIndex].count > 0) {
                        updatedMonths[monthIndex] = {
                            ...updatedMonths[monthIndex],
                            count: updatedMonths[monthIndex].count - 1,
                        };
                    }
                    break;
                case "undo":
                    updatedMonths[monthIndex] = {
                        ...updatedMonths[monthIndex],
                        count: currentStudent.activity[termIndex].months[monthIndex].count
                    };
                    break;
            }
            updated[termIndex] = {
                ...updated[termIndex],
                months: updatedMonths,
            };
            let changed = false;
            updated.map((term, termIdx) => {
                term.months.map((month, monthIdx) => {
                    if (month.count !== currentStudent.activity[termIdx].months[monthIdx].count) {
                        changed = true;
                    }
                })
            })
            setSaveMode(changed);
            return updated;
        });
    }

    return (
        userData ?
            <div className={styles.Container}>
                {loading && <Loading />}
                {currentStudent ?
                    <table>
                        <thead>
                            <tr>
                                <th>نام ماه</th>
                                <th>تعداد فعالیت ها</th>
                            </tr>
                        </thead>
                        <tbody>
                            {copyActivity[0].months.map((month, idx) => (
                                <tr key={idx}>
                                    <td>{month.name}</td>
                                    <td>
                                        <div className={styles.countContainer}>
                                            <button onClick={() => handleSetCount(0, idx, "+")}><i className="fas fa-plus"></i></button>
                                            <span>{month.count.toLocaleString("fa-IR")}</span>
                                            <button onClick={() => handleSetCount(0, idx, "-")}><i className="fas fa-minus"></i></button>
                                            <button onClick={() => handleSetCount(0, idx, "undo")}><i className="fas fa-undo-alt"></i></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td className={styles.mainTerm}>نوبت اول</td>
                                <td className={styles.mainTerm}>مجموعا {handleSum(0).toLocaleString("fa-IR")} فعالیت انجام شده</td>
                            </tr>
                            {copyActivity[1].months.map((month, idx) => (
                                <tr key={idx}>
                                    <td>{month.name}</td>
                                    <td>
                                        <div className={styles.countContainer}>
                                            <button onClick={() => handleSetCount(1, idx, "+")}><i className="fas fa-plus"></i></button>
                                            <span>{month.count.toLocaleString("fa-IR")}</span>
                                            <button onClick={() => handleSetCount(1, idx, "-")}><i className="fas fa-minus"></i></button>
                                            <button onClick={() => handleSetCount(1, idx, "undo")}><i className="fas fa-undo-alt"></i></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td className={styles.mainTerm}>نوبت دوم</td>
                                <td className={styles.mainTerm}>مجموعا {handleSum(1).toLocaleString("fa-IR")} فعالیت انجام شده</td>
                            </tr>
                        </tbody>
                    </table>
                    : null
                }
                <button className={styles.saveBtn} onClick={handleSave} disabled={!saveMode}>ذخیره</button>
            </div>
            :
            <div className={styles.comming}>
                <p>به زودی فعال می شود🙏</p>
            </div>
    )
}

export default Activity