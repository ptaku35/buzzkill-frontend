import { Box, Flex } from "@chakra-ui/react";
import Head from "next/head";
import Header from "../Navigation/Header/Header";
import React, { useEffect, useRef, useState } from "react";
import styles from "./GameLayout.module.css";
import useMeasureHeight from "../../hooks/useMeasureHeight";

import { useRouter } from "next/router";
import { LoadingProvider, useLoading } from "../../contexts/LoadingContext";

import GameSpinner from "../GameSpinner";

interface GameLayoutProps {
  children: React.ReactNode | ((headerHeight: number) => React.ReactNode);
}

export default function GameLayout({ children }: GameLayoutProps) {
  const { ref, headerHeight } = useMeasureHeight();
  const router = useRouter();
  const { isLoading, setIsLoading } = useLoading();

  useEffect(() => {
    console.log("Inside useEffect");
    const handleRouteChangeStart = () => {
      setIsLoading(true);
      console.log("Route change started - isLoading set to true");
    };
    const handleRouteChangeComplete = () => {
      setIsLoading(false);
      console.log("Route change completed - isLoading set to false");
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router, setIsLoading]);

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
        <GameSpinner />{" "}
      </div>
    </>
  );
}
