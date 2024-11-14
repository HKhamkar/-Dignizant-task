import axios from "axios";
import { API_KEY, BASE_URL } from "../../core/constants";

const PersonAPI = {
  // get person details by id api
  getPersonDetailsByIdApi(id) {
    return axios.get(`${BASE_URL}/person/${id}`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    });
  },

  // get person movies by id api
  getPersonMoviesByIdApi(id) {
    return axios.get(`${BASE_URL}/person/${id}/movie_credits`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    });
  },
};

export default PersonAPI;
