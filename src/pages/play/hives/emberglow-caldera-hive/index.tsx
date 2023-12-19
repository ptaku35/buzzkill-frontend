import { Box, Heading, Image, ImageProps } from "@chakra-ui/react";
import Layout from "../../../../Components/Layout/Layout";
import Head from "next/head";
import Container from "Components/Container/Container";
import NextLink from "next/link"; // Import Link from Next.js
import SemiTransparentBackground from "../../../../Components/SemiTransparentBackground"; // Import your custom component
import { CSSProperties } from "react"; // Import CSSProperties from React

export default function EmberglowCalderaHive() {
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

  const semiTransparentBackgroundStyles: CSSProperties = {
    position: "absolute",
    top: "10%", // Adjust this value to position the background vertically
    left: "50%", // Adjust this value to center the background horizontally
    transform: "translate(-50%, -50%)", // Center both horizontally and vertically
    width: "fit-content", // Adjust the width as needed
    height: "fit-content", // Adjust the height as needed
    backgroundColor: "brand.50", // Directly use the color token from the theme
    opacity: 0.5, // Adjust the opacity as needed
    zIndex: 2, // Make sure this is above the main image
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
                Emberglow Caldera Hive
              </Heading>
            </Box>
          </SemiTransparentBackground>

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
