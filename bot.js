async function sendHeartBeat(web3, estimator, public,miningpk, scale,now) {
	//console.log("inside sendHeartBeat");
	var nonce = await web3.eth.getTransactionCount(
		public
	);
	//console.log("nonce = "+nonce);
	estimator.methods.heartBeat(scale, now).send({from:public,gas:1000000, nonce:nonce},async (err,res)=>{
		//console.log("("+scale+","+res+","+err+")"); 
		if(err){
			console.error(err);
			try{
				await sendHeartBeat(web3, estimator, public,miningpk, scale,now);
			}catch(e){
				console.error(e)
			}
			
		}else{
			// estimator.methods.getBeats(Math.floor(now/300000-1)).call({from:miningpk,gas:10000000}, (err,v) => {
			// 	console.log("prev("+v+")");
			// });
			// estimator.methods.getBeats(Math.floor(now/300000)).call({from:miningpk,gas:10000000}, (err,v) => {
			// 	console.log("now("+v+")");
			// });
		}
		
	});
}

function hitTarget(command){
	return ()=>{
		const http = require('http')
		const req = http.request(command, res => {
			//console.log(`statusCode: ${res.statusCode}`)	
			// res.on('data', d => {
			// 	process.stdout.write(d)
			// })
		})
		
		req.on('error', error => {
			console.error(error)
		})
		
		req.end()
	}
	
}
let timer=null;
function allLoop (web3,estimator, miningpk, accounts, num_tran) {
	return async function(){
		var now = Date.now();
		//console.log(now);
		//console.log(miningpk);
		estimator.methods.getCommand().call({from:miningpk,gas:10000000},async (err,command)=>{
			if(err){
				console.log(err);
			}
			clearInterval(timer);
			if(command){
				if(command.length > 0 ){
					timer = setInterval(hitTarget(command),1000)
				}
			}
		})
		estimator.methods.estimate(now).call({from:miningpk,gas:10000000},async (err,estimate)=>{
			if(err){
				console.error(err);
			}
			console.log(estimate['0']+","+estimate['1'])   // In this case  state is not changing.
			
			var scale = Math.round(estimate['0']/num_tran);
			if(scale==0){
				scale=1;
			}

			if (Math.floor(Math.random()*scale) == 0) {
				//publish heartbeat as a transaction to the contract
				//choose an account
				const index = Math.floor(accounts.length * Math.random());
				const public = accounts[index].public;

				//console.log(public);
				try{
					await sendHeartBeat(web3, estimator, public,miningpk,scale,now);
				}catch(e){
					console.error(e)
				}
				
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
	//console.log(accJson);
	const accounts = accObj.accounts;
	//console.log(accounts.length);
	for(let i=0;i<accounts.length;i++){
		//console.log(accounts[i].public)
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
