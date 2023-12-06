import Layout from "../Components/Layout/Layout";
import Head from "next/head";
import {
  Flex,
  Image,
  Heading,
  Text,
  Box,
  SimpleGrid,
  Spacer,
  Button,
  Center,
} from "@chakra-ui/react";
import CardButton from "Components/CardButton/CardButton";
import styles from "../styles/Home.module.css";
import DarkBackground from "Components/DarkBackground/DarkBackground";

import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import { useRouter } from "next/router";
import Container from "Components/Container/Container";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const token = await getToken({ req: context.req });

  const address = token?.sub ?? null;
  // If you have a value for "address" here, your
  // server knows the user is authenticated.

  // You can then pass any data you want
  // to the page component here.
  return {
    props: {
      address,
      session,
    },
  };
};

type AuthenticatedPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;

export default function Home({ address }: AuthenticatedPageProps) {
  const router = useRouter();

  const handleSignUpClick = () => {
    // Navigate to another page
    router.push("/signup");
  };
  return (
    <>
      <Layout>
        <Head>
          <title>Buzzkill</title>
        </Head>

        <Container fullWidth={true}>
          <Box
            position="relative"
            width="full"
            height="auto"
            display="flex"
            p="0" // Ensure there's no padding that can offset the image
            justifyContent="center"
            alignItems="center"
          >
            <Image
              src="/hero-image-queen.png"
              alt="Hero Image"
              borderRadius="0px"
              width="full" // Use the full width of the parent
              height="1350px" // Set a fixed height to crop the top and bottom
              objectFit="cover" // This will cover the area and crop the image as needed
              objectPosition="center" // This centers the image, cropping equally on top and bottom
            />
            <Center
              position="absolute"
              top="0"
              right="0"
              bottom="0"
              left="0"
              flexDirection="column"
            >
              <Heading
                className="header-hero"
                color="white"
                textAlign="center"
                textShadow="0 2px 4px rgba(0,0,0,0.5)" // Optional text shadow for better readability
              >
                Buzzkill
              </Heading>
              <Heading
                className="sub-header-hero"
                color="white"
                textAlign="center"
                textShadow="0 2px 4px rgba(0,0,0,0.5)" // Optional text shadow for better readability
              >
                Honeycomb Hustle
              </Heading>
            </Center>
          </Box>
        </Container>
        <Container>
          <Flex direction="column">
            <Heading className="heading" padding="2rem 0rem 0rem 0rem">
              About
            </Heading>

            <Text className="heading2" padding="5rem 0rem 10rem 5rem">
              Get into the hive mind and earn that $HONEY. The first
              play-to-earn game on the Viction ecosystem. Forage for resources,
              raid for glory, upgrade you Beez, and strategise to make the make
              the most of your resources.
            </Text>
          </Flex>

          {/* CHARACTERS */}
          <Heading
            className="heading2"
            fontSize="5rem"
            padding="0rem 0rem 10rem 5rem"
          >
            View Your Characters{" "}
          </Heading>
          <SimpleGrid className={styles.simpleGrid} minChildWidth="140px">
            <CardButton href="/oems">
              <Image src="factory-icon.svg" alt=" " />
              <Heading color="brand.20" margin="1.5rem" size="md">
                OEM's
              </Heading>
              <Text fontSize="sm" color="brand.20">
                Enhance your brand reputation with on-chain component tracing,
                eliminating counterfeits.
              </Text>
            </CardButton>

            <CardButton href="/couriers">
              <Image src="shipping-icon.svg" alt="Vote" />
              <Heading color="brand.0" margin="1.5rem" size="md">
                Shippers/Couriers
              </Heading>
              <Text fontSize="sm" color="brand.20">
                Ensure your customers products get from A to B by verifying
                shipping consignments
              </Text>
            </CardButton>

            <CardButton href="/product_makers">
              <Image
                src="/circuitboard-icon.svg"
                alt="proposals image"
                borderRadius="lg"
              />
              <Heading color="brand.20" margin="1.5rem" size="md">
                Product Makers
              </Heading>
              <Text fontSize="sm" color="brand.20">
                Ensure the highest quality of your products by tracing your BOM
                directly from the OEM
              </Text>
            </CardButton>

            <CardButton href="/retailers">
              <Image src="retailer-icon.svg" alt="Docs Image" />
              <Heading color="brand.20" margin="1.5rem" size="md">
                Retailers/Distributors
              </Heading>
              <Text fontSize="sm" color="brand.20">
                Provide your customers with confidence of the quality and
                legitimacy of the products you sell
              </Text>
            </CardButton>
          </SimpleGrid>

          {/* How it Works */}
          <Flex padding="10rem 0rem 0rem 0rem">
            <Heading
              className="heading2"
              fontSize="5rem"
              padding="5rem 0rem 5rem 5rem"
              color="brand.20"
              textAlign="left"
            >
              Roadmap
            </Heading>
            <Image src="userflow.svg" width="100%"></Image>
          </Flex>

          {/* STATS */}
          <Flex className={styles.flexContainer}>
            <DarkBackground>
              <Box>
                <Flex flexDirection={["column", "row"]} alignItems="start">
                  <Box mr={8}>
                    <Image
                      className={styles.image}
                      src="bloctrace-logo.svg" //"bloctrace_snowflake.svg"
                      alt="bloctrace Logo"
                      mr={3}
                      width={300}
                      height={300}
                    />
                  </Box>
                  <Flex flexDirection="column" alignItems="center" width="80%">
                    <Heading
                      className={styles.heading1}
                      fontWeight="bold"
                      mt={20}
                      color="brand.0"
                    >
                      Game Stats
                    </Heading>

                    <Box flex="1" mt={14} width="100%">
                      <Flex justifyContent="space-around">
                        <Box textAlign="center">
                          <Text className="body">Active Hives</Text>
                          <Text className="heading2">10</Text>
                        </Box>

                        <Box textAlign="center">
                          <Text className="body"> Raids completed</Text>
                          <Text className="heading2">300</Text>
                        </Box>

                        <Box textAlign="center">
                          <Text className="body">NFTs minted</Text>
                          <Text className="heading2">3000</Text>
                        </Box>
                      </Flex>
                    </Box>
                  </Flex>
                </Flex>
              </Box>
            </DarkBackground>
          </Flex>
        </Container>
      </Layout>
    </>
  );
}
