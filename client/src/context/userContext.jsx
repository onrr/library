import { createContext, useReducer, useState } from "react";

export const UserContext = createContext({
    auth: false,
    setAuth: () => { },
})

export const userReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                user: action.payload
            }
        case 'CREATE_USER':
            return {
                user: [action.payload, ...state.user]
            }
        default:
            return state
    }
}

export const UserContextProvider = ({children}) => {
    const [auth, setAuth] = useState(false)

    const [state, dispatch] = useReducer(userReducer, {
        user: [],
       
    })

    return (
        <UserContext.Provider value={{...state, dispatch, auth, setAuth}}>
            {children}
        </UserContext.Provider>
    )
}