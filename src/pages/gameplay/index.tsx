//import styles from "../styles/Home.module.css";
import Layout from "../../Components/Layout/Layout";
import Head from "next/head";
import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import Container from "Components/Container/Container";

export default function Gameplay() {
  return (
    <>
      <Layout>
        <Head>
          <title>Buzzkill Play Game</title>
          {/* <meta name="description" content="noindex,nofollow" /> */}
        </Head>
        <Container fullWidth={true}>
          <Box
            position="relative"
            width="full"
            height="full" // Adjust the height as needed
            overflow="hidden"
          >
            <Image
              src="/ocean.png"
              alt="Hero Image"
              borderRadius="0px"
              width="full"
              height="full"
              objectFit="cover"
              objectPosition="center center" // Adjust this if you need to shift the hero image
            />
          </Box>
        </Container>
      </Layout>
    </>
  );
}
