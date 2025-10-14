import { useEffect, useState, useRef } from "react";
import styles from "../../../styles/teacher/MenuRight/tarhDars.module.css";
import HeaderPages from "./HeaderPages";
import { infoInit } from "../../../helpers/dataKeepTeacher";
import { getTeacher, putTeacher } from "../../../services/axiosApi";

const TarhDars = ({ setMenuPage, userData, onUserDataUpdate }) => {
    const [currentDate, setCurrentDate] = useState("");
    const [todayLessons, setTodayLessons] = useState(infoInit);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedLessonIndex, setSelectedLessonIndex] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [loadingSave, setLoadingSave] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [newLesson, setNewLesson] = useState({ lesson: "", desc: "" });
    const [errors, setErrors] = useState({ lesson: "", desc: "" });

    const dateInputRef = useRef(null);

    // ✅ تابع کمکی تبدیل تاریخ میلادی به شمسی
    const gregorianToJalali = (gDate) => {
        let gy, gm, gd;
        if (typeof gDate === "string") {
            const parts = gDate.split("-");
            gy = +parts[0];
            gm = +parts[1];
            gd = +parts[2];
        } else {
            const d = new Date(gDate);
            gy = d.getFullYear();
            gm = d.getMonth() + 1;
            gd = d.getDate();
        }

        const g_d_m = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let gy2 = gy - 1600;
        let gm2 = gm - 1;
        let gd2 = gd - 1;

        let g_day_no =
            365 * gy2 +
            Math.floor((gy2 + 3) / 4) -
            Math.floor((gy2 + 99) / 100) +
            Math.floor((gy2 + 399) / 400);

        for (let i = 0; i < gm2; ++i) g_day_no += g_d_m[i + 1];
        if (gm2 > 1 && ((gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0))
            g_day_no++;
        g_day_no += gd2;

        let j_day_no = g_day_no - 79;
        let j_np = Math.floor(j_day_no / 12053);
        j_day_no = j_day_no % 12053;
        let jy = 979 + 33 * j_np + 4 * Math.floor(j_day_no / 1461);
        j_day_no = j_day_no % 1461;

        if (j_day_no >= 366) {
            jy += Math.floor((j_day_no - 1) / 365);
            j_day_no = (j_day_no - 1) % 365;
        }

        const j_month_days = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
        let jm = 0, jd = 0;
        for (let i = 0; i < 12; i++) {
            if (j_day_no < j_month_days[i]) {
                jm = i + 1;
                jd = j_day_no + 1;
                break;
            }
            j_day_no -= j_month_days[i];
        }

        const pad = (n) => (n < 10 ? "0" + n : n);
        return `${jy}/${pad(jm)}/${pad(jd)}`;
    };

    const getWeekdayName = (gDate) => {
        const days = ["یک‌شنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه", "شنبه"];
        const d = new Date(gDate);
        return days[d.getDay()];
    };

    const formatDateISO = (dateObj) => dateObj.toISOString().split("T")[0];

    // ✅ تنظیم تاریخ امروز در شروع کار
    const initToday = () => {
        const todayISO = formatDateISO(new Date());
        setCurrentDate(todayISO);

        const found = userData.Tarhlessons.find((item) => item.date === todayISO);
        setTodayLessons(found || { date: todayISO, bell: [] });

        if (dateInputRef.current) {
            const weekday = getWeekdayName(todayISO);
            const jalaliStr = gregorianToJalali(todayISO);
            dateInputRef.current.value = `${jalaliStr} - ${weekday}`;
        }
    };

    // ✅ اولین بار کامپوننت
    useEffect(() => {
        initToday();

        // جلوگیری از برگشت مرورگر
        window.history.pushState(null, "", window.location.href);
        const handleBackButton = (e) => {
            e.preventDefault();
            window.history.pushState(null, "", window.location.href);
            setMenuPage(0);
        };
        window.addEventListener("popstate", handleBackButton);
        return () => window.removeEventListener("popstate", handleBackButton);
    }, []);

    // ✅ کنترل تغییر تاریخ (میلادی <-> شمسی)
    useEffect(() => {
        if (typeof jalaliDatepicker !== "undefined" && jalaliDatepicker.startWatch) {
            jalaliDatepicker.startWatch();
        }
        if (currentDate && dateInputRef.current) {
            const jal = gregorianToJalali(currentDate);
            const weekday = getWeekdayName(currentDate);
            dateInputRef.current.value = `${jal} - ${weekday}`;
        }
    }, [currentDate]);

    // ✅ تغییر روز بعد یا قبل
    const changeDay = (dir) => {
        if (!currentDate) return;
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + (dir === "next" ? 1 : -1));
        const newDateStr = formatDateISO(newDate);
        setCurrentDate(newDateStr);
        const found = userData.Tarhlessons.find((item) => item.date === newDateStr);
        setTodayLessons(found || { date: newDateStr, bell: [] });
    };

    // ✅ اعتبارسنجی فرم
    const validateForm = () => {
        let valid = true;
        let newErrors = { lesson: "", desc: "" };

        if (!newLesson.lesson.trim()) {
            newErrors.lesson = "لطفا نام درس را انتخاب کنید.";
            valid = false;
        }
        if (!newLesson.desc.trim()) {
            newErrors.desc = "توضیحات طرح درس را وارد کنید.";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    // ✅ حذف طرح درس
    const handleDeleteLesson = async () => {
        try {
            setLoadingDelete(true);
            const { data: freshUser } = await getTeacher(userData.id);
            const allDays = [...freshUser.Tarhlessons];
            const dayIndex = allDays.findIndex((d) => d.date === currentDate);

            if (dayIndex !== -1) {
                const day = { ...allDays[dayIndex] };
                day.bell.splice(deleteTarget, 1);
                allDays[dayIndex] = day;
                const mergedUser = { ...freshUser, Tarhlessons: allDays };
                await putTeacher(mergedUser);
                onUserDataUpdate?.(mergedUser);
                setTodayLessons(allDays[dayIndex]);
            }
        } catch (e) {
            console.error("خطا در حذف طرح درس", e);
        } finally {
            setLoadingDelete(false);
            setShowDeleteModal(false);
        }
    };

    // ✅ ویرایش طرح درس
    const openEditLesson = (index) => {
        const lesson = todayLessons.bell[index];
        setNewLesson({ lesson: lesson.lesson, desc: lesson.desc });
        setSelectedLessonIndex(index);
        setShowAddModal(true);
    };

    // ✅ افزودن یا ویرایش طرح درس
    const handleSaveLesson = async () => {
        if (!validateForm()) return;
        try {
            setLoadingSave(true);
            const { data: freshUser } = await getTeacher(userData.id);
            let allDays = [...freshUser.Tarhlessons];
            const dayIndex = allDays.findIndex((d) => d.date === currentDate);

            if (dayIndex !== -1) {
                const day = { ...allDays[dayIndex] };
                if (selectedLessonIndex !== null) {
                    day.bell[selectedLessonIndex] = { ...newLesson, date: currentDate };
                } else {
                    day.bell.push({ ...newLesson, date: currentDate });
                }
                allDays[dayIndex] = day;
            } else {
                allDays.push({ date: currentDate, bell: [{ ...newLesson, date: currentDate }] });
            }

            const mergedUser = { ...freshUser, Tarhlessons: allDays };
            await putTeacher(mergedUser);
            onUserDataUpdate?.(mergedUser);
            setTodayLessons(allDays.find((d) => d.date === currentDate));
        } catch (err) {
            console.error("خطا در ذخیره طرح درس", err);
        } finally {
            setLoadingSave(false);
            setShowAddModal(false);
            setNewLesson({ lesson: "", desc: "" });
            setSelectedLessonIndex(null);
        }
    };

    return (
        <div className={styles.container}>
            <HeaderPages setMenuPage={setMenuPage} title="طرح درس" />

            <section className={styles.controlMenu}>
                <button className={`${styles.btn} ${styles.prevDay}`} onClick={() => changeDay("prev")}>
                    روز قبل
                </button>
                <input
                    ref={dateInputRef}
                    data-jdp
                    data-jdp-only-date
                    name="tarhDarsDate"
                    className={styles.dateInput}
                    type="text"
                    dir="ltr"
                    readOnly
                />
                <button className={`${styles.btn} ${styles.nextDay}`} onClick={() => changeDay("next")}>
                    روز بعد
                </button>
            </section>

            <section className={styles.content}>
                {todayLessons.bell.length === 0 ? (
                    <p className={styles.empty}>با زدن گزینه + طرح درس خود را اضافه کنید</p>
                ) : (
                    todayLessons.bell.map((b, i) => (
                        <div key={i} className={styles.item} onClick={() => openEditLesson(i)}>
                            <div className={styles.itemHeader}>
                                <h4>{b.lesson}</h4>
                                <button
                                    className={styles.deleteBtn}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setDeleteTarget(i);
                                        setShowDeleteModal(true);
                                    }}
                                >
                                    🗑️
                                </button>
                            </div>
                            <p className={styles.itemDesc}>{b.desc}</p>
                        </div>
                    ))
                )}
            </section>

            <button
                className={styles.addBtn}
                onClick={() => {
                    setSelectedLessonIndex(null);
                    setNewLesson({ lesson: "", desc: "" });
                    setShowAddModal(true);
                }}
            >
                +
            </button>

            {/* ✅ مودال افزودن / ویرایش */}
            {showAddModal && (
                <section className={styles.modalAdd} onClick={() => { }}>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <h3 className={styles.modalTitle}>
                            {selectedLessonIndex !== null ? "ویرایش طرح درس" : "افزودن طرح درس جدید"}
                        </h3>
                        <select
                            className={styles.lessonName}
                            value={newLesson.lesson}
                            onChange={(e) => setNewLesson({ ...newLesson, lesson: e.target.value })}
                        >
                            <option value="">انتخاب درس</option>
                            {userData.lessons.map((less, index) => (
                                <option key={index} value={less.name}>
                                    {less.name}
                                </option>
                            ))}
                        </select>
                        {errors.lesson && <small className={styles.error}>{errors.lesson}</small>}

                        <textarea
                            className={styles.textareaInp}
                            value={newLesson.desc}
                            onChange={(e) => setNewLesson({ ...newLesson, desc: e.target.value })}
                            placeholder="توضیحات طرح درس"
                        />
                        {errors.desc && <small className={styles.error}>{errors.desc}</small>}

                        <div className={styles.btnGroup}>
                            {loadingSave ? (
                                <button type="button" className={styles.pendingLoading}>
                                    <img
                                        src="https://gghxnqfwfnkjkwnhzfpn.supabase.co/storage/v1/object/public/test/general/loading.gif"
                                        alt="loading"
                                    />
                                </button>
                            ) : (
                                <button type="button" className={styles.pendingLoading} onClick={handleSaveLesson}>
                                    {selectedLessonIndex !== null ? "ویرایش" : "اضافه کن"}
                                </button>
                            )}
                            <button className={styles.closeBtn} type="button" onClick={() => setShowAddModal(false)}>
                                لغو
                            </button>
                        </div>
                    </form>
                </section>
            )}

            {/* ✅ مودال حذف */}
            {showDeleteModal && (
                <div className={styles.deleteOverlay} onClick={() => setShowDeleteModal(false)}>
                    <div className={styles.deleteBox} onClick={(e) => e.stopPropagation()}>
                        <h3>
                            آیا می‌خواهید طرح درس{" "}
                            <span style={{ color: "#e74c3c" }}>
                                {todayLessons.bell[deleteTarget]?.lesson}
                            </span>{" "}
                            حذف شود؟
                        </h3>
                        <div className={styles.deleteActions}>
                            {loadingDelete ? (
                                <button className={styles.deleteBtnConfirm}>
                                    <img
                                        src="https://gghxnqfwfnkjkwnhzfpn.supabase.co/storage/v1/object/public/test/general/loading.gif"
                                        alt="loading"
                                    />
                                </button>
                            ) : (
                                <button className={styles.deleteBtnConfirm} onClick={handleDeleteLesson}>
                                    حذف
                                </button>
                            )}
                            <button className={styles.cancelBtn} onClick={() => setShowDeleteModal(false)}>
                                لغو
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TarhDars;