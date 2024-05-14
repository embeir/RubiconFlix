import React from 'react';
import { MovieWithImage } from './Models';
import { Link } from 'react-router-dom';
import './MovieList.css';
import placeholderImage from './placeholderIMG.jpg';

interface MovieListProps {
  movies: MovieWithImage[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <ul className="movie-list"> 
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link to={`/movie/${movie.id}`}> 
            {movie.imageUrl && <img src={movie.imageUrl || placeholderImage} alt={movie.title} />} 
            <h2>{movie.title}</h2>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
