import { Box, Image, ImageProps } from "@chakra-ui/react";
import Layout from "../../../../Components/Layout/Layout";
import Head from "next/head";
import Container from "Components/Container/Container";
import NextLink from "next/link"; // Import Link from Next.js

export default function SunlitSandsHive() {
  const overlayImageStyles: ImageProps = {
    position: "absolute",
    top: "-30%",
    left: "60%",
    width: "50%", // Adjust the width to make the overlay image smaller
    height: "auto", // Maintain aspect ratio
    objectFit: "cover" as ImageProps["objectFit"], // Explicitly specify the type
    transform: "scale(0.2)", // Initial scale
    zIndex: 2, // Set the z-index to 2 for the overlay image to place it on top
    transition: "transform 0.3s ease-in-out", // Add a transition effect for the hover effect
  };

  const overlayImageHoverStyles = {
    transform: "scale(0.25)", // Scale up on hover (adjust as needed, e.g., 0.25 for a smaller effect)
  };

  return (
    <Layout>
      <Head>
        <title>Buzzkill - Sunlit Sands</title>
      </Head>
      <Container fullWidth={true}>
        <Box position="relative" width="full" height="88vh" overflow="hidden">
          {/* Main Image */}
          <Image
            src="/desert.png"
            alt="Hero Image"
            borderRadius="0px"
            width="full"
            height="85vh"
            objectFit="cover"
            objectPosition="center center"
            zIndex={1} // Set the z-index to 1 for the main image
          />

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
