import { ethers } from "hardhat";

async function main() {
  const contract1 = await ethers.getContractFactory("NFTContract");
  const NFTContract1 = await contract1.deploy("SampleGame1","GAME","https://bafybeibautkkyublqfhlmwtvzrqqxwf6gi24hzvjmobdrz5rkqmwfqrvr4.ipfs.nftstorage.link/","0xA87eC29Ff2FD8A069c4F2342aCDE2444B0052687","0xA217456D7FAa0B5205818C4eaf32b55B9E9F9bB2");

  await NFTContract1.deployed();

  console.log("NFTContract1 deployed to:", NFTContract1.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
