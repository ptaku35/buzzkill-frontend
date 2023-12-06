import { extendTheme } from "@chakra-ui/react";
import { buttonStyles as Button } from "./Components/buttonStyles";
import { spinnerStyles as Spinner } from "./Components/spinnerStyles";
const myTheme = extendTheme({
  colors: {
    brand: {
      0: "#F1B31C",   // Bright Yellow
      20: "#715622",  // Brown
      40: "#725E2F",  // Olive
      50: "#F4CA66",  // Light Yellow
      60: "#BC8E2D",  // Gold
      70: "#265D89",  // Dark Blue
      80: "#2B328F",  // Blue
      100: "#4D3092", // Purple
    },
  },
  fonts: {
    heading: `'Roboto', sans serif`,
    body: `'Roboto', sans serif`,
  },
  fontWeights: {
    normal: 400,
    medium: 600,
    bold: 700,
  },
  fontSizes: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "28px",
    "4xl": "36px",
    "5xl": "48px",
    "6xl": "64px",
  },
  lineHeights: {
    normal: "normal",
    none: 1,
    shorter: 1.25,
    short: 1.375,
    base: 1.5,
    tall: 1.625,
    taller: "2",
  },
  letterSpacings: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
  breakpoints: {
    base: "0em",
    sm: "29em",
    md: "48em",
    lg: "62em",
    xl: "80em",
  },
  components: { Button, Spinner },
});

export default myTheme;
