import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/api'
import 'bootstrap/dist/css/bootstrap.min.css'

interface Genre {
  id: number
  name: string
}

interface Actor {
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
  actors: Actor[]
  genres: Genre[]
}

const colors = ['bg-warning', 'bg-success', 'bg-primary', 'bg-danger', 'bg-info', 'bg-secondary', 'bg-dark', 'bg-light text-dark']

function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [directors, setDirectors] = useState<Director[]>([])
  const [genres, setGenres] = useState<Genre[]>([])

  const [selectedDirector, setSelectedDirector] = useState<number | null>(null)
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null)
  const [releaseYear, setReleaseYear] = useState<number | ''>('')
  const [releaseYearInput, setReleaseYearInput] = useState<number | ''>('')

  // Fetch movies with filters
  useEffect(() => {
    setLoading(true)
    const params: any = {}
    if (selectedDirector) params.director = selectedDirector
    if (selectedGenre) params.genres = selectedGenre
    if (releaseYear) params.release_year = releaseYear

    api.get<Movie[]>('movies/', { params })
      .then(res => setMovies(res.data))
      .catch(() => alert("Failed to load movies"))
      .finally(() => setLoading(false))
  }, [selectedDirector, selectedGenre, releaseYear])

  // Fetch directors and genres for filters
  useEffect(() => {
    api.get<Director[]>('directors/').then(res => setDirectors(res.data)).catch(() => {})
    api.get<Genre[]>('genres/').then(res => setGenres(res.data)).catch(() => {})
  }, [])

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: 'linear-gradient(to right, #fbc2eb, #a6c1ee)' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="container-fluid" style={{ minHeight: '100vh', background: 'linear-gradient(to right, #fbc2eb, #a6c1ee)' }}>
      <div className="row">

        {/* Sidebar Filters */}
        <div className="col-12 col-md-3 p-3 d-flex flex-column gap-3" style={{ position: 'sticky', top: '0', height: '100vh' }}>
          <h4 className="fw-bold text-dark">Filters</h4>

          <select
            className="form-select"
            value={selectedDirector || ''}
            onChange={(e) => setSelectedDirector(e.target.value ? Number(e.target.value) : null)}
          >
            <option value="">All Directors</option>
            {directors.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>

          <select
            className="form-select"
            value={selectedGenre || ''}
            onChange={(e) => setSelectedGenre(e.target.value ? Number(e.target.value) : null)}
          >
            <option value="">All Genres</option>
            {genres.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
          </select>

          {/* Release Year Input + Apply Button Inline */}
          <div className="input-group">
            <input
              type="number"
              className="form-control"
              placeholder="Release Year"
              value={releaseYearInput}
              onChange={(e) => setReleaseYearInput(e.target.value ? Number(e.target.value) : '')}
            />
            <button
              className="btn btn-secondary"
              onClick={() => setReleaseYear(releaseYearInput)}
            >
              Apply
            </button>
          </div>

          <button className="btn btn-secondary mt-2" onClick={() => {
            setSelectedDirector(null)
            setSelectedGenre(null)
            setReleaseYear('')
            setReleaseYearInput('')
          }}>Reset Filters</button>
        </div>

        {/* Movies List */}
        <div className="col-12 col-md-9 p-3">
          <h2 className="text-center mb-4 display-4 fw-bold text-dark">🎬 Movies Explorer</h2>
          <div className="row g-4" style={{ flexWrap: 'wrap' }}>
            {movies.map((movie, index) => (
              <div key={movie.id} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
                <div className={`card text-white shadow-lg h-100`} style={{ width: '18rem', ...(index % colors.length === 7 ? { color: 'black' } : {}) }}>
                  <div className={`card-body ${colors[index % colors.length]} rounded`}>
                    <h5 className="card-title fw-bold">{movie.title}</h5>
                    <p className="card-text mb-1"><strong>Release Year:</strong> {movie.release_year}</p>

                    {/* Clickable Director */}
                    {movie.director && (
                      <p className="card-text mb-1">
                        <strong>Director:</strong>
                        <Link to={`/directors/${movie.director.id}`} className="ms-1 text-decoration-underline text-white">
                          {movie.director.name}
                        </Link>
                      </p>
                    )}

                    {/* Clickable Actors */}
                    {movie.actors && movie.actors.length > 0 && (
                      <p className="card-text">
                        <strong>Actors:</strong>
                        {movie.actors.map(actor => (
                          <Link key={actor.id} to={`/actors/${actor.id}`} className="ms-1 text-decoration-underline text-white">
                            {actor.name}
                          </Link>
                        ))}
                      </p>
                    )}

                    {movie.genres.length > 0 && (
                      <p className="card-text"><strong>Genres:</strong> {movie.genres.map(g => g.name).join(', ')}</p>
                    )}

                    <Link to={`/movies/${movie.id}`} className="btn btn-light mt-2 w-100 fw-semibold text-dark">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default MovieList
