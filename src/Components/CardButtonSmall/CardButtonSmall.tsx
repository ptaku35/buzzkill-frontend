import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./CardButtonSmall.module.css";
import { Box } from "@chakra-ui/react";

interface CardButtonSmallProps {
  children: React.ReactNode;
  href: string;
}

const CardButtonSmall = ({ children, href }: CardButtonSmallProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={href} passHref>
        <Box className={styles.CardButtonSmall} bg="#13243A"
         width="200px"  
         height="150px" >
          {children}
        </Box>
      </Link>
    </motion.div>
  );
};

export default CardButtonSmall;
