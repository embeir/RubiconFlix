import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMovieDetails } from "../AppDataFetch.tsx";
import "./MovieDetail.css"

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate(); 

  const handleGoBack = () => {
    navigate(-1);
  };

  const { isLoading, data } = useMovieDetails(id || "");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!id || !data) {
    return <div>Movie not found</div>;
  }

  const posterUrl = data.poster_path ? `http://localhost:3001/tmdb/image/w500${data.poster_path}` : "";

  return (
    <div className="movie-details-container">
      <button onClick={handleGoBack}>Back</button>
      <div className="movie-content">
        {posterUrl && (
          <img
            src={posterUrl}
            alt={`${data.title} Poster`}
            className="movie-poster"
          />
        )}
        <div className="movie-info">
          <h2>{data.title}</h2>
          <p>{data.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
