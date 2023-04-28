import { Card, CardContent, Typography } from "@mui/material";
import YIdataTable from "./YIdataTable";

const YIsonIslemler = () => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography
          variant="h5"
          sx={{ borderBottom: 1, mb: 4, borderColor: "grey.500" }}
        >
          Son İşlemler
        </Typography>
        <YIdataTable />
      </CardContent>
    </Card>
  );
};

export default YIsonIslemler;
