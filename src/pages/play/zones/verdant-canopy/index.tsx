import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import MapTriangle from "Components/MapTriangle/MapTriangle";
import { Box, Heading } from "@chakra-ui/react";
import GameLayout from "Components/Layout/GameLayout/GameLayout";
import useMeasureHeight from "../../../../hooks/useMeasureHeight";
import { useLoading } from "../../../../contexts/LoadingContext";
import MapNavigation from "Components/NavigationMap/NavigationMap";
import SemiTransparentBackground from "Components/SemiTransparentBackground";

export default function FrostwingGlacier() {
  const router = useRouter();
  const { ref, headerHeight } = useMeasureHeight();

  const { isLoading } = useLoading();

  const handleClick = (hiveName: string) => {
    switch (hiveName) {
      case "Emerald Hive":
        router.push(`/play/zones/verdant-canopy/emerald-hive`);
        break;
      case "Mossclad Hive":
        router.push(`/play/zones/verdant-canopy/mossclad-hive`);
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
            <title>Buzzkill Verdant Canopy</title>
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
              <source src="/Animations/forest.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <Box
              position="absolute"
              top="6%"
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
                  Verdant Canopy{" "}
                </Heading>
              </SemiTransparentBackground>
            </Box>
            <MapNavigation
              top="12%"
              left={{ base: "60%", md: "72%" }}
              href="/play"
              imageSrc="/NavigationIcons/small-map.svg"
              navigationLabel="Back to Map"
            />
            {/* Overlay triangles */}
            <MapTriangle
              top="50%"
              left="25%"
              label="Emerald Hive"
              onClick={() => handleClick("Emerald Hive")}
              bgColor="#BC8E2D"
              textColor="white"
            />

            <MapTriangle
              top="45%"
              left="74%"
              label="Mossclad Hive"
              onClick={() => handleClick("Mossclad Hive")}
              bgColor="#BC8E2D"
              textColor="white"
            />
          </Box>
        </>
      )}
    </GameLayout>
  );
}
