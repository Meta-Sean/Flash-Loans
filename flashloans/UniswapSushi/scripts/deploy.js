const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Token = await ethers.getContractFactory("UniswapFlashSwap");
  const token = await Token.deploy();

  console.log("Token address:", token.address);

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
