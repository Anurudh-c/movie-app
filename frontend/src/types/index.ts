// src/types/index.ts
export interface Genre {
  id: number;
  name: string;
}

export interface Director {
  id: number;
  name: string;
}

export interface Actor {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  release_year: number;
  genres: Genre[];
  director: Director;
  actors: Actor[];
  rating?: number;
}