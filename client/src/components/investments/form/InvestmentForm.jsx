import SendIcon from "@mui/icons-material/Send";
import SellFormikForm from "./SellFormikForm";
import PurchaseTableForm from "./PurchaseTableForm";
import PurchaseFormikForm from "./PurchaseFormikForm";
import { useState } from "react";
import {
  Button,
  Stack,
  Modal,
  Box,
  Typography,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";

const InvestmentForm = () => {
  const [openAlis, setOpenAlis] = useState(false);
  const [openSatis, setOpenSatis] = useState(false);
  const [formType, setFormType] = useState("table");

  return (
    <Stack direction="row" justifyContent={"center"} spacing={3} sx={{ pt: 2 }}>
      <Button
        type="button"
        onClick={() => setOpenAlis(true)}
        variant="outlined"
        color="success"
        size="large"
        endIcon={<SendIcon />}
        sx={{ minWidth: 150 }}
      >
        Alış
      </Button>
      <Modal
        open={openAlis}
        onClose={() => setOpenAlis(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "40%",
            left: "50%",
            height: "70%",
            width: { md: "70%", sm: "70%", xs: "85%", xl: "60%", lg: "65%" },
            overflow: "auto",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 2,
          }}
        >
          <Stack spacing={2}>
            <Stack direction="row" spacing={2} sx={{ pt: 2, pl: 2 }}>
              <Typography variant="h5">Yeni Alış</Typography>
              <ToggleButtonGroup
                value={formType}
                exclusive
                onChange={(e) => setFormType(e.target.value)}
                aria-label="Platform"
              >
                <ToggleButton
                  color="success"
                  value="table"
                  sx={{ minWidth: "12ch", p: 0.8 }}
                  size="small"
                >
                  Tablo
                </ToggleButton>
                <ToggleButton
                  color="error"
                  value="form"
                  sx={{ minWidth: "12ch", p: 0.8 }}
                  size="small"
                >
                  Form
                </ToggleButton>
              </ToggleButtonGroup>
            </Stack>
            <Divider />
            {formType === "table" ? (
              <PurchaseTableForm setOpenAlis={setOpenAlis} />
            ) : (
              <PurchaseFormikForm setOpenAlis={setOpenAlis} />
            )}
          </Stack>
        </Box>
      </Modal>
      <Button
        endIcon={<SendIcon />}
        type="button"
        onClick={() => setOpenSatis(true)}
        variant="outlined"
        color="error"
        size="large"
        sx={{ minWidth: 150 }}
      >
        Satış
      </Button>
      <Modal
        open={openSatis}
        onClose={() => setOpenSatis(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "40%",
            left: "50%",
            height: { xs: "55%", sm: "30%", md: "30%", lg: "25%" },
            width: { md: "56%", sm: "70%", xs: "80%" },
            overflow: "auto",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 2,
          }}
        >
          <SellFormikForm setOpenSatis={setOpenSatis} />
        </Box>
      </Modal>
    </Stack>
  );
};

export default InvestmentForm;
