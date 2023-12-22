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
  WrapItem,
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
import TomoScanLink from "Components/TomoScanLink";
import BeeCard from "Components/BeeCard/BeeCard";

// import data
import { Bee } from "../../../../../types/BeeTraits";

import hiveBeesData from "../../../../../assets/data/hiveBees.json";
import hiveQueenData from "../../../../../assets/data/hiveQueenBees.json";

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

  const [bees, setBees] = useState<Bee[]>([]); // Use the Bee type for the state
  const [queenBees, setQueenBees] = useState(hiveQueenData);

  const [visibleBees, setVisibleBees] = useState<Bee[]>([]); // Store the currently visible bees
  const [showMoreClicked, setShowMoreClicked] = useState(false); // Track if the "Show More" button was clicked
  // State for additional bees
  const [additionalBees, setAdditionalBees] = useState<Bee[]>([]);

  useEffect(() => {
    // Use the imported JSON data
    setBees(hiveBeesData);
  }, []);

  useEffect(() => {
    // Initialize the visible bees with the first 4 bees
    setVisibleBees(bees.slice(0, 4));
  }, [bees]);

  // Handle the "Show More" button click
  const handleShowMoreClick = () => {
    const startIndex = visibleBees.length;
    const endIndex = startIndex + 4; // You can adjust this to load more bees as needed
    const newAdditionalBees = bees.slice(startIndex, endIndex);

    setAdditionalBees(newAdditionalBees);
    setShowMoreClicked(true);
  };

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
    functionName: "stakeBee",
    args: [5, 1],
  });
  const {
    write: stakeBee,
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
    functionName: "unstakeBee",
    args: [5],
  });
  const {
    write: unstakeBee,
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
      console.log("stake Bee state");
      stakeBee?.();
    }
  };

  // Unstake functionality
  const handleUnstakeButtonClick = () => {
    unstakeBee?.();
  };

  // Claim Rewards functionality
  const handleClaimButtonClick = () => {
    claim?.();
  };

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
              fontSize="8rem"
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
          padding="5rem 20em 0rem 20rem"
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
                fontSize="3rem"
                padding="1rem 1rem 1rem 1rem" // padding inside the content container
              >
                Honey Monarch Capacity
              </Text>
              <Text
                fontWeight="bold"
                fontSize="3rem"
                padding="1rem 1rem 1rem 1rem" // padding inside the content container
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
                fontSize="3rem"
                padding="1rem 1rem 1rem 1rem" // padding inside the content container
              >
                Worker Bee Capacity
              </Text>
              <Text
                fontWeight="bold"
                fontSize="3rem"
                padding="1rem 1rem 1rem 1rem" // padding inside the content container
              >
                30/55
              </Text>
            </Box>
          </HStack>

          {/* Staking/Claiming/Unstaking Buttons */}
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
                  isDisabled={
                    !isConnected ||
                    isProcessingApproval ||
                    isProcessingStaking ||
                    isProcessingUnstaking ||
                    isProcessingClaim
                  }
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
                  isDisabled={
                    !isConnected ||
                    isProcessingStaking ||
                    isProcessingUnstaking ||
                    !isApproved ||
                    isProcessingClaim
                  }
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
                  isDisabled={
                    !isConnected ||
                    isProcessingStaking ||
                    isProcessingUnstaking ||
                    !isApproved ||
                    isProcessingClaim
                  }
                >
                  UNSTAKE YOUR BEE
                </Button>
              </Box>
            </HStack>
            {/* Display TomoScan TX Link */}
            {stakeData && <TomoScanLink txHash={stakeData?.hash} />}
            {claimData && <TomoScanLink txHash={claimData?.hash} />}
            {unstakeData && <TomoScanLink txHash={unstakeData?.hash} />}
          </Container>
        </VStack>
      </Container>

      {/* QUEEN BEES STAKED */}
      <Container>
        {/* Stack the components vertically */}
        <VStack
          spacing={4}
          align="stretch"
          borderRadius="md"
          padding="5rem 10rem 5rem 10rem"
        >
          <Heading
            padding="0rem 5rem 3rem 5rem"
            fontSize="4rem"
            textColor="white"
          >
            Queen Bees Staked
          </Heading>

          {/* Render the queen bees in an HStack */}
          <HStack spacing="3rem" justify="center" padding="0rem 20rem 5rem 20rem">
            {queenBees.map((queenBee, index) => (
              <BeeCard
                key={index}
                imagePath={queenBee.imagePath}
                beeName={queenBee.beeName}
                attackValue={queenBee.attackValue}
                defenseValue={queenBee.defenseValue}
                forageValue={queenBee.forageValue}
              />
            ))}
          </HStack>
        </VStack>
      </Container>

      {/* HIVE MEMBERS */}
      <Container>
        <VStack
          spacing={4} // space between children
          align="stretch" // stretch children to fill the width
          borderRadius="md"
          padding="5rem 10rem 5rem 10rem"
        >
          <Heading
            padding="5rem 10rem 8rem 10rem"
            fontSize="6rem"
            textColor="white"
          >
            Worker Bees Staked
          </Heading>

          {/* Render the visible bees in an HStack */}
          <HStack spacing="3rem" justify="center" padding="0rem 0rem 5rem 0rem">
            {visibleBees.map((bee, index) => (
              <BeeCard
                key={index}
                imagePath={bee.imagePath}
                beeName={bee.beeName}
                attackValue={bee.attackValue}
                defenseValue={bee.defenseValue}
                forageValue={bee.forageValue}
              />
            ))}
          </HStack>

          {/* Render additional bees in a separate HStack */}
          {additionalBees.length > 0 && (
            <HStack spacing="3rem" justify="center">
              {additionalBees.map((bee, index) => (
                <WrapItem key={index}>
                  <BeeCard
                    imagePath={bee.imagePath}
                    beeName={bee.beeName}
                    attackValue={bee.attackValue}
                    defenseValue={bee.defenseValue}
                    forageValue={bee.forageValue}
                  />
                </WrapItem>
              ))}
            </HStack>
          )}

          {/* Show More Your Bee Button */}
          {!showMoreClicked && (
            <Flex padding="3rem 10rem 8rem 5rem" justify="center">
              <Button
                colorScheme="purple"
                size="md"
                w="50%"
                onClick={handleShowMoreClick} // Handle the click event
              >
                Show More
              </Button>
            </Flex>
          )}
        </VStack>
      </Container>
    </Layout>
  );
}
