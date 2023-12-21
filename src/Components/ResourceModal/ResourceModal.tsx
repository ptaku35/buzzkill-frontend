import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  HStack,
  Text,
} from "@chakra-ui/react";

interface ResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  contentText: string;
  children: React.ReactNode;
}

const ResourceModal: React.FC<ResourceModalProps> = ({
  isOpen,
  onClose,
  title,
  contentText,
  children,
}) => {
  const handleClick = () => {
    <Text>I'm Foraging!!!</Text>;
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        borderRadius="2rem"
        minW="40rem"
        minH="40rem" // minimum height
        padding="20px" // padding inside the modal
        overflowY="auto" // enable vertical scrolling if
        margin="auto"
        transform="translate(-50%, -50%)"
        top="40%"
        left="40%"
        position="absolute"
        bg="brand.60"
      >
        ``
        <ModalHeader fontSize="4rem" textColor="white">{title}</ModalHeader>
        <ModalCloseButton
          color="white" // Set your desired color
          position="absolute"
          right="2.2rem" // Adjust these values as needed
          top="2.2rem"
          fontSize="lg" // Adjust font size if needed
        />
        <Text fontSize="4rem" color="white">{contentText}</Text>
        <ModalBody>{children}</ModalBody>
        <HStack spacing={4} justifyContent="center">
          <Button textAlign="center" onClick={onClose}>
            Later
          </Button>
          <Button textAlign="center" onClick={() => handleClick()}>
            Forage
          </Button>
        </HStack>
      </ModalContent>
    </Modal>
  );
};

export default ResourceModal;
