import { createTheme, ThemeProvider } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import RoleplayInput from "./pages/RoleplayInput";
import Callback from "./pages/CreateDocument";
import { FormDataProvider, RoleplayProvider } from "./context/RoleplayContext";
import RoleplayResult from "./pages/RoleplayResult";

const theme = createTheme({
  components: {
    MuiFormLabel: {
      styleOverrides: {
        root: { color: "black" },
        asterisk: ({ theme }) => ({
          color: theme.palette.error.main,
        }),
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RoleplayProvider>
        <FormDataProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/input" replace />}></Route>
            <Route path="/input" element={<RoleplayInput />}></Route>
            <Route path="/result" element={<RoleplayResult />}></Route>
            <Route path="create-document" element={<Callback />}></Route>
          </Routes>
        </FormDataProvider>
      </RoleplayProvider>
    </ThemeProvider>
  );
}

export default App;
