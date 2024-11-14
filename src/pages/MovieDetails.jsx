import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  CardMedia,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { REACT_APP_API_IMG } from "../core/constants";
import PlaceholderImg from "../assets/png/img-placeholder.png";
import { formatDate } from "../core/utils";
import { toast } from "react-toastify";
import CircularProgressWithLabel from "../Components/UserScore";
import { useDispatch, useSelector } from "react-redux";
import {
  getMovieCreditDetailsById,
  getMovieDetailsById,
} from "../redux/actions/moviesAction";

function MovieDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { movieDetails, loading, movieCreditDetails } = useSelector(
    (state) => state.movies
  );

  const getMovieCreditDetails = useCallback((id) => {
    dispatch(getMovieCreditDetailsById(id))
      .unwrap()
      .then((res) => {})
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

  const getMovieDetails = useCallback((id) => {
    dispatch(getMovieDetailsById(id))
      .unwrap()
      .then((res) => {})
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
    if (id) {
      getMovieDetails(id);
      getMovieCreditDetails(id);
    }
  }, [id]);

  return (
    <Box sx={{ display: "inline-block", width: "100%" }}>
      <Container>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 18 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {movieDetails ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  mb: 3,
                }}
              >
                <Box sx={{ display: "flex", mb: 3, position: "relative" }}>
                  <CardMedia
                    component="img"
                    height="400"
                    width="100%"
                    image={
                      movieDetails?.backdrop_path
                        ? `${REACT_APP_API_IMG}${movieDetails?.backdrop_path}`
                        : PlaceholderImg
                    }
                    alt={movieDetails?.original_title}
                    sx={{ objectFit: "fill" }}
                  />

                  <Box
                    sx={{
                      position: "absolute",
                      p: 1,
                      background: "white",
                      bottom: 8,
                      left: 8,
                      borderRadius: "50px",
                    }}
                  >
                    <Box sx={{ display: "flex" }}>
                      <CircularProgressWithLabel
                        value={movieDetails.vote_average}
                      />
                    </Box>
                  </Box>
                </Box>

                <Typography
                  variant="h2"
                  sx={{ mb: 2, fontWeight: 600 }}
                  fontSize={{ xs: "28px", sm: "34px", md: "42px" }}
                >
                  {movieDetails?.original_title}
                </Typography>

                <Typography variant="body2" mb={1} fontSize={{ xs: "14px" }}>
                  {`Release date: ${formatDate(movieDetails?.release_date)}`}
                </Typography>

                <Typography variant="body2" mb={3} fontSize={{ xs: "14px" }}>
                  {`Runtime: ${Math.floor(movieDetails?.runtime / 60)}h ${
                    movieDetails?.runtime % 60
                  }min`}
                </Typography>

                <Typography
                  mb={3}
                  variant="body2"
                  sx={{
                    color: "#707583",
                  }}
                  fontSize={{ xs: "14px", sm: "16px" }}
                >
                  {movieDetails?.overview}
                </Typography>

                {movieCreditDetails && (
                  <Box sx={{ display: "flex", flexFlow: "column" }}>
                    <Typography
                      variant="body2"
                      mb={1.5}
                      fontSize={{ xs: "16px" }}
                      sx={{ fontWeight: 600 }}
                    >
                      Cast & Crew
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        flexWrap: "wrap",
                        gap: 1,
                        a: {
                          textDecoration: "none",
                        },
                      }}
                    >
                      {movieCreditDetails?.map((item, idx) => (
                        <Link to={`/person/${item?.id}`} key={idx}>
                          <Box
                            sx={{
                              px: 1.5,
                              py: 0.5,
                              border: "1px solid #cdd7e1",
                              borderRadius: "50px",
                              fontSize: "14px",
                              background: "#fbfcfe",
                              color: "black",
                            }}
                          >
                            {item?.original_name}
                          </Box>
                        </Link>
                      ))}
                    </Box>
                  </Box>
                )}
              </Box>
            ) : (
              <Box sx={{ display: "inline-block", width: "100%" }}>
                Data Not Found!
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
}

export default MovieDetails;
