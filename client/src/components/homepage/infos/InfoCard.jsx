import { Paper, Stack, Typography } from "@mui/material";

const InfoCard = ({ title, price }) => {
  return (
    <Paper sx={{ p: 4, borderRadius: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="subtitle1">{price} TL</Typography>
      </Stack>
    </Paper>
  );
};

export default InfoCard;
