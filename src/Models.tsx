export interface Movie {
  id: number,
  title: string,
  vote_average: number,
  poster_path: string | null,
  overview: string
}

export interface TvShow {
  id: number,
  name: string,
  vote_average: number,
  poster_path: string | null,
  overview: string
}

export interface MovieWithImage extends Movie {
  imageUrl?: string;
}

export interface TvShowWithImage extends Movie {
  imageUrl?: string;
  name: string
}