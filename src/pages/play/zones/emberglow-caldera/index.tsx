import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import MapTriangle from "Components/MapTriangle/MapTriangle";
import { Box, Button, Heading } from "@chakra-ui/react";
import GameLayout from "Components/Layout/GameLayout/GameLayout";
import useMeasureHeight from "../../../../hooks/useMeasureHeight";
import { useLoading } from "../../../../contexts/LoadingContext";
import MapNavigation from "Components/NavigationMap/NavigationMap";
import SemiTransparentBackground from "Components/SemiTransparentBackground";
import ResourcePin from "Components/ResourcePin/ResourcePin";
import ResourceModal from "Components/ResourceModal"; // Adjust the import path as needed

export default function EmberglowCaldera() {
  const router = useRouter();
  const { ref, headerHeight } = useMeasureHeight();

  const { isLoading } = useLoading();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleClick = (hiveName: string) => {
    switch (hiveName) {
      case "Ash Hive":
        router.push(`/play/zones/emberglow-caldera/ash-hive`);
        break;
      case "Phoenix Hive":
        router.push(`/play/zones/phoenix-hive`);
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
                src="/Animations/emberglow-caldera.mp4"
                type="video/mp4"
              />
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
                  Emberglow Caldera{" "}
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
            {/* ResourcePin Sap */}
            <ResourcePin
              top="50%"
              left={{ base: "50%", md: "52%" }}
              onClick={openModal}
              imageSrc="/icons/resources/sap.svg"
              navigationLabel="Forage Sap"
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
              label="Phoenix Hive"
              onClick={() => handleClick("Phoenix Hive")}
            />

            {/* Modal Component */}
            <ResourceModal
              isOpen={isModalOpen}
              onClose={closeModal}
              title="Resource Details"
              contentText="hellp"
            ></ResourceModal>
          </Box>
        </>
      )}
    </GameLayout>
  );
}
