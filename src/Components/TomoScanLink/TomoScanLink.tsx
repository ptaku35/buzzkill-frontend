import { Box } from "@chakra-ui/react";
import styles from "./TomoScanLink.module.css";


interface TomoScanLinkProps {
    txHash: string | null | undefined;
}

const TomoScanLink = ({ txHash }: TomoScanLinkProps) => {
    if (!txHash) return null;

    return (
    <Box>
      <a
        href={`https://testnet.tomoscan.io/tx/${txHash}`}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.tomoscanlink}
      >
        View on TomoScan Testnet
      </a>
    </Box>
    );
}

export default TomoScanLink;