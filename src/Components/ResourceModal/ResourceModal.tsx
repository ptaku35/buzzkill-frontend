import React, { useState } from "react";
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
  useToast, // Import useToast
} from "@chakra-ui/react";

interface ResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  resource: string;
  contentText: string;
}

const ResourceModal: React.FC<ResourceModalProps> = ({
  isOpen,
  onClose,
  title,
  resource,
  contentText,
}) => {
  const [foragingText, setForagingText] = useState("");
  const toast = useToast(); // Initialize useToast

  const handleClick = () => {
    setForagingText(`You are already foraging for ${resource}`);
    onClose();

    // Display a toast message
    toast({
      title: "Success",
      description: `Now foraging for  ${resource}`,
      status: "success",
      duration: 3000, // Duration in milliseconds
      isClosable: true,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        borderRadius="2rem"
        minW="40rem"
        minH="40rem"
        padding="20px"
        overflowY="auto"
        margin="auto"
        transform="translate(-50%, -50%)"
        top="40%"
        left="40%"
        position="absolute"
        bg="brand.60"
      >
        <ModalHeader fontSize="4rem" textColor="white">
          {title}
        </ModalHeader>
        <ModalCloseButton
          color="white"
          position="absolute"
          right="2.2rem"
          top="2.2rem"
          fontSize="lg"
        />
        <ModalBody>
          <Text fontSize="2rem" color="white" paddingBottom="2rem">
            {contentText}
          </Text>
          <Text fontSize="2rem" color="white">
            {foragingText}
          </Text>
        </ModalBody>
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
