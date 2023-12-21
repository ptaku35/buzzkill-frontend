import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Spacer,
  Image,
  useToken,
} from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAuthRequestChallengeEvm } from "@moralisweb3/next";
import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useAccount, useSignMessage, useNetwork } from "wagmi";
import { useRouter } from "next/router";

export default function Header() {
  const backgroundColor = useToken("colors", "brand.60");
  const [scrolled, setScrolled] = React.useState(false);
  const { isConnected, address } = useAccount();
  const { chain } = useNetwork();
  const { status } = useSession();
  const { signMessageAsync } = useSignMessage();
  const { push } = useRouter();
  const { requestChallengeAsync } = useAuthRequestChallengeEvm();

  const account = useAccount({
    onDisconnect() {
      console.log("Disconnected");
      push("/"); // Redirect the user after signing out
    },
  });

  useEffect(() => {
    console.log("inside check, status", status);
    console.log("inside check, status", isConnected);
    const handleAuth = async () => {
      const { message } = (await requestChallengeAsync({
        address: address as string,
        chainId: chain!.id,
      })) as { id: string; profileId: string; message: string };

      const signature = await signMessageAsync({ message });

      // redirect user after success authentication to '/user' page
      const { url } = (await signIn("moralis-auth", {
        message,
        signature,
        redirect: false,
        callbackUrl: "/play", // take the user to the oem dashboard
      })) as { url: string };
      /**
       * instead of using signIn(..., redirect: "/user")
       * we get the url from callback and push it to the router to avoid page refreshing
       */
      push(url);
    };
    if (status === "unauthenticated" && isConnected) {
      console.log("inside initial check, status", status);
      console.log("inside initial check, status", isConnected);

      handleAuth();
    }
  }, [status, isConnected]);

  React.useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      console.log(`Scrolled: ${isScrolled}`);
      setScrolled(isScrolled);
    };

    // Only add the event listener if window is defined (i.e., we're on the client side)
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      // Clean up the event listener when the component is unmounted
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <Flex
      as="nav"
      minWidth="max-content"
      className={styles.header}
      style={{
        backgroundColor: `rgba(10, 12, 14, 0.5)`, // Adjust the alpha value (0.8) as needed
        borderBottom: scrolled ? "1px solid #332018" : "none",
      }}
    >
      <Link href="/" shallow>
        <Box className={styles.nav_logo}>
          <Image src="/buzzkill-logo-hero.svg" alt="Buzzkill-logo" />
        </Box>
      </Link>
      <Spacer></Spacer>
      <ButtonGroup className={styles.nav_menu} variant="ghost" gap="2">
        <Link href="/play" shallow>
          <Button
            color="brand.0"
            fontWeight="normal"
            fontSize="22px"
            _hover={{
              borderColor: "brand.50",
              borderBottomWidth: "2px",
              borderRadius: "1px",
              transition: "ease-in-out 0.2s",
            }}
          >
            Play
          </Button>
        </Link>

        <Link href="/gallery" shallow>
          <Button
            color="brand.0"
            fontSize="22px"
            fontWeight="normal"
            aria-current="page"
            _hover={{
              borderColor: "brand.50",
              borderBottomWidth: "2px",
              borderRadius: "0",
              transition: "ease-in-out 0.2s",
            }}
          >
            Gallery
          </Button>
        </Link>
        <Link href="/mint" shallow>
          <Button
            color="brand.0"
            fontSize="22px"
            fontWeight="normal"
            aria-current="page"
            _hover={{
              borderColor: "brand.50",
              borderBottomWidth: "2px",
              borderRadius: "0",
              transition: "ease-in-out 0.2s",
            }}
          >
            Mint
          </Button>
        </Link>

        <Link href="/roadmap" shallow>
          <Button
            color="brand.0"
            fontSize="22px"
            fontWeight="normal"
            _hover={{
              borderColor: "brand.50",
              borderBottomWidth: "2px",
              borderRadius: "0",
              transition: "ease-in-out 0.2s",
            }}
          >
            Roadmap
          </Button>
        </Link>

        <Link href="https://dagora.xyz/" shallow>
          <Button
            color="brand.0"
            fontSize="22px"
            fontWeight="normal"
            _hover={{
              borderColor: "brand.50",
              borderBottomWidth: "2px",
              borderRadius: "0",
              transition: "ease-in-out 0.2s",
            }}
          >
            Marketplace
          </Button>
        </Link>

        <Link
          href="https://earendel-labs.gitbook.io/buzzkilll-honeycomb-hustle/"
          target="_blank"
          rel="noopener noreferrer"
          shallow
        >
          <Button
            color="brand.0"
            fontWeight="normal"
            fontSize="22px"
            _hover={{
              borderColor: "brand.1100",
              borderBottomWidth: "2px",
              borderRadius: "0",
              transition: "ease-in-out 0.2s",
            }}
          >
            Docs
          </Button>
        </Link>
      </ButtonGroup>
      <Spacer></Spacer>
      <Flex fontSize="17px">
        <ConnectButton
          showBalance={{
            smallScreen: false,
            largeScreen: true,
          }}
          accountStatus={{
            smallScreen: "avatar",
            largeScreen: "full",
          }}
        />
      </Flex>
    </Flex>
  );
}
