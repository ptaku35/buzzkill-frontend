import { Icon } from "@chakra-ui/react";
import React from "react";
import { SlArrowUp } from "react-icons/sl";

// Define a type for your component's props
interface HideButtonProps {
  onClick: () => void; // Assuming onClick is a function that takes no arguments and returns nothing
  isRotated: boolean; // isRotated is a boolean
}

// Use the defined type for your component's props
export default function HideButton({ onClick, isRotated }: HideButtonProps) {
  return (
    <Icon
      as={SlArrowUp}
      position="absolute"
      top="3rem"
      right="4rem"
      color="white"
      cursor="pointer"
      boxSize="2rem"
      transform={isRotated ? "rotate(180deg)" : "rotate(0deg)"}
      transition="transform 0.3s"
      onClick={onClick}
      _hover={{ opacity: 0.8 }}
      _active={{ opacity: 0.6 }}
    />
  );
}
