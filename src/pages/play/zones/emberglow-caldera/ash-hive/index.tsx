import Layout from "Components/Layout/Layout";
import React, { CSSProperties, useState, useEffect } from "react";
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
import SemiTransparentBackground from "../../../../../Components/SemiTransparentBackground";
import MapNavigation from "Components/NavigationMap/NavigationMap";

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

// CONSTANT CONTRACT VARIABLES
const BuzzkillNFTAbi = BuzzkillNFT;
const HiveVaultAbi = HiveVault;
const buzzkillContractAddress = process.env
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
    address: buzzkillContractAddress,
    abi: BuzzkillNFTAbi,
    functionName: "isApprovedForAll",
    args: [address, hiveVaultAddress],
    watch: true,
  });

  // contract BuzzkillNFT Approve All
  const {
    config: configSetApproval,
    error: prepareSetApprovalError,
    isError: isPrepareSetApprovalError,
  } = usePrepareContractWrite({
    address: buzzkillContractAddress,
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
    config: stakingConfig,
    error: prepareStakingError,
    isError: isPrepareStakingError,
  } = usePrepareContractWrite({
    address: hiveVaultAddress,
    abi: HiveVaultAbi,
    functionName: "deposit",
    args: ["5"],
  });
  const {
    write: deposit,
    isLoading: isProcessingStaking,
    isSuccess: isStaked,
    isError: isStakeError,
    error: stakeError,
    data: stakeData,
  } = useContractWrite(stakingConfig);

  // contract Hive Vault Unstaking
  const {
    config: unstakingConfig,
    error: prepareUnstakeError,
    isError: isPrepareUnstakeError,
  } = usePrepareContractWrite({
    address: hiveVaultAddress,
    abi: HiveVaultAbi,
    functionName: "withdraw",
    args: ["5"],
  });
  const {
    write: withdraw,
    isLoading: isProcessingUnstaking,
    isSuccess: isUnstaked,
    isError: isUnstakedError,
    error: unstakeError,
    data: unstakeData,
  } = useContractWrite(unstakingConfig);

   // contract Hive Vault Claim
  const {
    config: claimConfig,
    error: claimError,
    isError: isPrepareClaimError,
  } = usePrepareContractWrite({
    address: hiveVaultAddress,
    abi: HiveVaultAbi,
    functionName: "claim",
    args: [],
  });
  const {
    write: claim,
    isLoading: isProcessingClaim,
    isSuccess: isClaimed,
    isError: isClaimedError,
    error: claimedError,
    data: claimData,
  } = useContractWrite(claimConfig);

  // Listen for approval status
  useEffect(() => {
    if ((approvedStatus as number) > 0) {
      setIsApproved(true);
    } else {
      setIsApproved(false);
    }
  }, [approvedStatus]);

  // Overlay Visual properties
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

  // Stake functionality if approved
  const handleStakeButtonClick = () => {
    if (!isApproved) {
      console.log("approve all state");
      approveAll?.();
    } else {
      console.log("deposit Bee state");
      deposit?.();
    }
  };

  // Unstake functionality
  const handleUnstakeButtonClick = () => {
    withdraw?.();
  }

  // Claim Rewards functionality
  const handleClaimButtonClick = () => {
    claim?.();
  }

  return (
    <Layout>
      <Head>
        <title>Buzzkill Ash Hive</title>
      </Head>
      <Container fullWidth={true}>
        <Box position="relative" width="full" height="15vh" zIndex={3}>
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            backgroundColor="rgba(0, 0, 0, 0.5)"
            zIndex={2} // Lower than the parent Box but higher than the Image
          />
          {/* Main Background Image */}
          <Image
            src="/worlds/fire-volcano.png"
            alt="Hero Image"
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            objectFit="cover"
            objectPosition="center center"
            zIndex={1}
          />
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            display="flex"
            alignItems="center"
            justifyContent="center"
            zIndex={2}
          >
            <Heading
              color="white"
              textAlign="center"
              zIndex={2}
              fontSize="10rem"
              whiteSpace="nowrap"
            >
              Ash Hive
            </Heading>
          </Box>
          {/* Back to Emberglow Caldera */}
          <MapNavigation
            top="50%"
            left={{ base: "40%", md: "60%" }}
            href="/play/zones/emberglow-caldera"
            imageSrc="/NavigationIcons/emberglow-map-small.svg"
            navigationLabel="Emberglow Caldera"
          />
          {/* Back to Main Map */}
          <MapNavigation
            top="50%"
            left={{ base: "60%", md: "70%" }}
            href="/play"
            imageSrc="/NavigationIcons/small-map.svg"
            navigationLabel="Main Map"
          />
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
          {/* Staking/Unstaking Buttons */}
          <Container>
            <HStack justify="center" spacing="10rem">
              <Box
                padding="4rem 2rem 2rem 2rem" // padding inside the content container
                alignSelf="center"
              >
                {/* Stake Your Bee Button */}
                <Button
                  alignSelf="center"
                  onClick={handleStakeButtonClick}
                  isDisabled={!isConnected || isProcessingApproval || isProcessingStaking || isProcessingUnstaking || isProcessingClaim}
                >
                  {" "}
                  {isApproved ? "Stake your Bee" : "Approve your Bee"}
                </Button>
              </Box>
              <Box
                padding="4rem 2rem 2rem 2rem" // padding inside the content container
                alignSelf="center"
              >
                {/* Claim Rewards Button */}
                <Button
                  alignSelf="center"
                  onClick={handleClaimButtonClick}
                  isDisabled={!isConnected || isProcessingStaking || isProcessingUnstaking || !isApproved || isProcessingClaim}
                >
                  CLAIM REWARDS
                </Button>
              </Box>
              <Box
                padding="4rem 2rem 2rem 2rem" // padding inside the content container
                alignSelf="center"
              >
                {/* Unstake Your Bee Button */}
                <Button
                  alignSelf="center"
                  onClick={handleUnstakeButtonClick}
                  isDisabled={!isConnected || isProcessingStaking || isProcessingUnstaking || !isApproved || isProcessingClaim}
                >
                  UNSTAKE YOUR BEE
                </Button>
              </Box>
            </HStack>
            {/* Display TomoScan TX Link */}
            {stakeData && (
              <Box>
                <a
                  href={`https://testnet.tomoscan.io/tx/${stakeData?.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "yellow", fontSize: "30px" }}
                >
                  View on TomoScan Testnet
                </a>
              </Box>
            )}
            {claimData && (
              <Box>
                <a
                  href={`https://testnet.tomoscan.io/tx/${claimData?.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "yellow", fontSize: "30px" }}
                >
                  View on TomoScan Testnet
                </a>
              </Box>
            )}
            {unstakeData && (
              <Box>
                <a
                  href={`https://testnet.tomoscan.io/tx/${unstakeData?.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "yellow", fontSize: "30px" }}
                >
                  View on TomoScan Testnet
                </a>
              </Box>
            )}
          </Container>

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
          <Button colorScheme="purple" size="md" w="full">
            Show More
          </Button>
        </VStack>
      </Container>
    </Layout>
  );
}
