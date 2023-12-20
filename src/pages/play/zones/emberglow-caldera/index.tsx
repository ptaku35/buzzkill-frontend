import { Box, Heading, Image, ImageProps } from "@chakra-ui/react";
import Layout from "../../../../Components/Layout/Layout";
import Head from "next/head";
import Container from "Components/Container/Container";
import NextLink from "next/link"; // Import Link from Next.js
import SemiTransparentBackground from "../../../../Components/SemiTransparentBackground"; // Import your custom component
import MapTriangle from "Components/MapTriangle/MapTriangle";
import { CSSProperties, useEffect, useState } from "react"; // Import CSSProperties from React
import { useRouter } from "next/router";

export default function EmberglowCaldera() {
  const overlayImageStyles: ImageProps = {
    position: "absolute",
    top: "15%",
    left: { base: "60%", md: "70%" }, // Adjusts position at base and md breakpoints
    transform: {
      base: "translateY(-50%) scale(0.15)", // Smaller scale for smaller screens
      md: "translateY(-50%) scale(0.2)", // Larger scale for medium screens and up
    },
    width: { base: "10w", md: "40vw" }, // Smaller width on smaller screens, larger on medium and up

    zIndex: 2,
    transition: "transform 0.3s ease-in-out",
  };
  const overlayImageHoverStyles = {
    transform: "translateY(-50%) scale(0.22)", // Include translateY with a slight increase in scale
  };
  const semiTransparentBackgroundStyles: CSSProperties = {
    position: "absolute",
    top: "10%", // Adjust this value to position the background vertically
    left: "50%", // Adjust this value to center the background horizontally
    transform: "translate(-50%, -50%)", // Center both horizontally and vertically
    width: "fit-content", // Adjust the width as needed
    height: "fit-content", // Adjust the height as needed
    backgroundColor: "brand.50", // Directly use the color token from the theme
    opacity: 1, // Adjust the opacity as needed
    zIndex: 2, // Make sure this is above the main image
  };
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
      case "Ash Hive":
        router.push(`/play/hives/emberglow-caldera-hive/ash-hive`);
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
        <Box position="relative" width="full" height="88vh" overflow="hidden">
          {/* Main Image */}
          <Image
            src="/fire-volcano.png"
            alt="Hero Image"
            borderRadius="0px"
            width="full"
            height="85vh"
            objectFit="cover"
            objectPosition="center center"
            zIndex={0} // Set the z-index lower than SemiTransparentBackground
          />

          <SemiTransparentBackground style={semiTransparentBackgroundStyles}>
            {/* Use a Box or div with display flex to center the content inside SemiTransparentBackground */}
            <Box
              display="flex"
              alignItems="center" // This will vertically center the content
              justifyContent="center" // This will horizontally center the content
              height="100%" // Take the full height of the parent container
            >
              <Heading
                as="h1" // Specify the heading level for semantic HTML
                color="white" // Adjust the text color as needed
                textAlign="center" // Center the text
                zIndex={3} // Set the z-index higher than the image and SemiTransparentBackground
              >
                Emberglow Caldera
              </Heading>
            </Box>
          </SemiTransparentBackground>
          {/* Overlay triangles */}
          <MapTriangle
            top="25%"
            left="66%"
            label="Ash Hive"
            onClick={() => handleClick("Ash Hive")}
          />
          {"Ash Hive"}

          {/* Wrap the overlay image with a Link */}
          <NextLink href="/play">
            <Image
              src="/small-map-distorted.svg"
              alt="Overlay Image"
              _hover={overlayImageHoverStyles}
              {...overlayImageStyles}
            />
          </NextLink>
        </Box>
      </Container>
    </Layout>
  );
}
