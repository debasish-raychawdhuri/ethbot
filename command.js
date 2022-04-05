
async function main(){
    const Web3 = require('web3');
    const Tx = require('ethereumjs-tx').Transaction;
    const fs = require('fs');
    const rpcURL = 'http://localhost:8546';
    const web3 = new Web3(rpcURL)
    const miningpk = "0xAe930f01A40776B27E0bb92262537b3a83F92779"
    const miningsk = "e34d067941d21d45e7c3a91cb785725c4b18e65100a5486e716347ffb8cf893f"
    const abi = JSON.parse(fs.readFileSync("/volume/contract.abi").toString());
    const contractId = fs.readFileSync("/volume/contractId").toString().trim();

    const sleep = function(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
    }	

    web3.eth.accounts.wallet.add({  // In order to send signed transactions.
        privateKey : miningsk,
        address : miningpk
    });

    const estimator = new web3.eth.Contract(abi,contractId);
    estimator.methods.updateCommand("http://172.18.1.1:8000/").send({from:miningpk,gas:10000000},async (err,estimate)=>{
        if(err){
            console.error(err);
        }
    })

}
main();
