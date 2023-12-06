import { IconButton, ButtonGroup, Text, Flex } from "@chakra-ui/react";
import React from "react";
import { FaGithub, FaDiscord, FaTwitter, FaMedium } from "react-icons/fa";
import { SiGitbook } from "react-icons/si";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <Flex className={styles.footer}>
      <Flex className={styles.copyright}>
        <Text fontSize={["xs", "sm"]} color="brand.0">
          Copyright © {new Date().getFullYear()} EARENDEL LABS
        </Text>
      </Flex>

      <Flex className={styles["social-buttons"]}>
        <ButtonGroup variant="ghost" gap={4}>
          <IconButton
            as="a"
            href="https://twitter.com/BuzzkillNFT"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            icon={<FaTwitter fontSize="3rem" color="#e8f1f2" />}
            _hover={{ bg: "brand.40" }}
          />
          <IconButton
            as="a"
            href="https://discord.gg/WJXAHKdhtS"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Discord"
            icon={<FaDiscord fontSize="3rem" color="#e8f1f2" />}
            _hover={{ bg: "brand.40" }}
          />
          <IconButton
            as="a"
            href="https://earendel-labs.gitbook.io/buzzkilll-honeycomb-hustle/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Gitbook"
            icon={<SiGitbook fontSize="3rem" color="#e8f1f2" />}
            _hover={{ bg: "brand.40" }}
          />
          <IconButton
            as="a"
            href="https://github.com/earendel-labs"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Github"
            icon={<FaGithub fontSize="3rem" color="#e8f1f2" />}
            _hover={{ bg: "brand.40" }}
          />
        </ButtonGroup>
      </Flex>

      <Flex className={styles.legal}>
        <Text fontSize={["xs", "sm"]} color="brand.0">
          <a href="/privacy_policy" target="_blank" rel="noopener noreferrer">
            Privacy policy
          </a>
        </Text>
        <Text fontSize={["xs", "sm"]} color="brand.0">
          <a
            href="terms_and_conditions"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms &amp; conditions
          </a>
        </Text>
      </Flex>
    </Flex>
  );
};

export default Footer;
