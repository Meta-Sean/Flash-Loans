const { expect, assert } = require("chai");
const { ethers } = require("hardhat");
require('dotenv').config();

const {
    addressFactory,
    addressRouter02,
    addressFrom,
    addressTo,
  } = require("../utils/AddressList");
  
  const { erc20ABI, factoryABI, pairABI, routerABI } = require("../utils/AbiList");


  describe("We can read and write to the blockchain", () => {
    // connecting to provider
    let provider, getContractFactory, contractRouter, contractToken, decimals, amountIn, amountOut;
    
    provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_API)

    // contract addresses
    contractFactory = new ethers.Contract(addressFactory, factoryABI, provider);
    contractRouter = new ethers.Contract(addressRouter02, routerABI, provider);
    contractToken = new ethers.Contract(addressFrom, erc20ABI, provider);

    const amountInHuman = "1";
    amountIn = ethers.utils.parseUnits(amountInHuman, decimals).toString();

    // get price information
    const getAmountOut = async () => {
        decimals = await contractToken.decimals();

        const amountsOut = await contractRouter.getAmountsOut(amountIn, [addressFrom, addressTo]);

        return amountsOut[1].toString();
    }

    it("connects to a provider, a factory, and a router", () => {
        assert(provider._isProvider);

        expect(contractFactory.address).to.equal("0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f");

        expect(contractRouter.address).to.equal("0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D");

        expect(contractToken.address).to.equal("0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2");
    });

    it("Get the price of amountsOut", async () => {
        const amount = await getAmountOut();
        console.log(amount.toString())
        assert(amount.toString());
    });

    it("sends a transaction, i.e. swaps a token", async () => {
        const [ownerSigner] = await ethers.getSigners();
        

        const mainnetForkUniswapRouter = new ethers.Contract(addressRouter02,routerABI, ownerSigner);

        const myAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

        const amountOut = await getAmountOut();

        const txSwap = await mainnetForkUniswapRouter.swapExactTokensForTokens(
            amountIn,// amount In,
            amountOut,// amount Out,
            [addressFrom, addressTo], // path,
            myAddress,// address to,
            Date.now() + 1000 * 60 * 5,// deadline,
            {
                gasLimit: 200000,
                gasPrice: ethers.utils.parseUnits("5.5", "gwei"),
            }// gas
        );

        assert(txSwap.hash);

        const mainnetForkProvider = ethers.provider;
        const txReceipt = await mainnetForkProvider.getTransactionReceipt(txSwap.hash);

        console.log("");
        console.log("SWAP TX");
        console.log(txSwap);

        console.log("");
        console.log("TX Receipt");
        console.log(txReceipt);
    })
  });