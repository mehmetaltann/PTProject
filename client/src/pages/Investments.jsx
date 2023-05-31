import PageTitle from "../components/UI/PageTitle";
import InvestmentForm from "../components/investments/form/InvestmentForm";
import TableContainer from "../components/investments/table/TableContainer";
import { Stack, Box, Container, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../redux/generalSlice";

const Investments = () => {
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
            <PageTitle title="Yatırım İşlemleri" />
            <InvestmentForm />
          </Stack>
          {messageData && (
            <Typography variant="h6" color="success.main" gutterBottom>
              {messageData.message}
            </Typography>
          )}
          <TableContainer />
        </Stack>
      </Container>
    </Box>
  );
};

export default Investments;
