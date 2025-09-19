import * as Yup from "yup"

export const studentSchema = Yup.object().shape({
    namefamily: Yup.string().required("نام و نام خانوادگی الزامی می باشد!"),
    dateBirth: Yup.string("تاریخ تولد معتبر نمی باشد").nullable(),
    selfCode: Yup.string("کدملی معتبر نمی باشد").nullable(),
    dadName: Yup.string("نام پدر معتبر نمی باشد").nullable(),
    phoneNumber: Yup.string("شماره موبایل معتبر نمی باشد").nullable(),
    groupId: Yup.string().required("گروه دانش آموزی الزامی می باشد"),
    roleId: Yup.string().required("نقش دانش آموز الزامی می باشد"),
    username: Yup.string().required("نام کاربری الزامی است").min(4, "نام کاربری باید حداقل ۴ کاراکتر باشد"),
})