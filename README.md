
# Mandala : Ultimate Web3 Gaming Inventory
A game dev who is unfamiliar with web3 can easily create web3 games using the inventory. It provides the best advertising experience that will satisfy gamers, game dev and advertisers alike.



## Video
https://youtu.be/kxmdGah2Vvo

## What account abstraction SDK/API you used to qualify
we have used Biconomy SDK. We used Biconomy Social Login and Paymaster
## Linea Configured in codes

```js
const bundler: IBundler = new Bundler({
  bundlerUrl: "https://bundler.biconomy.io/api/v2/59140/abc", // you can get this value from biconomy dashboard.
  // bundlerUrl: "https://bundler.biconomy.io/api/v2/59140/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44", // you can get this value from biconomy dashboard.
  chainId: ChainId.LINEA_TESTNET,
  entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
});

const socialLoginSDK = new SocialLogin();
      const signature2 = await socialLoginSDK.whitelistUrl("https://nextjs-chunghosuk.vercel.app");
      await socialLoginSDK.init({
        chainId: ethers.utils.hexValue(ChainId.LINEA_TESTNET).toString(),
        network: "testnet",
        whitelistUrls: {
          "https://nextjs-chunghosuk.vercel.app": signature2,
        },
      });

const biconomySmartAccountConfig: BiconomySmartAccountConfig = {
        signer: web3Provider.getSigner(),
        chainId: ChainId.LINEA_TESTNET,
        bundler: bundler,
        paymaster: paymaster,
      };
```

## Linea Testnet Contracts

```env
NEXT_PUBLIC_ACCOUNT_CONTRACT_ADDRESS=0xeBeEd9ad8C439601cfA997Df05ED00A2167462A0
NEXT_PUBLIC_REGISTRY_CONTRACT_ADDRESS=0x232579308a3673859Fe795d9FE4076b9f0480D33
NEXT_PUBLIC_NFTFACTORY_CONTRACT_ADDRESS=0x741893c7AFC4fD48897DF9B2a2b2DF979Ba4C10d
NEXT_PUBLIC_1155_ADDRESS=0xd079F8118accead9500da1789211C59f9082a420
NEXT_PUBLIC_GAME1_ADDRESS=0xc35ff703651C77d40D67a1BbE5c48B05AEd2116d
NEXT_PUBLIC_GAME2_ADDRESS=0x399976a281bc8554973E01b70AFc426f4dED0f5B
```
## Demo
https://nextjs-chunghosuk.vercel.app/


## Sample Game
DEOMO : https://ethconkorea2023.github.io/sample-game/
REPO : https://github.com/EthconKorea2023/sample-game

### 🏗 Scaffold-ETH 2



## Contributing to Scaffold-ETH 2

We welcome contributions to Scaffold-ETH 2!

Please see [CONTRIBUTING.MD](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/CONTRIBUTING.md) for more information and guidelines for contributing to Scaffold-ETH 2.
