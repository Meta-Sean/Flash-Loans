require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      { version: "0.5.5" }, { version: "0.6.6" }, { version: "0.8.8" },
    ],
  },
  networks: {
    hardhat: {
      forking: {
        url: process.env.ALCHEMY_API,
      },
    },
    testnet: {
      url: process.env.ALCHEMY_API_TESTNET,
      chainId: 4,
      accounts: [process.env.PRIVATE_KEY],
    },
    mainnet: {
      url: process.env.ALCHEMY_API,
      chainId: 1,
      accounts: [process.env.PRIVATE_KEY],
    }
  },
};
