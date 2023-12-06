//import styles from "../styles/Home.module.css";
import OemLayout from "../../Components/OemLayout/OemLayout";
import Head from "next/head";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  NumberInput,
  NumberInputField,
  Spacer,
  Spinner,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";
import { NextPage } from "next";
import DarkBackground from "Components/DarkBackground/DarkBackground";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import React, { useEffect } from "react";
import { ethers } from "ethers";
import useAppState from "../../hooks/useAppState";
import CardButtonSmall from "Components/CardButtonSmall/CardButtonSmall";
import styles from "./oems.module.css";

const Dashboard: NextPage = () => {
  const {
    user,
    userProfile,
    isVerified,
    userConsignmentData,
    fetchConsignmentData,
  } = useAppState();

  useEffect(() => {
    if (user && user.profileId) {
      fetchConsignmentData(user.profileId);
    }
  }, []);
  return (
    <>
      <OemLayout>
        <Head>
          <title>BlocTrace - OEMs</title>
          {/* <meta name="description" content="noindex,nofollow" /> */}
        </Head>

        <Heading
          className="heading1"
          margin="7rem"
          fontSize="5rem"
          color="brand.0"
          fontWeight="medium"
          textAlign="center"
        >
          OEM Dashboard
        </Heading>
        <Flex
          flexDirection={["column", "row"]}
          justify="center"
          gap="60px"
          marginBottom="15rem"
        >
          {/* User balances */}
          <DarkBackground>
            <Flex flexDirection="row" padding="40px 20px 0px 2px">
              {/* Left column */}
              <Box flex="1">
                <Heading className="heading1">Business Info</Heading>
                <Flex flexDirection="row">
                  {/* left inner*/}
                  <Flex
                    flexDirection="column"
                    flex="1"
                    justifyContent="flex-end"
                    marginRight="1rem"
                  >
                    <Heading
                      className="label"
                      fontSize="28px"
                      textAlign="right"
                      fontWeight="normal"
                    >
                      Business Name:{" "}
                    </Heading>
                    <Heading
                      className="label"
                      fontSize="28px"
                      textAlign="right"
                      fontWeight="normal"
                    >
                      Wallet Address:{" "}
                    </Heading>
                    <Heading
                      className="label"
                      fontSize="28px"
                      textAlign="right"
                      fontWeight="normal"
                    >
                      No. Verfied Couriers:{" "}
                    </Heading>
                    <Heading
                      className="label"
                      fontSize="28px"
                      textAlign="right"
                      fontWeight="normal"
                    >
                      Batches Produced:{" "}
                    </Heading>
                    <Heading
                      className="label"
                      fontSize="28px"
                      textAlign="right"
                      fontWeight="normal"
                    >
                      Verification Status:{" "}
                    </Heading>
                  </Flex>
                  {/* right inner*/}
                  <Flex
                    flexDirection="column"
                    flex="1"
                    justifyContent="flex-start"
                    marginRight="1rem"
                  >
                    <Heading
                      className="heading2"
                      fontSize="28px"
                      textAlign="left"
                      fontWeight="normal"
                    >
                      {userProfile?.business_name ?? "Account Not Setup"}
                    </Heading>
                    <Heading
                      className="heading2"
                      fontSize="28px"
                      textAlign="left"
                      fontWeight="normal"
                    >
                      {user?.address.slice(0, 6) +
                        "..." +
                        user?.address.slice(-6)}
                    </Heading>
                    <Heading
                      className="heading2"
                      fontSize="28px"
                      textAlign="left"
                      fontWeight="normal"
                    >
                      {userConsignmentData?.user_shippers_count}
                    </Heading>
                    <Heading
                      className="heading2"
                      fontSize="28px"
                      textAlign="left"
                      fontWeight="normal"
                    >
                      {userConsignmentData?.total_consignments}
                    </Heading>
                    <Heading
                      className="heading2"
                      fontSize="28px"
                      textAlign="left"
                      fontWeight="normal"
                    >
                      {isVerified ? <p>Verified</p> : <p>Unverified</p>}
                    </Heading>
                  </Flex>
                </Flex>
              </Box>

              {/* Right column */}
              <Box flex="1">
                <SimpleGrid className={styles.simpleGrid} columns={3}>
                  <CardButtonSmall href="/oems/account">
                    <Image
                      className={styles.image}
                      src="factory-icon.svg"
                      alt="factory icon"
                    />
                    <Heading color="brand.20" margin="1.5rem" size="md">
                      Verify
                    </Heading>
                  </CardButtonSmall>

                  <CardButtonSmall href="/oems/account">
                    <Image
                      className={styles.image}
                      src="verify_image.svg"
                      alt="verify"
                    />
                    <Heading color="brand.20" margin="0rem" size="md">
                      Account Management
                    </Heading>
                  </CardButtonSmall>
                  <CardButtonSmall href="/oems/add_shippers">
                    <Image
                      className={styles.image}
                      src="/shipping-icon.svg"
                      alt="shipping image"
                      borderRadius="lg"
                    />
                    <Heading color="brand.20" margin="1.5rem" size="md">
                      Add Shippers
                    </Heading>
                  </CardButtonSmall>
                </SimpleGrid>

                <SimpleGrid className={styles.simpleGrid} columns={3}>
                  <CardButtonSmall href="/oems/create_batch">
                    <Image
                      className={styles.image}
                      src="/circuitboard-icon.svg"
                      alt="circuitboard image"
                      borderRadius="lg"
                    />
                    <Heading color="brand.20" margin="1.5rem" size="md">
                      Create Batch
                    </Heading>
                  </CardButtonSmall>

                  <CardButtonSmall href="/oems/manage_batch">
                    <Image
                      className={styles.image}
                      src="retailer-icon.svg"
                      alt="retailer image"
                    />
                    <Heading color="brand.20" margin="1.3rem" size="md">
                      Manage Batch
                    </Heading>
                  </CardButtonSmall>
                </SimpleGrid>
              </Box>
            </Flex>
          </DarkBackground>
        </Flex>
      </OemLayout>
    </>
  );
};

export default Dashboard;
