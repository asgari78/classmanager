import axios from "axios";

const URL1 = 'https://68af9668b91dfcdd62bca0fe.mockapi.io/student'
const URL2 = 'https://68af9668b91dfcdd62bca0fe.mockapi.io/teacher'



// Student
export const getAllStudents = () => {
    return axios.get(`${URL1}`);
}
export const getStudent = (stId) => {
    return axios.get(`${URL1}/${stId}`);
}
export const putStudent = (st) => {
    return axios.put(`${URL1}/${st.id}`, st);
}
export const addStudent = (newSt) => {
    return axios.post(`${URL1}`, newSt)
}
export const updateLesson = async (studentId, lesson) => {
    const { data: student } = await getStudent(studentId);

    const updatedLessons = student.lessons.map((les) =>
        les.id === lesson.id ? lesson : les
    );

    const updatedStudent = { ...student, lessons: updatedLessons };

    return putStudent(updatedStudent);
};


// Teacher
export const getAllTeacher = () => {
    return axios.get(`${URL2}`);
}
export const getTeacher = (id) => {
    return axios.get(`${URL2}/${id}`);
}
export const putTeacher = (user) => {
    return axios.put(`${URL2}/${user.id}`, user);
}