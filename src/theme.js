import { createTheme } from "@mui/material/styles";


const theme = createTheme({
  palette: {
    primary: { main: "#fff" },
    secondary: { main: "#2451C6" },
  },
  typography: {
    fontFamily: "Montserrat, sans-serif",
    h1: {fontSize: "64px", fontWeight: "700"},
    body1: { fontSize: "20px" },
    button: { textTransform: "none", fontWeight: 400 },
  },
});

export default theme;