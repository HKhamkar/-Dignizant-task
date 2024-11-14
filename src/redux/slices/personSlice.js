import { createSlice } from "@reduxjs/toolkit";
import {
  getPersonDetailsById,
  getPersonMoviesById,
} from "../actions/personAction";

const PersonSlice = createSlice({
  name: "person",
  initialState: {
    loading: false,
    personDetails: null,
    personMovies: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // get person details by id
    builder.addCase(getPersonDetailsById.pending, (state, { payload }) => {
      state.loading = true;
      state.personDetails = null;
    });

    builder.addCase(getPersonDetailsById.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.personDetails = payload;
    });

    builder.addCase(getPersonDetailsById.rejected, (state, { payload }) => {
      state.loading = false;
      state.personDetails = null;
    });

    //  get person movies by id
    builder.addCase(getPersonMoviesById.pending, (state, { payload }) => {
      state.loading = true;
      state.personMovies = null;
    });

    builder.addCase(getPersonMoviesById.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.personMovies = payload;
    });

    builder.addCase(getPersonMoviesById.rejected, (state, { payload }) => {
      state.loading = false;
      state.personMovies = null;
    });
  },
});

export default PersonSlice.reducer;
