import axios from 'axios';

const apiKey = '1fbb4c650d6818bc1561ed7a2addb581';
const url = 'https://api.themoviedb.org/3';
const nowPlayingUrl = `${url}/movie/now_playing`;
const toperetedUrl = `${url}/movie/top_rated`;
const movieUrl = `${url}/movie`;
const genreUrl = `${url}/genre/movie/list`;
const moviesUrl = `${url}/discover/movie`;

export const fetchMovies = async () => {
  try {
    const { data } = await axios.get(nowPlayingUrl, {
      params: {
        api_key: apiKey,
        language: 'en_Us',
        page: 1,
      },
    });
    const posterUrl = 'https://image.tmdb.org/t/p/original';
    const modifiedData = data['results'].map((m) => ({
      id: m['id'],
      backPoster: posterUrl + m['backdrop_path'],
      popularity: m['popularity'],
      poster: posterUrl + m['poster_path'],
      overview: m['overview'],
      raiting: m['vote_average'],
      title: m['title'],
    }));
    return modifiedData;
  } catch (error) {}
};

export const fetchGenre = async () => {
  try {
    const { data } = await axios.get(genreUrl, {
      params: {
        api_key: apiKey,
        language: 'en_Us',
        page: 1,
      },
    });

    const modifiedData = data['genres'].map((m) => ({
      id: m['id'],
      genre: m['name'],
    }));
    return modifiedData;
  } catch (error) {}
};

export const fetchMovieByGenre = async (genre_id) => {
  try {
    const { data } = await axios.get(moviesUrl, {
      params: {
        api_key: apiKey,
        language: 'en_Us',
        page: 1,
        with_genres: genre_id,
      },
    });
    const posterUrl = 'https://image.tmdb.org/t/p/original';
    const modifiedData = data['results'].map((m) => ({
      id: m['id'],
      backPoster: posterUrl + m['backdrop_path'],
      popularity: m['popularity'],
      poster: posterUrl + m['poster_path'],
      overview: m['overview'],
      raiting: m['vote_average'],
      title: m['title'],
    }));
    return modifiedData;
  } catch (error) {}
};

export const fetchTopRatedMovie = async () => {
  try {
    const { data } = await axios.get(toperetedUrl, {
      params: {
        api_key: apiKey,
        language: 'en_Us',
        page: 1,
      },
    });
    const posterUrl = 'https://image.tmdb.org/t/p/original';
    const modifiedData = data['results'].map((m) => ({
      id: m['id'],
      backPoster: posterUrl + m['backdrop_path'],
      popularity: m['popularity'],
      poster: posterUrl + m['poster_path'],
      overview: m['overview'],
      raiting: m['vote_average'],
      title: m['title'],
    }));
    return modifiedData;
  } catch (error) {}
};

export const fetchMovieDetail = async (id) => {
  try {
    const { data } = await axios.get(`${movieUrl}/${id}`, {
      params: {
        api_key: apiKey,
        language: 'en-Us',
      },
    });
    return data;
  } catch (error) {}
};

export const fetchMovieVideos = async (id) => {
  try {
    const { data } = await axios.get(`${movieUrl}/${id}/videos`, {
      params: {
        api_key: apiKey,
      },
    });
    return data['results'][0];
  } catch (error) {}
};

export const fetchCasts = async (id) => {
  try {
    const { data } = await axios.get(`${movieUrl}/${id}/credits`, {
      params: {
        api_key: apiKey,
      },
    });
    const modifiedData = data['cast'].map((c) => ({
      id: c['cast_id'],
      character: c['character'],
      name: c['name'],
      img: 'https://image.tmdb.org/t/p/w200' + c['profile_path'],
    }));
    return modifiedData;
  } catch (error) {}
};

export const fetchSimilarMovie = async (id) => {
  try {
    const { data } = await axios.get(`${movieUrl}/${id}/similar`, {
      params: {
        api_key: apiKey,
        language: 'en-Us',
      },
    });
    const posterUrl = 'https://image.tmdb.org/t/p/original';
    const modifiedData = data['results'].map((m) => ({
      id: m['id'],
      backPoster: posterUrl + m['backdrop_path'],
      popularity: m['popularity'],
      poster: posterUrl + m['poster_path'],
      overview: m['overview'],
      raiting: m['vote_average'],
      title: m['title'],
    }));
    return modifiedData;
  } catch (error) {}
};
