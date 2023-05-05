import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BIdataTable from "./BIdataTable";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect } from "react";
import { useState } from "react";
import { tarihSecim } from "../../utils/localData";
import { useGlobalContext } from "../../context/globalContext";
import { MenuItem, Typography, TextField, Paper, Box } from "@mui/material";
import useAxios from "../../hooks/useAxios";
import useHttp from "../../hooks/use-http";

const BIsonIslemler = () => {
  const [selectedDate, setSelectedDate] = useState(2);
  const [data, setData] = useState([]);
  const { butceKalemiSil, error, message, setMessage, setError } =
    useGlobalContext();

  const { sendRequest } = useHttp();

  useEffect(() => {
    const transformData = (fetchData) => {
      let filteredData = fetchData.map(({ _id: id, ...rest }) => ({
        id,
        ...rest,
      }));

      setData(filteredData);
    };

    sendRequest(
      {
        method: "get",
        url: `butce-sorgula/${selectedDate}`,
      },
      transformData
    );
  }, [sendRequest, selectedDate]);

  useEffect(() => {
    if (error) {
      setTimeout(() => setError(null), 1500);
    }
    if (message) {
      setTimeout(() => setMessage(null), 1500);
    }
  }, [error, message]);

  return (
    <Paper variant="outlined" sx={{ p: 2, height: "100%" }}>
      <Box>{message}</Box>
      <Grid container spacing={2} sx={{ p: 1, height: "100%" }}>
        <Grid container xs={12} justifyContent={"space-between"} spacing={1}>
          <Grid xs={12} sm={3}>
            <Typography variant="h5">İşlemler</Typography>
          </Grid>
          <Grid
            container
            spacing={1}
            xs={12}
            sm={9}
            justifyContent={{ xs: "flex-start", sm: "flex-end" }}
          >
            <Grid>
              <Typography variant="h6">Dönem :</Typography>
            </Grid>

            <Grid>
              <CalendarMonthIcon
                sx={{ color: "action.active", mr: 1, my: 0.5 }}
              />
            </Grid>

            <Grid>
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
            </Grid>
          </Grid>
        </Grid>

        <Grid container xs={12} sx={{ height: 500 }}>
          <Box sx={{ height: "100%", width: "auto" }}>
            <BIdataTable data={data} butceKalemiSil={butceKalemiSil} />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BIsonIslemler;
