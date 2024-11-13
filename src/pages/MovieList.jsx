import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Typography,
  Box,
  Pagination,
  CircularProgress,
  Icon,
  Autocomplete,
  TextField,
} from "@mui/material";
import MovieCard from "../Components/MovieCard";
import { API_KEY, BASE_URL } from "../core/constants";
import { toast } from "react-toastify";
import { CiSearch } from "react-icons/ci";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const getMovieList = useCallback(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/movie/popular`, {
        params: {
          api_key: API_KEY,
          language: "en-US",
          page: currentPage,
        },
      })
      .then((res) => {
        setMovies(res.data.results);
        setTotalPages(res.data.total_pages);
      })
      .catch((err) => {
        console.error("Error fetching movies:", err.message);
        toast.error(err.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .finally(() => setLoading(false));
  }, [currentPage]);

  useEffect(() => {
    getMovieList();
  }, [getMovieList]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSearchFilter("");
  };

  const searchClickHandler = async () => {
    setLoading(true);
    if (searchFilter !== "") {
      axios
        .get(`${BASE_URL}/search/movie`, {
          params: {
            query: searchFilter,
            api_key: API_KEY,
          },
        })
        .then((res) => {
          setMovies(res.data.results);
          setTotalPages(res.data.total_pages);
        })
        .catch((err) => {
          console.error("Error fetching movies:", err.message);
          toast.error(err.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        })
        .finally(() => setLoading(false));
    }
  };

  const handleInputChange = (event, newInputValue) => {
    setSearchFilter(newInputValue);

    if (newInputValue.length < 1) {
      getMovieList();
    }
  };

  return (
    <Box
      sx={{
        display: "inline-block",
        width: "100%",
        ".movie_link_tag": { textDecoration: "none" },
      }}
    >
      <Container>
        <Typography variant="h4" sx={{ mb: 2 }} gutterBottom>
          Popular Movies
        </Typography>

        <Box sx={{ display: "flex", width: "100%", mb: 3 }}>
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            options={movies && movies.map((option) => option.title)}
            inputValue={searchFilter}
            onInputChange={handleInputChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Movies"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <Icon
                      sx={{ cursor: "pointer" }}
                      onClick={searchClickHandler}
                    >
                      <CiSearch />
                    </Icon>
                  ),
                }}
              />
            )}
            sx={{ width: "100%" }}
          />
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 18 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Grid container spacing={2}>
              {movies.length > 0 ? (
                movies.map((movie) => (
                  <Grid item xs={12} sm={4} md={3} key={movie.id}>
                    <MovieCard movie={movie} />
                  </Grid>
                ))
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 18,
                    width: "100%",
                  }}
                >
                  <Typography variant="h5" gutterBottom>
                    Not Found!
                  </Typography>
                </Box>
              )}
            </Grid>

            {movies.length > 0 && (
              <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

export default MovieList;
