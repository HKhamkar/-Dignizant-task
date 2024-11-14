import React, { useCallback, useEffect, useState } from "react";
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
import { toast } from "react-toastify";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import {
  setPopularMoviePageNo,
  setTotalPopularMoviesPages,
} from "../redux/slices/moviesSlice";
import {
  getPopularMovieByName,
  getPopularMovieList,
} from "../redux/actions/moviesAction";

const MovieList = () => {
  const dispatch = useDispatch();
  const {
    popularMovieList,
    popularMoviePageNo,
    totalPopularMoviesPages,
    loading,
  } = useSelector((state) => state.movies);

  const [searchFilter, setSearchFilter] = useState("");

  const getMovieList = useCallback((popularMoviePageNo) => {
    dispatch(getPopularMovieList(popularMoviePageNo))
      .unwrap()
      .then((res) => {
        dispatch(setTotalPopularMoviesPages(res?.total_pages));
      })
      .catch((err) => {
        console.log("err", err);
        toast.error(err.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }, []);

  useEffect(() => {
    getMovieList(popularMoviePageNo);
  }, [popularMoviePageNo]);

  const handlePageChange = (event, page) => {
    dispatch(setPopularMoviePageNo(page));
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSearchFilter("");
  };

  const searchClickHandler = async () => {
    if (searchFilter !== "") {
      dispatch(getPopularMovieByName(searchFilter))
        .unwrap()
        .then((res) => {
          dispatch(setTotalPopularMoviesPages(res?.total_pages));
        })
        .catch((err) => {
          console.log("err", err);
          toast.error(err.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    }
  };

  const handleInputChange = (event, newInputValue) => {
    setSearchFilter(newInputValue);
    if (newInputValue.length < 1) {
      getMovieList(popularMoviePageNo);
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
            options={
              popularMovieList && popularMovieList.map((option) => option.title)
            }
            inputValue={searchFilter}
            onInputChange={handleInputChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Movies"
                InputProps={{
                  ...params.InputProps,
                  sx: {
                    paddingRight: "9px !important",
                  },
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
              {popularMovieList.length > 0 ? (
                popularMovieList.map((movie) => (
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

            {popularMovieList.length > 0 && (
              <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
                <Pagination
                  count={totalPopularMoviesPages}
                  page={popularMoviePageNo}
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
