import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation  } from "react-router-dom";
import MovieList from './MovieList.tsx';
import TvShowList from './ShowList.tsx';
import { fetchShowsWithImages, fetchMoviesWithImages } from './AppDataFetch.tsx';
import { useAppContext } from './AppContext.tsx';
import './Main.css';
import MovieDetails from "./MovieDetail.tsx";
import ShowDetails from './TvShowDetail.tsx';
import ThemeToggle from './ThemeToggle.tsx';
import LoadingAnimation from "./LoadAnim.tsx";


const Main: React.FC = () => {
  const {
    movies,
    tvShows,
    searchTerm,
    activeTab,
    setActiveTab,
    setSearchTerm,
    setMovies,  // <-- Correct function from context
    setTvShows, // <-- Correct function from context
  } = useAppContext();

  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
  }, 3000);
    const fetchData = async () => {
      try {
        if (activeTab === "movies") {
          const movies = await fetchMoviesWithImages(searchTerm);
          setMovies(movies);
        } else if (activeTab === "tvShows") {
          const tvShows = await fetchShowsWithImages(searchTerm);
          setTvShows(tvShows);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const timeoutId = setTimeout(fetchData, 500);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, activeTab, setMovies, setTvShows]);

  const handleTabChange = (tab: 'movies' | 'tvShows') => {
    setActiveTab(tab);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const renderContent = () => {
    if (activeTab === 'movies') {
      return <MovieList movies={movies} />;
    } else {
      return <TvShowList tvShows={tvShows} />;
    }
  };

  return (
    <div className="container">
      {isLoading && <LoadingAnimation />}
      <ThemeToggle />
      {location.pathname === "/" && (
        <>
          <ul className="tabs">
            <li
              className={activeTab === "movies" ? "active" : ""}
              onClick={() => handleTabChange("movies")}
            >
              Movies
            </li>
            <li
              className={activeTab === "tvShows" ? "active" : ""}
              onClick={() => handleTabChange("tvShows")}
            >
              TV Shows
            </li>
          </ul>

          <div className="search-bar">
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Search for movies..."
            />
          </div>
        </>
      )}

      <div className="content">
        <Routes>
          <Route path="/" element={renderContent()} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/tv/:id" element={<ShowDetails />} />
        </Routes>
      </div>
    </div>
  );
};

export default Main;