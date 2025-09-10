import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#fff" },
    secondary: { main: "#2451C6" },
  },
  typography: {
    fontFamily: "Montserrat, sans-serif",
    h1: { fontSize: "96px", fontWeight: "700" },
    h2: { fontSize: "64px", fontWeight: "700" },
    h6: { fontSize: "15px", fontWeight: "300" },
    body1: { fontSize: "16px", fontWeight: "400" }, 
    body2: { fontSize: "14px", fontWeight: "400" },
    button: { textTransform: "none", fontWeight: 400 },
  },
  components: {
    MuiFilledInput: {
      styleOverrides: {
        input: {
          fontSize: "16px",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "14px", 
        },
      },
    },
  },
});

export default theme;