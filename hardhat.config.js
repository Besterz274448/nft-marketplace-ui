require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.3",
  networks: {
   Ropsten: {
    url: "https://ropsten.infura.io/v3/da4054da74c14b908df646c40ad340fa", //Infura url with projectId
    accounts: ["7c3e4f86f6263b85e48e0d50da93cd2ea9db93392abecc7d071613226d48df77"] // add the account that will deploy the contract (private key)
    },
  }
};