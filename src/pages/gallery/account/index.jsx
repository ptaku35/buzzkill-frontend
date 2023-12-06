import { getSession, signOut } from "next-auth/react";
import React from "react";
import { useEffect, useState } from "react";

import styles from "./account.module.css";
import OemLayout from "../../../Components/OemLayout/OemLayout";
import { useDisconnect } from "wagmi";
import Head from "next/head";
import {
  Box,
  Button,
  Flex,
  Heading,
  Badge,
  Text,
  Image,
  Input,
  HStack,
  FormControl,
  FormLabel,
  Select,
  VStack,
  useToast,
  Checkbox,
} from "@chakra-ui/react";
import DarkBackground from "Components/DarkBackground/DarkBackground";
import { Formik, Field, ErrorMessage, FieldArray } from "formik";

import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import FlipCard, { BackCard, FrontCard } from "Components/FlipCard/FlipCard";
import CardPlaceholder from "Components/CardPlaceholder/CardPlaceholder";
import oemContractJson from "../../../assets/BlocTraceOEM.json";
const abi = oemContractJson.abi;

const oemAddress = process.env.NEXT_PUBLIC_OEM_CONTRACT;
const contractConfig = {
  address: oemAddress,
  abi,
};
import { app, database } from "../../../services/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  addDoc,
} from "firebase/firestore";

const dbInstance = collection(database, "users");

// Validation function TO DO THIS DOES NOTHING
const validate = (values) => {
  const errors = {};

  // Perform validation logic and set errors object

  return errors;
};

// gets a prop from getServerSideProps
function account({ user }) {
  const [userData, setUserData] = useState(null);
  const { disconnect } = useDisconnect();

  const handleSignOut = () => {
    disconnect();
    signOut({ redirect: "/oems/sign_in" });
  };

  const [isOwned, setIsOwned] = useState(false);
  const { address, isConnected } = useAccount();
  const URI =
    "https://gateway.pinata.cloud/ipfs/QmX9UWRESfTfqzDCWHK1pzLq3tGbZMcW2qxpXSKYE8aqtb";
  const { config: contractWriteConfig } = usePrepareContractWrite({
    ...contractConfig,
    functionName: "safeMint",
    args: [address, URI],
  });

  const {
    data: mintData,
    write: mint,
    isLoading: isMintLoading,
    isSuccess: isMintStarted,
    error: mintError,
  } = useContractWrite(contractWriteConfig);

  const { data: userBalance } = useContractRead({
    ...contractConfig,
    functionName: "balanceOf",
    args: [address],
    watch: true,
  });

  React.useEffect(() => {
    if (userBalance > 0) {
      setIsOwned(true);
    } else {
      setIsOwned(false);
    }
  }, [userBalance]);

  const {
    data: txData,
    isSuccess: txSuccess,
    error: txError,
  } = useWaitForTransaction({
    hash: mintData?.hash,
  });

  const toast = useToast();

  const isMinted = txSuccess;

  // Handle form submission logic here
  const handleSubmit = async (values) => {
    try {
      const q = query(
        collection(database, "users"),
        where("profile_id", "==", values.profile_id)
      );

      const querySnapshot = await getDocs(q);
      if (querySnapshot.size === 1) {
        const docRef = querySnapshot.docs[0].ref;
        updateDoc(docRef, {
          profile_id: values.profile_id,
          wallet_address: values.wallet_address,
          business_name: values.business_name,
          business_number: values.business_number,
          business_category: values.business_category,
          email_address: values.email_address,
        });
        toast({
          title: "Account Updated",
          description: "Account Updated",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "bottom",
        });
      } else {
        addDoc(dbInstance, {
          profile_id: values.profile_id,
          wallet_address: values.wallet_address,
          business_name: values.business_name,
          business_number: values.business_number,
          business_category: values.business_category,
          email_address: values.email_address,
        });
      }
    } catch (error) {
      //   console.error("Error storing form data in the database:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collection(database, "users"),
          where("profile_id", "==", user.profileId)
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.size === 1) {
          const userData = querySnapshot.docs[0].data();

          setUserData(userData);
        }
      } catch (error) {
        console.error("Error retrieving user data from the database:", error);
      }
    };

    fetchData();
  }, [user.profileId]);

  return (
    <>
      <OemLayout>
        <Head>
          <title>
            BlocTrace Suppliers and Distributors - Account Management
          </title>
          {/* <meta name="description" content="noindex,nofollow" /> */}
        </Head>

        <Heading
          className="heading1"
          fontSize="5rem"
          color="brand.0"
          margin="16px"
          fontWeight="medium"
          textAlign="center"
        >
          Manage Account
        </Heading>
        <DarkBackground>
          <Flex flexDirection="row">
            {/* Column with image */}
            <Box margin="20px 70px 20px 70px">
              <FlipCard>
                <FrontCard isCardFlipped={isMinted}>
                  {isOwned ? (
                    <>
                      <Image
                        borderRadius="15px"
                        w="370px"
                        src="/nft_shield.svg"
                        alt="Image"
                      />
                      <Badge
                        fontSize="25px"
                        margin="40px 0px 0px 0px"
                        variant="solid"
                        colorScheme="green"
                      >
                        Account Verified
                      </Badge>
                    </>
                  ) : (
                    <>
                      <CardPlaceholder></CardPlaceholder>
                      <Badge
                        fontSize="25px"
                        margin="40px 0px 0px 0px"
                        variant="solid"
                        colorScheme="red"
                      >
                        UnVerified
                      </Badge>
                    </>
                  )}
                </FrontCard>
                <BackCard isCardFlipped={isMinted}>
                  <>
                    <Image
                      borderRadius="15px"
                      w="370px"
                      src="/nft_shield.svg"
                      alt="Image"
                    />
                    <Badge
                      fontSize="25px"
                      margin="40px 0px 0px 0px"
                      variant="solid"
                      colorScheme="green"
                    >
                      Account Verified
                    </Badge>
                  </>
                </BackCard>
              </FlipCard>
            </Box>

            {/* User data */}
            <Flex
              flexDirection="column"
              w="full"
              alignItems="left"
              margin="30px"
            >
              <Button
                variant="signout-button"
                onClick={handleSignOut}
                alignSelf="flex-end"
                w="50%"
              >
                Sign out
              </Button>
              <Formik
                initialValues={{
                  profile_id: userData?.profile_id || user.profileId,
                  wallet_address: userData?.wallet_address || user.address,
                  business_name: userData?.business_name || "",
                  business_number: userData?.business_number || "",
                  business_category: userData?.business_category || "",
                  email_address: userData?.email_address || "",
                  options: [], // Make sure this is an array
                }}
                onSubmit={handleSubmit}
                validate={validate}
              >
                {(formik) => (
                  <form onSubmit={formik.handleSubmit}>
                    <FormLabel className={styles.label}>Profile ID</FormLabel>
                    <Field
                      as={Input}
                      name="profile_id"
                      type="text"
                      isDisabled
                      h="35px"
                      marginBottom="15px"
                      className={styles.input}
                      color="brand.20"
                      required
                    />
                    <ErrorMessage name="profile_id" component="div" />

                    <Box className={styles.formControl}>
                      <FormLabel className={styles.label}>
                        Wallet Address
                      </FormLabel>
                      <Field
                        as={Input}
                        name="wallet_address"
                        type="text"
                        isDisabled
                        h="35px"
                        marginBottom="15px"
                        className={styles.input}
                        color="brand.20"
                        required
                      />
                      <ErrorMessage name="wallet_address" component="div" />
                    </Box>

                    <Box className={styles.formControl}>
                      <FormLabel className={styles.label}>
                        Business Name
                      </FormLabel>
                      <Field
                        as={Input}
                        name="business_name"
                        type="text"
                        h="35px"
                        marginBottom="15px"
                        className={styles.input}
                        color="brand.20"
                        required
                      />
                      <ErrorMessage name="business_name" component="div" />
                    </Box>

                    <Box className={styles.formControl}>
                      <FormLabel className={styles.label}>
                        Business Address
                      </FormLabel>
                      <Field
                        as={Input}
                        name="business_address"
                        type="text"
                        h="35px"
                        marginBottom="15px"
                        className={styles.input}
                        color="brand.20"
                        required
                      />
                      <ErrorMessage name="business_address" component="div" />
                    </Box>

                    <Box className={styles.formControl}>
                      <FormLabel className={styles.label}>
                        Australian Business Number
                      </FormLabel>
                      <Field
                        as={Input}
                        name="business_number"
                        type="text"
                        h="35px"
                        marginBottom="15px"
                        className={styles.input}
                        color="brand.20"
                        required
                      />
                      <ErrorMessage name="business_number" component="div" />
                    </Box>

                    <Box className={styles.formControl}>
                      <FormLabel className={styles.label}>
                        Type of Organization
                      </FormLabel>
                      <Field
                        as={Select}
                        name="business_category"
                        h="35px"
                        marginBottom="15px"
                        className={styles.input}
                        color="brand.20"
                        required
                      >
                        <option value="">Select category</option>
                        <option value="Grower">Grower</option>
                        <option value="Distributor">Distributor</option>
                        <option value="Manufacturer">Manufacturer</option>
                        <option value="Retailer">Retailer</option>
                      </Field>
                      <ErrorMessage name="business_category" component="div" />
                    </Box>

                    <Box className={styles.formControl}>
                      <FormLabel className={styles.label}>
                        License Number
                      </FormLabel>
                      <Field
                        as={Input}
                        name="license_number"
                        type="text"
                        h="35px"
                        marginBottom="15px"
                        className={styles.input}
                        color="brand.20"
                        required
                      />
                      <ErrorMessage name="license_number" component="div" />
                    </Box>

                    <Box className={styles.formControl}>
                      <FormLabel className={styles.label}>
                        License Issue Date
                      </FormLabel>
                      <Field
                        as={Input}
                        name="license_issue_date"
                        type="date"
                        h="35px"
                        marginBottom="15px"
                        className={styles.input}
                        color="brand.20"
                        required
                      />
                      <ErrorMessage name="license_issue_date" component="div" />
                    </Box>

                    <Box className={styles.formControl}>
                      <FormLabel className={styles.label}>
                        License Expiry Date
                      </FormLabel>
                      <Field
                        as={Input}
                        name="license_expiry_date"
                        type="date"
                        h="35px"
                        marginBottom="15px"
                        className={styles.input}
                        color="brand.20"
                        required
                      />
                      <ErrorMessage
                        name="license_expiry_date"
                        component="div"
                      />
                    </Box>

                    <Box className={styles.formControl}>
                      <FormLabel className={styles.label} marginTop="5px">
                        Email Address
                      </FormLabel>
                      <Field
                        as={Input}
                        name="email_address"
                        type="email"
                        h="35px"
                        marginBottom="15px"
                        className={styles.input}
                        color="brand.20"
                        required
                      />
                      <ErrorMessage name="email_address" component="div" />
                    </Box>
                    <Box className={styles.formControl}>
                      <FieldArray
                        name="options"
                        render={(arrayHelpers) => (
                          <VStack align="flex-start">
                            {[
                              "I consent to Bloctrace to verify my account details and licenses with the relevnat bodies"
                            ].map((option, index) => (
                              <Checkbox
                                key={index}
                                name="options"
                                value={option}
                                isChecked={formik.values.options.includes(
                                  option
                                )}
                                onChange={(e) => {
                                  if (e.target.checked)
                                    arrayHelpers.push(option);
                                  else
                                    arrayHelpers.remove(
                                      formik.values.options.indexOf(option)
                                    );
                                }}
                              >
                                <Text as="span" className={styles.label}>
                                  {option}
                                </Text>
                              </Checkbox>
                            ))}
                          </VStack>
                        )}
                      />
                      <ErrorMessage
                        name="options"
                        component="Text"
                        className={styles.error}
                      />
                    </Box>

                    <Button w="98%" type="submit">
                      Update Account
                    </Button>
                  </form>
                )}
              </Formik>

              {/* Form control */}
              {mintError &&
                toast({
                  title: "Error",
                  description: mintError.message,
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                  position: "bottom",
                })}
              {txError &&
                toast({
                  title: "Error",
                  description: txError.message,
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                  position: "bottom",
                })}
              {isOwned ? (
                <Button
                  marginTop="15px"
                  variant="disabled-button"
                  disabled={true}
                >
                  Account Verified
                </Button>
              ) : (
                <Button
                  marginTop="15px"
                  disabled={isMinted || !mint || isMintLoading || isMintStarted}
                  className="button"
                  data-mint-loading={isMintLoading}
                  data-mint-started={isMintStarted}
                  onClick={() => mint?.()}
                >
                  {isMintLoading && "Waiting for approval"}
                  {isMintStarted && "Verifying..."}
                  {!isMintLoading && !isMintStarted && "Apply for Verification"}
                </Button>
              )}
            </Flex>
          </Flex>
        </DarkBackground>
      </OemLayout>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  // redirect if not authenticated
  if (!session) {
    return {
      redirect: {
        destination: "/oems/sign_in",
        permanent: false,
      },
    };
  }

  return {
    props: { user: session.user },
  };
}

export default account;
