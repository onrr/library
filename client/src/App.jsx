import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/LogIn'
import Navbar from './components/Navbar'
import { useState, useEffect } from 'react'


function App() {

  const [authenticated, setAuthenticated] = useState(JSON.parse(localStorage.getItem("auth")) || false);

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(authenticated))
  }, [authenticated])

  return (
    <>
      <BrowserRouter>
        <Navbar authenticated={authenticated} setAuthenticated={setAuthenticated} />
        <div className="pages">
          <Routes>
            <Route path='/' element={<Home authenticated={authenticated} />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/signin' element={<Login setAuthenticated={setAuthenticated} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
