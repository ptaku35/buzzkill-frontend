import React, { useState } from "react";
import { Image, Box, Text, ImageProps } from "@chakra-ui/react";
import Link from "next/link";

import styles from "./MapNavigation.module.css";

// Define a type for responsive style
type ResponsiveStyle =
  | string
  | { base: string; md: string; [key: string]: any };
interface MapNavigationProps {
  top: ResponsiveStyle;
  left: ResponsiveStyle;
  href: string;
  imageSrc: string;
  navigationLabel: string; // New prop for the navigation label
}

const MapNavigation: React.FC<MapNavigationProps> = ({
  top,
  left,
  href,
  imageSrc,
  navigationLabel,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const imageStyles: ImageProps = {
    position: "absolute",
    top: top,
    left: left,
    transform: {
      base: "translateY(-50%) scale(0.15)",
      md: "translateY(-50%) scale(0.2)",
    },
    width: { base: "10vw", md: "34vw" },
    zIndex: 2,
    transition: "transform 0.3s ease-in-out",
  };

  const labelStyles: React.CSSProperties = {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    fontSize: "10rem",
    justifyContent: "center",
    color: "white",
    zIndex: 3,
    opacity: 0, // Start invisible
    transition: "opacity 0.3s ease-in-out",
    padding: "3rem",
  };

  const backgroundStyles: React.CSSProperties = {
    content: "''",
    position: "absolute",
    top: "50%", // Adjust to vertically center the border
    left: "50%", // Adjust to horizontally center the border
    transform: "translate(-50%, -50%)", // Center the border
    width: "95%", // Adjust the size of the circular border
    height: "95%", // Adjust the size of the circular border
    background: "rgba(0, 0, 0, 0.6)", // Semi-transparent circular background
    borderRadius: "50%", // Create a circular shape
    pointerEvents: "none", // Ignore mouse events on this element
  };

  return (
    <Link href={href}>
      <Box
        position="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        _hover={{ transform: "translateY(-50%) scale(0.22)" }}
        {...imageStyles}
      >
        <Image
          src={imageSrc}
          alt="Overlay Image"
          _hover={{
            filter: "blur(20px)", // Apply a blur effect on hover
          }}
        />
        <Text style={{ ...labelStyles, opacity: isHovered ? 1 : 0 }}>
          {navigationLabel}
        </Text>
        {isHovered && <div style={backgroundStyles} />}
      </Box>
    </Link>
  );
};

export default MapNavigation;
