import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Container from './components/Container'
import './styles/App.css'
import { useEffect, useState } from 'react'
import { getAllStudents, getStudent, putStudent } from './services/Students'
import NetworkStatus from './components/general/NetworkStatus'

function App() {
  const [userData, setUserData] = useState([])
  const [errorServer, setErrorServer] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loginStatus = async () => {
      setLoading(true)
      let localStudent = localStorage.getItem("student");
      localStudent = JSON.parse(localStudent)
      if (localStudent) {
        const { data: serverStudent } = await getStudent(localStudent.id)
        if (serverStudent.login) {
          setUserData(serverStudent)
          setLoading(false)
        } else {
          setUserData([])
          setLoading(false)
        }
      } else {
        setUserData([])
        setLoading(false)
      }
    }
    loginStatus()
  }, [])
  const requestLogin = async (data) => {
    setLoading(true)
    const username = data.username;
    const password = data.password;
    const { data: userData } = await getAllStudents()
    if (userData) {
      userData.map(st => {
        if (st.username === username && st.password === password) {
          loggin(st)
        } else {
          setLoading(false)
          setErrorServer("نام کاربری یا رمز عبور اشتباه است")
        }
      })
    } else {
      setLoading(false)
      setErrorServer("خطا در ارتباط با سرور")
    }
  }
  const loggin = async (student) => {
    setErrorServer("")
    student.login = true;
    await putStudent(student);
    setUserData(student);
    localStorage.setItem("student", JSON.stringify(student))
    setLoading(false)
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<>< NetworkStatus /><Container loading={loading} errorServer={errorServer} userData={userData} requestLogin={requestLogin} /></>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
