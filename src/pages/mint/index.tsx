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
  useContractRead
} from "wagmi";
import { parseEther } from "viem";
import BuzzkillNFT from "../../../src/assets/BuzzkillNFT.json";
import React, { useState, useRef, useEffect } from "react";
import TomoScanLink from "Components/TomoScanLink";
import BeeCard from "Components/BeeCard/BeeCard";


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
  return await response.json();
}

export default function Mint() {
  const [nftMetadata, setNftMetadata] = useState(null);
  const [totalMinted, setTotalMinted] = useState(0);

  // Get sender's address
  const { address, isConnected } = useAccount();

  // Prepare Minting function
  const {
    config: mintToConfig,
    error: prepareError,
    isError: isPreparError
  } = usePrepareContractWrite({
    address: stakingNFTAddress,
    abi: stakingNFTABI,
    functionName: "mintTo",
    args: [address],
    value: mintCostInWei,
  });
  const {
    write: mintTo,
    isLoading: isProcessMinting,
    isSuccess: isMinted,
    isError: mintError,
    data: mintData,
  } = useContractWrite(mintToConfig);

  // Prepare totalSupply function
  const {
    data: totalSupplyData,
    isError: isTotalSupplyError,
    isLoading: IsSupplyLoading
  } = useContractRead({
    address: stakingNFTAddress,
    abi: stakingNFTABI,
    functionName: "totalSupply",
    watch: true,
  })

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
        <Box fontSize={50} color="white" p={5} bg="yellow.500">
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
  useEffect(() => {
    if (isMinted) {
      showSuccessfulToast?.();
    } else if (mintError) {
      showFailedToast?.();
    }
  }, [isMinted, mintError]);


  // Update totalMinted state when totalSupplyData changes
  useEffect(() => {
    if (totalSupplyData && !isTotalSupplyError) {
      setTotalMinted(parseInt(totalSupplyData.toString()));
      
      // Load metadata from minted NFT
      const loadMetadata = async () => {
        const tokenId = totalMinted + 1
        const ipfsURI = gatewayUrl + tokenId;
        const metadata = await fetchNFTMetadata(ipfsURI);
        setNftMetadata(metadata);
      };
      loadMetadata();
    }
  }, [totalSupplyData, isTotalSupplyError]);

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
          <Heading
              color="yellow.400"
              p="4"
              bg="blackAlpha.600"
              borderRadius="lg"
              borderWidth="1px"
              borderColor="yellow.400"
              boxShadow="lg"
              textAlign="center"
              fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
              fontWeight="bold"
              fontFamily="'Bangers', cursive;"
              display="inline-flex" // Use inline-flex to make the box fit the content
              alignItems="center" // Centers the items vertically
              justifyContent="center" // Centers the items horizontally
              mx="auto" // Adds automatic margins on the left and right to center the box in its parent
              my={4} // Optional: Adds margin to the top and bottom for spacing
              maxWidth="fit-content" //
          >
            Total NFTs Minted: {totalMinted}
          </Heading>
        {/* Stack the components vertically */}
        <VStack
          spacing={10} // space between children
          align="stretch" // stretch children to fill the width
          borderRadius="md"
          padding="10rem 20rem 0rem 20rem"
        >
          <Box textColor="white" padding="0rem 5rem 3rem 5rem" fontSize={40}>
            Mint Your NFT's here!
          </Box>
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
              <Box boxSize="40%">
                {/* Conditional rendering of image */}
                {nftMetadata && (
                  <BeeCard
                    imagePath={image}
                    
                  >
                  </BeeCard>
                )}
              </Box>
            </VStack>
          )}
        </VStack>
      </Container>
    </Layout>
  );
}
