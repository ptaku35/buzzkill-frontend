import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import MapTriangle from "Components/MapTriangle/MapTriangle";
import { Box, Heading, Icon, Text } from "@chakra-ui/react";
import GameLayout from "Components/Layout/GameLayout/GameLayout";
import useMeasureHeight from "../../hooks/useMeasureHeight";
import { useLoading } from "../../contexts/LoadingContext";
import SemiTransparentBackground from "Components/SemiTransparentBackground/SemiTransparentBackground";
import { SlArrowDown } from "react-icons/sl"; // Assuming you use CloseIcon for the hide action
import HideButton from "Components/HideButton/HideButton";

export default function Play() {
  const router = useRouter();
  const { ref, headerHeight } = useMeasureHeight();

  const { isLoading } = useLoading();

  const [isTextVisible, setIsTextVisible] = useState(true);

  const toggleTextVisibility = () => {
    setIsTextVisible(!isTextVisible);
  };

  const handleClick = (hiveName: string) => {
    switch (hiveName) {
      case "Emberglow Caldera":
        router.push(`/play/zones/emberglow-caldera`);
        break;
      case "Sunlit Sands":
        router.push(`/play/zones/sunlit-sands`);
        break;
      case "Verdant Canopy":
        router.push(`/play/zones/verdant-canopy`);
        break;
      case "Azure Marina":
        router.push(`/play/zones/azure-marina`);
        break;
      case "Frostwing Glacier":
        router.push(`/play/zones/frostwing-glacier`);
        break;
      default:
        console.log("Triangle clicked!");
        break;
    }
  };

  return (
    <GameLayout>
      {(headerHeight: number) => (
        <>
          <Head>
            <title>Buzzkill Play Game</title>
          </Head>
          <Box
            cursor={isLoading ? "none" : "auto"}
            w="full" // Full width relative to the parent element
            h={`calc(100vh - ${headerHeight}px)`}
            position="relative"
            sx={{ boxSizing: "border-box" }} // Ensures padding and borders are included in the width/height
          >
            {/* Main Image */}
            <video
              autoPlay
              loop
              muted
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                position: "absolute", // Position it absolutely to cover the whole container
                top: 0,
                left: 0,
              }}
            >
              <source src="/Animations/map-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <Box
              position="absolute"
              top="5%"
              left="50%"
              transform="translateX(-50%)"
              width="100%"
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              {" "}
              {/* Adjust the width as needed */}
              <SemiTransparentBackground>
                <Heading color="white" padding="2rem 10rem 2rem 10rem">
                  {" "}
                  World Map
                </Heading>
              </SemiTransparentBackground>
            </Box>
            <Box
              position="absolute"
              top="5%"
              left="19%"
              transform="translateX(-50%)"
              width="100%"
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <SemiTransparentBackground opacity={0.4}>
                <Box position="relative" padding="0rem 1rem 0rem 1rem">
                  <HideButton
                    onClick={toggleTextVisibility}
                    isRotated={!isTextVisible}
                  />
                  <Heading color="white" padding="2rem 20rem 2rem 20rem">
                    How To Play
                  </Heading>
                  {isTextVisible && (
                    <Text
                      fontSize="2rem"
                      color="white"
                      padding="2rem 5rem 2rem 5rem"
                      textAlign="left"
                    >
                      1. Explore the world to find your ideal environment
                      <br />
                      2. Stake your bees and join the Tribe
                      <br />
                      3. Collect resources to develop your hive
                      <br />
                      4. Raid other hives to steal precious honey
                      <br />
                    </Text>
                  )}
                </Box>
              </SemiTransparentBackground>
            </Box>
            {/* Overlay triangles */}
            <MapTriangle
              top="90%"
              left="75%"
              label="Sunlit Sands"
              onClick={() => handleClick("Sunlit Sands")}
            />

            <MapTriangle
              top="12%"
              left="82%"
              label="Emberglow Caldera"
              onClick={() => handleClick("Emberglow Caldera")}
            />

            <MapTriangle
              top="70%"
              left="30%"
              label="Verdant Canopy"
              onClick={() => handleClick("Verdant Canopy")}
            />

            <MapTriangle
              top="80%"
              left="10%"
              label="Azure Marina"
              onClick={() => handleClick("Azure Marina")}
            />

            <MapTriangle
              top="35%"
              left="67%"
              label="Frostwing Glacier"
              onClick={() => handleClick("Frostwing Glacier")}
            />
          </Box>
          {/* Loading Spinner */}
        </>
      )}
    </GameLayout>
  );
}
