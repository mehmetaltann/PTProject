import PageTitle from "../components/UI/PageTitle";
import BudgetForm from "../components/budget/form/BudgetForm";
import TableContainer from "../components/budget/table/TableContainer";
import { useEffect } from "react";
import { Stack, Box, Container, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../redux/generalSlice";

const Budget = () => {
  const { messageData } = useSelector((state) => state.general);
  const dispatch = useDispatch();

  useEffect(() => {
    if (messageData) {
      setTimeout(() => dispatch(setMessage(null)), 1000);
    }
  }, [messageData, dispatch]);

  return (
    <Box sx={{ height: "90vh", overflow: "auto" }}>
      <Container>
        <Stack spacing={2}>
          <Stack spacing={{ sm: 4 }} direction={{ sm: "row", xs: "column" }}>
            <PageTitle title="Bütçe İşlemleri" />
            <BudgetForm />
          </Stack>
          {messageData && (
            <Typography variant="h6" gutterBottom color="success.main">
              {messageData.message}
            </Typography>
          )}
          <TableContainer />
        </Stack>
      </Container>
    </Box>
  );
};

export default Budget;
