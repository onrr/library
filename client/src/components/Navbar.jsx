import React from 'react'
import { Link } from 'react-router-dom'

function Navbar({ authenticated, setAuthenticated }) {
  
  return (
    <header className='nav'>
      <div className="container">
        <Link to='/' >
          <h1>Library</h1>
        </Link>
        {
          authenticated === true ? <Link to='/' onClick={() => setAuthenticated(false)} >
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