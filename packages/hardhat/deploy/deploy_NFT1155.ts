import { ethers } from "hardhat";

async function main() {
  const contract = await ethers.getContractFactory("MyToken");
  const MyToken = await contract.deploy();

  await MyToken.deployed();

  console.log("MyToken deployed to:", MyToken.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
