import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api/api'

interface Movie {
  id: number
  title: string
  release_year: number
}

interface Director {
  id: number
  name: string
  movies?: Movie[]  // make movies optional to avoid undefined errors
}

function DirectorProfile() {
  const { id } = useParams()
  const [director, setDirector] = useState<Director | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    api.get<Director>(`directors/${id}/`)
      .then(res => setDirector(res.data))
      .catch(() => alert("Failed to load director"))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p>Loading...</p>
  if (!director) return <p>Director not found.</p>

  return (
    <div className="container py-4">
      <h2 className="mb-4">{director.name}</h2>
      <h5>Movies:</h5>
      {director.movies && director.movies.length > 0 ? (
        <ul className="list-group">
          {director.movies.map(movie => (
            <li key={movie.id} className="list-group-item">
              <Link to={`/movies/${movie.id}`}>{movie.title} ({movie.release_year})</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No movies found for this director.</p>
      )}
    </div>
  )
}

export default DirectorProfile
