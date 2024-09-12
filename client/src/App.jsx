import { BrowserRouter, Routes, Route, json } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/LogIn'
import Navbar from './components/Navbar'
import { useEffect } from 'react'
import { useUserContext } from './hooks/useUserContext';
import Cookies from 'js-cookie'


function App() {

  const { auth, setAuth } = useUserContext()

  console.log("a", auth)
  useEffect(() => {
    const user = Cookies.get('token');
    if (user) {
      setAuth(true)
    }
  }, [])

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/signin' element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
