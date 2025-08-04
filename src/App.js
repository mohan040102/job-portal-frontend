import { ThemeProvider } from "@emotion/react";
import theme from "./theme/theme";
import { CssBaseline } from "@mui/material";
import CustomSnackbar from "./components/snackbar";
import { RouterProvider } from "react-router-dom";
import router from "./route/index";
import { UserProvider } from "./context/user-context";

function App() {
  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CustomSnackbar />
        <RouterProvider router={router} />
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
