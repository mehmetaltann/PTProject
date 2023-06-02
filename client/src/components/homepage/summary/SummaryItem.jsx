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
      spacing={2}
      direction={{ xs: "column", lg: "row" }}
    >
      <Typography variant="subtitle" sx={{ width: { lg: "35%", md: "100%" } }}>
        {title}
      </Typography>
      <Stack spacing={1}>
        <Typography
          variant="subtitle"
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          {presentValue}
        </Typography>
        <Divider />
        <Stack spacing={1}>
          <Stack spacing={2} direction="row" justifyContent={"space-between"}>
            <Typography variant="body2">Toplam Maliyet</Typography>
            <Typography variant="body2" fontWeight={500}>
              {totalCost}
            </Typography>
          </Stack>
          <Divider variant="inset" />
          <Stack spacing={2} direction="row" justifyContent={"space-between"}>
            <Typography variant="body2">Getiri</Typography>
            <Typography variant="body2" color={plColor} fontWeight={500}>
              {plStatus}
            </Typography>
          </Stack>
          <Divider variant="inset" />
          <Stack spacing={2} direction="row" justifyContent={"space-between"}>
            <Typography variant="body2">Getiri Oranı</Typography>
            <Typography variant="body2" color={plColor} fontWeight={500}>
              {plPercentage}
            </Typography>
          </Stack>
          <Divider variant="inset" />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SummaryItem;
