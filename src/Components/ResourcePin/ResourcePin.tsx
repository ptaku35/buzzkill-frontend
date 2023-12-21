import React, { useState } from "react";
import {
  Image,
  Box,
  Text,
  ImageProps,
  keyframes,
  Tooltip,
} from "@chakra-ui/react";
import Link from "next/link";
import { sapConfig, nectarConfig, pollenConfig } from "./ResourcePinConfigs"; // Import configuration objects

import styles from "./ResourcePin.module.css";

// Define a type for responsive style
type ResponsiveStyle =
  | string
  | { base: string; md: string; [key: string]: any };

const dancingAnimation = keyframes`
  0%, 100% { transform: translateY(-8%); }
  50% { transform: translateY(8%); }
`;

interface ResourcePinProps {
  top: ResponsiveStyle;
  left: ResponsiveStyle;
  onClick: () => void; // Click event handler
  config: {
    title: string;
    resource: string;
    contentText: string;
    imageSrc: string;
    navigationLabel: string;
  }; // Use a config prop for the resource pin configuration
}

const ResourcePin: React.FC<ResourcePinProps> = ({
  top,
  left,
  onClick,
  config, // Use the config prop
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
    width: { base: "20vw", md: "50vw" }, // Adjusted for larger size
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
    <Box
      position="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      top={top}
      left={left}
      transform="translate(-50%, -50%)"
      // Adjust the Box size to match the Image size
      width={{ base: "4vw", md: "4vw" }}
    >
      <Tooltip
        label={config.navigationLabel}
        hasArrow={false}
        placement="bottom"
        py={3}
        px={5}
        mt="-13px" // Adjust this value as needed
        borderRadius="lg"
        boxShadow="none"
        fontSize="lg"
      >
        <Box
          animation={`${dancingAnimation} 3s ease-in-out infinite`}
          _hover={{
            animationPlayState: "paused",
          }}
          onClick={onClick}
        >
          <Image
            src={config.imageSrc} // Use image source from config
            alt="Overlay Image"
            width="100%" // Make the Image fill the Box
          />
        </Box>
      </Tooltip>
    </Box>
  );
};

export default ResourcePin;
