import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {
  Card,
  CardContent,
  Stack,
  MenuItem,
  Typography,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { tarihSecim } from "../../utils/localData";
import BIdataTable from "./BIdataTable";

const BIsonIslemler = () => {
  const [selectedDate, setSelectedDate] = useState(2);

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={2}>
          <Stack
            direction="row"
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="h5">İşlemler</Typography>
            <Stack
              direction="row"
              justifyContent={"center"}
              alignItems={"center"}
              spacing={2}
            >
              <Typography variant="h6">Dönem :</Typography>
              <CalendarMonthIcon
                sx={{ color: "action.active", mr: 1, my: 0.5 }}
              />
              <TextField
                id="outlined-select-currency"
                select
                defaultValue={2}
                sx={{ minWidth: 200 }}
                variant="standard"
                onChange={(e) => setSelectedDate(e.target.value)}
              >
                {tarihSecim.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </Stack>
          <BIdataTable selectedDate={selectedDate}/>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default BIsonIslemler;
