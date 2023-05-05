import {
  Grid,
  Modal,
  Typography,
  Box,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { GridFooterContainer, GridFooter } from "@mui/x-data-grid";
import { useState } from "react";
import BIchart from "./BIchart";
import CallMadeIcon from "@mui/icons-material/CallMade";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const BIdataTableFooter = ({ data, rowSelectionModel }) => {
  const [toplamGelirModalOpen, setToplamGelirModalOpen] = useState(false);
  const [toplamGiderModalOpen, setToplamGiderModalOpen] = useState(false);
  const [secilenIslemModalOpen, setSecilenIslemModalOpen] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 10,
    borderRadius: 3,
    p: 4,
  };

  const pickCalculation = () => {
    const checkedDataList = data.filter((item) =>
      rowSelectionModel.includes(item.id)
    );

    const totalCalc = (dataList) => {
      const total = dataList.reduce((n, { amount }) => n + amount, 0);
      return total.toFixed(2);
    };

    const toplamGelir = totalCalc(
      data.filter((item) => item.type === "Gelir")
    );

    const toplamGider = totalCalc(
      data.filter((item) => item.type === "Gider")
    );
    const gelirGiderFark = (toplamGelir - toplamGider).toFixed(2);
    const pickTotalAmount = totalCalc(checkedDataList);

    const pickAverageAmount =
      pickTotalAmount !== 0
        ? (pickTotalAmount / checkedDataList.length).toFixed(2)
        : 0;

    return {
      checkedDataList,
      toplamGelir,
      toplamGider,
      pickTotalAmount,
      pickAverageAmount,
      gelirGiderFark,
    };
  };

  return (
    <GridFooterContainer sx={{ fontSize: "inherit", p: 1 }}>
      <Grid container justifyContent={"center"} alignItems={"center"}>
        <Grid item md={7} xs={12}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>İstatistik ve Grafikler</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item>
                  <Stack direction="row" spacing={1}>
                    <Typography>
                      Toplam Gelir : {pickCalculation().toplamGelir} TL
                    </Typography>
                    <CallMadeIcon
                      fontSize="small"
                      onClick={() => setToplamGelirModalOpen(true)}
                      sx={{ color: "#4caf50", cursor: "pointer" }}
                    />
                    <Modal
                      open={toplamGelirModalOpen}
                      onClose={() => setToplamGelirModalOpen(false)}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        Toplam Gelir
                        <BIchart
                          dataList={data.filter(
                            (item) => item.type === "Gelir"
                          )}
                          lab="Toplam Gelir"
                          color="#4caf50"
                        />
                      </Box>
                    </Modal>
                  </Stack>
                </Grid>

                <Grid item>
                  <Stack direction="row" spacing={1}>
                    <Typography>
                      Toplam Gider : {pickCalculation().toplamGider} TL
                    </Typography>
                    <CallMadeIcon
                      fontSize="small"
                      onClick={() => setToplamGiderModalOpen(true)}
                      sx={{ color: "#ef5350", cursor: "pointer" }}
                    />
                    <Modal
                      open={toplamGiderModalOpen}
                      onClose={() => setToplamGiderModalOpen(false)}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        Toplam Gider
                        <BIchart
                          dataList={data.filter(
                            (item) => item.type === "Gider"
                          )}
                          lab="Toplam Gider"
                          color="#ef5350"
                        />
                      </Box>
                    </Modal>
                  </Stack>
                </Grid>

                <Grid item>
                  <Typography>
                    Bütçe Farkı : {pickCalculation().gelirGiderFark} TL
                  </Typography>
                </Grid>

                <Grid item>
                  <Stack direction="row" spacing={1}>
                    <Typography>
                      Seçim Toplam Tutar : {pickCalculation().pickTotalAmount}
                      TL
                    </Typography>
                    <CallMadeIcon
                      fontSize="small"
                      onClick={() => setSecilenIslemModalOpen(true)}
                      sx={{ color: "#03a9f4", cursor: "pointer" }}
                    />
                    <Modal
                      open={secilenIslemModalOpen}
                      onClose={() => setSecilenIslemModalOpen(false)}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <BIchart
                          dataList={pickCalculation().checkedDataList}
                          lab="Seçim"
                          color="#03a9f4"
                        />
                      </Box>
                    </Modal>
                  </Stack>
                </Grid>

                <Grid item>
                  <Typography>
                    Seçim Ortalama Tutar : {pickCalculation().pickAverageAmount}{" "}
                    TL
                  </Typography>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item md={5} xs={12}>
          <GridFooter
            sx={{
              border: "none", // To delete double border.
            }}
          />
        </Grid>
      </Grid>
    </GridFooterContainer>
  );
};

export default BIdataTableFooter;
