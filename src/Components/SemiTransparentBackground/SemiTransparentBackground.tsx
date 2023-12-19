import { Box } from "@chakra-ui/react";
import React from "react";
import styles from "./SemiTransparentBackground.module.css";

interface SemiTransparentBackgroundProps {
  children: React.ReactNode;
  style?: React.CSSProperties; // Allow custom styles to be passed
}

export default function SemiTransparentBackground({
  children,
  style, // Receive custom styles as a prop
}: SemiTransparentBackgroundProps) {
  return (
    <Box
      flex="1"
      borderRadius="10px"
      padding="2px 10px 2px 10px"
      className={styles.semiTransparentBackground}
      style={style} // Apply custom styles
    >
      {children}
    </Box>
  );
}
