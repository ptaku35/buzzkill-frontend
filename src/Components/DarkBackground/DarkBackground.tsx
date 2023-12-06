import { Box } from "@chakra-ui/react";
import React from "react";
import styles from "./DarkBackground.module.css";

interface DarkBackgroundProps {
  children: React.ReactNode;
}

export default function DarkBackground({ children }: DarkBackgroundProps) {
  return (
    <Box flex="1" className={styles.darkBackground} bg="brand.40">
      {children}
    </Box>
  );
}
