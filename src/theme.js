import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      light: "#47B5FF",
      main: "#256D85",
      dark: "#06283D",
    },
    secondary: {
      main: "#DBC8AC",
    },
    white: {
      main: "#fff",
    },
  },
  typography: {
    fontFamily: "Inter",

    navLink: {
      textTransform: "capitalize",
      padding: "5px",
    },
  },
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          transition: "all .5s",
          borderRadius: "8px",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#fff",
          textDecoration: "none",
        },
      },
    },
  },
});

export default theme;
