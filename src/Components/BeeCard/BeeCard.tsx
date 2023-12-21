import {
  Box,
  VStack,
  Text,
  Image,
  HStack,
  Spacer,
  Flex,
} from "@chakra-ui/react";
import ImagePlaceHolder from "Components/ImagePlaceHolder";
import { motion } from "framer-motion";
import React, { useState } from "react";

// Define a type for the props that StatRow accepts
type StatRowProps = {
  iconSrc: string;
  label: string;
  value: number | string; // Assuming value can be a number or string
};

const StatRow = ({ iconSrc, label, value }: StatRowProps) => {
  return (
    <Flex justify="space-between" alignItems="center" mb={4}>
      <HStack spacing={9}>
        <Image src={iconSrc} boxSize="3rem" />
        <Text color="white" fontSize="3rem">
          {label}
        </Text>
      </HStack>
      <Text color="white" fontSize="3rem" textAlign="right" minWidth="4rem">
        {value}
      </Text>
    </Flex>
  );
};

type BeeCardProps = {
  imagePath?: string;
  beeName?: string;
  beeType?: string;
  beeEnvironment?: string;
  descriptionText?: string;
  attackValue?: number;
  defenseValue?: number;
  forageValue?: number;
};

export default function BeeCard({
  imagePath = "/path/to/default/image.png",
  beeName = "Bee #2345",
  beeType,
  beeEnvironment,
  descriptionText,
  attackValue = 300,
  defenseValue = 300,
  forageValue = 300,
}: BeeCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Box
        borderRadius="15px"
        overflow="hidden"
        p="3rem 4rem 4rem 4rem"
        bgGradient="radial(at top right, #F4CA66, #967124)"
        boxShadow={isPressed ? "none" : "0px 10px 15px rgba(0, 0, 0, 0.1)"}
        border="1px solid"
        borderColor="whiteAlpha.300"
        transition="transform 0.2s, box-shadow 0.2s"
        transform={isHovered ? "scale(1.01)" : "scale(1.0)"}
        onClick={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseDown={() => setIsPressed(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseEnter={() => setIsHovered(true)}
        cursor="pointer"
      >
        <Flex direction="column" align="stretch" mt="30">
          <Box p="0rem 0rem 3rem 0rem">
            {imagePath ? (
              <Image
                src={imagePath}
                boxSize="100%"
                borderRadius="1rem"
                objectFit="cover"
                style={{ boxShadow: "0px 4px 9px rgba(0, 0, 0, 0.5)" }}
              />
            ) : (
              <ImagePlaceHolder></ImagePlaceHolder>
            )}
          </Box>
          <Text
            fontWeight="bold"
            color="white"
            fontSize="3rem"
            textAlign="center"
            whiteSpace="nowrap" // Prevent text from wrapping
            overflow="hidden" // Hide overflow
            textOverflow="ellipsis" // Show ellipsis for overflowed text
            maxH="5rem" // Set a max-height to control the text height
          >
            {beeName}
          </Text>
          <Flex
            justifyContent="space-between" // Align one to the left and one to the right
            alignItems="center" // Vertically center-align both elements
            mt="1rem" // Adjust the margin-top as needed
            mb="1rem" // Adjust the margin-bottom as needed
          >
            {beeType && (
              <Text
                color="white"
                fontSize="2.2rem"
                textAlign="left" // Left-justify beeType
              >
                {beeType}
              </Text>
            )}
            {beeEnvironment && (
              <Text
                color="white"
                fontSize="2.2rem"
                textAlign="right" // Right-justify beeEnvironment
              >
                {beeEnvironment}
              </Text>
            )}
          </Flex>

          {descriptionText && (
            <Text
              color="white"
              fontSize="1.5rem"
              textAlign="justify" // Use "justify" for text justification
              mt="1.5rem"
              mb="2rem"
              lineHeight="1.4" // Adjust line height as needed for spacing
            >
              {descriptionText}
            </Text>
          )}
          <Box width="100%">
            <StatRow
              iconSrc="/icons/stats/attack.svg"
              label="Attack"
              value={attackValue}
            />
            <StatRow
              iconSrc="/icons/stats/defense.svg"
              label="Defense"
              value={defenseValue}
            />
            <StatRow
              iconSrc="/icons/stats/forage.svg"
              label="Forage"
              value={forageValue}
            />
            {/* Add more StatRow components as needed */}
          </Box>
        </Flex>
      </Box>
    </motion.div>
  );
}
