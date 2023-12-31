import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
// import dynamic from "next/dynamic";
import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";
import { useDarkMode } from "usehooks-ts";
import { WagmiConfig } from "wagmi";
// import { Footer } from "~~/components/Footer";
// import { Header } from "~~/components/Header";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { useNativeCurrencyPrice } from "~~/hooks/scaffold-eth";
import { useGlobalState } from "~~/services/store/store";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";
import { appChains } from "~~/services/web3/wagmiConnectors";
import "~~/styles/globals.css";
import theme from "~~/theme";

// const AppBarDynamic = dynamic(() => import("~~/components/Appbar"), {
//   ssr: false,
// });

const ScaffoldEthApp = ({ Component, pageProps }: AppProps) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    setIsDarkTheme(isDarkMode);
  }, [isDarkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <WagmiConfig config={wagmiConfig}>
        <NextNProgress />
        <RainbowKitProvider
          chains={appChains.chains}
          avatar={BlockieAvatar}
          theme={isDarkTheme ? darkTheme() : lightTheme()}
        >
          <div id="root">
            {/* <Header /> */}
            {/* <AppBarDynamic /> */}
            <main>
              <Component {...pageProps} />
            </main>
            {/* <Footer /> */}
          </div>
          <Toaster />
        </RainbowKitProvider>
      </WagmiConfig>
    </ThemeProvider>
  );
};

export default ScaffoldEthApp;
