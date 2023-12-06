import { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import Head from "next/head";
import { Box, Image, Flex, IconButton } from "@chakra-ui/react";
import Container from "Components/Container/Container";
import { FaCircle } from "react-icons/fa"; // Make sure to install react-icons if you haven't already

const images = [
  "/ocean.png",
  "/mountain-world.png",
  "/forest.png",
  "/river.png",
  "/fire-volcano.png",
  "/desert.png",
  "/ice.webp",
];

export default function Gallery() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((currentImage) => (currentImage + 1) % images.length);
    }, 4000); // Rotate images every 4 seconds

    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <Layout>
      <Head>
        <title>Buzzkill Gallery</title>
      </Head>
      <Container fullWidth={true}>
        <Box position="relative" width="full" height="85vh" overflow="hidden">
          <Image
            src={images[currentImage]}
            alt="Gallery Image"
            borderRadius="0px"
            width="full"
            height="full"
            objectFit="cover"
            objectPosition="center center"
          />
          {/* Navigation dots */}
          <Flex
            justifyContent="center"
            position="absolute"
            bottom="3"
            width="full"
          >
            {images.map((_, index) => (
              <IconButton
                key={index}
                variant="ghost"
                aria-label={`Slide ${index}`}
                icon={<FaCircle />}
                size="sm"
                color={currentImage === index ? "#BC8E2D" : "whiteAlpha.500"}
                onClick={() => setCurrentImage(index)}
                _focus={{ boxShadow: "none" }}
                _hover={{
                  bgColor: "transparent", // Keeps the background transparent on hover
                  color: "#F4CA66", // Yellow color on hover
                }}
              />
            ))}
          </Flex>
        </Box>
      </Container>
    </Layout>
  );
}
