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

  window.ethereum.enable();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const wallet = await signer.getAddress();
  const contract = new ethers.Contract(contractAddress, contractABI.abi, signer);

  try {
    const tx = await contract.mintNFT(wallet, url);
    console.log(tx);
    const receipt = await tx.wait();
    console.log(receipt);
  } catch (e) {
    console.log(e.message);
  }
};

//solution 1:
// export const mintToken = async (url) => {
//   console.log("check window.ethereum");
//   if (!window.ethereum) {
//     //do something;
//     return;
//   }

//   const web3 = new Web3(window.ethereum);

//   console.log(window.ethereum.selectedAddress);

//   const contract = await new web3.eth.Contract(contractABI.abi, contractAddress);

//   const tx = {
//     from: window.ethereum.selectedAddress,
//     to: contractAddress,
//     gas: "0x55F0",
//     data: contract.methods.createToken(url).encodeABI(),
//   };

//   console.log("call mintToken");

//   // contract.methods
//   //   .createToken(url)
//   //   .send({ from: window.ethereum.selectedAddress })
//   //   .on("confirmation", () => {
//   //     console.log("success");
//   //   });

//   try {
//     const txHash = await window.ethereum.request({
//       method: "eth_sendTransaction",
//       params: [tx],
//     });
//     return {
//       success: true,
//       status:
//         "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" + txHash,
//     };
//   } catch (error) {
//     return {
//       success: false,
//       status: "😥 Something went wrong: " + error.message,
//     };
//   }
// };
