import { Typography, Stack } from "@mui/material";

const ButceItem = ({
  title,
  value,
  sx = [],
  typColor,
  typVar = "subtitle",
}) => {
  return (
    <Stack
      sx={[{ p: 2 }, ...(Array.isArray(sx) ? sx : [sx])]}
      spacing={2}
      direction="row"
      justifyContent={"space-between"}
    >
      <Typography variant={typVar}>{title}</Typography>
      <Typography variant={typVar} color={typColor}>
        {value}
      </Typography>
    </Stack>
  );
};

export default ButceItem;
