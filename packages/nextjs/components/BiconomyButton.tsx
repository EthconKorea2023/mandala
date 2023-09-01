import { useEffect, useRef, useState } from "react";
import { useMandalaStore } from "../utils/mandalaStore";
import "@Biconomy/web3-auth/dist/src/style.css";
// import "@Biconomy/web3-auth/dist/src/style.css";
import { BiconomySmartAccount, BiconomySmartAccountConfig, DEFAULT_ENTRYPOINT_ADDRESS } from "@biconomy/account";
import { Bundler, IBundler } from "@biconomy/bundler";
import { ChainId } from "@biconomy/core-types";
import { BiconomyPaymaster, IPaymaster } from "@biconomy/paymaster";
import SocialLogin from "@biconomy/web3-auth";
import { Button } from "@mui/material";
import { ethers } from "ethers";
import type { NextPage } from "next";


console.log(ChainId.LINEA_TESTNET);

const bundler: IBundler = new Bundler({
  bundlerUrl: "https://bundler.biconomy.io/api/v2/59140/abc", // you can get this value from biconomy dashboard.
  // bundlerUrl: "https://bundler.biconomy.io/api/v2/59140/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44", // you can get this value from biconomy dashboard.
  chainId: ChainId.LINEA_TESTNET,
  entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
});

const paymaster: IPaymaster = new BiconomyPaymaster({
  paymasterUrl: process.env.NEXT_PUBLIC_BICONOMY_PAYMASTER_URL || "",
});

const Test: NextPage = () => {
  const [smartAccount, setSmartAccount] = useState<any>(null);
  const [interval, enableInterval] = useState(false);
  const sdkRef = useRef<SocialLogin | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [provider, setProvider] = useState<any>(null);
  const [address, setAddress] = useState<string>("");

  const setBiconomySmartAccount = useMandalaStore(state => state.setBiconomySmartAccount);

  useEffect(() => {
    let configureLogin: any;
    if (interval) {
      configureLogin = setInterval(() => {
        if (!!sdkRef.current?.provider) {
          setupSmartAccount();
          clearInterval(configureLogin);
        }
      }, 1000);
    }
  }, [interval]);

  async function login() {
    if (!sdkRef.current) {
      const socialLoginSDK = new SocialLogin();
      //TODO: also add the deployment url to the whitelist
      const signature1 = await socialLoginSDK.whitelistUrl("http://localhost:3000/");
      await socialLoginSDK.init({
        chainId: ethers.utils.hexValue(ChainId.LINEA_TESTNET).toString(),
        network: "testnet",
        whitelistUrls: {
          "http://localhost:3000/": signature1,
        },
      });
      sdkRef.current = socialLoginSDK;
    }
    if (!sdkRef.current.provider) {
      sdkRef.current.showWallet();
      enableInterval(true);
    } else {
      setupSmartAccount();
    }
  }

  async function setupSmartAccount() {
    if (!sdkRef?.current?.provider) return;
    sdkRef.current.hideWallet();
    setLoading(true);
    const web3Provider = new ethers.providers.Web3Provider(sdkRef.current.provider);
    setProvider(web3Provider);

    try {
      const biconomySmartAccountConfig: BiconomySmartAccountConfig = {
        signer: web3Provider.getSigner(),
        chainId: ChainId.LINEA_TESTNET,
        bundler: bundler,
        paymaster: paymaster,
      };
      let biconomySmartAccount = new BiconomySmartAccount(biconomySmartAccountConfig);
      biconomySmartAccount = await biconomySmartAccount.init();
      setAddress(await biconomySmartAccount.getSmartAccountAddress());
      setSmartAccount(biconomySmartAccount);
      setBiconomySmartAccount(biconomySmartAccount);
      console.log(biconomySmartAccount);
      setLoading(false);
    } catch (err) {
      console.log("error setting up smart account... ", err);
    }
  }

  const logout = async () => {
    if (!sdkRef.current) {
      console.error("Web3Modal not initialized.");
      return;
    }
    await sdkRef.current.logout();
    sdkRef.current.hideWallet();
    setSmartAccount(null);
    setAddress("");
    enableInterval(false);
  };

  useEffect(() => {
    if (address && provider) {
    }
  }, [address, provider]);

  return (
    <>
      {!smartAccount ? (
        <Button
          color="primary"
          variant="contained"
          sx={
            {
              // backgroundColor: "red",
            }
          }
          onClick={login}
        >
          Connect to Web3
        </Button>
      ) : (
        <Button onClick={logout}>Logout</Button>
      )}
    </>
  );
};

export default Test;
