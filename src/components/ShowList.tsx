import React from 'react';
import { TvShowWithImage } from '../Models';
import { Link } from 'react-router-dom';
import './ShowList.css';
import placeholderImage from '../placeholderIMG.jpg';

interface ShowListProps {
  tvShows: TvShowWithImage[];
}

const ShowList: React.FC<ShowListProps> = ({ tvShows }) => {
  return (
    <ul className="tv-show-list">
      {tvShows.map((tvShow) => (
        <li key={tvShow.id}>
          <Link to={`/tv/${tvShow.id}`}>
            {tvShow.imageUrl && <img src={tvShow.imageUrl || placeholderImage} alt={tvShow.title} />} 
          <h2>{tvShow.name}</h2>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ShowList;
