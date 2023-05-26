import axios from "axios";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { BASE_URL } from "../utils/localData";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Typography,
  TextField,
  Link,
  Box,
  Container,
  CssBaseline,
} from "@mui/material";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        Mehmet ALTAN
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function UserRegister() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const timer = window.setInterval(() => {
      setError(null);
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [error]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      username: data.get("username"),
      password: data.get("password"),
    };
    try {
      const { data: res } = await axios.post(`${BASE_URL}/postUser`, userData);
      navigate("/");
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 15,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <HowToRegIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Kullanıcı Kayıt
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Kullanıcı Adı"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Şifre"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Kayıt Ol
            </Button>
            {error && (
              <Typography sx={{ color: "error.main", mb: 2 }}>
                {error}
              </Typography>
            )}
            <Link variant="body2" component={RouterLink} to="/login">
              {"Giriş Sayfası"}
            </Link>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
