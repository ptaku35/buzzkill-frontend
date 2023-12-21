import Layout from "../../Components/Layout/Layout";
import Head from "next/head";
import {
  Box,
  Flex,
  Heading,
  Image,
  Button,
  VStack,
  useToast,
} from "@chakra-ui/react";
import Container from "Components/Container/Container";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useContractEvent,
} from "wagmi";
import { parseEther } from "viem";
import BuzzkillNFT from "../../../src/assets/BuzzkillNFT.json";
import React, { useState, useRef } from "react";
import { ethers } from "ethers";
import TomoScanLink from "Components/TomoScanLink";



// CONSTANT VARIABLES
const stakingNFTABI = BuzzkillNFT;
const stakingNFTAddress = process.env
  .NEXT_PUBLIC_BUZZKILL_NFT_CONTRACT as `0x${string}`;
const mintCostInWei = parseEther("1");

// Set baseURI for fetching metadata
const baseURI =
  "ipfs://bafybeiayhxazprulpurcaz26y74slp3lfayyeu3n547esianwwpf6ha55e/";
const gatewayUrl = baseURI.replace("ipfs://", "https://ipfs.io/ipfs/");

// Function for fetching NFT images to display after being minted
async function fetchNFTMetadata(ipfsUrl: string) {
  const response = await fetch(ipfsUrl);
  console.log(response);
  return await response.json();
}

export default function Mint() {
  const tokenIdRef = useRef<`${string}` | undefined>();
  const [nftMetadata, setNftMetadata] = useState(null);

  // Get sender's address
  const { address, isConnected } = useAccount();

  // Prepare NFT contract
  const {
    config,
    error: prepareError,
    isError: isPreparError,
  } = usePrepareContractWrite({
    address: stakingNFTAddress,
    abi: stakingNFTABI,
    functionName: "mintTo",
    args: [address],
    value: mintCostInWei,
  });
  // Prepare Minting function
  const {
    write: mintTo,
    isLoading: isProcessMinting,
    isSuccess: isMinted,
    isError: mintError,
    data: mintData,
  } = useContractWrite(config);

  // Listen for events after minting
  const contract = new ethers.Contract(
    stakingNFTAddress,
    stakingNFTABI,
    ethers.getDefaultProvider()
  );
  useContractEvent({
    address: stakingNFTAddress,
    abi: stakingNFTABI,
    eventName: "Transfer",
    listener(log) {
      // Decode the log using the contract interface
      const decodedLog = contract.interface.parseLog(log[0]);
      const { tokenId: newTokenId } = decodedLog.args;
      tokenIdRef.current = newTokenId.toString();
    },
  });

  // Handle Mint button click
  const handleMintbuttonClick = () => {
    mintTo?.();
  };

  // Alert message for successfully minting
  const toast = useToast();
  const showSuccessfulToast = () => {
    toast({
      title: "NFT Minted successfully",
      description: "Your NFT has been minted to your account! Buzz Buzz!",
      status: "success",
      duration: 5000,
      isClosable: true,
      render: () => (
        <Box fontSize={50} color="white" p={50} bg="yellow.500">
          Mint Successful! buzz buzz!
        </Box>
      ),
    });
  };

  const showFailedToast = () => {
    toast({
      title: "NFT Mint Failed",
      description: "Mint Transaction Failed",
      status: "error",
      duration: 5000,
      isClosable: true,
      render: () => (
        <Box fontSize={50} color="white" p={50} bg="red.500">
          Mint Transaction Failed.
        </Box>
      ),
    });
  };

  // When NFT is minted, metadata is loaded so the image can be displayed
  React.useEffect(() => {
    if (isMinted) {
      showSuccessfulToast?.();
      // Load metadata from minted NFT
      const loadMetadata = async () => {
        const ipfsURI = gatewayUrl + tokenIdRef.current?.toString();
        const metadata = await fetchNFTMetadata(ipfsURI);
        console.log(metadata);
        setNftMetadata(metadata);
      };
      loadMetadata();
    } else if (mintError) {
      showFailedToast?.();
    }
  }, [isMinted, mintError]);

  // Update image URL from metadata
  let name, description, image, attributes;
  if (nftMetadata) {
    ({ name, description, image, attributes } = nftMetadata);
    image = image.replace("ipfs://", "https://ipfs.io/ipfs/");
  }

  return (
    <Layout>
      <Head>
        <title>Mint an NFT</title>
      </Head>
      <Container fullWidth={true}>
        <Box position="relative" width="full" height="15vh" overflow="hidden">
          {/* Main Background Image */}
          <Image
            src="/MintPage/header-background.png"
            alt="Hero Image"
            borderRadius="0px"
            width="full"
            height="50vh"
            objectFit="cover"
            objectPosition="center center"
          />
        </Box>
      </Container>

      {/* Minting Function */}
      <Container>
        {/* Stack the components vertically */}
        <VStack
          spacing={4} // space between children
          align="stretch" // stretch children to fill the width
          borderRadius="md"
          padding="10rem 20rem 0rem 20rem"
        >
          <Heading textColor="white" padding="0rem 5rem 3rem 5rem">
            Mint Your NFT's here!
          </Heading>

          {/* Mint Button */}
          <Button
            alignSelf="center"
            onClick={handleMintbuttonClick}
            isLoading={isProcessMinting}
            isDisabled={!isConnected || isProcessMinting}
          >
            Mint NFT
          </Button>
          {isMinted && mintData && (
            <VStack>
              <TomoScanLink txHash={mintData?.hash} />
              <Box style={{ color: "white", fontSize: "20px" }}>
                Your NFT is here!
              </Box>
              <Box>
                {/* Conditional rendering of image */}
                {nftMetadata && (
                  <img
                    src={image}
                    alt="IPFS Image"
                    style={{ width: "600px", height: "600px" }}
                  />
                )}
              </Box>
            </VStack>
          )}
        </VStack>
      </Container>
    </Layout>
  );
}
