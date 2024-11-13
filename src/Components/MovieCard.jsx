import React from "react";
import { Box, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import PlaceholderImg from "../assets/png/img-placeholder.png";
import { formatDate } from "../core/utils";
import { REACT_APP_API_IMG } from "../core/constants";
import CircularProgressWithLabel from "./UserScore";

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie?.id}`} className="movie_link_tag">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          cursor: "pointer",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "rgba(0, 0, 0, 0.2) 0px 4px 16px 0px",
          },
        }}
      >
        <Box sx={{ display: "flex" }}>
          <CardMedia
            component="img"
            height="230"
            width="100%"
            image={
              movie?.poster_path
                ? `${REACT_APP_API_IMG}${movie?.poster_path}`
                : PlaceholderImg
            }
            alt={movie?.original_title}
            sx={{ objectFit: "fill" }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            px: 3,
            py: 2,
          }}
        >
          <Typography
            variant="h4"
            mb={2}
            fontSize={{ xs: "18px", md: "20px" }}
            sx={{
              fontWeight: 600,
              width: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
              textDecoration: "none",
              color: "black",
              minHeight: "50px",
            }}
          >
            {movie?.original_title}
          </Typography>

          <Typography
            mb={2}
            variant="body2"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "5",
              WebkitBoxOrient: "vertical",
              fontSize: "14px",
              color: "#707583",
              minHeight: "101px",
            }}
          >
            {movie?.overview}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <Typography
              variant="body2"
              sx={{
                fontSize: "14px",
                color: "#707583",
              }}
            >
              User Score:
            </Typography>
            <Box sx={{ display: "flex" }}>
              <CircularProgressWithLabel value={movie.vote_average} />
            </Box>
          </Box>

          <Typography
            variant="body2"
            sx={{
              fontSize: "14px",
              color: "#707583",
            }}
          >
            {`Release date: ${formatDate(movie?.release_date)}`}
          </Typography>
        </Box>
      </Box>
    </Link>
  );
};

export default MovieCard;
