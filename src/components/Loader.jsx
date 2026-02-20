import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const Loader = ({ text = "Loading..." }) => {
  return (
    <Box
      sx={{
        height: "60vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <CircularProgress size={55} />
      <Typography variant="h6" color="text.secondary">
        {text}
      </Typography>
    </Box>
  );
};

export default Loader;
