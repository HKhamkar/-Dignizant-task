import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function CircularProgressWithLabel(props) {
  const percentage = (props.value / 10) * 100;
  const roundedValue = Math.round(props.value);
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" value={percentage} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ color: "text.secondary", fontWeight: "600" }}
        >
          {`${roundedValue}/10`}
        </Typography>
      </Box>
    </Box>
  );
}

export default function CircularWithValueLabel({ value }) {
  const [progress, setProgress] = React.useState(value);

  return <CircularProgressWithLabel value={progress} />;
}
