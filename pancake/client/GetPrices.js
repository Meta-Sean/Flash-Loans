const ethers = require('ethers');

const { addressFactory, addressRouter, addressTo, addressFrom } = require("./AddressList");
const {erc20ABI, factoryABI, pairABI, routerABI} = require("./AbiList");

// Standard Provider 
const provider = new ethers.providers.JsonRpcProvider(
    "https://bsc-dataseed1.binance.org/"
);

// Connect to Factory
const contractFactory = new ethers.Contract(addressFactory, factoryABI, provider);

// Connect to Router
const contractRouter = new ethers.Contract(addressRouter, routerABI, provider);

// call blockchain
const getPrices = async (amountInHuman) => {
    // Convert the amount in
    const contractToken = new ethers.Contract(addressFrom, erc20ABI, provider);
    const decimals = await contractToken.decimals();
    const amountIn = ethers.utils.parseUnits(amountInHuman, decimals).toString();
    

    //Get amounts out
    const amountsOut = await contractRouter.getAmountsOut(amountIn, [addressFrom, addressTo]);

    // Convert amount out
    const contractToken2 = new ethers.Contract(addressTo, erc20ABI, provider);
    const decimals2 = await contractToken2.decimals();

    // Convert amount out to human readable
    const amountOutHuman = ethers.utils.formatUnits(amountsOut[1].toString(), decimals2);
    console.log(amountOutHuman)

};

const amountInHuman = "500";
getPrices(amountInHuman);