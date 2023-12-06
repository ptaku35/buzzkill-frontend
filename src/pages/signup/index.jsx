import { useRouter } from "next/router";
import { useAuthRequestChallengeEvm } from "@moralisweb3/next";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { signIn, useSession } from "next-auth/react";
import { useAccount, useSignMessage, useNetwork } from "wagmi";
import { useEffect } from "react";
import OemLayout from "../../Components/OemLayout/OemLayout";
import Head from "next/head";
import { Box, Button, Flex, Heading, Image } from "@chakra-ui/react";
import DarkBackground from "Components/DarkBackground/DarkBackground";
function SignUp() {
  const { isConnected, address } = useAccount();
  const { chain } = useNetwork();
  const { status } = useSession();
  const { signMessageAsync } = useSignMessage();
  const { push } = useRouter();
  const { requestChallengeAsync } = useAuthRequestChallengeEvm();

  useEffect(() => {
    const handleAuth = async () => {
      const { message } = await requestChallengeAsync({
        address: address,
        chainId: chain.id,
      });

      const signature = await signMessageAsync({ message });

      // redirect user after success authentication to '/user' page
      const { url } = await signIn("moralis-auth", {
        message,
        signature,
        redirect: false,
        callbackUrl: "/oems/account",
      });
      /**
       * instead of using signIn(..., redirect: "/user")
       * we get the url from callback and push it to the router to avoid page refreshing
       */
      push(url);
    };
    if (status === "unauthenticated" && isConnected) {
      handleAuth();
    } else {
      console.log("status inside signup: ", status);

      push("/oems/account");
    }
  }, [status, isConnected]);

  return (
    <>
      <OemLayout>
        <Head>
          <title>BlocTrace - SignUp</title>
          {/* <meta name="description" content="noindex,nofollow" /> */}
        </Head>
        <Flex justifyContent="center" direction="column" marginBottom="250px">
          <Heading
            as="h2"
            fontSize="5rem"
            color="brand.0"
            fontWeight="medium"
            size="lg"
            p="8rem"
            mb="1rem"
            textAlign="center"
          >
            Sign Up
          </Heading>
          <DarkBackground>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              textAlign="center"
            >
              <Heading
                as="h2"
                fontSize="4rem"
                color="brand.0"
                fontWeight="medium"
                size="lg"
                p="4rem 0rem 4rem 0"
                mb="1rem"
                textAlign="center"
              >
                {" "}
                Sign up with your Web3 wallet to access{" "}
              </Heading>
              <Heading
                as="h2"
                fontSize="2rem"
                color="brand.0"
                fontWeight="medium"
                size="lg"
                p="4rem 0rem 4rem 0"
                mb="1rem"
                textAlign="center"
              >
                <ConnectButton label="Sign Up"></ConnectButton>
              </Heading>
            </Flex>
          </DarkBackground>
        </Flex>
      </OemLayout>
    </>
  );
}

export default SignUp;
