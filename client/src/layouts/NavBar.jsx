import MenuIcon from "@mui/icons-material/Menu";
import ArchitectureIcon from "@mui/icons-material/Architecture";
import profile from "../assets/img/profile.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Avatar,
  Button,
  MenuItem,
} from "@mui/material";

const pages = [
  { title: "Anasayfa", link: "" },
  { title: "Yatırım İşlemleri", link: "yatirim-islemleri" },
  { title: "Yatırım Geçmişi", link: "yatirim-gecmisi" },
  { title: "Bütçe İşlemleri", link: "butce-kayit" },
];

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ArchitectureIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Altan
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={(e) => {
                setAnchorElNav(e.currentTarget);
              }}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={() => {
                setAnchorElNav(null);
              }}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map(({ title, link }) => (
                <MenuItem
                  key={title}
                  onClick={() => {
                    navigate(`/${link}`);
                    setAnchorElNav(null);
                  }}
                >
                  <Typography textAlign="center">{title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <ArchitectureIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Altan
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
              gap: "1rem",
              marginRight: "8rem",
            }}
          >
            {pages.map(({ title, link }) => (
              <Button
                key={title}
                onClick={() => navigate(`/${link}`)}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  fontSize: "1rem",
                }}
              >
                {title}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton
              onClick={(e) => {
                setAnchorElUser(e.currentTarget);
              }}
              sx={{ p: 0 }}
            >
              <Avatar alt="Mehmet Altan" src={profile} />
            </IconButton>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={() => {
                setAnchorElUser(null);
              }}
            >
              <MenuItem
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/");
                  window.location.reload();
                }}
              >
                <Typography textAlign="center">Çıkış Yap</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/parametereler");
                }}
              >
                <Typography textAlign="center">Hesaplama Tablosu</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/hesaplama-tablosu");
                }}
              >
                <Typography textAlign="center">Parametreler</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/butce-istatistik");
                }}
              >
                <Typography textAlign="center">Bütçe İstatistikleri</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
