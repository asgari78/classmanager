import { useEffect, useState } from "react";
import styles from "../../styles/teacher/discipline.module.css";
import { getStudent, putStudent } from "../../services/axiosApi";
import Loading from "../general/Loading"

const Discipline = ({ st, userData, showAddModal, setShowAddModal, showEditModal, setShowEditModal }) => {
    const [student, setStudent] = useState(null);
    const [activeTab, setActiveTab] = useState("positive");


    useEffect(() => {
        if (showAddModal || showEditModal) {
            window.history.pushState(null, "", window.location.href);
            const handleBackButton = (e) => {
                e.preventDefault();
                window.history.pushState(null, "", window.location.href);
                setShowAddModal(false)
                setShowEditModal(null)
            }
            window.addEventListener("popstate", handleBackButton);
            return () => {
                window.removeEventListener("popstate", handleBackButton);
            };
        }
    }, [showAddModal, showEditModal])

    const fetchStudent = async () => {
        try {
            const { data } = await getStudent(st.id);
            setStudent(data);
        } catch (err) {
            console.error("خطا در گرفتن اطلاعات دانش‌آموز:", err);
        }
    };

    useEffect(() => {
        fetchStudent();
    }, [st.id]);

    const saveStudent = async (updated) => {
        try {
            await putStudent(updated);
            await fetchStudent();
        } catch (err) {
            console.error("خطا در ذخیره‌سازی:", err);
        }
    };

    // اضافه کردن مورد جدید
    const handleAddRecord = (record) => {
        const updated = {
            ...student,
            discipline: [...(student.discipline || []), record],
        };
        saveStudent(updated);
        setShowAddModal(false);
    };

    // ویرایش مورد
    const handleEditRecord = (id, updatedRecord) => {
        const updated = {
            ...student,
            discipline: student.discipline.map((rec) =>
                rec.id === id ? { ...rec, ...updatedRecord } : rec
            ),
        };
        saveStudent(updated);
        setShowEditModal(null);
    };

    // حذف
    const handleDeleteRecord = (id) => {
        const updated = {
            ...student,
            discipline: student.discipline.filter((rec) => rec.id !== id),
        };
        saveStudent(updated);
    };

    if (!student) return (
        <div className={styles.loadingContainer}>
            <Loading />
        </div>
    );

    const disciplineRecords = (student.discipline || [])
        .filter((rec) => rec.type === activeTab)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div className={styles.container}>
            {/* Tabs */}
            <div className={styles.tabs}>
                <button
                    className={activeTab === "positive" ? styles.activeTab : ""}
                    onClick={() => setActiveTab("positive")}
                >
                    موارد مثبت ({(student.discipline || []).filter((r) => r.type === "positive").length})
                </button>
                <button
                    className={activeTab === "negative" ? styles.activeTab : ""}
                    onClick={() => setActiveTab("negative")}
                >
                    موارد منفی ({(student.discipline || []).filter((r) => r.type === "negative").length})
                </button>
            </div>

            {/* Records List */}
            {disciplineRecords.length === 0 ? (
                <p className={styles.empty}>موردی یافت نشد</p>
            ) : (
                <ul className={styles.list}>
                    {disciplineRecords.map((rec) => (
                        <li
                            key={rec.id}
                            className={rec.type === "positive" ? styles.positive : styles.negative}
                            onClick={() => setShowEditModal(rec.id)}
                        >
                            <div className={styles.meta}>
                                <span>{new Date(rec.date).toLocaleDateString("fa-IR")}</span>
                                <button onClick={(e) => { e.stopPropagation(); handleDeleteRecord(rec.id); }}><i className="fas fa-trash"></i></button>
                            </div>
                            <div className={styles.descriptions}>
                                <h4>{rec.category}</h4>
                                <small>({rec.desc})</small>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {/* Modal: Add */}
            {showAddModal && (
                <DisciplineModal
                    onClose={() => setShowAddModal(false)}
                    onSave={handleAddRecord}
                />
            )}

            {/* Modal: Edit */}
            {showEditModal && (
                <DisciplineModal
                    record={student.discipline.find((r) => r.id === showEditModal)}
                    onClose={() => setShowEditModal(null)}
                    onSave={(updated) => handleEditRecord(showEditModal, updated)}
                />
            )}
            {userData ? <button className={styles.fab} onClick={() => setShowAddModal(true)}>+</button> : null}
        </div>
    );
};

export default Discipline;


// ================= Modal ==================

const DisciplineModal = ({ onClose, onSave, record }) => {
    const [type, setType] = useState(record?.type || "positive");
    const [date, setDate] = useState(record?.date || new Date().toISOString());
    const [category, setCategory] = useState(record?.category || "");
    const [customTitle, setCustomTitle] = useState(record?.title || "");
    const [customCategory, setCustomCategory] = useState(record?.category === "موارد دیگر" || false);
    const [desc, setDesc] = useState(record?.desc || "");

    const categories1 = [
        "نظم در کلاس",
        "رعایت بهداشت",
        "پیشرفت تحصیلی",
        "موارد دیگر",
    ];
    const categories2 = [
        "تذکر کلاسی",
        "اخراج از کلاس",
        "صحبت بی اجازه",
        "موارد دیگر",
    ];

    useEffect(() => {
        const handler = (e) => {
            if (!e?.target) return;
            const hasJdpAttr = e.target.getAttribute && e.target.getAttribute("data-jdp") !== null;
            if (!hasJdpAttr) return;
            const val = e.target.value;
            if (!val) return;
            if (/^\d{4}-\d{2}-\d{2}$/.test(val)) {
                setDate(new Date(val).toISOString());
            } else {
                setDate(val);
            }
        };
        document.addEventListener("jdp:change", handler);
        return () => document.removeEventListener("jdp:change", handler);
    }, []);

    const handleTypeChange = (newType) => {
        setType(newType);
        setCategory("");
        setCustomCategory(false);
        setCustomTitle("");
    };

    const handleSubmit = () => {
        if (!category) {
            alert("لطفاً یک دسته‌بندی انتخاب کنید.");
            return;
        }
        if (category === "موارد دیگر" && !customTitle.trim()) {
            alert("لطفاً عنوان دلخواه را وارد کنید.");
            return;
        }

        const finalCategory = customCategory ? "موارد دیگر" : category;
        const finalTitle = customCategory ? customTitle : category;

        const newRecord = {
            id: record?.id || Date.now().toString(),
            type,
            date,
            category: finalCategory,
            title: finalTitle,
            desc,
        };
        onSave(newRecord);
    };

    const dateInputValue = (() => {
        if (!date) return "";
        if (typeof date === "string" && date.includes("T")) {
            return date.split("T")[0];
        }
        return date;
    })();

    return (
        <section className={styles.modalOverlay} onClick={(e) => { (e.target.nodeName === "SECTION") && onClose() }}>
            <div className={styles.modal}>
                <h3>{record ? "ویرایش مورد" : "افزودن مورد جدید"}</h3>

                <label>
                    <span>نوع مورد</span>
                    <select
                        value={type}
                        onChange={(e) => handleTypeChange(e.target.value)}
                    >
                        <option value="positive">مثبت</option>
                        <option value="negative">منفی</option>
                    </select>
                </label>

                <label>
                    <span>تاریخ</span>
                    <input
                        type="text"
                        data-jdp
                        dir="ltr"
                        value={dateInputValue}
                        onChange={(e) => {
                            const v = e.target.value;
                            if (/^\d{4}-\d{2}-\d{2}$/.test(v)) {
                                setDate(new Date(v).toISOString());
                            } else {
                                setDate(v);
                            }
                        }}
                        onFocus={() => jalaliDatepicker.startWatch()}
                    />
                </label>

                <label>
                    <span>دسته بندی</span>
                    <select
                        value={category}
                        onChange={(e) => {
                            setCategory(e.target.value);
                            setCustomCategory(e.target.value === "موارد دیگر");
                        }}
                    >
                        <option value="">یک مورد را انتخاب کنید...</option>
                        {type === "positive" &&
                            categories1.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                        {type === "negative" &&
                            categories2.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </label>

                {customCategory && (
                    <input
                        type="text"
                        placeholder="عنوان دلخواه"
                        value={customTitle}
                        onChange={(e) => setCustomTitle(e.target.value)}
                    />
                )}

                <label>
                    <textarea
                        placeholder="توضیحات"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    ></textarea>
                </label>

                <div className={styles.actions}>
                    <button onClick={handleSubmit}>ثبت</button>
                    <button onClick={onClose} className={styles.cancelBtn}>انصراف</button>
                </div>
            </div>
        </section>
    );
};