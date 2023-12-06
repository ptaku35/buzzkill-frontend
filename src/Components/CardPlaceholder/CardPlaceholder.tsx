import { Box, VStack, Text } from "@chakra-ui/react";
import React from "react";

export default function CardPlaceholder() {
  return (
    <Box
      w="370px"
      h="555px"
      borderRadius="15px"
      overflow="hidden"
      p="6"
      bgGradient="radial(at top right, #0A0B0E, #1C3B65)"
      boxShadow="0px 10px 15px rgba(0, 0, 0, 0.1)"
      border="1px solid"
      borderColor="whiteAlpha.300"
    >
      <VStack align="center" mt="30">
        <Text fontWeight="bold" color="white" fontSize="xl">
          Unverified Account
        </Text>
      </VStack>
    </Box>
  );
}
