import YatirimPositions from "./portfoy_durum/YatirimPositions";
import { Stack, Typography } from "@mui/material";

const HomeMain = () => {
  return (
    <Stack spacing={2} sx={{ mt: 2 }}>
      <YatirimPositions />
    </Stack>
  );
};

export default HomeMain;
