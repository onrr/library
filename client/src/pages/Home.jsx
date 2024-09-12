import React, { useEffect } from 'react'
import { useLibraryContext } from '../hooks/useLibraryContext'

import LibraryForm from '../components/LibraryForm'
import LibraryDetails from '../components/LibraryDetails'
import { useUserContext } from '../hooks/useUserContext';

function Home() {

  const { library, dispatch } = useLibraryContext()
  const { auth } = useUserContext()

  const fetchLibrary = async () => {
    const res = await fetch('http://localhost:5000/api/books')
    const json = await res.json()

    if (res.ok) {
      dispatch({ type: 'SET_LIBRARY', payload: json })
    }
  }

  useEffect(() => {
    fetchLibrary()

  }, [dispatch])

  return (
    <div className="home">
      <div className="container">
        <div className="books">
          {library?.map(lbr => (
            <LibraryDetails key={lbr._id} lbr={lbr} fetchLibrary={fetchLibrary}/>
          ))}
        </div>
        {
          auth && <LibraryForm />
        }
      </div>
    </div>
  )
}

export default Home