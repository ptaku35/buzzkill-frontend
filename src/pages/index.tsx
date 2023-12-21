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
            height="92vh"
            overflow="hidden" // Ensure the overflowing parts of the image are not shown
          >
            <Image
              src="/HomePage/hero-image-queen.png"
              alt="Hero Image"
              borderRadius="0px"
              width="full"
              height="full"
              objectFit="cover"
              objectPosition="center center" // Adjust this if you need to shift the hero image
            />
            <Center
              position="absolute"
              top="45%" // Center vertically
              left="51%" // Center horizontally
              transform="translate(-50%, -50%)" // Adjust to center the content of the Center component
              flexDirection="column"
            >
              <Image
                src="/logos/buzzkill-logo-hero.svg"
                alt="Buzzkill Logo"
                borderRadius="0px"
                width="auto" // Maintain the original width of the logo
                height="150px" // Fixed height for the logo
                objectFit="contain" // Use contain to ensure the logo is fully visible
              />
            </Center>
          </Box>
        </Container>

        <Container>
          <Flex direction="column">
            <Heading
              className="heading"
              fontSize="40px"
              padding="12rem 0rem 0rem 0rem"
            >
              About
            </Heading>

            <Text
              className="heading2"
              fontSize="30px"
              padding="5rem 30rem 10rem 30rem"
            >
              Get into the hive mind and earn that $HONEY. The first
              play-to-earn game on the Viction ecosystem. Forage for resources,
              raid for glory, upgrade you Beez, and strategise to make the make
              the most of your resources.
            </Text>
          </Flex>
        </Container>
        {/* CHARACTERS */}
        <Heading
          className="heading2"
          fontSize="40px"
          padding="10rem 0rem 5rem 5rem"
        >
          Choose from 2 Class of Characters{" "}
        </Heading>
        <Text className="heading2" padding="0rem 30rem 10rem 30rem">
          Each specialising in their own unique traits and environment types{" "}
          <br></br> As you Earn resources you can upgrade your characters
        </Text>
        <SimpleGrid
          className={styles.simpleGrid}
          px="100px"
          minChildWidth="140px"
        >
          <CardButton href="/gallery">
            <Image
              src="/Queens/18WD.png"
              alt="Worker-warrior"
              borderRadius="10px"
            />
            <Heading color="white" margin="1.5rem" size="md">
              Apiarist Avenger - Worker Bee
            </Heading>
            <Text fontSize="md" color="white">
              Clad in ornate armor resembling the intricate patterns of
              honeycombs, this warrior bee exudes a majestic aura. He excels in
              frontline assaults.
            </Text>
          </CardButton>

          <CardButton href="/gallery">
            <Image
              src="/Queens/Q2.png"
              borderRadius="10px"
              alt="Queen-forest"
            />
            <Heading color="white" margin="1.5rem" size="md">
              Sovereign Syrphidae - Queen Bee
            </Heading>
            <Text fontSize="md" color="white">
              The Queen of the Verdant Canopy. Her scepter channels the life
              force of the forest, and her will is the unbreakable bond that
              unites every drone and worker.
            </Text>
          </CardButton>

          <CardButton href="/gallery">
            <Image
              src="/Queens/19WD.png"
              borderRadius="10px"
              alt="warruir sabds"
            />
            <Heading color="white" margin="1.5rem" size="md">
              Sentinel of Shifting Sands - Worker Bee
            </Heading>
            <Text fontSize="md" color="white">
              His armor gleams like the heart of the desert sun, a bastion
              amidst the ever-changing dunes. His lance commands the winds, his
              gaze challenges the horizon.
            </Text>
          </CardButton>

          <CardButton href="/gallery">
            <Image src="/Queens/Q8.png" borderRadius="10px" alt="Docs Image" />
            <Heading color="white" margin="1.5rem" size="md">
              Monarch of the Frosted Expanse - Queen Bee
            </Heading>
            <Text fontSize="md" color="white">
              Crowned in ice and majesty, her scepter reigns over the silent,
              snowy realms. Her wings, delicate as winter's first snowflake,
              bear the frost's eternal grace.
            </Text>
          </CardButton>
        </SimpleGrid>

        <Container>
          <Box
            overflow="hidden" // ensures the content doesn't overflow
            p="20rem 12rem 10rem 12rem " // padding inside the box
          >
            <Flex
              direction={{ base: "column", md: "row" }}
              //gap="10rem"

              h="full"
              w="full"
            >
              {/* Left side image container */}
              <Box
                flex="2"
                w={{ base: "100%", md: "50%" }}
                p="2rem 5rem 2rem 0rem "
              >
                <Image
                  h="500px"
                  src="worlds/river.png" // the image path
                  borderRadius="10px"
                  alt="River Hive" // alt text for the image
                  boxShadow="0 0 8px 2px rgba(255, 255, 180, 0.4), 0 0 8px 2px rgba(75, 0, 130, 0.4)" // Glow effect
                  objectFit="cover" // ensures the image covers the box area
                />
              </Box>
              <Box flex="2" w={{ base: "100%", md: "50%" }}>
                {/* Right side content container */}
                <Flex
                  flex="2" // takes twice as much width as the image container
                  direction="column" // stack items vertically
                  justify="center" // centers content vertically
                  padding="10rem 10rem 5rem 10rem" // padding inside the content container
                >
                  <Text
                    className="Heading"
                    color="white"
                    fontSize="40px"
                    align="left"
                  >
                    Forage for Resources
                  </Text>
                  <Text
                    fontSize="20px"
                    color="white"
                    padding="5rem 0rem 5rem 0rem" // padding inside the content container
                    align="left"
                  >
                    Forage for resource in the environment. Use those resources
                    to upgrade your NFT or construct buildings inside the hive.
                  </Text>
                  <Button w="auto" maxW="md">
                    Learn More
                  </Button>
                </Flex>
              </Box>
            </Flex>
          </Box>
        </Container>

        <Container>
          <Box
            overflow="hidden" // ensures the content doesn't overflow
            p="10rem 12rem 10rem 12rem " // padding inside the box
          >
            <Flex
              direction={{ base: "column", md: "row" }}
              //gap="10rem"

              h="full"
              w="full"
            >
              {/* Left side image container */}
              <Box flex="2" w={{ base: "100%", md: "50%" }}>
                <Flex
                  flex="2" // takes twice as much width as the image container
                  direction="column" // stack items vertically
                  justify="center" // centers content vertically
                  padding="10rem 10rem 5rem 10rem" // padding inside the content container
                >
                  <Text
                    className="Heading"
                    color="white"
                    fontSize="40px"
                    align="left"
                  >
                    Raid for Glory
                  </Text>
                  <Text
                    fontSize="20px"
                    color="white"
                    padding="5rem 0rem 5rem 0rem" // padding inside the content container
                    align="left"
                  >
                    Steal $HONEY from other hives in carefully planned out
                    raids. Know your risks and reap your rewards.
                  </Text>
                  <Button w="auto" maxW="md">
                    Learn More
                  </Button>
                </Flex>
              </Box>

              {/* Right side content container */}
              <Box
                flex="2"
                p="2rem 0rem 2rem 10rem "
                w={{ base: "100%", md: "50%" }}
              >
                <Image
                  h="500px"
                  src="worlds//mountain-world.png"
                  borderRadius="10px"
                  alt="Mountain Hive"
                  boxShadow="0 0 8px 2px rgba(255, 255, 180, 0.4), 0 0 8px 2px rgba(75, 0, 130, 0.4)" // Glow effect
                  objectFit="cover" // ensures the image covers the box area
                />
              </Box>
            </Flex>
          </Box>
        </Container>

        <Container>
          <Box
            overflow="hidden" // ensures the content doesn't overflow
            p="10rem 12rem 10rem 12rem " // padding inside the box
          >
            <Flex
              direction={{ base: "column", md: "row" }}
              //gap="10rem"

              h="full"
              w="full"
            >
              {/* Left side image container */}
              <Box
                flex="2"
                p="2rem 10rem 2rem 5rem "
                w={{ base: "100%", md: "50%" }}
              >
                <Image
                  h="500px"
                  src="worlds//ocean.png" // the image path
                  borderRadius="10px"
                  alt="ocean Hive" // alt text for the image
                  boxShadow="0 0 8px 2px rgba(255, 255, 180, 0.4), 0 0 8px 2px rgba(75, 0, 130, 0.4)" // Glow effect
                  objectFit="cover" // ensures the image covers the box area
                />
              </Box>
              <Box flex="2" w={{ base: "100%", md: "50%" }}>
                {/* Right side content container */}
                <Flex
                  flex="2" // takes twice as much width as the image container
                  direction="column" // stack items vertically
                  justify="center" // centers content vertically
                  padding="10rem 10rem 5rem 10rem" // padding inside the content container
                >
                  <Text
                    className="Heading"
                    color="white"
                    fontSize="40px"
                    align="left"
                  >
                    Get into the Hive Mind
                  </Text>
                  <Text
                    fontSize="20px"
                    color="white"
                    padding="5rem 0rem 5rem 0rem" // padding inside the content container
                    align="left"
                  >
                    Work with members inside your hive to boos your
                    productivity, construct buildings and work together to boost
                    your $HONEY production
                  </Text>
                  <Button w="auto" maxW="md">
                    Learn More
                  </Button>
                </Flex>
              </Box>
            </Flex>
          </Box>
        </Container>

        {/*ROADMAP*/}
        <Container fullWidth={true}>
          <Image src="roadmap/Roadmap.svg" width="100%"></Image>
        </Container>

        {/* STATS */}
        <Container>
          <Flex
            className={styles.flexContainer}
            padding="10rem 10rem 0rem 10rem"
          >
            <DarkBackground>
              <Box>
                <Flex flexDirection={["column", "row"]} alignItems="start">
                  <Box ml={8}>
                    <Image
                      className={styles.image}
                      src="HomePage/bee-emblem.svg"
                      alt="bee emblek Logo"
                      mr={3}
                      width={300}
                      height={300}
                    />
                  </Box>
                  <Flex flexDirection="column" alignItems="center" width="75%">
                    <Heading
                      className={styles.heading1}
                      fontWeight="bold"
                      mt={20}
                      color="white"
                    >
                      Game Statistics
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
