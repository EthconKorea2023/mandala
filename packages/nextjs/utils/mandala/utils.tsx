import accountABI from "../AccountABI.json";
import ERC1155OneRingABI from "../ERC1155OneRing.json";
import abi from "../NFTContractABI.json";
import { IHybridPaymaster, PaymasterMode, SponsorUserOperationDto } from "@biconomy/paymaster";
import axios from "axios";
import { ethers } from "ethers";
import { useMandalaStore } from "~~/utils/mandalaStore";

const NFTAddress1 = process.env.NEXT_PUBLIC_GAME1_ADDRESS;
const NFTAddress2 = process.env.NEXT_PUBLIC_GAME2_ADDRESS;
const itemAddress = process.env.NEXT_PUBLIC_1155_ADDRESS;

export const listContract = async (contractName: string, address: string, type: string) => {
  const authToken = process.env.NEXT_PUBLIC_BICONOMY_AUTH_TOKEN;

  const listABI = JSON.stringify(accountABI);
  const methods = ["execute"];

  const { data } = await axios.post(
    "https://paymaster-dashboard-backend.prod.biconomy.io/api/v2/public/sdk/smart-contract",
    {
      name: contractName,
      address: address,
      abi: listABI,
      whitelistedMethods: methods,
    },
    {
      headers: {
        authToken: authToken.toString(),
        apiKey: process.env.NEXT_PUBLIC_BICONOMY_API_KEY,
      },
    },
  );
  //"7sckG4xq_.ad9290cd-df7a-4a4d-aae5-565280e35ab3"
  console.log(data);
};

// 처음 접속한 유저가 , character 와 inventory 를 만들어 놓지 않았다면, mockCharacters 를 만들어주기
export async function createMockCharacters(NFTAddress1, NFTAddress2, itemAddress) {
  const customProvider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_INFURA_LINEA);
  const signer = new ethers.Wallet(process.env.NEXT_PUBLIC_PRIVATE_KEY, customProvider);

  const test = await mintAndCreateTBA(NFTAddress1);
  console.log(test);

  const test2 = await mintAndCreateTBA(NFTAddress2);
  console.log(test2);

  const contract = new ethers.Contract(NFTAddress1, abi, signer);
  const totalSupply = await contract.totalSupply();

  const tmpTBAAddress = await contract.showTBA(totalSupply);
  await listContract(`Gollum${totalSupply}th`, tmpTBAAddress, "Account");

  const contract2 = new ethers.Contract(NFTAddress2, abi, signer);
  const totalSupply2 = await contract2.totalSupply();

  const tmpTBAAddress2 = await contract2.showTBA(totalSupply2);
  await listContract(`SampleCharacter${totalSupply2}th`, tmpTBAAddress2, "Account");

  const contract1155 = new ethers.Contract(itemAddress, ERC1155OneRingABI.output.abi, signer);

  const contractWithSigner = contract1155.connect(signer);

  const tx = await contractWithSigner.mint(tmpTBAAddress, 0, 1, []);

  const rc = await tx.wait();

  console.log(rc);

  //   setMockCharacters(true);
}

export async function mintAndCreateTBA(nftAddress) {
  const smartAccount = useMandalaStore.getState().biconomySmartAccount;
  const incrementTx = new ethers.utils.Interface(["function mintMultiple (address, uint256)"]);
  const data = incrementTx.encodeFunctionData("mintMultiple", [smartAccount.address.toString(), 1]);
  const tx = {
    to: nftAddress,
    data: data,
  };

  let partialUserOp = await smartAccount.buildUserOp([tx]);

  const biconomyPaymaster = smartAccount.paymaster as IHybridPaymaster<SponsorUserOperationDto>;

  let paymasterServiceData: SponsorUserOperationDto = {
    mode: PaymasterMode.SPONSORED,
    // optional params...
  };
  const paymasterAndDataResponse = await biconomyPaymaster.getPaymasterAndData(partialUserOp, paymasterServiceData);
  partialUserOp.paymasterAndData = paymasterAndDataResponse.paymasterAndData;

  const userOpResponse = await smartAccount.sendUserOp(partialUserOp);
  const transactionDetails = await userOpResponse.wait();
  return transactionDetails;
}

// 1155 절대반지를 gollum 인벤토리 에게서 샘플캐릭터 인벤토리로 transfer 해주기
export async function transferOneRing(from, to) {
  const smartAccount = useMandalaStore.getState().biconomySmartAccount;
  // transfer one ring from gollum to link

  //From, to, tokenId
  const itemTx = new ethers.utils.Interface(["function safeTransferFrom (address, address, uint256, uint256, bytes)"]);
  const itemData = itemTx.encodeFunctionData("safeTransferFrom", [from, to, 0, 1, []]);
  // const itemData = itemTx.encodeFunctionData("safeTransferFrom", [TBAAddress1, TBAAddress2, 0, 1, []]);
  // const itemData = itemTx.encodeFunctionData("safeTransferFrom", [TBAAddress2, TBAAddress1, 0, 1, []]);

  //대상이 될 ITEM NFC Contract, value(보낼 eth), data, opcode(0으로 보내야함)
  const incrementTx = new ethers.utils.Interface(["function execute (address, uint256, bytes, uint256)"]);
  const data = incrementTx.encodeFunctionData("execute", [itemAddress.toString(), 0, itemData.toString(), 0]);
  console.log("data is", data);
  const tx1 = {
    to: from,
    data: data,
  };

  let partialUserOp = await smartAccount.buildUserOp([tx1]);

  const biconomyPaymaster = smartAccount.paymaster as IHybridPaymaster<SponsorUserOperationDto>;

  let paymasterServiceData: SponsorUserOperationDto = {
    mode: PaymasterMode.SPONSORED,
    // optional params...
  };

  const paymasterAndDataResponse = await biconomyPaymaster.getPaymasterAndData(partialUserOp, paymasterServiceData);
  partialUserOp.paymasterAndData = paymasterAndDataResponse.paymasterAndData;

  const userOpResponse = await smartAccount.sendUserOp(partialUserOp);
  const transactionDetails = await userOpResponse.wait();

  console.log(userOpResponse);

  console.log("Transaction Details:", transactionDetails);
  console.log("Transaction Hash:", userOpResponse.userOpHash);
  console.log("transfer one ring");

  return transactionDetails;
}

export async function whoHasTheOneRing() {
  const customProvider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_INFURA_LINEA);
  const signer = new ethers.Wallet(process.env.NEXT_PUBLIC_PRIVATE_KEY, customProvider);
  // Connect to the contract using the contract address and the ABI
  const contract = new ethers.Contract(itemAddress, ERC1155OneRingABI.output.abi, signer);

  const tokenId = 0; // The token id you want to check

  const [TBAAddress1, TBAAddress2] = await getTokenIDArrayForEachContract();

  // Call the ownerOf function of the ERC721 contract
  const balance = await contract.balanceOf(TBAAddress1, tokenId);

  console.log(`${TBAAddress1} : ${balance.toNumber()}`);

  const balance2 = await contract.balanceOf(TBAAddress2, tokenId);

  console.log(`${TBAAddress2} : ${balance2.toNumber()}`);
}

export async function isOwnRing(TBAAddress) {
  const customProvider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_INFURA_LINEA);
  const signer = new ethers.Wallet(process.env.NEXT_PUBLIC_PRIVATE_KEY, customProvider);
  // const smartAccount = useMandalaStore.getState().biconomySmartAccount;
  // Connect to the contract using the contract address and the ABI
  const contract = new ethers.Contract(itemAddress, ERC1155OneRingABI.output.abi, signer);

  const balance = await contract.balanceOf(TBAAddress, 0);

  return balance.toNumber() > 0;
}

export async function getTBAForEachCharacter() {
  const smartAccount = useMandalaStore.getState().biconomySmartAccount;
  //get my token id
  const customProvider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_INFURA_LINEA);
  const signer = new ethers.Wallet(process.env.NEXT_PUBLIC_PRIVATE_KEY, customProvider);

  const tmpArr = [];

  const contract = new ethers.Contract(NFTAddress1, abi, signer);
  const tokenID = await getTokenIDByAddress(contract, smartAccount.address);
  if (tokenID) {
    const TBAAddress1 = await contract.showTBA(tokenID);
    tmpArr.push(TBAAddress1.toLowerCase());
  }

  const contract2 = new ethers.Contract(NFTAddress2, abi, signer);
  const tokenID2 = await getTokenIDByAddress(contract2, smartAccount.address);
  if (tokenID2) {
    const TBAAddress2 = await contract2.showTBA(tokenID2);
    tmpArr.push(TBAAddress2.toLowerCase());
  }

  return tmpArr;
}

export async function getTokenIDByAddress(contract, smartAccountAddress) {
  // const contract = new ethers.Contract(NFTAddress1, abi, signer);
  const totalSupply = await contract.totalSupply();
  // console.log(totalSupply.toNumber());
  const length = totalSupply.toNumber();
  for (let index = length; index > 0; index--) {
    const element = await contract.ownerOf(index);
    // console.log(typeof element);
    if (element.toLowerCase() == smartAccountAddress) {
      console.log(index);
      // tmp.push(index);
      return index;
    }
  }
}

export async function test() {
  // get token uri of 721
  const customProvider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_INFURA_LINEA);
  const signer = new ethers.Wallet(process.env.NEXT_PUBLIC_PRIVATE_KEY, customProvider);

  const contract = new ethers.Contract(NFTAddress1, abi, signer);
  // const tokenID = await getTokenIDByAddress(contract, signer.address);
  const tokenURI = await contract.getTokenURI();
  console.log(tokenURI);
}

export async function getTokenURIForEachCharacter() {
  // get token uri of 721
  const customProvider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_INFURA_LINEA);
  const signer = new ethers.Wallet(process.env.NEXT_PUBLIC_PRIVATE_KEY, customProvider);

  const contract = new ethers.Contract(NFTAddress1, abi, signer);
  // const tokenID = await getTokenIDByAddress(contract, signer.address);
  const tokenURI = await contract.getTokenURI();
  console.log(tokenURI);

  const contract2 = new ethers.Contract(NFTAddress2, abi, signer);
  // const tokenID = await getTokenIDByAddress(contract, signer.address);
  const tokenURI2 = await contract2.getTokenURI();
  console.log(tokenURI2);

  return [tokenURI, tokenURI2];
}
