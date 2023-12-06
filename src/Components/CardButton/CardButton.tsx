import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./CardButton.module.css";
import { Box } from "@chakra-ui/react";

interface CardButtonProps {
  children: React.ReactNode;
  href: string;
}

const CardButton = ({ children, href }: CardButtonProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={href} passHref>
        <Box className={styles.cardButton} bg="brand.60">
          {children}
        </Box>
      </Link>
    </motion.div>
  );
};

export default CardButton;
