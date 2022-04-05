
async function main(){
    const Web3 = require('web3');
    const Tx = require('ethereumjs-tx').Transaction;
    const fs = require('fs');
    const rpcURL = 'http://localhost:8546';
    const web3 = new Web3(rpcURL)
    const contractpk = "0x1554eA16e67C1838d592287BBAdC2797E28d246f"
	const contractsk = "091b906cf6081edc43a7cf2fa06cc5a4013f1ddd1f9a2db5979e371d2ba57aa6"
    const abi = JSON.parse(fs.readFileSync("/volume/contract.abi").toString());
    const contractId = fs.readFileSync("/volume/contractId").toString().trim();

    const sleep = function(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
    }	

    web3.eth.accounts.wallet.add({  // In order to send signed transactions.
        privateKey : contractsk,
        address : contractpk
    });

    const estimator = new web3.eth.Contract(abi,contractId);
    estimator.methods.updateCommand("http://172.18.1.1:8000/").send({from:contractpk,gas:100000},async (err,estimate)=>{
        if(err){
            console.error(err);
        }
    })

}
main();
