import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#61A9FF",
      light: "#E5EEFF",
      "200": "#C6D3ED",
      "300": "#A0CCFF",
    },
    text: {
      primary: "#283252",
      secondary: "#ECEFF5",
      disabled: "#94A4C4",
    },
    divider: "#E5EAF2",
    background: {
      default: "#f0f0f0",
    },
  },
  typography: { fontSize: 14, fontFamily: "Poppins, sans-serif" },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          color: "#fff",
          boxShadow: "none",
          padding: "0.5rem 2rem",
        },
      },
    },

    MuiCssBaseline: {
      styleOverrides: {
        a: {
          textDecoration: "none",
        },
      },
    },

    MuiTableBody: {
      styleOverrides: {},
    },

    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#E5F3FD",
        },
      },
    },

    MuiPaginationItem: {
      styleOverrides: {
        previousNext: {
          color: "#94A4C4",
        },
        root: {
          "&.Mui-selected": {
            backgroundColor: "#7EB9FF",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#7EB9FF",
            },
          },
          "&:hover": {
            backgroundColor: "#7EB9FF",
            color: "#fff",
          },
        },
      },
    },

    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#61A9FF",
        },
      },
    },
  },
});

export default theme;
