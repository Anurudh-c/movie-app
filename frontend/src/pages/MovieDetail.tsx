import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../api/api'
import 'bootstrap/dist/css/bootstrap.min.css'

interface Genre {
  id: number
  name: string
}
interface Director {
  id: number
  name: string
}
interface Movie {
  id: number
  title: string
  release_year: number
  director: Director | null
  genres: Genre[] | null
}

function MovieDetail() {
  const { id } = useParams<{ id: string }>()
  const [movie, setMovie] = useState<Movie | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get<Movie>(`movies/${id}/`)
      .then(res => setMovie(res.data))
      .catch(() => alert("Failed to load movie"))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: '100vh', background: 'linear-gradient(to right, #fbc2eb, #a6c1ee)' }}
      >
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="text-center mt-5" style={{height:'100vh', background:'linear-gradient(to right, #fbc2eb, #a6c1ee)'}}>
        Movie not found.
      </div>
    )
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: '100vh', background: 'linear-gradient(to right, #fbc2eb, #a6c1ee)' }}
    >
      <div className="card text-dark shadow-lg p-4" style={{ width: '28rem', borderRadius: '1rem', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
        <h2 className="fw-bold mb-3 text-center">{movie.title || 'Untitled'}</h2>
        <p className="mb-2"><strong>Release Year:</strong> {movie.release_year || 'N/A'}</p>
        <p className="mb-2"><strong>Director:</strong> {movie.director ? movie.director.name : 'N/A'}</p>
        <p className="mb-3"><strong>Genres:</strong> {movie.genres && movie.genres.length > 0 ? movie.genres.map(g => g.name).join(', ') : 'N/A'}</p>
        <Link to="/" className="btn btn-primary w-100 fw-semibold">← Back to Movies</Link>
      </div>
    </div>
  )
}

export default MovieDetail
