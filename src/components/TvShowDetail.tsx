import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useShowDetails } from "../AppDataFetch.tsx";
import "./MovieDetail.css"

const ShowDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const { isLoading, data } = useShowDetails(id || "");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!id || !data) {
    return <div>TV Show not found</div>;
  }

  const posterUrl = data.poster_path
    ? `http://localhost:3001/tmdb/image/w500${data.poster_path}`
    : "";

  return (
    <div className="show-details-container">
      <button onClick={handleGoBack}>Back</button>
      <div className="show-content">
        {posterUrl && (
          <img
            src={posterUrl}
            alt={`${data.name} Poster`}
            className="show-poster"
          />
        )}
        <div className="show-info">
          <h2>{data.name}</h2>
          <p>{data.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;
