import { ethers } from "hardhat";

async function main() {
  const NFTManagerContract = await ethers.getContractFactory("NFTManager");
  const NFTManager = await NFTManagerContract.deploy();

  await NFTManager.deployed();

  console.log("NFTManager deployed to:", NFTManager.address);

  const AccountContract = await ethers.getContractFactory("SimpleERC6551Account");
  const Account = await AccountContract.deploy();

  await Account.deployed();

  console.log("Account Implementation deployed to :", Account.address);

  const accountRegistryContract = await ethers.getContractFactory("ERC6551Registry");
  const accountRegistry = await accountRegistryContract.deploy();

  await accountRegistry.deployed();

  console.log("Account Registry deployed to:", accountRegistry.address);

  const ItemContract = await ethers.getContractFactory("MyToken");
  const MyToken = await ItemContract.deploy();

  await MyToken.deployed();

  console.log("MyToken deployed to:", MyToken.address);


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});