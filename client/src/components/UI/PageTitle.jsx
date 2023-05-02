import { Typography } from "@mui/material";
import React from "react";

const PageTitle = React.memo(({ title }) => {
  console.log("render title")
  return (
    <Typography variant="h4" sx={{ textAlign: "center", mt: 1, mb: 1 }}>
      {title}
    </Typography>
     
  );
});

export default PageTitle;
