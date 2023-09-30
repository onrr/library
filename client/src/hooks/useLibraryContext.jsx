import { useContext } from "react";
import { LibraryContext } from "../context/LibraryContext";

export const useLibraryContext = () => {
    const context = useContext(LibraryContext)

    if (!context) {
        throw Error('Error Context')
    }
    return context
}