import { Route, Routes } from 'react-router-dom'
import Start from './pages/Start.jsx'
import UserLogin from './pages/UserLogin.jsx'
import UserSignUp from './pages/UserSignUp.jsx'
import CaptainLogin from './pages/CaptainLogin.jsx'
import CaptainSignUp from './pages/CaptainSignUp.jsx'
import Home from './pages/Home.jsx'
import UserProtectedWrapper from './pages/UserProtectedWrapper.jsx'
import UserLogout from './pages/UserLogout.jsx'
import CaptainHome from './pages/CaptainHome.jsx'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper.jsx'
import CaptainLogout from './pages/CaptainLogout.jsx'
import Riding from './pages/Riding.jsx'
import LoginnedWrapper from './pages/LoginnedWrapper.jsx'
import CaptainRiding from './pages/CaptainRiding.jsx'
import UserProfile from './pages/UserProfile.jsx'
import CaptainProfile from './pages/CaptainProfile.jsx'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={
          <LoginnedWrapper>
            <Start />
          </LoginnedWrapper>} />
        <Route path="/user-login" element={
          <LoginnedWrapper>
            <UserLogin />
          </LoginnedWrapper>} />
        <Route path="/user-signup" element={
          <LoginnedWrapper>
            <UserSignUp />
          </LoginnedWrapper>} />
        <Route path="/captain-login" element={
          <LoginnedWrapper>
            <CaptainLogin />
          </LoginnedWrapper>} />
        <Route path="/captain-signup" element={
          <LoginnedWrapper>
            <CaptainSignUp />
          </LoginnedWrapper>} />
        <Route path="/home" element={
          <UserProtectedWrapper>
            <Home />
          </UserProtectedWrapper>
        } />
        <Route path='/user-logout' element={
          <UserProtectedWrapper>
            <UserLogout />
          </UserProtectedWrapper>
        } />
        <Route path='/captain-home' element={
          <CaptainProtectedWrapper>
            <CaptainHome />
          </CaptainProtectedWrapper>
        } />
        <Route path='/captain-logout' element={
          <CaptainProtectedWrapper>
            <CaptainLogout />
          </CaptainProtectedWrapper>
        } />
        <Route path="/riding" element={<Riding />} />
        <Route path='/captain-riding' element={<CaptainRiding />} />
        <Route path="/user-profile" element={
          <UserProtectedWrapper >
            <UserProfile />
          </UserProtectedWrapper>
        } />
        <Route path='/captain-profile' element={
          <CaptainProtectedWrapper>
            <CaptainProfile />
          </CaptainProtectedWrapper>
        } />
      </Routes>
    </div>
  )
}

export default App