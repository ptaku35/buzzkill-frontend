import React from "react";
//import styles from "../styles/Home.module.css";
import OemLayout from "../../../Components/OemLayout/OemLayout";
import Head from "next/head";
import styles from "./add_shippers.module.css";

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
import { Formik, Field, ErrorMessage } from "formik";
import DarkBackground from "Components/DarkBackground/DarkBackground";
import ShipperProfile from "../../../types/Shipper";
import useAppState from "../../../hooks/useAppState";

import { app, database } from "../../../services/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  addDoc,
} from "firebase/firestore";

const dbInstance = collection(database, "shippers");

export default function add_shippers() {
  const { user } = useAppState();
  const toast = useToast();
  const handleSubmit = async (values) => {
   
    try {
      const q = query(
        collection(database, "shippers"),
        where("wallet_address", "==", values.wallet_address)
      );
   
      const querySnapshot = await getDocs(q);
      if (querySnapshot.size === 1) {
        const docRef = querySnapshot.docs[0].ref;
        updateDoc(docRef, {
          business_name: values.business_name,
          wallet_address: values.wallet_address,
          region: values.region,
          email_address: values.email_address,
          profile_id_oem: user.profileId,
        });
        toast({
          title: "Shipper Info Updated",
          description: "Shipper Information Updated Successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "bottom",
        });
    
      } else {
        addDoc(dbInstance, {
          business_name: values.business_name,
          wallet_address: values.wallet_address,
          region: values.region,
          email_address: values.email_address,
          profile_id_oem: user.profileId,
        });
      
        toast({
          title: "Shipper Info Added",
          description: "New Shipper Created Successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "bottom",
        });
      }
    } catch (error) {
      console.error("Error storing form data in the database:", error);
      toast({
        title: "Shipper Info Updated",
        description: error,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  //TODO: Validate Data before submitting it
  function validate() {}
  return (
    <>
      <OemLayout>
        <Head>
          <title>BlocTrace OEMS- add shippers</title>
          {/* <meta name="description" content="noindex,nofollow" /> */}
        </Head>

        <Heading
          className="heading"
          fontSize="5rem"
          color="brand.0"
          fontWeight="medium"
          textAlign="center"
        >
          ADD SHIPPERS
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
                  business_name: "",
                  wallet_address: "",
                  region: "",
                  email_address: "",
                }}
                onSubmit={handleSubmit}
                validate={validate}
              >
                {(formik) => (
                  <form onSubmit={formik.handleSubmit}>
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

                    <Box className={styles.formControl}>
                      <FormLabel className={styles.label}>
                        Wallet Address
                      </FormLabel>
                      <Field
                        as={Input}
                        name="wallet_address"
                        type="text"
                        h="35px"
                        marginBottom="15px"
                        className={styles.input}
                        color="brand.20"
                        required
                      />
                      <ErrorMessage name="wallet_address" component="div" />
                    </Box>

                    <Box className={styles.formControl}>
                      <FormLabel className={styles.label}>Region</FormLabel>
                      <Field
                        as={Input}
                        name="region"
                        type="text"
                        h="35px"
                        marginBottom="15px"
                        className={styles.input}
                        color="brand.20"
                        required
                      />
                      <ErrorMessage name="region" component="div" />
                    </Box>

                    <Box className={styles.formControl}>
                      <FormLabel className={styles.label}>
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

                    <Button margin="20px" w="70%" type="submit">
                      Add Shipper
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
