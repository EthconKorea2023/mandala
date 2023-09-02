import { ethers } from "hardhat";

async function main() {
  const contract = await ethers.getContractFactory("SimpleERC6551Account");
  const counter = await contract.deploy();

  await counter.deployed();

  console.log("Account deployed to:", counter.address);

  const accountRegistryContract = await ethers.getContractFactory("ERC6551Registry");
  const accountRegistry = await accountRegistryContract.deploy();

  await accountRegistry.deployed();

  console.log("Account Registry deployed to:", accountRegistry.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
