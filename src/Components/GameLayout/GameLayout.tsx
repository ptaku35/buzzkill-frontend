import { Box, Flex } from "@chakra-ui/react";
import Head from "next/head";
import Container from "../Container/Container";
import Footer from "../Navigation/Footer/Footer";
import Header from "../Navigation/Header/Header";
import React, { useEffect, useRef, useState } from "react";
import styles from "./GameLayout.module.css";

import useMeasureHeight from "../../hooks/useMeasureHeight";

interface GameLayoutProps {
  children: React.ReactNode | ((headerHeight: number) => React.ReactNode);
}

export default function GameLayout({ children }: GameLayoutProps) {
  const { ref, headerHeight } = useMeasureHeight();
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Buzzkill</title>
      </Head>
      {/* this is the whole screen background*/}
      <div className={styles.flex_background}>
        <div ref={ref}>
          <Header />
        </div>
        <Flex
          direction="column"
          minH={`calc(100vh - ${headerHeight}px)`}
          textAlign="center"
        >
          <Box
            bg="transparent"
            backgroundSize="cover"
            backgroundAttachment="fixed"
          >
            {typeof children === "function" ? children(headerHeight) : children}
          </Box>
        </Flex>
      </div>
    </>
  );
}
