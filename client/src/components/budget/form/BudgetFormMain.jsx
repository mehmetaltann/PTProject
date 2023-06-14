import PageConnectionWait from "../../UI/PageConnectionWait";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TableForm from "./TableForm";
import FormikForm from "./FormikForm";
import { useState } from "react";
import { useGetCategoriesQuery } from "../../../redux/apis/categoryApi";
import {
  Typography,
  Modal,
  Button,
  Box,
  Stack,
  ToggleButton,
  Divider,
  ToggleButtonGroup,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  height: "70%",
  width: { xs: "90%", lg: "70%" },
  overflow: "auto",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 2,
};

const BudgetFormMain = () => {
  const [open, setOpen] = useState({ state: false, type: "Gelir" });
  const [formType, setFormType] = useState("form");
  const { data: categories, isLoading, isFetching } = useGetCategoriesQuery();
  const handleGelirOpen = () => setOpen({ state: true, type: "Gelir" });
  const handleGiderOpen = () => setOpen({ state: true, type: "Gider" });
  const handleClose = () => setOpen({ state: false, type: "Gelir" });

  if (isLoading && isFetching)
    return <PageConnectionWait title="Veriler Bekleniyor" />;

  if (!categories)
    return <PageConnectionWait title="Server Bağlantısı Kurulamadı" />;

  return (
    <Stack direction="row" justifyContent={"center"} spacing={3} sx={{ pt: 2 }}>
      <Button
        type="button"
        onClick={handleGelirOpen}
        variant="outlined"
        color="success"
        size="large"
        startIcon={<AddCircleIcon />}
      >
        Gelir Ekle
      </Button>
      <Button
        startIcon={<AddCircleIcon />}
        type="button"
        onClick={handleGiderOpen}
        variant="outlined"
        color="error"
        size="large"
      >
        Gider Ekle
      </Button>
      <Modal
        open={open.state}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2} sx={{ pt: 2, pl: 2 }}>
              <Typography variant="h5">Yeni {open.type}</Typography>
              <ToggleButtonGroup
                value={formType}
                exclusive
                onChange={(e) => setFormType(e.target.value)}
                aria-label="Platform"
              >
                <ToggleButton
                  color="success"
                  value="form"
                  sx={{ minWidth: "12ch", p: 0.8 }}
                  size="small"
                >
                  Form
                </ToggleButton>
                <ToggleButton
                  color="error"
                  value="table"
                  sx={{ minWidth: "12ch", p: 0.8 }}
                  size="small"
                >
                  Tablo
                </ToggleButton>
              </ToggleButtonGroup>
            </Stack>
            <Divider />
            {formType === "form" ? (
              <FormikForm
                openType={open.type}
                categories={categories}
                closeModel={handleClose}
              />
            ) : (
              <TableForm
                openType={open.type}
                categories={categories}
                closeModel={handleClose}
              />
            )}
          </Stack>
        </Box>
      </Modal>
    </Stack>
  );
};

export default BudgetFormMain;
