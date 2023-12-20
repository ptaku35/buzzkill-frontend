import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import MapTriangle from "Components/MapTriangle/MapTriangle";
import { Box } from "@chakra-ui/react";
import GameLayout from "Components/GameLayout/GameLayout";
import useMeasureHeight from "../../../../hooks/useMeasureHeight";
import { useLoading } from "../../../../contexts/LoadingContext";
import MapNavigation from "Components/NavigationMap/NavigationMap";

export default function EmberglowCaldera() {
  const router = useRouter();
  const { ref, headerHeight } = useMeasureHeight();

  const { isLoading } = useLoading();

  const handleClick = (hiveName: string) => {
    switch (hiveName) {
      case "Ash Hive":
        router.push(`/play/zones/emberglow-caldera/ash-hive`);
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
              <source
                src="/animations/emberglow-caldera.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
            <MapNavigation
              top="12%"
              left={{ base: "60%", md: "72%" }}
              href="/play"
              imageSrc="/small-map.svg"
              navigationLabel="Back to Map"
            />
            {/* Overlay triangles */}
            <MapTriangle
              top="26%"
              left="60%"
              label="Ash Hive"
              onClick={() => handleClick("Ash Hive")}
            />

            <MapTriangle
              top="40%"
              left="72%"
              label="Emberglow Caldera"
              onClick={() => handleClick("Emberglow Caldera")}
            />
          </Box>
        </>
      )}
    </GameLayout>
  );
}
