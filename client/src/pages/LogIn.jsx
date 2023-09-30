import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


function LogIn({ setAuthenticated }) {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [notMatch, setNotMatch] = useState(null)
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const user = { email, password }
        const res = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await res.json()

        if (!res.ok) {
            setNotMatch(json.notMatch)
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if (res.ok) {
            setEmail('')
            setPassword('')
            setNotMatch(null)
            setError(null)
            setEmptyFields([])
            setAuthenticated(true);
            navigate('/')
        }
    }


    return (
        <div className='container' style={{ display: 'grid', placeItems: 'center', marginTop: 50 }}>
            <form className="htmlForm" onSubmit={handleSubmit}>

                <span className="input-span">
                    <label htmlFor="email" className="label">E-Mail</label>
                    <input type="email" name="email" id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className={emptyFields?.includes('email') ? 'error' : ''}
                    />
                </span>

                <span className="input-span">
                    <label htmlFor="password" className="label">Password</label>
                    <input type="password" name="password" id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        minLength={8}
                        className={emptyFields?.includes('password') ? 'error' : ''}
                    />
                </span>


                <button type="submit">Sign In</button>
            </form>

            {error && <div className="error">{error}</div>}
            {notMatch && <div className="error">{notMatch}</div>}
        </div>
    )
}

export default LogIn