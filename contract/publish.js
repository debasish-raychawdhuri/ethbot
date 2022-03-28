const Web3 = require('web3');
const fs = require('fs');
const EthereumTx = require('ethereumjs-tx').Transaction;
const rpcURL = 'http://172.18.0.2:8545';
const web3 = new Web3(rpcURL)
const miningpk = "0xAe930f01A40776B27E0bb92262537b3a83F92779"
const miningsk = "e34d067941d21d45e7c3a91cb785725c4b18e65100a5486e716347ffb8cf893f"
const contractpk = "0x1554eA16e67C1838d592287BBAdC2797E28d246f"
const contractsk = "091b906cf6081edc43a7cf2fa06cc5a4013f1ddd1f9a2db5979e371d2ba57aa6"
const abi = JSON.parse(fs.readFileSync("contract.abi").toString());
const bin = fs.readFileSync("contract.bin").toString();
console.log(abi);
console.log(bin);
web3.eth.getBalance("0xAe930f01A40776B27E0bb92262537b3a83F92779", function(err, result) {
  if (err) {
    console.log(err)
  } else {
    console.log(web3.utils.fromWei(result, "ether") + " ETH")
  }
})
