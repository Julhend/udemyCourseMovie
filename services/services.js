import axios from 'axios';

const baseUrl = 'https://api.themoviedb.org/3';
const apiKey = 'api_key=4cb7afd3685a7f1bac48a4817e6d5d43';

export const getPopularMovies = async () => {
  const result = await axios.get(`${baseUrl}/movie/popular?${apiKey}`);
  return result.data.results;
};

export const getUpcomingMovies = async () => {
  const result = await axios.get(`${baseUrl}/movie/upcoming?${apiKey}`);
  return result.data.results;
};

export const getPopularTv = async () => {
  const result = await axios.get(`${baseUrl}/tv/popular?${apiKey}`);
  return result.data.results;
};

export const getFamilyMovies = async () => {
  const result = await axios.get(
    `${baseUrl}/discover/movie?${apiKey}&with_genres=10751`,
  );
  return result.data.results;
};

export const getDocumentaryMovies = async () => {
  const result = await axios.get(
    `${baseUrl}/discover/movie?${apiKey}&with_genres=99`,
  );
  return result.data.results;
};

export const getMovie = async id => {
  const result = await axios.get(`${baseUrl}/movie/${id}?${apiKey}`);
  return result.data;
};

export const searchMovieTv = async (query, type) => {
  const result = await axios.get(
    `${baseUrl}/search/${type}?${apiKey}&query=${query}`,
  );
  return result.data.results;
};
