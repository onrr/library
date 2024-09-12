import React from 'react'
import { Link } from 'react-router-dom'
import { useUserContext } from '../hooks/useUserContext';
import Cookies from 'js-cookie'

function Navbar() {

  const {auth, setAuth} = useUserContext()

  const logOutFunc = () => {
    setAuth(false)
    Cookies.remove("token")
    Cookies.remove("email")
  }
  
  return (
    <header className='nav'>
      <div className="container">
        <Link to='/' >
          <h1>Library</h1>
        </Link>
        {
          auth === true ? <Link to='/' onClick={logOutFunc} >
            <h1>Log Out</h1>
          </Link>
            : <div className='sign'>
              <Link to='/signup' >
              <h1>Sign Up</h1>
            </Link>
              <Link to='/signin' >
              <h1>Sign In</h1>
            </Link>
            </div>
        }

      </div>
    </header>
  )
}

export default Navbar