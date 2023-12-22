// Import necessary components from Chakra UI
import {
  Box,
  Center,
  Flex,
  Heading,
  Image,
  useBoolean,
} from "@chakra-ui/react";
import Layout from "../../../Components/Layout/Layout";
import Head from "next/head";
import { useRouter } from "next/router";

import Container from "Components/Container/Container";
import MapTriangle from "Components/MapTriangle/MapTriangle";

export default function Play() {
  const router = useRouter(); // Initialize the router

  const handleClick = (hiveName: string) => {
    // Navigate to the corresponding page based on hiveName
    switch (hiveName) {
      case "Emberglow Caldera Hive":
        router.push(`/play/hives/emberglow-caldera-hive`);
        break;
      case "Sunlit Sands Hive":
        router.push(`/play/hives/sunlit-sands-hive`);
        break;
      case "Verdant Canopy Hive":
        router.push(`/play/hives/$verdant-canopy-hive`);
        break;
      case "Azure Marina Hive":
        router.push(`/play/hives/azure-marina-hive`);
        break;
      case "Frostwing Glacier Hive":
        router.push(`/play/hives/frostwing-glacier-hive`);
        break;
      // Add more cases for other hives if needed
      default:
        console.log("Triangle clicked!");
        break;
    }
  };

  return (
    <Layout>
      <Head>
        <title>Buzzkill Play Game</title>
      </Head>
      <Container fullWidth={true}>
        <Box position="relative" width="full" height="90vh" overflow="hidden">
          <video
            width="100%"
            height="auto"
            autoPlay
            loop
            muted
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
          >
            <source src="/animations/volcano-smoke-map.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Overlay triangles */}
          <MapTriangle
            top="80%" // Adjust as needed
            left="75%" // Adjust as needed
            label="Sunlit Sands Hive"
            onClick={() => handleClick("Sunlit Sands Hive")}
          />
          {"Sunlit Sands Hive"}

          <MapTriangle
            top="15%" // Adjust as needed
            left="85%" // Adjust as needed
            label="Emberglow Caldera Hive"
            onClick={() => handleClick("Emberglow Caldera Hive")}
          />
          {"Emberglow Caldera Hive"}

          <MapTriangle
            top="70%" // Adjust as needed
            left="25%" // Adjust as needed
            label="Verdant Canopy Hive"
            onClick={() => handleClick("Verdant Canopy Hive")}
          />
          {"Verdant Canopy Hive"}

          <MapTriangle
            top="80%" // Adjust as needed
            left="10%" // Adjust as needed
            label="Azure Marina Hive"
            onClick={() => handleClick("Azure Marina Hive")}
          />
          {"Azure Marina Hive"}

          <MapTriangle
            top="35%" // Adjust as needed
            left="65%" // Adjust as needed
            label="Frostwing Glacier Hive"
            onClick={() => handleClick("Frostwing Glacier Hive")}
          />
          {"Frostwing Glacier Hive"}
        </Box>
      </Container>
    </Layout>
  );
}
