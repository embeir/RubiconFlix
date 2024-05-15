import React, { createContext, useContext, useState, useEffect } from 'react';
import { Movie, TvShow } from './Models';

interface MovieWithImage extends Movie {
  imageUrl?: string;
}

interface TvShowWithImage extends TvShow {
  imageUrl?: string;
}

interface AppContextValue {
  movies: MovieWithImage[];
  tvShows: TvShowWithImage[];
  searchTerm: string;
  activeTab: 'movies' | 'tvShows';
  setSearchTerm: (searchTerm: string) => void;
  setActiveTab: (activeTab: 'movies' | 'tvShows') => void;
  setMovies: React.Dispatch<React.SetStateAction<MovieWithImage[]>>;
  setTvShows: React.Dispatch<React.SetStateAction<TvShowWithImage[]>>;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppProvider: React.FC = ({ children }) => {
  const [movies, setMovies] = useState<MovieWithImage[]>([]);
  const [tvShows, setTvShows] = useState<TvShowWithImage[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'movies' | 'tvShows'>('tvShows');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []); 


  return (
    <AppContext.Provider
      value={{
        movies,
        tvShows,
        searchTerm,
        activeTab,
        isLoading,
        setSearchTerm,
        setActiveTab,
        setMovies,  // Include setMovies in the context value
        setTvShows,
        setIsLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
