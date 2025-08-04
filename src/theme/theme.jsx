import { createTheme } from '@mui/material/styles';
import "@fontsource/montserrat/index.css";

export const commonColors = {
  lightGray: "#fafafa",
  veryLightTeal: "#004f471c",
  lightTeal: "#004f4747",
  lightCyan: "#b1e3de",
  sidebarTeal: '#009688',
  selectMenuBackgroundTeal: "#00867847",
  selectMenuHoverTeal: "#0086785a"
}

const themeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#00897b',
      light: "#e0f2f133",
    },
    secondary: {
      main: '#f50057',
      light: "#e0f2f180",
    }
  },
  typography: {
    fontFamily: "Montserrat, sans-serif",
    button: { textTransform: "none" }, // Removes uppercase styling on buttons
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: commonColors.lightGray, // This sets the body background color
        },
      },
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
