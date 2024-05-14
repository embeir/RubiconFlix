import axios from 'axios';
import { Movie, TvShow } from './Models';
import { useEffect, useState } from "react";

const apiKey = '988f42fde0aac961e9d679898c4591e9';

const baseUrl = 'https://api.themoviedb.org/3';


export async function fetchShowsWithImages(searchTerm?: string) {
  const apiUrl = searchTerm
    ? `http://localhost:3001/tmdb/api/search/tv?query=${searchTerm}&include_adult=false&include_video=false&language=en-US&page=1&api_key=${apiKey}`
    : `http://localhost:3001/tmdb/api/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200&api_key=${apiKey}`;

  const response = await fetch(apiUrl); 
  const data = await response.json();


  const ShowsWithImages = await Promise.all(
    data.results.slice(0, 10).map(async (tvShows) => {
      const imageResponse = await fetch(`${baseUrl}/tv/${tvShows.id}/images?api_key=${apiKey}`);
      const imageData = await imageResponse.json();
      const posterPath = imageData.posters.find((poster) => poster.iso_639_1 === null && poster.width >= 500)?.file_path;
      const imageUrl = posterPath ? `http://localhost:3001/tmdb/image/w500${posterPath}` : null;

      return { ...tvShows, imageUrl };
    })
  );

  return ShowsWithImages;
}


export async function fetchMoviesWithImages(searchTerm?: string) {
  const apiUrl = searchTerm
    ? `http://localhost:3001/tmdb/api/search/movie?query=${searchTerm}&include_adult=false&include_video=false&language=en-US&page=1&api_key=${apiKey}`
    : `http://localhost:3001/tmdb/api/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200&api_key=${apiKey}`;

  const response = await fetch(apiUrl); 
  const data = await response.json();


  const moviesWithImages = await Promise.all(

    data.results.slice(0, 10).map(async (movie) => {
      const imageResponse = await fetch(`${baseUrl}/movie/${movie.id}/images?api_key=${apiKey}`);
      const imageData = await imageResponse.json();
      const posterPath = imageData.posters.find((poster) => poster.width >= 200)?.file_path;
      const imageUrl = posterPath ? `http://localhost:3001/tmdb/image/w500${posterPath}` : null;

      return { ...movie, imageUrl };
    })
  );

  return moviesWithImages;
}


export const useMovieDetails = (movieId: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/tmdb/api/movie/${movieId}?api_key=${apiKey}`);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error :", error);
        setData(null); 
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  return { isLoading, data };
};

export const useShowDetails = (showId: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<TvShow | null>(null);

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/tmdb/api/tv/${showId}?api_key=${apiKey}`);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching  :", error);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShowDetails();
  }, [showId]);

  return { isLoading, data };
};

