import { Box, VStack, Text } from "@chakra-ui/react";
import React from "react";

export default function ImagePlaceHolder() {
  return (
    <Box
      w="200px" // Set the width to your desired value
      h="300px" // Set the height to your desired value
      borderRadius="15px"
      overflow="hidden"
      p="6"
      bg="rgba(10, 11, 14, 0.2)"
      boxShadow="0px 10px 15px rgba(0, 0, 0, 0.2)"
      border="1px solid"
      borderColor="whiteAlpha.300"
    >
      <VStack align="center" mt="30">
        <Text fontWeight="bold" color="white" fontSize="xl"></Text>
      </VStack>
    </Box>
  );
}
