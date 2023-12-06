//import styles from "../styles/Home.module.css";
import Layout from "../../Components/Layout/Layout";
import Head from "next/head";
import { Box, Center, Flex, Heading, Image } from "@chakra-ui/react";
import Container from "Components/Container/Container";

export default function Play() {
  return (
    <>
      <Layout>
        <Head>
          <title>Buzzkill Play Game</title>
          {/* <meta name="description" content="noindex,nofollow" /> */}
        </Head>
        <Container fullWidth={true}>
          <Box position="relative" width="full" height="90vh" overflow="hidden">
            {/* Use the native video tag here */}
            <video
              width="100%" // Make the video responsive by setting width to 100%
              height="auto" // Set height to auto to maintain aspect ratio
              autoPlay // Add autoPlay to play the video as soon as it's ready
              loop // Add loop to continuously loop the video
              muted // Mute the video to play it automatically in most browsers
              style={{
                borderRadius: "0px", // Apply border-radius if needed
                objectFit: "cover", // Cover the box area just like objectFit for images
              }}
            >
              <source src="/volcano-smoke-map.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Box>
        </Container>
      </Layout>
    </>
  );
}
