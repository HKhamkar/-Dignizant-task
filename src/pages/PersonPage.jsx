import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import avatarPlaceholderImg from "../assets/png/avatar-placeholder.jpg";
import { API_KEY, BASE_URL, REACT_APP_API_IMG } from "../core/constants";
import { toast } from "react-toastify";
import axios from "axios";

const PersonDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [personDetails, setPersonDetails] = useState(null);
  const [personMovies, setPersonMovies] = useState(null);

  const getPersonDetails = useCallback((id) => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/person/${id}`, {
        params: {
          api_key: API_KEY,
          language: "en-US",
        },
      })
      .then((response) => {
        setPersonDetails(response.data);
      })
      .catch((err) => {
        console.error("Error fetching movies:", err);
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
  }, []);

  const getPersonMovies = useCallback((id) => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/person/${id}/movie_credits`, {
        params: {
          api_key: API_KEY,
          language: "en-US",
        },
      })
      .then((response) => {
        setPersonMovies(response.data);
      })
      .catch((err) => {
        console.error("Error fetching movies:", err);
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
  }, []);

  useEffect(() => {
    if (id) {
      getPersonDetails(id);
      getPersonMovies(id);
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
            {personDetails ? (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200px"
                      image={
                        personDetails?.profile_path
                          ? `${REACT_APP_API_IMG}${personDetails?.profile_path}`
                          : avatarPlaceholderImg
                      }
                      alt={personDetails?.name}
                      sx={{
                        objectFit: "cover",
                        borderRadius: "100px",
                        width: "200px",
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      variant="h2"
                      sx={{ mb: 2, fontWeight: 600 }}
                      fontSize={{ xs: "28px", sm: "34px", md: "42px" }}
                    >
                      {personDetails?.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      mb={2}
                      fontSize={{ xs: "14px" }}
                    >
                      {`Birth date: ${personDetails?.birthday}`}
                    </Typography>

                    <Typography
                      mb={2}
                      variant="body2"
                      sx={{
                        color: "#707583",
                      }}
                      fontSize={{ xs: "14px", sm: "16px" }}
                    >
                      {personDetails?.biography}
                    </Typography>

                    <Typography
                      variant="body2"
                      mb={1.5}
                      fontSize={{ xs: "16px" }}
                      sx={{ fontWeight: 600 }}
                    >
                      Movies
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
                      {personMovies &&
                        personMovies?.cast &&
                        personMovies?.cast?.map((item) => (
                          <Link to={`/movie/${item?.id}}`}>
                            <Box
                              key={item?.id}
                              sx={{
                                px: 1.5,
                                py: 0.5,
                                border: "1px solid #cdd7e1",
                                borderRadius: "50px",
                                cursor: "pointer",
                                fontSize: "14px",
                                background: "#fbfcfe",
                                color: "black",
                              }}
                            >
                              {item?.title}
                            </Box>
                          </Link>
                        ))}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 18,
                  width: "100%",
                }}
              >
                No data found !
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

export default PersonDetails;
