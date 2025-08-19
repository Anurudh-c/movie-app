import { render, screen } from '@testing-library/react'
import MovieList from '../pages/MovieList'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom';

describe('MovieList Component', () => {
  test('renders loading spinner initially', async () => {
    render(
      <BrowserRouter>
        <MovieList />
      </BrowserRouter>
    )
    expect(await screen.findByText(/Loading/i)).toBeInTheDocument()
  })
})