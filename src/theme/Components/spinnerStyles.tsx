import { mode } from "@chakra-ui/theme-tools";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";

export const spinnerStyles = {
  // 1. We can update the base styles
  baseStyle: {},
  // 2. We can add a new button size or extend existing
  sizes: {
    xl: {
        height: "40px",
        width: "40px",
      },
  },
  // 3. We can add a new visual variant
  variants: {
    // 4. We can override existing variants
    // solid: (props: StyleFunctionProps) => ({
    //   bg: props.colorMode === "dark" ? "red.300" : "red.500",
    // }),
    // 5. We can add responsive variants
    "default-spinner": { color: "brand.40" },
  },
  // 6. We can overwrite defaultProps
  defaultProps: {
    variant: "default-spinner", // default is solid
    size: "xl",
  },
};
