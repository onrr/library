import React, { useState } from 'react'
import { useLibraryContext } from '../hooks/useLibraryContext'

function LibraryForm() {

    const { dispatch } = useLibraryContext()
    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [description, setDescription] = useState('')
    const [page, setPage] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])


    const handleSubmit = async (e) => {
        e.preventDefault()

        const library = { name, author, description, page }
        const res = await fetch('http://localhost:5000/api/books', {
            method: 'POST',
            body: JSON.stringify(library),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await res.json()

        if (!res.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if (res.ok) {
            setName('')
            setAuthor('')
            setDescription('')
            setPage('')
            setEmptyFields([])
            setError(null)
            dispatch({ type: 'CREATE_BOOK', payload: json })
        }
    }

    return (
        <div>
            <form className="htmlForm" onSubmit={handleSubmit}>
                <span className="input-span">
                    <label htmlFor="name" className="label">Name</label>
                    <input type="text" name="name" id="name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        className={emptyFields.includes('name') ? 'error' : ''}
                    />
                </span>

                <span className="input-span">
                    <label htmlFor="author" className="label">Author</label>
                    <input type="text" name="author" id="author"
                        onChange={(e) => setAuthor(e.target.value)}
                        value={author}
                        className={emptyFields.includes('author') ? 'error' : ''}
                    />
                </span>

                <span className="input-span">
                    <label htmlFor="description" className="label">Description</label>
                    <textarea name="description" id="description"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description} ></textarea>
                </span>

                <span className="input-span">
                    <label htmlFor="page" className="label">Page</label>
                    <input type="number" name="page" id="page"
                        onChange={(e) => setPage(e.target.value)}
                        value={page}
                    />
                </span>

                <button type="submit">Add a book</button>
            </form>

            {error && <div className="error">{error}</div>}
        </div>
    )
}

export default LibraryForm