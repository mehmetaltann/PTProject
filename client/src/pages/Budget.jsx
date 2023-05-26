import PageTitle from "../components/UI/PageTitle";
import BudgetForm from "../components/budget/form/BudgetForm";
import BIsonIslemler from "../components/budget/table/BIsonIslemler";
import { useEffect } from "react";
import { Stack, Box, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../redux/butcesSlice";

const Budget = () => {
  const { message } = useSelector((state) => state.butce);
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      setTimeout(() => dispatch(setMessage(null)), 1000);
    }
  }, [message, dispatch]);

  return (
    <Box sx={{ height: "90vh", overflow: "auto" }}>
      <Container>
        <Stack spacing={2}>
          <Stack spacing={{ sm: 4 }} direction={{ sm: "row", xs: "column" }}>
            <PageTitle title="Bütçe İşlemleri" />
            <BudgetForm />
          </Stack>
          {message && <Box>{message.message}</Box>}
          <BIsonIslemler />
        </Stack>
      </Container>
    </Box>
  );
};

export default Budget;
