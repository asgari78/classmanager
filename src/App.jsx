import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Container from './components/Container'
import './styles/App.css'
import { useEffect, useState } from 'react'
import { getAllStudents, getAllTeacher, getStudent, getTeacher, putStudent, putTeacher } from './services/axiosApi.js'
import NetworkStatus from './components/general/NetworkStatus'
import "../node_modules/@majidh1/jalalidatepicker/dist/jalalidatepicker.min.css"
import "../node_modules/@majidh1/jalalidatepicker/dist/jalalidatepicker.min.js"
import { toast, ToastContainer } from 'react-toastify'

function App() {
  const [userData, setUserData] = useState(null)
  const [errorServer, setErrorServer] = useState("")
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [checkTeacher, setCheckTeacher] = useState(false)

  useEffect(() => {
    const loginStatus = async () => {
      let localUser = JSON.parse(localStorage.getItem("user"));
      if (localUser) {
        const { data: serverUser } = await (localUser.isTeacher ? getTeacher(localUser.id) : getStudent(localUser.id))
        if (serverUser.login) {
          setUserData(serverUser)
        } else {
          setUserData([])
        }
      } else {
        setUserData([])
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
  }, [checkTeacher])
  const requestLogin = async (data) => {
    setErrorServer("")
    const username = data.username;
    const password = data.password;
    const { data: usersData } = await (checkTeacher ? getAllTeacher() : getAllStudents());

    if (usersData) {
      const user = usersData.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        loggin(user);
      } else {
        setErrorServer("نام کاربری یا رمز عبور اشتباه است");
      }
    } else {
      setErrorServer("خطا در ارتباط با سرور");
    }
  };
  const loggin = async (user) => {
    setErrorServer("")
    user.login = true;
    await (checkTeacher ? putTeacher(user) : putStudent(user));
    setUserData(user);
    localStorage.clear()
    localStorage.setItem("user", JSON.stringify(user))
    toast.success(`${user.namefamily} خوش آمدید`)
  }

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        {isOnline ?
          <Routes>
            <Route path='/' element={<Container setUserData={setUserData} checkTeacher={checkTeacher} errorServer={errorServer} userData={userData} requestLogin={requestLogin} setCheckTeacher={setCheckTeacher} />} />
          </Routes>
          :
          <NetworkStatus />
        }
      </BrowserRouter>
    </>
  )
}

export default App