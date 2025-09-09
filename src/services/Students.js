import axios from "axios";

const URL = 'https://68af9668b91dfcdd62bca0fe.mockapi.io/student'

export const getAllStudents = () => {
    return axios.get(`${URL}`);
}

export const getStudent = (stId) => {
    return axios.get(`${URL}/${stId}`);
}

export const putStudent = (st) => {
    return axios.put(`${URL}/${st.id}`, st);
}

export const addStudent = (newSt) => {
    return axios.post(`${URL}`, newSt)
}

export const updateLesson = async (studentId, lesson) => {
    const { data: student } = await getStudent(studentId);

    const updatedLessons = student.lessons.map((les) =>
        les.id === lesson.id ? lesson : les
    );

    const updatedStudent = { ...student, lessons: updatedLessons };

    return putStudent(updatedStudent);
};