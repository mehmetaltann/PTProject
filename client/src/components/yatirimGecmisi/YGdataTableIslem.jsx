import { Box, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";

const YGdataTableIslem = ({ params }) => {
  return (
    <Box
      sx={{
        m: 1,
        position: "relative",
      }}
    >   
      <IconButton aria-label="delete" disabled color="primary">
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default YGdataTableIslem;
