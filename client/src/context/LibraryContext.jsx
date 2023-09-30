import { createContext, useReducer } from "react";

export const LibraryContext = createContext()

export const libraryReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LIBRARY':
            return {
                library: action.payload
            }
        case 'CREATE_BOOK':
            return {
                library: [action.payload, ...state.library]
            }
        case 'DELETE_BOOK':
            return {
                library: state.library.filter((w) => {
                    w._id !== action.payload._id
                })
        }
        default:
            return state
    }
}

export const LibraryContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(libraryReducer, {
        library: null
    })

    return (
        <LibraryContext.Provider value={{...state, dispatch}}>
            {children}
        </LibraryContext.Provider>
    )
}