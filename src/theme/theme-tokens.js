// import { createTheme } from "@mui/material";
import { deepOrange, deepPurple, grey } from "@mui/material/colors";

export const colors = [
  "#F49D6E",
  "#E85A4F",
  "#FFD166",
  "#8ABEB7",
  "#247BA0",
  "#D3D3D3",
];

export const themeModeOptions = [
  {
    label: "Light",
    id: "light",
  },
  {
    label: "Dark",
    id: "dark",
  },
];

// https://mui.com/material-ui/customization/theme-components/#theme-style-overrides
// override default values: https://mui.com/material-ui/customization/default-theme/
// const theme = createTheme({
//   palette: {
//     mode: "dark",
//     primary: {},
//     secondary: {},
//   },
//   components: {
//     MuiAlert: {
//       defaultProps: {
//         variant: "filled",
//       },
//     },
//     MuiLink: {
//       styleOverrides: {
//         root: {
//           cursor: "pointer",
//         },
//       },
//     },
//     MuiAppBar: {
//       styleOverrides: {
//         zIndex: 1100,
//       },
//     },
//   },
// });

export const getThemeTokens = (mode) => ({
  palette: {
    mode: mode,
    ...(mode === "light"
      ? {
          background: {
            default: grey[100],
            paper: grey[200],
          },
          primary: {
            // main color
            lighter: deepPurple[300],
            light: deepPurple[400],
            main: deepPurple[500],
            dark: deepPurple[600],
            darker: deepPurple[700],
          },
          secondary: {
            // point color
            lighter: deepOrange[300],
            light: deepOrange[400],
            main: deepOrange[600],
            dark: deepOrange[800],
            darker: deepOrange[900],
          },
        }
      : {
          background: {
            default: grey[900],
            paper: grey[800],
          },
          primary: {
            // main color
            lighter: deepPurple[100],
            light: deepPurple[200],
            main: deepPurple[300],
            dark: deepPurple[400],
            darker: deepPurple[500],
          },
          secondary: {
            // point color
            lighter: deepOrange[200],
            light: deepOrange[300],
            main: deepOrange[400],
            dark: deepOrange[600],
            darker: deepOrange[800],
          },
        }),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          boxSizing: "border-box",
          margin: 0,
          padding: 0,
        },
        html: {
          height: "100%",
          width: "100%",
        },
        body: {
          height: "100%",
          width: "100%",
        },
        "#root": {
          height: "100%",
          width: "100%",
        },
      },
    },
    MuiAppBar: {},
    MuiLink: {
      styleOverrides: {
        root: {
          cursor: "pointer",
        },
      },
    },
    MuiIconButton: {
      defaultProps: {
        size: "small",
        color: "inherit",
      },
    },
    MuiSnackbar: {
      defaultProps: {
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      },
    },
    MuiAlert: {
      defaultProps: {
        variant: "filled",
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        message: {
          fontWeight: 700,
          // textTransform: "capitalize",
        },
      },
    },
  },
  typography: {
    fontFamily: "Lato, sans-serif, 'IBM Plex Mono'",

    button: {
      textTransform: "unset",
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontSize: "1.15rem",
      lineHeight: "1.15rem",
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 0,
  },
});
