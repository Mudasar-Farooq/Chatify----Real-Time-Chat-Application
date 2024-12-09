import React, { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import HomePage from './pages/HomePage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import useAuthStore from './store/useAuthstore.js'
import { useThemestore } from './store/useThemestore.js'
import { Routes , Route, Navigate } from 'react-router-dom'
import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
const App = () => {
  const {authUser,Checkauth, isCheckingauth} = useAuthStore();
  const {theme , settheme} = useThemestore();

  useEffect(() => {
    Checkauth();
  }, [Checkauth])
  
  if (isCheckingauth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div style={{ background: "#ebf9ed", filter: `invert(${theme})`}}>
      <Navbar/>
      <Routes>
        <Route path="/" element={authUser? <HomePage/> : <Navigate to="/login"></Navigate> }></Route>
        <Route path="/signup" element={!authUser? <SignupPage/> :<Navigate to="/"></Navigate>}></Route>
        <Route path="/login" element={!authUser? <LoginPage/> :<Navigate to="/"></Navigate>}></Route>
        <Route path="/settings" element={<SettingsPage/>}></Route>
        <Route path="/profile" element={authUser? <ProfilePage/> : <Navigate to="/login"></Navigate>}></Route>     
      </Routes>

      {/**/}
      <Toaster/>
    </div>
  )
}

export default App
