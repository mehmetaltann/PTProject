import SendIcon from "@mui/icons-material/Send";
import PurchaseModal from "./PurchaseModal";
import SellModal from "./SellModal";
import { Button, Stack, Modal, Box } from "@mui/material";
import { useState } from "react";

const InvestmentForm = () => {
  const [openAlis, setOpenAlis] = useState(false);
  const [openSatis, setOpenSatis] = useState(false);

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
            width: { md: "70%", sm: "70%", xs: "85%", xl: "35%", lg: "55%" },
            overflow: "auto",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 2,
          }}
        >
          <PurchaseModal setOpenAlis={setOpenAlis} />
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
          <SellModal setOpenSatis={setOpenSatis} />
        </Box>
      </Modal>
    </Stack>
  );
};

export default InvestmentForm;
