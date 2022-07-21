const { ethers } = require("ethers");
require('dotenv').config();
const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_API)

const addressFactory = '0x1F98431c8aD98523631AE4a59f267346ea31F984'

const abi = ["function getPool(address tokenA, address tokenB, uint24 fee) external view returns (address pool)"]

const contractFactory = new ethers.Contract(addressFactory, abi, provider);

const addressWETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const addressYFI = "0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e"

const getPool = async () => {
    const addressPool = await contractFactory.getPool(
        addressWETH,
        addressYFI,
        3000
    );
    console.log(addressPool)
}


getPool();