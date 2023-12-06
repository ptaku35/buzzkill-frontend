import { MoralisNextApi } from "@moralisweb3/next";

export default MoralisNextApi({
  apiKey: process.env.MORALIS_API_KEY!,
  authentication: {
    domain: process.env.NEXT_DOMAIN_NAME!,
    uri: process.env.NEXTAUTH_URL!,
    timeout: 120,
  },
});
