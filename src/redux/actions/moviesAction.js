import { createAsyncThunk } from "@reduxjs/toolkit";
import MovieAPI from "../../services/api/movies";

// get popular movie list
export const getPopularMovieList = createAsyncThunk(
  "popular-movie-list",
  async (pageNo = 1, { rejectWithValue }) => {
    try {
      const response = await MovieAPI.getPopularMoviesApi(pageNo);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// get movie details by id
export const getMovieDetailsById = createAsyncThunk(
  "movie-details",
  async (id, { rejectWithValue }) => {
    try {
      const response = await MovieAPI.getMovieDetailsByIdApi(id);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// get movie credit details by id
export const getMovieCreditDetailsById = createAsyncThunk(
  "movie-credit-details",
  async (id, { rejectWithValue }) => {
    try {
      const response = await MovieAPI.getMovieCreditDetailsByIdApi(id);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// get movie by name api
export const getPopularMovieByName = createAsyncThunk(
  "popular-movie-by-name",
  async (searchFilter, { rejectWithValue }) => {
    try {
      const response = await MovieAPI.getPopularMovieByNameApi(searchFilter);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
