import { React, useState, useEffect } from "react";
import useAppState from "../../../hooks/useAppState";
//import styles from "../styles/Home.module.css";
import OemLayout from "../../../Components/OemLayout/OemLayout";

import { ConsignmentDetails } from "../../../types/ConsignmentData";
import { ShipperProfile } from "../../../types/Shipper";

import Head from "next/head";
import {
  Box,
  Button,
  Flex,
  Link,
  Grid,
  GridItem,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  Select,
  NumberInputField,
  Spacer,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import {
  Formik,
  Field,
  ErrorMessage,
  FormikValues,
  formikHandleChange,
} from "formik";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  useWalletClient,
} from "wagmi";

import DarkBackground from "Components/DarkBackground/DarkBackground";
import BlocTraceConsignment from "../../../assets/BlocTraceConsignment.json";

const abi = BlocTraceConsignment.abi;

import { useDebounce } from "usehooks-ts";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import { app, database } from "../../../services/firebase";

export default function manage_batch() {
  const [tokenId, setTokenId] = useState("");
  const debouncedTokenId = useDebounce(tokenId);

  const {
    user,
    userProfile,
    isVerified,
    userConsignmentData,
    fetchConsignmentData,
    querySnapshotConsignments,
    querySnapshotShippers,
  } = useAppState();
  const toast = useToast();
  const [selectedConsignment, setSelectedConsignment] = useState(null);
  const [selectedShipper, setSelectedShipper] = useState(null);
  const [consignmentData, setConsignmentData] = useState(null);
  const [mintArgs, setMintArgs] = useState([
    "0x74dAf3200065Fd4f7ce44f886f05ECF1eb06C672",
    0,
    0,
    "",
  ]);
  const [contractAddress, setContractAddress] = useState(null);

  useEffect(() => {
    if (selectedConsignment) {
      setContractAddress(selectedConsignment.batch_contract_address);
    }
  }, [selectedConsignment]);

  // update selected shipper and selected consignments
  useEffect(() => {
    if (selectedShipper && selectedConsignment) {
      setMintArgs([
        selectedShipper.wallet_address,
        0,
        selectedConsignment.batch_quantity,
        "",
      ]);
    }
  }, [selectedShipper, selectedConsignment]);

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: selectedConsignment?.batch_contract_address,
    abi: abi,
    functionName: "mint",
    args: mintArgs,
    enabled: Boolean(mintArgs),
  });
  const {
    write: mint,
    isLoading: isMintLoading,
    isSuccess: isMintStarted,
    isError: isMintError,
    error: mintError,
    data: mintData,
  } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: mintData?.hash,
  });

  const submit = async (values) => {
    try {
      // Prepare contract for sending

      // Trigger minting process
      mint?.();

      // Show toast notification for minting process
      toast({
        title: "Minting Started",
        description: "The minting process has started.",
        status: "info",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error occurred:", error);
      // Show error toast notification
      toast({
        title: "Error",
        description: "An error occurred during the minting process.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const updateDatabase = async () => {
      if (isSuccess) {
        toast({
          title: "Minting Completed",
          description: "The minting process has been completed successfully.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });

        // Trigger database update for the document
        const q = query(
          collection(database, "consignment"),
          where("batch_id", "==", selectedConsignment.batch_id)
        );
        const querySnapshot = await getDocs(q);
        const consignmentRef = querySnapshot.docs[0].ref;

        await updateDoc(consignmentRef, {
          shipping_status: "assigned",
          assigned_shipper: selectedShipper.business_name,
          assigned_shipper_address: selectedShipper.wallet_address,
        });

        selectedConsignment.shipping_status = "assigned";
        selectedConsignment.assigned_shipper = selectedShipper.business_name;

        // Show success toast notification for database update
        toast({
          title: "Database Update",
          description: "The document has been updated successfully.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      }
    };

    updateDatabase();
  }, [isSuccess]); // Depend on isSuccess

  useEffect(() => {
    const isDisabled =
      !mint || isLoading || selectedConsignment?.shipping_status === "assigned";
  }, [mint, isLoading, selectedConsignment?.shipping_status]);
  return (
    <>
      <OemLayout>
        <Head>
          <title>BlocTrace OEMS - Manage Batch</title>
          {/* <meta name="description" content="noindex,nofollow" /> */}
        </Head>

        <Heading
          className="heading"
          fontSize="5rem"
          color="brand.0"
          fontWeight="medium"
          textAlign="center"
        >
          MANAGE BATCH
        </Heading>
        <Flex
          flexDirection={["column", "row"]}
          justify="center"
          gap="60px"
          marginBottom="30px"
        >
          {/* User balances */}
          <DarkBackground>
            <Box display="flex" flexDirection="column">
              <Box height="50px" mt={20} pl={15} pr={15}>
                <Flex
                  flexDirection="row"
                  justifyContent="space-between"
                  gap={2}
                >
                  <Heading
                    className="label"
                    fontSize="28px"
                    textAlign="right"
                    fontWeight="normal"
                  >
                    Batch ID{" "}
                  </Heading>
                  <Heading
                    className="label"
                    fontSize="28px"
                    textAlign="right"
                    fontWeight="normal"
                  >
                    Product Name{" "}
                  </Heading>
                  <Heading
                    className="label"
                    fontSize="28px"
                    textAlign="right"
                    fontWeight="normal"
                  >
                    Product ID{" "}
                  </Heading>
                  <Heading
                    className="label"
                    fontSize="28px"
                    textAlign="right"
                    fontWeight="normal"
                  >
                    Quantity{" "}
                  </Heading>
                  <Heading
                    className="label"
                    fontSize="28px"
                    textAlign="right"
                    fontWeight="normal"
                  >
                    Shipping Status{" "}
                  </Heading>
                  <Heading
                    className="label"
                    fontSize="28px"
                    textAlign="right"
                    fontWeight="normal"
                  >
                    Assigned To{" "}
                  </Heading>
                </Flex>
              </Box>
              <Box height="100px" mt={5} mb={20} pl={15} pr={15}>
                <Flex
                  flexDirection="row"
                  justifyContent="space-between"
                  gap={2}
                >
                  <Heading
                    className="label"
                    fontSize="24px"
                    textAlign="right"
                    fontWeight="normal"
                  >
                    {selectedConsignment?.batch_id}
                  </Heading>
                  <Heading
                    className="label"
                    fontSize="24px"
                    textAlign="right"
                    fontWeight="normal"
                  >
                    {selectedConsignment?.product_name}
                  </Heading>
                  <Heading
                    className="label"
                    fontSize="24px"
                    textAlign="right"
                    fontWeight="normal"
                  >
                    {selectedConsignment?.product_id}
                  </Heading>
                  <Heading
                    className="label"
                    fontSize="24px"
                    textAlign="right"
                    fontWeight="normal"
                  >
                    {selectedConsignment?.batch_quantity}
                  </Heading>
                  <Heading
                    className="label"
                    fontSize="24px"
                    textAlign="right"
                    fontWeight="normal"
                  >
                    {selectedConsignment?.shipping_status}
                  </Heading>
                  <Heading
                    className="label"
                    fontSize="24px"
                    textAlign="right"
                    fontWeight="normal"
                  >
                    {selectedConsignment?.assigned_shipper
                      ? selectedConsignment.assigned_shipper
                      : "NA"}
                  </Heading>
                </Flex>
              </Box>
              <Box height="100px" mt={20} mb={20} pl={15}>
                <Flex
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  width="100%"
                >
                  <Formik
                    initialValues={{
                      batch_id: "",
                      shipper_id: "",
                    }}
                  >
                    {(formik) => (
                      <form>
                        <Flex
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <FormControl id="batchId" mr={4}>
                            <FormLabel color="white">Batch ID</FormLabel>
                            <Field
                              as={Select}
                              onChange={(e) => {
                                const selectedBatchId = e.target.value;
                                const selectedConsignmentData =
                                  querySnapshotConsignments?.docs
                                    .find(
                                      (doc) =>
                                        doc.data().batch_id === selectedBatchId
                                    )
                                    ?.data();
                                setSelectedConsignment(selectedConsignmentData);
                                if (selectedShipper && selectedConsignment) {
                                  setMintArgs([
                                    selectedShipper.wallet_address,
                                    0,
                                    selectedConsignment.batch_quantity,
                                    "",
                                  ]);
                                }
                              }}
                              name="batchId"
                              width="98%"
                              height="40px"
                              color="white"
                              placeholder="Select Batch ID"
                            >
                              {querySnapshotConsignments &&
                              querySnapshotConsignments.docs.length > 0 ? (
                                querySnapshotConsignments.docs.map((doc) => {
                                  const consignmentData = doc.data();
                                  return (
                                    <option
                                      key={doc.id}
                                      value={consignmentData.batch_id}
                                    >
                                      {consignmentData.batch_id}
                                    </option>
                                  );
                                })
                              ) : (
                                <option value="">
                                  No Consignments to allocate
                                </option>
                              )}
                            </Field>
                          </FormControl>
                          <FormControl id="Shipper" ml={4}>
                            <FormLabel color="white">Shipper</FormLabel>
                            <Field
                              as={Select}
                              onChange={(e) => {
                                const selectedShipperWalletAddress =
                                  e.target.value;
                                const selectedShipperData =
                                  querySnapshotShippers?.docs
                                    .find(
                                      (doc) =>
                                        doc.data().wallet_address ===
                                        selectedShipperWalletAddress
                                    )
                                    ?.data();
                                setSelectedShipper(selectedShipperData);
                                if (selectedShipper && selectedConsignment) {
                                  setMintArgs([
                                    selectedShipper.wallet_address,
                                    0,
                                    selectedConsignment.batch_quantity,
                                    "",
                                  ]);
                                }
                              }}
                              name="shipper"
                              width="98%"
                              height="40px"
                              color="white"
                              placeholder="Select Shipper"
                            >
                              {querySnapshotShippers &&
                              querySnapshotShippers.size > 0 ? (
                                querySnapshotShippers.docs.map((doc) => {
                                  const shipper = doc.data();
                                  return (
                                    <option
                                      key={shipper.wallet_address}
                                      value={shipper.wallet_address}
                                    >
                                      {shipper.business_name}
                                    </option>
                                  );
                                })
                              ) : (
                                <option value="">No shippers found</option>
                              )}
                            </Field>
                          </FormControl>
                        </Flex>
                        {selectedConsignment?.shipping_status === "assigned" ? (
                          <Button
                            margin="10px 0px 20px 0px"
                            w="100%"
                            variant="disabled-button"
                            disabled={true}
                          >
                            Batch Assigned
                          </Button>
                        ) : (
                          <Button
                            margin="10px 0px 20px 0px"
                            w="100%"
                            onClick={() => {
                              submit();
                            }}
                            disabled={!mint || isLoading}
                            variant={
                              selectedConsignment?.shipping_status ===
                              "assigned"
                                ? "disabled-button"
                                : "button-gradient"
                            }
                          >
                            {isLoading ? "Assigning..." : "Assign Batch"}
                          </Button>
                        )}
                        {isSuccess && (
                          <Box>
                            <Text className="body">
                              Successfully assigned batch
                            </Text>
                            <Box>
                              <Link
                                className="body"
                                color="white"
                                href={`https://testnet.snowtrace.io/tx/${mintData?.hash}`}
                                isExternal
                              >
                                Click here to see transaction on Snowtrace
                              </Link>
                            </Box>
                          </Box>
                        )}
                        {(isPrepareError || isMintError) && (
                          <Box>
                            <Text className="body" color="red.500">
                              Error: {(prepareError || mintError)?.message}
                            </Text>
                          </Box>
                        )}
                      </form>
                    )}
                  </Formik>
                </Flex>
              </Box>
            </Box>
          </DarkBackground>
          {/* Mint Tokens */}
        </Flex>
      </OemLayout>
    </>
  );
}
