import { Box, Container, Grid, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "info.light.main",
        paddingTop: "1rem",
      }}
    >
      <Container maxWidth="lg">
        <Grid container alignItems="center" justifyContent={"center"} spacing={1}>
          <Grid item>
            <Typography color="black" variant="subtitle1">
              Altan
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="textSecondary" variant="subtitle1">
              {`${new Date().getFullYear()}`}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
