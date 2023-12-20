import { Box } from "@chakra-ui/react";
import React from "react";
import styles from "./SemiTransparentBackground.module.css";

interface SemiTransparentBackgroundProps {
  children: React.ReactNode;
  opacity?: number;
}
function hexToRgba(hex: string, opacity: number): string {
  hex = hex.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export default function SemiTransparentBackground({
  children,
  opacity = 0.4,
}: SemiTransparentBackgroundProps) {
  const backgroundColor = hexToRgba("brand.0", opacity);

  return (
    <Box
      flex="1"
      borderRadius="10px"
      padding="5px 10px 5px 10px"
      bg={backgroundColor}
      className={styles.semiTransparentBackground}
    >
      {children}
    </Box>
  );
}
