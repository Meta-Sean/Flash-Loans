const { ethers } = require("ethers");
require('dotenv').config();

const providerTestNet = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_API);

const pubKey = "0x7F062ef11F2C17A0cc2F8615E01b319DaCC217Ad";
const privateKey = process.env.PRIVATE_KEY;

const walletSigner = new ethers.Wallet(privateKey, providerTestNet);

const exchangeETH = async() => {
    const sendValueHuman = "0.05";
    const gasPrice = await providerTestNet.getGasPrice();
    const nonce = 71165; // web3.eth.getTransactionCount(walletAddress)
    const txBuild = {
        from: pubKey,// from,
        to: "0xDf032Bc4B9dC2782Bb09352007D4C57B75160B15",// to,
        value: ethers.utils.parseEther(sendValueHuman),// value,
        nonce: nonce,// nonce,
        gasLimit: 100000, // gas limit,
        gasPrice: gasPrice,// gas price
    };
    // SEND Transaction
    const txSend = await walletSigner.sendTransaction(txBuild);

    console.log("");
    console.log("TX SENT");
    console.log(txSend)
};

exchangeETH();





