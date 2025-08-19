import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api/api'

interface Movie {
  id: number
  title: string
  release_year: number
}

interface Actor {
  id: number
  name: string
  movies?: Movie[]  // make movies optional
}

function ActorProfile() {
  const { id } = useParams()
  const [actor, setActor] = useState<Actor | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    api.get<Actor>(`actors/${id}/`)
      .then(res => setActor(res.data))
      .catch(() => alert("Failed to load actor"))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p>Loading...</p>
  if (!actor) return <p>Actor not found.</p>

  return (
    <div className="container py-4">
      <h2 className="mb-4">{actor.name}</h2>
      <h5>Movies:</h5>
      {actor.movies && actor.movies.length > 0 ? (
        <ul className="list-group">
          {actor.movies.map(movie => (
            <li key={movie.id} className="list-group-item">
              <Link to={`/movies/${movie.id}`}>{movie.title} ({movie.release_year})</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No movies found for this actor.</p>
      )}
    </div>
  )
}

export default ActorProfile
