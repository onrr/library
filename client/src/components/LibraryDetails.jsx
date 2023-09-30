import React from 'react'
import { useLibraryContext } from '../hooks/useLibraryContext'

import { formatDistanceToNow } from 'date-fns'


function LibraryDetails({ lbr, fetchLibrary, authenticated }) {


    const { dispatch } = useLibraryContext()

    const handleClick = async () => {
        const res = await fetch('http://localhost:5000/api/books/' + lbr._id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await res.json()

        if (res.ok) {
            dispatch({ type: 'DELETE_BOOK', payload: json })
        }
        fetchLibrary()

    }


    return (
        <div className="card">
            <p className="name">Name: <span>{lbr.name}</span></p>
            <p className="author">Author: <span>{lbr.author}</span></p>
            <p className="description">Description: <span>{lbr.description ? lbr.description : '-'}</span></p>
            <p className="page">Page: <span>{lbr.page ? lbr.page : '-'}</span></p>
            <div className='row'>
                <p className="date">({formatDistanceToNow(new Date(lbr.createdAt), { addSuffix: true })})</p>
                {
                    authenticated && <span  className='del' onClick={handleClick}>delete</span>
                }
            </div>
        </div>
    )
}

export default LibraryDetails