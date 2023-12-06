//import styles from "../styles/Home.module.css";
import Layout from "../../Components/Layout/Layout";
import Head from "next/head";
import { Box, Flex, Heading, Image } from "@chakra-ui/react";

export default function ProductMakers() {
  return (
    <>
      <Layout>
        <Head>
          <title>BlocTrace - Product Makers</title>
          {/* <meta name="description" content="noindex,nofollow" /> */}
        </Head>
        <Flex justifyContent="center" direction="column">
          <Heading
            as="h2"
            fontSize="5rem"
            color="brand.0"
            fontWeight="medium"
            size="lg"
            p="2rem"
            mb="1rem"
            textAlign="center"
          >
            Product Makers
          </Heading>

          <Box
            display="flex"
            p="2px 0px 10px 0px"
            justifyContent="center"
            alignItems="center"
          >
            <Image
              src="/product_makers_background.png"
              alt="Image"
              borderRadius="15px"
              w="1200px"
            />
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              textAlign="center"
            >
              <Heading
                as="h2"
                fontSize="5rem"
                color="brand.0"
                fontWeight="medium"
                size="lg"
                p="32rem"
                mb="1rem"
                textAlign="center"
              >
                COMING SOON
              </Heading>
            </Box>
          </Box>
        </Flex>
      </Layout>
    </>
  );
}
