import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Container from './components/Container'
import './styles/App.css'
import { useEffect, useState } from 'react'
import { getAllStudents, getAllTeacher, getStudent, getTeacher, putStudent, putTeacher } from './services/axiosApi.js'
import NetworkStatus from './components/general/NetworkStatus'
import "../node_modules/@majidh1/jalalidatepicker/dist/jalalidatepicker.min.css"
import "../node_modules/@majidh1/jalalidatepicker/dist/jalalidatepicker.min.js"

function App() {
  const [userData, setUserData] = useState([])
  const [errorServer, setErrorServer] = useState("")
  const [loading, setLoading] = useState(false)
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [checkTeacher, setCheckTeacher] = useState(false)

  useEffect(() => {
    const loginStatus = async () => {
      let localUser = JSON.parse(localStorage.getItem("user"));
      if (localUser) {
        setLoading(true)
        const { data: serverUser } = await (checkTeacher ? getStudent(localUser.id) : getTeacher(localUser.id))
        if (serverUser.login) {
          setUserData(serverUser)
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
    const handleOnline = () => { setIsOnline(true); loginStatus() };
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    handleOffline()
    handleOnline()
    loginStatus()
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [])
  const requestLogin = async (data) => {
    setLoading(true)
    const username = data.username;
    const password = data.password;
    const { data: usersData } = await (checkTeacher ? getAllTeacher() : getAllStudents());

    if (usersData) {
      usersData.map(user => {
        if (user.username === username && user.password === password) {
          loggin(user)
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
  const loggin = async (user) => {
    setErrorServer("")
    user.login = true;
    await (checkTeacher ? putTeacher(user) : putStudent(user));
    setUserData(user);
    localStorage.setItem("user", JSON.stringify(user))
    setLoading(false)
  }

  return (
    <BrowserRouter>
      {isOnline ?
        <Routes>
          <Route path='/' element={<Container checkTeacher={checkTeacher} loading={loading} errorServer={errorServer} userData={userData} requestLogin={requestLogin} setCheckTeacher={setCheckTeacher} />} />
        </Routes>
        :
        <NetworkStatus />
      }
    </BrowserRouter>
  )
}

export default App