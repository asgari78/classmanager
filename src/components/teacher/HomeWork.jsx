import { useEffect, useState } from "react"

import styles from "../../styles/teacher/homework.module.css"
import { getStudent } from "../../services/axiosApi"
import Loading from "../general/Loading"

const HomeWork = ({ student }) => {
    const [copyHomeWork, setCopyHomeWork] = useState(student.homework)
    const [loading, setLoading] = useState(null)
    const [saveMode, setSaveMode] = useState(true)

    useEffect(() => {
        const fetchGetStudent = async () => {
            try {
                setLoading(true)
                const { data } = await getStudent(parseInt(student.id))
                setCopyHomeWork(data.homework)
                setLoading(false)
            } catch (err) {
                console.log(err);
                setLoading(false)
            }
        }
        fetchGetStudent()
    }, [])

    const handleSave = async () => {

    }
    const handleSum = (index) => {
        let sum = student.homework[index].months.reduce((sum, month) => sum + month.count, 0)
        return sum
    }
    const handleSetCount = (termIndex, monthIndex, operator) => {
        setCopyHomeWork(prev => {
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
                        count: student.homework[termIndex].months[monthIndex].count
                    };
                    break;
            }
            updated[termIndex] = {
                ...updated[termIndex],
                months: updatedMonths,
            };
            return updated;
        });
    }

    return (
        <div className={styles.homeworkContainer}>
            {loading && <Loading />}
            <table>
                <thead>
                    <tr>
                        <th>نام ماه</th>
                        <th>تعداد تکالیف انجام شده</th>
                    </tr>
                </thead>
                <tbody>
                    {copyHomeWork[0].months.map((month, idx) => (
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
                        <td className={styles.mainTerm}>مجموعا {handleSum(0).toLocaleString("fa-IR")} تکلیف انجام شده</td>
                    </tr>
                    {copyHomeWork[1].months.map((month, idx) => (
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
                        <td className={styles.mainTerm}>مجموعا {handleSum(1).toLocaleString("fa-IR")} تکلیف انجام شده</td>
                    </tr>
                </tbody>
            </table>
            <button className={styles.saveBtn} onClick={handleSave} disabled={!saveMode}>ذخیره</button>
        </div>
    )
}

export default HomeWork