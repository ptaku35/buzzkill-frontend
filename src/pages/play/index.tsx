import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import MapTriangle from "Components/MapTriangle/MapTriangle";
import { Box } from "@chakra-ui/react";
import GameLayout from "Components/GameLayout/GameLayout";
import useMeasureHeight from "../../hooks/useMeasureHeight";
import { useLoading } from "../../contexts/LoadingContext";

export default function Play() {
  const router = useRouter();
  const { ref, headerHeight } = useMeasureHeight();

  const { isLoading } = useLoading();

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
              <source src="/animations/map-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

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
