import { useEffect, useRef, useState } from "react";
import styles from "../../styles/teacher/newStudent.module.css"
import { addStudent } from "../../services/axiosApi";
import Loading from "../general/Loading";
import { supabase } from "../../lib/supabaseClient";
const BUCKET = "test";


const NewStudent = ({ show, onClose, userData }) => {

    const fileInputRef = useRef(null);
    const [visible, setVisible] = useState(show)
    const [animate, setAnimate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        id: "",
        profileImage: null,
        namefamily: "",
        dateBirth: "",
        selfCode: "",
        dadName: "",
        phoneNumber: "",
        groupId: "",
        groupName: "",
        roleId: "",
        roleName: "",
        classCode: "ششم",
        homework: [],
        activity: [],
        login: false,
        username: "",
        password: "",
        lessons: [
            {
                "name": "ریاضی",
                "score": [
                    {
                        "name": "مهر",
                        "value": [
                            {
                                "name": "هفته اول",
                                "value": null
                            },
                            {
                                "name": "هفته دوم",
                                "value": null
                            },
                            {
                                "name": "هفته سوم",
                                "value": null
                            },
                            {
                                "name": "هفته چهارم",
                                "value": null
                            }
                        ]
                    },
                    {
                        "name": "آبان",
                        "value": [
                            {
                                "name": "هفته اول",
                                "value": null
                            },
                            {
                                "name": "هفته دوم",
                                "value": null
                            },
                            {
                                "name": "هفته سوم",
                                "value": null
                            },
                            {
                                "name": "هفته چهارم",
                                "value": null
                            }
                        ]
                    },
                    {
                        "name": "آذر",
                        "value": [
                            {
                                "name": "هفته اول",
                                "value": null
                            },
                            {
                                "name": "هفته دوم",
                                "value": null
                            },
                            {
                                "name": "هفته سوم",
                                "value": null
                            },
                            {
                                "name": "هفته چهارم",
                                "value": null
                            }
                        ]
                    },
                    {
                        "name": "دی",
                        "value": [
                            {
                                "name": "هفته اول",
                                "value": null
                            },
                            {
                                "name": "هفته دوم",
                                "value": null
                            },
                            {
                                "name": "هفته سوم",
                                "value": null
                            },
                            {
                                "name": "هفته چهارم",
                                "value": null
                            }
                        ]
                    },
                    {
                        "name": "بهمن",
                        "value": [
                            {
                                "name": "هفته اول",
                                "value": null
                            },
                            {
                                "name": "هفته دوم",
                                "value": null
                            },
                            {
                                "name": "هفته سوم",
                                "value": null
                            },
                            {
                                "name": "هفته چهارم",
                                "value": null
                            }
                        ]
                    },
                    {
                        "name": "اسفند",
                        "value": [
                            {
                                "name": "هفته اول",
                                "value": null
                            },
                            {
                                "name": "هفته دوم",
                                "value": null
                            },
                            {
                                "name": "هفته سوم",
                                "value": null
                            },
                            {
                                "name": "هفته چهارم",
                                "value": null
                            }
                        ]
                    },
                    {
                        "name": "فروردین",
                        "value": [
                            {
                                "name": "هفته اول",
                                "value": null
                            },
                            {
                                "name": "هفته دوم",
                                "value": null
                            },
                            {
                                "name": "هفته سوم",
                                "value": null
                            },
                            {
                                "name": "هفته چهارم",
                                "value": null
                            }
                        ]
                    },
                    {
                        "name": "اردیبهشت",
                        "value": [
                            {
                                "name": "هفته اول",
                                "value": null
                            },
                            {
                                "name": "هفته دوم",
                                "value": null
                            },
                            {
                                "name": "هفته سوم",
                                "value": null
                            },
                            {
                                "name": "هفته چهارم",
                                "value": null
                            }
                        ]
                    },
                    {
                        "name": "خرداد",
                        "value": [
                            {
                                "name": "هفته اول",
                                "value": null
                            },
                            {
                                "name": "هفته دوم",
                                "value": null
                            },
                            {
                                "name": "هفته سوم",
                                "value": null
                            },
                            {
                                "name": "هفته چهارم",
                                "value": null
                            }
                        ]
                    }
                ],
                "image": "https://gghxnqfwfnkjkwnhzfpn.supabase.co/storage/v1/object/public/test/lessons/riazi.jpg",
                "id": "L01"
            },
            {
                "name": "علوم",
                "score": [
                    {
                        "name": "مهر",
                        "value": [
                            {
                                "name": "هفته اول",
                                "value": null
                            },
                            {
                                "name": "هفته دوم",
                                "value": null
                            },
                            {
                                "name": "هفته سوم",
                                "value": null
                            },
                            {
                                "name": "هفته چهارم",
                                "value": null
                            }
                        ]
                    },
                    {
                        "name": "آبان",
                        "value": [
                            {
                                "name": "هفته اول",
                                "value": null
                            },
                            {
                                "name": "هفته دوم",
                                "value": null
                            },
                            {
                                "name": "هفته سوم",
                                "value": null
                            },
                            {
                                "name": "هفته چهارم",
                                "value": null
                            }
                        ]
                    },
                    {
                        "name": "آذر",
                        "value": [
                            {
                                "name": "هفته اول",
                                "value": null
                            },
                            {
                                "name": "هفته دوم",
                                "value": null
                            },
                            {
                                "name": "هفته سوم",
                                "value": null
                            },
                            {
                                "name": "هفته چهارم",
                                "value": null
                            }
                        ]
                    },
                    {
                        "name": "دی",
                        "value": [
                            {
                                "name": "هفته اول",
                                "value": null
                            },
                            {
                                "name": "هفته دوم",
                                "value": null
                            },
                            {
                                "name": "هفته سوم",
                                "value": null
                            },
                            {
                                "name": "هفته چهارم",
                                "value": null
                            }
                        ]
                    },
                    {
                        "name": "بهمن",
                        "value": [
                            {
                                "name": "هفته اول",
                                "value": null
                            },
                            {
                                "name": "هفته دوم",
                                "value": null
                            },
                            {
                                "name": "هفته سوم",
                                "value": null
                            },
                            {
                                "name": "هفته چهارم",
                                "value": null
                            }
                        ]
                    },
                    {
                        "name": "اسفند",
                        "value": [
                            {
                                "name": "هفته اول",
                                "value": null
                            },
                            {
                                "name": "هفته دوم",
                                "value": null
                            },
                            {
                                "name": "هفته سوم",
                                "value": null
                            },
                            {
                                "name": "هفته چهارم",
                                "value": null
                            }
                        ]
                    },
                    {
                        "name": "فروردین",
                        "value": [
                            {
                                "name": "هفته اول",
                                "value": null
                            },
                            {
                                "name": "هفته دوم",
                                "value": null
                            },
                            {
                                "name": "هفته سوم",
                                "value": null
                            },
                            {
                                "name": "هفته چهارم",
                                "value": null
                            }
                        ]
                    },
                    {
                        "name": "اردیبهشت",
                        "value": [
                            {
                                "name": "هفته اول",
                                "value": null
                            },
                            {
                                "name": "هفته دوم",
                                "value": null
                            },
                            {
                                "name": "هفته سوم",
                                "value": null
                            },
                            {
                                "name": "هفته چهارم",
                                "value": null
                            }
                        ]
                    },
                    {
                        "name": "خرداد",
                        "value": [
                            {
                                "name": "هفته اول",
                                "value": null
                            },
                            {
                                "name": "هفته دوم",
                                "value": null
                            },
                            {
                                "name": "هفته سوم",
                                "value": null
                            },
                            {
                                "name": "هفته چهارم",
                                "value": null
                            }
                        ]
                    }
                ],
                "image": "https://gghxnqfwfnkjkwnhzfpn.supabase.co/storage/v1/object/public/test/lessons/olom.jpg",
                "id": "L02"
            },
            {
                "name": "فارسی",
                "score": [
                    {
                        "name": "مهر",
                        "value": [
                            {
                                "name": "هفته اول",
                                "value": null
                            },
                            {
                                "name": "هفته دوم",
                                "value": null
                            },
                            {
                                "name": "هفته سوم",
                                "value": null
                            },
                            {
                                "name": "هفته چهارم",
                                "value": null
                            }
                        ]
                    },
                    {
                        "name": "آبان",
                        "value": [
                            {
                                "name": "هفته اول",
                                "value": null
                            },
                            {
                                "name": "هفته دوم",
                                "value": null
                            },
                            {
                                "name": "هفته سوم",
                                "value": null
                            },
                            {
                                "name": "هفته چهارم",
                                "value": null
                            }
                        ]
                    },
                    {
                        "name": "آذر",
                        "value": [
                            {
                                "name": "هفته اول",
                                "value": null
                            },
                            {
                                "name": "هفته دوم",
                                "value": null
                            },
                            {
                                "name": "هفته سوم",
                                "value": null
                            },
                            {
                                "name": "هفته چهارم",
                                "value": null
                            }
                        ]
                    },
                    {
                        "name": "دی",
                        "value": [
                            {
                                "name": "هفته اول",
                                "value": null
                            },
                            {
                                "name": "هفته دوم",
                                "value": null
                            },
                            {
                                "name": "هفته سوم",
                                "value": null
                            },
                            {
                                "name": "هفته چهارم",
                                "value": null
                            }
                        ]
                    },
                    {
                        "name": "بهمن",
                        "value": [
                            {
                                "name": "هفته اول",
                                "value": null
                            },
                            {
                                "name": "هفته دوم",
                                "value": null
                            },
                            {
                                "name": "هفته سوم",
                                "value": null
                            },
                            {
                                "name": "هفته چهارم",
                                "value": null
                            }
                        ]
                    },
                    {
                        "name": "اسفند",
                        "value": [
                            {
                                "name": "هفته اول",
                                "value": null
                            },
                            {
                                "name": "هفته دوم",
                                "value": null
                            },
                            {
                                "name": "هفته سوم",
                                "value": null
                            },
                            {
                                "name": "هفته چهارم",
                                "value": null
                            }
                        ]
                    },
                    {
                        "name": "فروردین",
                        "value": [
                            {
                                "name": "هفته اول",
                                "value": null
                            },
                            {
                                "name": "هفته دوم",
                                "value": null
                            },
                            {
                                "name": "هفته سوم",
                                "value": null
                            },
                            {
                                "name": "هفته چهارم",
                                "value": null
                            }
                        ]
                    },
                    {
                        "name": "اردیبهشت",
                        "value": [
                            {
                                "name": "هفته اول",
                                "value": null
                            },
                            {
                                "name": "هفته دوم",
                                "value": null
                            },
                            {
                                "name": "هفته سوم",
                                "value": null
                            },
                            {
                                "name": "هفته چهارم",
                                "value": null
                            }
                        ]
                    },
                    {
                        "name": "خرداد",
                        "value": [
                            {
                                "name": "هفته اول",
                                "value": null
                            },
                            {
                                "name": "هفته دوم",
                                "value": null
                            },
                            {
                                "name": "هفته سوم",
                                "value": null
                            },
                            {
                                "name": "هفته چهارم",
                                "value": null
                            }
                        ]
                    }
                ],
                "image": "https://gghxnqfwfnkjkwnhzfpn.supabase.co/storage/v1/object/public/test/lessons/farsi.jpg",
                "id": "L03"
            },
            {
                "name": "فناوری",
                "score": [
                    {
                        "name": "نوبت اول",
                        "value": [
                            {
                                "name": "ارزشیابی اول",
                                "value": null
                            },
                            {
                                "name": "ارزشیابی دوم",
                                "value": null
                            },
                            {
                                "name": "ارزشیابی سوم",
                                "value": null
                            },
                            {
                                "name": "ارزشیابی چهارم",
                                "value": null
                            }
                        ]
                    },
                    {
                        "name": "نوبت دوم",
                        "value": [
                            {
                                "name": "ارزشیابی اول",
                                "value": null
                            },
                            {
                                "name": "ارزشیابی دوم",
                                "value": null
                            },
                            {
                                "name": "ارزشیابی سوم",
                                "value": null
                            },
                            {
                                "name": "ارزشیابی چهارم",
                                "value": null
                            }
                        ]
                    }
                ],
                "image": "https://gghxnqfwfnkjkwnhzfpn.supabase.co/storage/v1/object/public/test/lessons/fanavari.jpg",
                "id": "L04"
            },
            {
                "name": "هدیه",
                "score": [
                    {
                        "name": "نوبت اول",
                        "value": [
                            {
                                "name": "ارزشیابی اول",
                                "value": null
                            },
                            {
                                "name": "ارزشیابی دوم",
                                "value": null
                            },
                            {
                                "name": "ارزشیابی سوم",
                                "value": null
                            },
                            {
                                "name": "ارزشیابی چهارم",
                                "value": null
                            }
                        ]
                    },
                    {
                        "name": "نوبت دوم",
                        "value": [
                            {
                                "name": "ارزشیابی اول",
                                "value": null
                            },
                            {
                                "name": "ارزشیابی دوم",
                                "value": null
                            },
                            {
                                "name": "ارزشیابی سوم",
                                "value": null
                            },
                            {
                                "name": "ارزشیابی چهارم",
                                "value": null
                            }
                        ]
                    }
                ],
                "image": "https://gghxnqfwfnkjkwnhzfpn.supabase.co/storage/v1/object/public/test/lessons/hediye.jpg",
                "id": "L05"
            },
            {
                "name": "مطالعات",
                "score": [
                    {
                        "name": "مهر",
                        "value": [
                            {
                                "name": "هفته اول",
                                "value": null
                            },
                            {
                                "name": "هفته دوم",
                                "value": null
                            },
                            {
                                "name": "هفته سوم",
                                "value": null
                            },
                            {
                                "name": "هفته چهارم",
                                "value": null
                            }
                        ]
                    },
                    {
                        "name": "آبان",
                        "value": [
                            {
                                "name": "هفته اول",
                                "value": null
                            },
                            {
                                "name": "هفته دوم",
                                "value": null
                            },
                            {
                                "name": "هفته سوم",
                                "value": null
                            },
                            {
                                "name": "هفته چهارم",
                                "value": null
                            }
                        ]
                    },
                    {
                        "name": "آذر",
                        "value": [
                            {
                                "name": "هفته اول",
                                "value": null
                            },
                            {
                                "name": "هفته دوم",
                                "value": null
                            },
                            {
                                "name": "هفته سوم",
                                "value": null
                            },
                            {
                                "name": "هفته چهارم",
                                "value": null
                            }
                        ]
                    },
                    {
                        "name": "دی",
                        "value": [
                            {
                                "name": "هفته اول",
                                "value": null
                            },
                            {
                                "name": "هفته دوم",
                                "value": null
                            },
                            {
                                "name": "هفته سوم",
                                "value": null
                            },
                            {
                                "name": "هفته چهارم",
                                "value": null
                            }
                        ]
                    },
                    {
                        "name": "بهمن",
                        "value": [
                            {
                                "name": "هفته اول",
                                "value": null
                            },
                            {
                                "name": "هفته دوم",
                                "value": null
                            },
                            {
                                "name": "هفته سوم",
                                "value": null
                            },
                            {
                                "name": "هفته چهارم",
                                "value": null
                            }
                        ]
                    },
                    {
                        "name": "اسفند",
                        "value": [
                            {
                                "name": "هفته اول",
                                "value": null
                            },
                            {
                                "name": "هفته دوم",
                                "value": null
                            },
                            {
                                "name": "هفته سوم",
                                "value": null
                            },
                            {
                                "name": "هفته چهارم",
                                "value": null
                            }
                        ]
                    },
                    {
                        "name": "فروردین",
                        "value": [
                            {
                                "name": "هفته اول",
                                "value": null
                            },
                            {
                                "name": "هفته دوم",
                                "value": null
                            },
                            {
                                "name": "هفته سوم",
                                "value": null
                            },
                            {
                                "name": "هفته چهارم",
                                "value": null
                            }
                        ]
                    },
                    {
                        "name": "اردیبهشت",
                        "value": [
                            {
                                "name": "هفته اول",
                                "value": null
                            },
                            {
                                "name": "هفته دوم",
                                "value": null
                            },
                            {
                                "name": "هفته سوم",
                                "value": null
                            },
                            {
                                "name": "هفته چهارم",
                                "value": null
                            }
                        ]
                    },
                    {
                        "name": "خرداد",
                        "value": [
                            {
                                "name": "هفته اول",
                                "value": null
                            },
                            {
                                "name": "هفته دوم",
                                "value": null
                            },
                            {
                                "name": "هفته سوم",
                                "value": null
                            },
                            {
                                "name": "هفته چهارم",
                                "value": null
                            }
                        ]
                    }
                ],
                "image": "https://gghxnqfwfnkjkwnhzfpn.supabase.co/storage/v1/object/public/test/lessons/motaleat.jpg",
                "id": "L06"
            },
            {
                "name": "قرآن",
                "score": [
                    {
                        "name": "نوبت اول",
                        "value": [
                            {
                                "name": "ارزشیابی اول",
                                "value": null
                            },
                            {
                                "name": "ارزشیابی دوم",
                                "value": null
                            },
                            {
                                "name": "ارزشیابی سوم",
                                "value": null
                            },
                            {
                                "name": "ارزشیابی چهارم",
                                "value": null
                            }
                        ]
                    },
                    {
                        "name": "نوبت دوم",
                        "value": [
                            {
                                "name": "ارزشیابی اول",
                                "value": null
                            },
                            {
                                "name": "ارزشیابی دوم",
                                "value": null
                            },
                            {
                                "name": "ارزشیابی سوم",
                                "value": null
                            },
                            {
                                "name": "ارزشیابی چهارم",
                                "value": null
                            }
                        ]
                    }
                ],
                "image": "https://gghxnqfwfnkjkwnhzfpn.supabase.co/storage/v1/object/public/test/lessons/quran.jpg",
                "id": "L07"
            },
            {
                "name": "تفکر",
                "score": [
                    {
                        "name": "نوبت اول",
                        "value": [
                            {
                                "name": "ارزشیابی اول",
                                "value": null
                            },
                            {
                                "name": "ارزشیابی دوم",
                                "value": null
                            },
                            {
                                "name": "ارزشیابی سوم",
                                "value": null
                            },
                            {
                                "name": "ارزشیابی چهارم",
                                "value": null
                            }
                        ]
                    },
                    {
                        "name": "نوبت دوم",
                        "value": [
                            {
                                "name": "ارزشیابی اول",
                                "value": null
                            },
                            {
                                "name": "ارزشیابی دوم",
                                "value": null
                            },
                            {
                                "name": "ارزشیابی سوم",
                                "value": null
                            },
                            {
                                "name": "ارزشیابی چهارم",
                                "value": null
                            }
                        ]
                    }
                ],
                "image": "https://gghxnqfwfnkjkwnhzfpn.supabase.co/storage/v1/object/public/test/lessons/tafakor.jpg",
                "id": "L07"
            }
        ]
    })


    useEffect(() => {
        if (show) {
            setVisible(true)
            const timer = setTimeout(() => setAnimate(true), 20);
            return () => clearTimeout(timer);
        } else if (visible) {
            setAnimate(false)
            const timer = setTimeout(() => setVisible(false), 300)
            return () => clearTimeout(timer)
        }
    }, [show])
    useEffect(() => {
        let words = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        let word1 = words[Math.floor(Math.random() * 26)] + words[Math.floor(Math.random() * 26)]
        let word2 = words[Math.floor(Math.random() * 26)]
        let number = Math.floor(10000 + Math.random() * 90000);
        let pass = (word1 + number + word2).toUpperCase()
        setFormData(prev => {
            return {
                ...prev,
                password: pass
            }
        })
        document.addEventListener("jdp:change", function (e) {
            if (e.target.name === "dateBirth") {
                setFormData(prev => ({
                    ...prev,
                    dateBirth: e.target.value
                }))
            }
        });
    }, [])
    const focusStatus = (e) => {
        let inp = e.target;
        let val = e.target.value;
        let t = e.type;
        if (t === "focus") {
            inp.nextSibling.style.transform = "translate(-0.5rem , -.9rem)"
            inp.nextSibling.style.color = "#0000006e"
            inp.nextSibling.style.fontSize = ".75rem"
            if (inp.name == "dateBirth") {
                jalaliDatepicker.startWatch();
            }
        } else if (t === "blur") {
            if (val !== "") {
                inp.nextSibling.style.transform = "translate(-0.5rem , -.9rem)"
                inp.nextSibling.style.color = "#1f1f1f23!important"
                inp.nextSibling.style.fontSize = ".75rem"
            } else {
                inp.nextSibling.style.transform = "translate(-0.7rem , 0rem)"
                inp.nextSibling.style.color = "#1f1f1fe7"
                inp.nextSibling.style.fontSize = ".9rem"
            }
        }

    }


    const validationForm = async (e) => {
        setFormData(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
        if (e.target.name === "groupId") {
            const listOptions = [...e.target.children]
            const clickedLi = listOptions.filter(li => li.getAttribute("value") === e.target.value)

            setFormData(prev => {
                return {
                    ...prev,
                    groupId: e.target.value,
                    groupName: clickedLi[0].getAttribute("name")
                }
            })
        }
    }
    const submitForm = async () => {
        try {
            setLoading(true);

            // آپلود عکس اگر وجود دارد
            let imageUrl = null;
            if (formData.profileImage && fileInputRef.current.files[0]) {
                const file = fileInputRef.current.files[0];
                const fileName = `students/${Date.now()}-${file.name}`;

                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from(BUCKET)
                    .upload(fileName, file, {
                        cacheControl: '3600',
                        upsert: false
                    });

                if (uploadError) {
                    console.error('خطا در آپلود عکس:', uploadError);
                    throw uploadError;
                }

                // دریافت URL عمومی
                const { data: urlData } = supabase.storage
                    .from(BUCKET)
                    .getPublicUrl(fileName);

                imageUrl = urlData.publicUrl;
            }

            // ارسال داده دانش آموز
            const studentData = {
                ...formData,
                profileImage: imageUrl
            };

            const { data } = await addStudent(studentData);
            setLoading(false);
            onClose(); // بستن modal پس از موفقیت

        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }


    if (!visible) return null
    return (
        <>
            {loading && <Loading />}
            <div className={`${styles.container} ${animate ? styles.showin : styles.fadeout}`}>
                <section className={styles.header}>
                    <div>
                        <i className="fas fa-plus"></i>
                        <h6>ثبت دانش آموز جدید</h6>
                    </div>
                    <button className={styles.closeBtn} onClick={onClose}>لغو</button>
                </section>
                <section className={styles.main}>
                    <form>
                        <div className={
                            `${styles.profileImage} ${formData.profileImage !== null && styles.uploadedImg}`
                        }>
                            <input
                                ref={fileInputRef}
                                type="file"
                                name="profileImage"
                                id="profileImage"
                                accept="image/png, image/jpg, image/jpeg, image/svg"
                                onChange={validationForm}
                            />
                            <img
                                onClick={() => fileInputRef.current.click()}
                                style={{ display: formData.profileImage !== null ? "flex" : "none" }}
                                src={formData.profileImage}
                                alt="studentProfileImage"
                            />
                            <label
                                style={{ display: formData.profileImage === null ? "flex" : "none" }} htmlFor="profileImage">
                                تصویر دانش آموز
                                <i className="fas fa-upload"></i>
                            </label>
                            <i
                                style={{ display: formData.profileImage !== null ? "flex" : "none" }}
                                className="fas fa-trash-alt"
                                onClick={() => {
                                    setFormData((prev) => ({ ...prev, profileImage: null }));
                                    fileInputRef.current.value = "";
                                }}>
                            </i>
                        </div>
                        <div className={styles.namefamily}>
                            <input
                                type="text"
                                name="namefamily"
                                id="namefamily"
                                onFocus={focusStatus}
                                onBlur={focusStatus}
                                onChange={validationForm}
                                value={formData.namefamily}
                            />
                            <label htmlFor="namefamily">
                                نام و نام خانوادگی
                            </label>
                        </div>
                        <div className={styles.dateBirth}>
                            <input
                                data-jdp
                                type="text"
                                name="dateBirth"
                                id="dateBirth"
                                dir="ltr"
                                onFocus={focusStatus}
                                onBlur={focusStatus}
                                onChange={validationForm}
                                value={formData.dateBirth}
                            />
                            <label htmlFor="dateBirth">
                                تاریخ تولد
                            </label>
                        </div>
                        <div className={styles.selfCode}>
                            <input
                                type="number"
                                name="selfCode"
                                id="selfCode"
                                dir="ltr"
                                onFocus={focusStatus}
                                onBlur={focusStatus}
                                onChange={validationForm}
                                value={formData.selfCode}
                            />
                            <label htmlFor="selfCode">
                                کدملی
                            </label>
                        </div>
                        <div className={styles.dadName}>
                            <input
                                type="text"
                                name="dadName"
                                id="dadName"
                                onFocus={focusStatus}
                                onBlur={focusStatus}
                                onChange={validationForm}
                                value={formData.dadName}
                            />
                            <label htmlFor="dadName">
                                نام پدر
                            </label>
                        </div>
                        <div className={styles.mobile}>
                            <input
                                type="tel"
                                name="phoneNumber"
                                id="phoneNumber"
                                onFocus={focusStatus}
                                onBlur={focusStatus}
                                onChange={validationForm}
                                value={formData.phoneNumber}
                            />
                            <label htmlFor="phoneNumber">
                                شماره موبایل
                            </label>
                        </div>
                        <div className={styles.groupId}>
                            <i className="fas fa-angle-down"></i>
                            <select name="groupId" id="groupId" onChange={validationForm}>
                                <option value="g00">گروه کلاسی</option>
                                {
                                    userData.groups.map((g, index) => (
                                        <option name={g.name} key={index} value={g.id}>{g.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className={styles.studentRole}>
                            <button onClick={() => setFormData((prev) => { return { ...prev, roleId: 3, roleName: "زیرگروه" } })} type="button" className={formData.roleId == 3 ? styles.active : null}>زیر گروه</button>
                            <button onClick={() => setFormData((prev) => { return { ...prev, roleId: 2, roleName: "معاون" } })} type="button" className={formData.roleId == 2 ? styles.active : null}>معاون</button>
                            <button onClick={() => setFormData((prev) => { return { ...prev, roleId: 1, roleName: "سرگروه" } })} type="button" className={formData.roleId == 1 ? styles.active : null}>سرگروه</button>
                        </div>
                        <div className={styles.username}>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                dir="ltr"
                                onFocus={focusStatus}
                                onBlur={focusStatus}
                                onChange={validationForm}
                                value={formData.username}
                            />
                            <label htmlFor="username">
                                نام کاربری دانش آموز
                            </label>
                        </div>
                        <div className={styles.password}>
                            <input
                                type="text"
                                readOnly
                                dir="ltr"
                                name="password"
                                id="password"
                                value={formData.password}
                            />
                            <label htmlFor="password">
                                رمز عبور دانش آموز :
                            </label>
                        </div>
                    </form>
                </section>
                <button className={styles.submitBtn} onClick={submitForm}>ثبت</button>
            </div>
        </>
    )
}
export default NewStudent;