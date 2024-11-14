import axios from "axios";
import { API_KEY, BASE_URL } from "../../core/constants";

const MovieAPI = {
  // get trending movie list api
  getPopularMoviesApi(pageNo) {
    return axios.get(`${BASE_URL}/movie/popular?page=${pageNo}`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    });
  },

  // get movie details by id api
  getMovieDetailsByIdApi(id) {
    return axios.get(`${BASE_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    });
  },

  // get movie credit details by id api
  getMovieCreditDetailsByIdApi(id) {
    return axios.get(`${BASE_URL}/movie/${id}/credits`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    });
  },

  // get movie by name api
  getPopularMovieByNameApi(searchFilter) {
    return axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query: searchFilter,
      },
    });
  },
};

export default MovieAPI;
