import PageTitle from "../components/UI/PageTitle";
import TableContainer from "../components/investmentRecords/TableContainer";
import { Stack, Box,Typography, Container } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../redux/generalSlice";

const InvestmentRecords = () => {
  const { messageData } = useSelector((state) => state.general);
  const dispatch = useDispatch();

  useEffect(() => {
    if (messageData) {
      setTimeout(() => dispatch(setMessage(null)), 1000);
    }
  }, [messageData, dispatch]);

  return (
    <Box sx={{ height: "85vh", overflow: "auto" }}>
      <Container>
        <Stack spacing={2}>
          <Stack spacing={{ sm: 4 }} direction={{ sm: "row", xs: "column" }}>
            <PageTitle title="Geçmiş Yatırım İşlemleri" />
          </Stack>
          {messageData && (
            <Typography variant="h6" gutterBottom>
              {messageData.message}
            </Typography>
          )}
          <TableContainer />
        </Stack>
      </Container>
    </Box>
  );
};

export default InvestmentRecords;
