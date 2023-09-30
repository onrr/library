import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';

import { useUserContext } from '../hooks/useUserContext'

function SignUp() {

    const navigate = useNavigate()

    const { dispatch } = useUserContext()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [exist, setExist] = useState(null)
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const user = { name, email, password }
        const res = await fetch('http://localhost:5000/api/users/signup', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await res.json()

        if (!res.ok) {
            setExist(json.exist)
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if (res.ok) {
            setName('')
            setEmail('')
            setPassword('')
            setError(null)
            setEmptyFields([])
            setExist(null)
            dispatch({ type: 'CREATE_USER', payload: json })
            navigate('/signin')
        }
    }

    return (
        <div className='container' style={{display: 'grid', placeItems: 'center', marginTop: 50}}>
            <form className="htmlForm" onSubmit={handleSubmit}>
                <span className="input-span">
                    <label htmlFor="name" className="label">Name</label>
                    <input type="text" name="name" id="name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        minLength={3}
                        className={emptyFields?.includes('name') ? 'error' : ''}
                    />
                </span>

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


                <button type="submit">Sign UP</button>
            </form>

            {error && <div className="error">{error}</div>}
            {exist && <div className="error">{exist}</div>}
        </div>
    )
}

export default SignUp