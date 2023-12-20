// MapTriangle.tsx
import { Box, Tooltip, keyframes } from "@chakra-ui/react";
import React from "react";

// Define the props for the MapTriangle component
interface MapTriangleProps {
  top: string; // Position from top
  left: string; // Position from left
  label: string; // Tooltip text
  onClick: () => void; // Click event handler
}

// Define the keyframes for the dancing animation
const dancingAnimation = keyframes`
  0%, 100% { transform: translateY(-8%); }
  50% { transform: translateY(8%); }
`;

// The MapTriangle component
const MapTriangle: React.FC<MapTriangleProps> = ({
  top,
  left,
  label,
  onClick,
}) => {
  // Update this clipPath to create the desired hexagonal shape
  const triangleClipPath = `
  polygon(
    50% 30%,       /* Top point */
    58% 30%,       /* Top-right curve start */
    80% 30%,      /* Top-right curve end */
    100% 50%,     /* Right middle point */
    80% 70%,      /* Bottom-right curve end */
    58% 92%,      /* Bottom-right curve start */
    50% 100%,     /* Bottom point */
    42% 92%,      /* Bottom-left curve start */
    20% 70%,      /* Bottom-left curve end */
    0% 50%,       /* Left middle point */
    20% 30%,      /* Top-left curve end */
    42% 30%        /* Top-left curve start */
  )
`;

  return (
    <Box
      position="absolute"
      top={top}
      left={left}
      transform="translate(-50%, -50%)"
    >
      <Tooltip
        label={label}
        hasArrow={false}
        placement="bottom"
        bg="yellow.300"
        color="yellow.600"
        py={3}
        px={5}
        mt="-70px"
        borderRadius="lg"
        boxShadow="none"
        fontSize="lg"
      >
        <Box
          as="button"
          w="50px"
          h="80px" // Adjust height to match the hexagonal aspect ratio
          bg="yellow.300"
          borderRadius="4px" // Adjust this for slight rounding of the corners
          clipPath={triangleClipPath} // Apply the hexagonal clip path
          animation={`${dancingAnimation} 3s ease-in-out infinite`}
          _hover={{
            animationPlayState: "paused",
          }}
          onClick={onClick}
        />
      </Tooltip>
    </Box>
  );
};

export default MapTriangle;
