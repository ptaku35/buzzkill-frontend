import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../Components/Layout/Layout";
import Head from "next/head";
import Container from "Components/Container/Container";
import MapTriangle from "Components/MapTriangle/MapTriangle";
import { Box, Spinner } from "@chakra-ui/react"; // Import Chakra UI components

export default function Play() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsLoading(true);
    };

    const handleRouteChangeComplete = () => {
      setIsLoading(false);
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router]);

  const handleClick = (hiveName: string) => {
    switch (hiveName) {
      case "Emberglow Caldera Hive":
        router.push(`/play/hives/emberglow-caldera-hive`);
        break;
      case "Sunlit Sands Hive":
        router.push(`/play/hives/sunlit-sands-hive`);
        break;
      case "Verdant Canopy Hive":
        router.push(`/play/hives/verdant-canopy-hive`);
        break;
      case "Azure Marina Hive":
        router.push(`/play/hives/azure-marina-hive`);
        break;
      case "Frostwing Glacier Hive":
        router.push(`/play/hives/frostwing-glacier-hive`);
        break;
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
        <Box
          position="relative"
          width="full"
          height="90vh"
          overflow="hidden"
          // Use CSS to change the cursor when loading
          cursor={isLoading ? "wait" : "default"}
        >
          {/* Main Image */}
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
            <source src="/volcano-smoke-map.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Loading Spinner */}
          {isLoading && (
            <Spinner
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              color="blue.500"
              thickness="4px"
              size="lg"
            />
          )}

          {/* Overlay triangles */}
          <MapTriangle
            top="80%"
            left="75%"
            label="Sunlit Sands Hive"
            onClick={() => handleClick("Sunlit Sands Hive")}
          />
          {"Sunlit Sands Hive"}

          <MapTriangle
            top="15%"
            left="85%"
            label="Emberglow Caldera Hive"
            onClick={() => handleClick("Emberglow Caldera Hive")}
          />
          {"Emberglow Caldera Hive"}

          <MapTriangle
            top="70%"
            left="25%"
            label="Verdant Canopy Hive"
            onClick={() => handleClick("Verdant Canopy Hive")}
          />
          {"Verdant Canopy Hive"}

          <MapTriangle
            top="80%"
            left="10%"
            label="Azure Marina Hive"
            onClick={() => handleClick("Azure Marina Hive")}
          />
          {"Azure Marina Hive"}

          <MapTriangle
            top="35%"
            left="65%"
            label="Frostwing Glacier Hive"
            onClick={() => handleClick("Frostwing Glacier Hive")}
          />
          {"Frostwing Glacier Hive"}
        </Box>
      </Container>
    </Layout>
  );
}
