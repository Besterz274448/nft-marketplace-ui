const contractABI = require("../MyNFT.json");
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
const Web3 = require("web3");
const ethers = require("ethers");

export const mintToken = async (url) => {
  if (!window.ethereum) {
    console.log("metamask extension not found");
    //
    return;
  }

  //check network chain
  await window.ethereum.enable();

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const publicKey = await signer.getAddress();
  const contract = new ethers.Contract(contractAddress, contractABI.abi, signer);

  provider.getBalance(publicKey).then((balance) => {
    // convert a currency unit from wei to ether
    const gasLimitEth = ethers.utils.formatEther("0x7530");
    const balanceInEth = ethers.utils.formatEther(balance);
    const test = balanceInEth > gasLimitEth ? "pass" : "failed";
    console.log(`balance: ${balanceInEth} ETH`);
    console.log(`wei: ${gasLimitEth} ETH`);

    console.log(test);
  });

  // try {
  //   const tx = await contract.mintNFT(publicKey, url);
  //   console.log(tx);
  //   const receipt = await tx.wait();
  //   console.log(receipt);
  // } catch (e) {
  //   console.log(e.message);
  // }
};


  // const checkBalance = async (provider, publicKey) => {
  //   await provider.getBalance(publicKey).then((balance) => {
  //     // convert a currency unit from wei to ether
  //     const gasLimitEth = ethers.utils.formatEther("0x7530");
  //     const balanceInEth = ethers.utils.formatEther(balance);
  //     return balanceInEth > gasLimitEth;
  //   });
  // };
