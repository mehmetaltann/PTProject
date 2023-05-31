import { Typography } from "@mui/material";
import React from "react";

const PageTitle = React.memo(({ title }) => {
  return (
    <Typography
      variant="h6"
      sx={{
        color: "primary.main",
        p: 1,
        textAlign: "center",
        mt: 2,
      }}
    >
      {title}
    </Typography>
  );
});

export default PageTitle;
