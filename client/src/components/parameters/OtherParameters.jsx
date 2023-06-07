import ParameterMain from "./UI/ParameterMain";
import PageConnectionWait from "../UI/PageConnectionWait";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch } from "react-redux";
import {
  useGetParametersQuery,
  useAddParameterMutation,
  useDeleteParameterMutation,
} from "../../redux/apis/parameterApi";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

const OtherParameters = () => {
  const { data: parameters, isLoading, isFetching } = useGetParametersQuery();
  const [deleteParameter] = useDeleteParameterMutation();
  const [addParameter] = useAddParameterMutation();
  const dispatch = useDispatch();

  if (isLoading && isFetching)
    return <PageConnectionWait title="Veriler Bekleniyor" />;

  if (!parameters)
    return <PageConnectionWait title="Server Bağlantısı Kurulamadı" />;

  console.log(parameters);

  return (
    <Box>
      {parameters.map((item) => (
        <ParameterMain
          title1={`${item.variant} Ekle`}
          title2={`${item.variant} Listesi`}
          formName={item.variant}
          tableWidth={400}
          data={item}
          addFunction={addParameter}
          deleteFunction={deleteParameter}
        />
      ))}
    </Box>
  );
};

export default OtherParameters;
