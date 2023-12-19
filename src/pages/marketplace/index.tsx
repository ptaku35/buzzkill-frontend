//import styles from "../styles/Home.module.css";
import Layout from "../../Components/Layout/Layout";
import Head from "next/head";
import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import Container from "Components/Container/Container";

export default function Marketplace() {
  return (
    <>
      <Layout>
        <Head>
          <title>Buzzkill Marketplace</title>
          {/* <meta name="description" content="noindex,nofollow" /> */}
        </Head>
        <Container fullWidth={true}>
          <Box position="relative" width="full" height="88vh" overflow="hidden">
            <Image
              src="/ocean.png"
              alt="Hero Image"
              borderRadius="0px"
              width="full"
              height="85vh"
              objectFit="cover"
              objectPosition="center center" // Adjust this if you need to shift the hero image
            />
          </Box>
        </Container>
      </Layout>
    </>
  );
}
