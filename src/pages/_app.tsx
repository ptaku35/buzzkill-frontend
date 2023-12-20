import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { AppStateProvider } from "../hooks/useAppState";

import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  DisclaimerComponent,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";

import {
  injectedWallet,
  rainbowWallet,
  walletConnectWallet,
  metaMaskWallet,
  ledgerWallet,
  coin98Wallet,
} from "@rainbow-me/rainbowkit/wallets";
import { vicTestNet, vicMainnet } from "../libs/chains";
import { createConfig, configureChains, WagmiConfig } from "wagmi";

import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";

import { SessionProvider } from "next-auth/react";

//import MainLayout from "../layout/mainLayout";
import { useRouter } from "next/router";

import myTheme from "../theme/theme";

// FONT FOR WEB APP & CHAKRA UI
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "../styles/globals.css";

import { Session } from "next-auth";
import { LoadingProvider } from "contexts/LoadingContext";

const walletConnectProjectId: string | undefined =
  process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;

const infuraApiKey: string | undefined = process.env.NEXT_PUBLIC_INFURA_API_KEY;

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [vicTestNet, vicMainnet],
  [infuraProvider({ apiKey: infuraApiKey! }), publicProvider()]
);

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      injectedWallet({ chains }),
      coin98Wallet({ projectId: walletConnectProjectId!, chains }),
      metaMaskWallet({
        projectId: walletConnectProjectId!,
        chains,
        shimDisconnect: true,
      }),
      rainbowWallet({ projectId: walletConnectProjectId!, chains }),
      walletConnectWallet({ projectId: walletConnectProjectId!, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors,
});

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  const router = useRouter();

  return (
    <ChakraProvider theme={myTheme}>
      <WagmiConfig config={wagmiConfig}>
        <SessionProvider refetchInterval={0} session={pageProps.session}>
          <RainbowKitProvider
            theme={darkTheme({
              accentColor: "#BC8E2D",
              accentColorForeground: "white",
              borderRadius: "medium",
              fontStack: "system",
            })}
            modalSize="wide"
            initialChain={parseInt(process.env.NEXT_PUBLIC_DEFAULT_CHAIN!)}
            chains={chains}
          >
            <AppStateProvider>
              <LoadingProvider>
                <Component {...pageProps} />
              </LoadingProvider>
            </AppStateProvider>
          </RainbowKitProvider>
        </SessionProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
}

export default MyApp;
{
  /* <MainLayout>
<Component {...pageProps} />
</MainLayout> */
}
