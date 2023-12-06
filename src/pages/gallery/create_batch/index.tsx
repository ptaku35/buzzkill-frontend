import React, { useEffect, useState } from "react";
import OemLayout from "../../../Components/OemLayout/OemLayout";
import Head from "next/head";
import styles from "./create_batch.module.css";
import { ContractFactory } from "ethers";
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
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Formik, Field, ErrorMessage, FormikValues } from "formik";
import DarkBackground from "Components/DarkBackground/DarkBackground";

import useAppState from "../../../hooks/useAppState";
import { ethers } from "ethers";

import { app, database } from "../../../services/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  useWalletClient,
} from "wagmi";

import {
  Address,
  Hash,
  TransactionReceipt,
  createPublicClient,
  createWalletClient,
  custom,
  http,
  stringify,
} from "viem";
import "viem/window";
import batchContractJson from "../../../assets/BlocTraceConsignment.json";
import { avalancheFuji } from "wagmi/chains";

const publicClient = createPublicClient({
  chain: avalancheFuji,
  transport: http(),
});

const abi = batchContractJson.abi;
const bytecode = batchContractJson.bytecode as `0x${string}`;

const emptyBytes = ethers.utils.hexlify(ethers.constants.HashZero);
const data = "0x";
const URI =
  "https://gateway.pinata.cloud/ipfs/QmQ9AhKWuzrQidRbZY6UFD9tBKD1TAEBMARftecehQ3YYo";

const dbInstance = collection(database, "consignment");

const batchAddress = process.env.NEXT_PUBLIC_CONSIGNMENT_CONTRACT;
const contractConfig = {
  address: batchAddress,
  abi,
};

/*
  consignments_assigned: number;
  consignments_unverified: number;
  total_consignments: number;
  user_shippers_count: number;
*/

export default function create_batch() {
  const { user } = useAppState();
  const { address, isConnected } = useAccount();
  const toast = useToast();
  const { data: walletClient, isError, isLoading } = useWalletClient();

  const [hash, setHash] = useState<Hash>();
  const [receipt, setReceipt] = useState<TransactionReceipt>();
  useEffect(() => {
    const client = createWalletClient({
      chain: avalancheFuji,
      transport: custom(window.ethereum!),
    });
  }, []);
  // useEffect(() => {}, []);
  // const { config: contractWriteConfig } = usePrepareContractWrite({
  //   ...contractConfig,
  //   functionName: "mint",
  //   args: [address, 0, 1, data],
  // });
  // const {
  //   data: mintData,
  //   write: mint,
  //   isLoading: isMintLoading,
  //   isSuccess: isMintStarted,
  //   error: mintError,
  // } = useContractWrite(contractWriteConfig);

  const handleSubmit = async (values: FormikValues) => {
    try {
      if (!walletClient) {
        return toast({
          title: "No signer",
          description: "Please connect to a wallet",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }

      // Mint NFTs
      if (!address) return;
   
      const hash = await walletClient.deployContract({
        abi: abi,
        account: address,
        bytecode: bytecode,
      });
      let receipt;
    
      if (hash) {
        receipt = await publicClient.waitForTransactionReceipt({
          hash,
        });
        
      }

      toast({
        title: "Success",
        description: `Batch Created`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      const contractAddress = receipt?.contractAddress;

    
      try {
       
        //TODO: Need to add in a check so that batchID must be unique
        if (contractAddress) {
          addDoc(dbInstance, {
            batch_id: values.batch_id,
            batch_quantity: values.batch_quantity,
            batch_description: values.batch_description,
            product_name: values.product_name,
            product_id: values.product_id,
            profile_id_oem: user?.profileId,
            batch_contract_address: contractAddress,
            shipping_status: "unassigned",
            assigned_shipper: "",
            assigned_shipper_address: "",
          });
        } else {
          throw new Error("batch wasn't minted correctly");
        }
      } catch (error) {
        console.error("Error storing form data in the database:", error);
      }
    } catch (ex: any) {
      // Track Mint
      toast({
        title: "Error",
        description: ex.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  //TODO: Validate Data before submitting it
  function validate() {}
  return (
    <>
      <OemLayout>
        <Head>
          <title>BlocTrace OEMS - Create Batch</title>
          {/* <meta name="description" content="noindex,nofollow" /> */}
        </Head>

        <Heading
          className="heading"
          fontSize="5rem"
          color="brand.0"
          fontWeight="medium"
          textAlign="center"
        >
          CREATE BATCH
        </Heading>
        <Flex
          flexDirection={["column", "row"]}
          justify="center"
          gap="60px"
          marginBottom="30px"
        >
          {/* User balances */}
          <DarkBackground>
            <Box margin="100px">
              <Formik
                initialValues={{
                  batch_id: "",
                  batch_quantity: "",
                  batch_description: "",
                  product_name: "",
                  product_id: "",
                }}
                onSubmit={handleSubmit}
                validate={validate}
              >
                {(formik) => (
                  <form onSubmit={formik.handleSubmit}>
                    <FormLabel className={styles.label}>Batch ID</FormLabel>
                    <Field
                      as={Input}
                      name="batch_id"
                      type="text"
                      h="35px"
                      marginBottom="15px"
                      className={styles.input}
                      color="brand.20"
                      required
                    />
                    <ErrorMessage name="batch_id" component="div" />

                    <Box className={styles.formControl}>
                      <FormLabel className={styles.label}>
                        Batch Quantity
                      </FormLabel>
                      <Field
                        as={Input}
                        name="batch_quantity"
                        type="number"
                        h="35px"
                        marginBottom="15px"
                        className={styles.input}
                        color="brand.20"
                        required
                      />
                      <ErrorMessage name="batch_quantity" component="div" />
                    </Box>

                    <Box className={styles.formControl}>
                      <FormLabel className={styles.label}>
                        Batch Description
                      </FormLabel>
                      <Field
                        as={Input}
                        name="batch_description"
                        type="text"
                        h="35px"
                        marginBottom="15px"
                        className={styles.input}
                        color="brand.20"
                        required
                      />
                      <ErrorMessage name="batch_description" component="div" />
                    </Box>

                    <Box className={styles.formControl}>
                      <FormLabel className={styles.label}>
                        Product Name
                      </FormLabel>
                      <Field
                        as={Input}
                        name="product_name"
                        type="text"
                        h="35px"
                        marginBottom="15px"
                        className={styles.input}
                        color="brand.20"
                        required
                      />
                      <ErrorMessage name="product_name" component="div" />
                    </Box>

                    <Box className={styles.formControl}>
                      <FormLabel className={styles.label}>Product ID</FormLabel>
                      <Field
                        as={Input}
                        name="product_id"
                        type="text"
                        h="35px"
                        marginBottom="15px"
                        className={styles.input}
                        color="brand.20"
                        required
                      />
                      <ErrorMessage name="product_id" component="div" />
                    </Box>

                    <Button margin="20px" w="70%" type="submit">
                      Create Batch
                    </Button>
                  </form>
                )}
              </Formik>
            </Box>
          </DarkBackground>
        </Flex>
      </OemLayout>
    </>
  );
}
