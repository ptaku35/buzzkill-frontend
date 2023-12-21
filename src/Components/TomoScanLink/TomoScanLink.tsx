import { Box } from "@chakra-ui/react";


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
        style={{ color: "yellow", fontSize: "30px" }}
      >
        View on TomoScan Testnet
      </a>
    </Box>
    );
}

export default TomoScanLink;