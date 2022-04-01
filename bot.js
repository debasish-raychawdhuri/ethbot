const sendHeartBeat = async (web3, estimator, public,miningpk, scale,now) => {
	console.log("inside sendHeartBeat");
	var nonce = await web3.eth.getTransactionCount(
		public
	);
	console.log("nonce = "+nonce);
	estimator.methods.heartBeat(scale, now).send({from:public,gas:1000000, nonce:nonce},(err,res)=>{
		console.log("("+scale+","+res+","+err+")"); 
		if(err){
			console.log(err);
			await sendHeartBeat(web3, estimator, public,miningpk, scale,now);
		}else{
			estimator.methods.getBeats(Math.floor(now/300000-1)).call({from:miningpk,gas:10000000}, (err,v) => {
				console.log("prev("+v+")");
			});
			estimator.methods.getBeats(Math.floor(now/300000)).call({from:miningpk,gas:10000000}, (err,v) => {
				console.log("now("+v+")");
			});
		}
		
	});
}

const allLoop = function(web3,estimator, miningpk, accounts, num_tran){
	return function(){
		var now = Date.now();
		console.log(now);
		console.log(miningpk);
		estimator.methods.estimate(now).call({from:miningpk,gas:10000000},(err,estimate)=>{
			if(err){
				console.log(err);
			}
			console.log(estimate)   // In this case  state is not changing.
			
			var scale = Math.floor(estimate/num_tran);
			if(scale==0){
				scale=1;
			}

			if (Math.floor(Math.random()*scale) == 0) {
				//publish heartbeat as a transaction to the contract
				//choose an account
				const index = Math.floor(accounts.length * Math.random());
				const public = accounts[index].public;

				console.log(public);
				await sendHeartBeat(web3, estimator, public,miningpk,scale,now);
			}

		});
	}



}


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



	const accJson = fs.readFileSync('/volume/accounts').toString().trim();
	const accObj = JSON.parse(accJson);
	console.log(accJson);
	const accounts = accObj.accounts;
	console.log(accounts.length);
	for(let i=0;i<accounts.length;i++){
		console.log(accounts[i].public)
		web3.eth.accounts.wallet.add({  // In order to send signed transactions.
			privateKey : accounts[i].private,
			address : accounts[i].public
		});
	}
		
	const estimator = new web3.eth.Contract(abi,contractId);
	//allLoop(estimator,miningpk,accounts,9)();
	setInterval(allLoop(web3,estimator,miningpk,accounts,9),300000);

	// estimate scale

}
main();
