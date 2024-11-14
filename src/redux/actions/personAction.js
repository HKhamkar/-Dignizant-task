import { createAsyncThunk } from "@reduxjs/toolkit";
import PersonAPI from "../../services/api/person";

// get person details by id
export const getPersonDetailsById = createAsyncThunk(
  "movie-person-details",
  async (id, { rejectWithValue }) => {
    try {
      const response = await PersonAPI.getPersonDetailsByIdApi(id);
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

//  get person movies by id
export const getPersonMoviesById = createAsyncThunk(
  "person-movies",
  async (id, { rejectWithValue }) => {
    try {
      const response = await PersonAPI.getPersonMoviesByIdApi(id);
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
