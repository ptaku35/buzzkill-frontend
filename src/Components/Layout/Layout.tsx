import { Box, Flex } from "@chakra-ui/react";
import Head from "next/head";
import Footer from "../Navigation/Footer/Footer";
import Header from "../Navigation/Header/Header";
import React from "react";
import styles from "./Layout.module.css";
import useMeasureHeight from "hooks/useMeasureHeight";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { ref, headerHeight } = useMeasureHeight();

  // Calculate the minimum content height
  const minContentHeight = `calc(100vh - ${headerHeight}px - 10vh)`; // 10vh or any desired minimum height

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Buzzkill</title>
      </Head>
      <div className={styles.flex_background}>
        <div ref={ref}>
          <Header />
        </div>
        <Flex
          direction="column"
          width="100vw"
          minH={`calc(100vh - ${headerHeight}px)`}
          textAlign="center"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Box
            flex="1"
            minH={minContentHeight} // Set the minimum height of the content
            bg="transparent"
            backgroundSize="cover"
            backgroundAttachment="fixed"
            display="flex" // Make the content a flex container
            flexDirection="column" // Set the direction to column
          >
            {children}
          </Box>
          <Footer />
        </Flex>
      </div>
    </>
  );
}
