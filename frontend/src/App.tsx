import {Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import MovieList from './pages/MovieList'
import MovieDetail from './pages/MovieDetail'
import ActorProfile from './pages/ActorProfile'
import DirectorProfile from './pages/DirectorProfile'


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
        <Route path="/actors/:id" element={<ActorProfile />} />
        <Route path="/directors/:id" element={<DirectorProfile />} />

      </Routes>
    </div>
  )
}

export default App
