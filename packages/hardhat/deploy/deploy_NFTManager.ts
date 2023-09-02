import { ethers } from "hardhat";

async function main() {
  const contract = await ethers.getContractFactory("NFTManager");
  const NFTManager = await contract.deploy();

  await NFTManager.deployed();

  console.log("NFTManager deployed to:", NFTManager.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
