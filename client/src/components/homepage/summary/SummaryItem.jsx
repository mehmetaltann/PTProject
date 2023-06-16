import { Typography, Stack, Divider } from "@mui/material";

const SummaryItem = ({
  title,
  presentValue,
  plPercentage,
  plStatus,
  totalCost,
  sx = [],
  plColor,
}) => {
  return (
    <Stack
      sx={[
        {
          p: 1,
          fontWeight: 500,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      spacing={1}
      direction="column"
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ p: .5 }}
      >
        <Typography variant="subtitle">{title}</Typography>
        <Typography variant="subtitle">{presentValue}</Typography>
      </Stack>
      <Stack sx={{ pl: 6 }} spacing={1}>
        <Divider />
        <Stack spacing={2} direction="row" justifyContent={"space-between"}>
          <Typography variant="body2">Toplam Maliyet</Typography>
          <Typography variant="body2" fontWeight={500}>
            {totalCost}
          </Typography>
        </Stack>
        <Stack spacing={2} direction="row" justifyContent={"space-between"}>
          <Typography variant="body2">Getiri</Typography>
          <Typography variant="body2" color={plColor} fontWeight={500}>
            {plStatus}
          </Typography>
        </Stack>
        <Stack spacing={2} direction="row" justifyContent={"space-between"}>
          <Typography variant="body2">Getiri Oranı</Typography>
          <Typography variant="body2" color={plColor} fontWeight={500}>
            {plPercentage}
          </Typography>
        </Stack>
        <Divider />
      </Stack>
    </Stack>
  );
};

export default SummaryItem;
