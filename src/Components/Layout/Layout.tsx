import { Box, Flex } from "@chakra-ui/react";
import Head from "next/head";
import Container from "../Container/Container";
import Footer from "../Navigation/Footer/Footer";
import Header from "../Navigation/Header/Header";
import React from "react";
import styles from "./Layout.module.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Buzzkill</title>
      </Head>
      {/* this is the whole screen background*/}
      <div className={styles.flex_background}>
        <Header />
        <Container>
          <Flex direction="column" minH="100vh" textAlign="center">
            <Box
              bg="transparent"
              backgroundSize="cover"
              backgroundAttachment="fixed"
            >
              {children}
            </Box>

            <Footer />
          </Flex>
        </Container>
      </div>
    </>
  );
}
