import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ReactNode } from "react";

const MaterialTheme = ({ children }: { children: ReactNode }) => {
  const theme = createTheme({
    typography: {
      fontFamily: ["Montserrat","sans-serif"].join(","),
    },
  });
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MaterialTheme;
