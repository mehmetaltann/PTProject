import PageTitle from "../components/UI/PageTitle";
import InvestmentForm from "../components/investments/form/InvestmentForm";
import InvestmentTableContainer from "../components/investments/table/InvestmentTableContainer";
import { Stack, Box, Container, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../redux/yatirimSlice";

const Investments = () => {
  const { message } = useSelector((state) => state.yatirim);
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      setTimeout(() => dispatch(setMessage(null)), 1000);
    }
  }, [message, dispatch]);

  return (
    <Box sx={{ height: "85vh", overflow: "auto" }}>
      <Container>
        <Stack spacing={2}>
          <Stack spacing={{ sm: 4 }} direction={{ sm: "row", xs: "column" }}>
            <PageTitle title="Yatırım İşlemleri" />
            <InvestmentForm />
          </Stack>
          {message && (
            <Typography variant="h6" gutterBottom>
              {message.message}
            </Typography>
          )}
          <InvestmentTableContainer />
        </Stack>
      </Container>
    </Box>
  );
};

export default Investments;
