import Layout from "Components/Layout/Layout";
import React, { CSSProperties, useState } from "react";
import Head from "next/head";
import Container from "Components/Container/Container";
import {
  Box,
  Flex,
  Image,
  Heading,
  Link,
  ImageProps,
  Button,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import SemiTransparentBackground from "../../../../../Components/SemiTransparentBackground"; // Import your custom component
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  useWalletClient,
} from "wagmi";

import BuzzkillNFT from "../../../../../assets/BuzzkillNFT.json";
import HiveVault from "../../../../../assets/HiveVault.json";
const BuzzkillNFTAbi = BuzzkillNFT;
const HiveVaultAbi = HiveVault;

const buzkillContractAddress = process.env
  .NEXT_PUBLIC_BUZZKILL_NFT_CONTRACT as `0x${string}`;

const hiveVaultAddress = process.env
  .NEXT_PUBLIC_HIVE_VAULT_CONTRACT as `0x${string}`;

export default function AshHive() {
  const [isApproved, setIsApproved] = useState(false);

  const { address, isConnected } = useAccount();
  // SETUP CONTRACT READ/WRITE
  // Buzzkill Approval contract read/writes
  // read Approval Status
  const { data: approvedStatus } = useContractRead({
    address: buzkillContractAddress,
    abi: BuzzkillNFTAbi,
    functionName: "isApprovedForAll",
    args: [address, hiveVaultAddress],
    watch: true,
  });

  // Setup Write contract for Approve All
  const {
    config: configSetApproval,
    error: prepareSetApprovalError,
    isError: isPrepareSetApprovalError,
  } = usePrepareContractWrite({
    address: buzkillContractAddress,
    abi: BuzzkillNFTAbi,
    functionName: "setApprovalForAll",
    args: [hiveVaultAddress, true],
  });

  const {
    write: approveAll,
    isLoading: isProcessingApproval,
    isSuccess: isApprovedAll,
    isError: isApproveError,
    error: approveError,
    data: approveData,
  } = useContractWrite(configSetApproval);

  // contract Hive Vault Staking
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: hiveVaultAddress,
    abi: HiveVaultAbi,
    functionName: "deposit",
    args: ["2"],
  });

  const {
    write: deposit,
    isLoading: isProcessStaking,
    isSuccess: isStaked,
    isError: isStakeError,
    error: stakeError,
    data: stakeData,
  } = useContractWrite(config);

  React.useEffect(() => {
    if ((approvedStatus as number) > 0) {
      setIsApproved(true);
    } else {
      setIsApproved(false);
    }
  }, [approvedStatus]);

  // VISUAL VARIABLES
  const semiTransparentBackgroundStyles: CSSProperties = {
    position: "absolute",
    top: "50%", // Adjust this value to position the background vertically
    left: "50%", // Adjust this value to center the background horizontally
    transform: "translate(-50%, -50%)", // Center both horizontally and vertically
    width: "fit-content", // Adjust the width as needed
    height: "fit-content", // Adjust the height as needed
    backgroundColor: "brand.50", // Directly use the color token from the theme
    opacity: 1, // Adjust the opacity as needed
    zIndex: 2, // Make sure this is above the main image
  };

  const overlayImageStyles: ImageProps = {
    position: "absolute",
    top: "-145%",
    left: "65%",
    width: "50%", // Adjust the width to make the overlay image smaller
    height: "auto", // Maintain aspect ratio
    objectFit: "cover" as ImageProps["objectFit"], // Explicitly specify the type
    transform: "scale(0.2)", // Initial scale
    zIndex: 2, // Set the z-index to 2 for the overlay image to place it on top
    transition: "transform 0.3s ease-in-out", // Add a transition effect for the hover effect
  };

  const overlayImageHoverStyles = {
    transform: "scale(0.21)", // Scale up on hover (adjust as needed, e.g., 0.25 for a smaller effect)
  };

  const overlayImageHiveHoverStyles = {
    transform: "scale(0.21)", // Scale up on hover (adjust as needed, e.g., 0.25 for a smaller effect)
  };

  const overlayImageHiveStyles: ImageProps = {
    position: "absolute",
    top: "-145%",
    left: "50%",
    width: "50%", // Adjust the width to make the overlay image smaller
    height: "fit-content", // Adjust the height as needed
    objectFit: "cover" as ImageProps["objectFit"], // Explicitly specify the type
    transform: "scale(0.2)", // Initial scale
    zIndex: 2, // Set the z-index to 2 for the overlay image to place it on top
    transition: "transform 0.3s ease-in-out", // Add a transition effect for the hover effect
  };

  const handleStakeButtonClick = () => {
    if (!isApproved) {
      console.log("approva all state");
      approveAll?.();
    } else {
      console.log("deposit Bee state");
      deposit?.();
      
    }
  };

  return (
    <Layout>
      <Head>
        <title>Buzzkill Ash Hive</title>
      </Head>
      <Container fullWidth={true}>
        <Box position="relative" width="full" height="15vh" overflow="hidden">
          {/* Main Image */}
          <Image
            src="/fire-volcano.png"
            alt="Hero Image"
            borderRadius="0px"
            width="full"
            height="100%"
            objectFit="cover"
            objectPosition="center center"
            zIndex={0} // Set the z-index lower than SemiTransparentBackground
          />

          <SemiTransparentBackground style={semiTransparentBackgroundStyles}>
            {/* Use a Box or div with display flex to center the content inside SemiTransparentBackground */}
            <Box
              display="flex"
              alignItems="center" // This will vertically center the content
              justifyContent="center" // This will horizontally center the content
              height="100%" // Take the full height of the parent container
            >
              <Heading
                color="white" // Adjust the text color as needed
                textAlign="center" // Center the text
                zIndex={3} // Set the z-index higher than the image and SemiTransparentBackground
              >
                Ash Hive
              </Heading>
            </Box>
          </SemiTransparentBackground>
          {/* Overlay triangles */}

          {/* Wrap the overlay image with a Link */}
          <Link href="/play/hives/emberglow-caldera-hive">
            <Image
              src="/emberglow-map.svg"
              alt="Overlay Image"
              _hover={overlayImageHiveHoverStyles}
              {...overlayImageHiveStyles}
            />
          </Link>

          {/* Wrap the overlay image with a Link */}
          <Link href="/play">
            <Image
              src="/small-map-distorted.svg"
              alt="Overlay Image"
              _hover={overlayImageHoverStyles}
              {...overlayImageStyles}
            />
          </Link>
        </Box>
      </Container>

      {/* HIVE CAPACITY */}
      <Container>
        {/* Stack the components vertically */}
        <VStack
          spacing={4} // space between children
          align="stretch" // stretch children to fill the width
          borderRadius="md"
          padding="10rem 20em 0rem 20rem"
        >
          <Heading textColor="white" padding="0rem 5rem 3rem 5rem">
            Hive Capacity
          </Heading>
          {/* Horizontal Stack for Honey Monarch and Worker Bee Capacities */}
          <HStack justify="space-between" spacing="5rem">
            {/* Honey Monarch Capacity */}
            <Box
              padding="2rem 2rem 2rem 2rem"
              bg="brand.60"
              borderRadius="15px"
              flex="1"
            >
              <Text
                fontWeight="bold"
                fontSize="4rem"
                padding="2rem 2rem 2rem 2rem" // padding inside the content container
              >
                Honey Monarch Capacity
              </Text>
              <Text
                fontWeight="bold"
                fontSize="4rem"
                padding="2rem 2rem 2rem 2rem" // padding inside the content container
              >
                2/3
              </Text>
            </Box>

            {/* Worker Bee Capacity */}
            <Box
              padding="2rem 2rem 2rem 2rem" // padding inside the content container
              bg="brand.60"
              borderRadius="15px"
              flex="1"
            >
              <Text
                fontWeight="bold"
                fontSize="4rem"
                padding="2rem 2rem 2rem 2rem" // padding inside the content container
              >
                Worker Bee Capacity
              </Text>
              <Text
                fontWeight="bold"
                fontSize="4rem"
                padding="2rem 2rem 2rem 2rem" // padding inside the content container
              >
                30/55
              </Text>
            </Box>
          </HStack>
          <Box
            padding="4rem 2rem 2rem 2rem" // padding inside the content container
            alignSelf="center"
          >
            {/* Stake Your Bee Button */}
            <Button alignSelf="center" onClick={handleStakeButtonClick}>
              {" "}
              {isApproved ? "Stake your Bee" : "Approve your Bee"}
            </Button>
          </Box>
        </VStack>
      </Container>

      {/* QUEEN BEES STAKED */}
      <Container>
        {/* Stack the components vertically */}
        <VStack
          spacing={8} // space between children
          align="stretch" // stretch children to fill the width
          borderRadius="md"
          p={4}
        >
          <Heading textColor="white">Queen Bees Staked</Heading>
          {/* Horizontal Stack for Honey Monarch and Worker Bee Capacities */}
          <HStack justify="space-between">
            {/* Honey Monarch Capacity */}
            <Box p={4} bg="brand.60" borderRadius="15px" flex="1">
              <Image
                src="/Queens/Q5.png"
                alt="Worker-warrior"
                borderRadius="15px"
              ></Image>
              <Text fontSize="xl" fontWeight="semibold">
                Honey Monarch #23
              </Text>
            </Box>

            {/* Worker Bee Capacity */}
            <Box p={4} bg="brand.60" borderRadius="15px" flex="1">
              <Image
                src="/Queens/Q2.png"
                alt="Worker-warrior"
                borderRadius="15px"
              ></Image>
              <Text fontSize="xl" fontWeight="semibold">
                Honey Monarch #228
              </Text>
            </Box>
          </HStack>
        </VStack>
      </Container>

      {/* HIVE MEMBERS */}
      <Container>
        {/* Stack the components vertically */}
        <VStack
          spacing={4} // space between children
          align="stretch" // stretch children to fill the width
          borderRadius="md"
          p={4}
        >
          <Heading textColor="white">Worker Bees Staked</Heading>
          {/* Horizontal Stack for Honey Monarch and Worker Bee Capacities */}
          <HStack justify="space-between">
            {/* Honey Monarch Capacity */}
            <Box p={4} bg="brand.60" borderRadius="15px" flex="1">
              <Image
                src="/Queens/22WD.png"
                alt="Worker-warrior"
                borderRadius="15px"
              ></Image>
              <Text fontSize="xl" fontWeight="semibold">
                Worker Bee #4423
              </Text>
            </Box>

            {/* Worker Bee Capacity */}
            <Box p={4} bg="brand.60" borderRadius="15px" flex="1">
              <Image
                src="/Queens/14WL.png"
                alt="Worker-warrior"
                borderRadius="15px"
              ></Image>
              <Text fontSize="xl" fontWeight="semibold">
                Worker Bee #223
              </Text>
            </Box>
            <Box p={4} bg="brand.60" borderRadius="15px" flex="1">
              <Image
                src="/Queens/18WD.png"
                alt="Worker-warrior"
                borderRadius="15px"
              ></Image>
              <Text fontSize="xl" fontWeight="semibold">
                Worker Bee #413
              </Text>
            </Box>
            <Box p={4} bg="brand.60" borderRadius="15px" flex="1">
              <Image
                src="/Queens/19WD.png"
                alt="Worker-warrior"
                borderRadius="15px"
              ></Image>
              <Text fontSize="xl" fontWeight="semibold">
                Worker Bee #113
              </Text>
            </Box>
          </HStack>
          {/* Stake Your Bee Button */}
          <Button colorScheme="purple" size="md" w="full">
            Show More
          </Button>
        </VStack>
      </Container>
    </Layout>
  );
}
