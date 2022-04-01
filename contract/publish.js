async function main(){
	const Web3 = require('web3');
	const Tx = require('ethereumjs-tx').Transaction;
	const fs = require('fs');
	const rpcURL = 'http://172.18.0.2:8545';
	const web3 = new Web3(rpcURL)
	const miningpk = "0xAe930f01A40776B27E0bb92262537b3a83F92779"
	const miningsk = "e34d067941d21d45e7c3a91cb785725c4b18e65100a5486e716347ffb8cf893f"
	const contractpk = "0x1554eA16e67C1838d592287BBAdC2797E28d246f"
	const contractsk = "091b906cf6081edc43a7cf2fa06cc5a4013f1ddd1f9a2db5979e371d2ba57aa6"
	const abiStr =  fs.readFileSync("contract.abi").toString();
	const abi = JSON.parse(abiStr);
	const bin = fs.readFileSync("contract.bin").toString().trim();
	//console.log(abi);
	//console.log(bin);

	fs.writeFile('/volume/contract.abi', abiStr, function (err,data) {
        	if (err) {
                	return console.log(err);
                }
                console.log(data);
        });


	const account = web3.eth.accounts.privateKeyToAccount(miningsk);
	web3.eth.getBalance(miningpk, function(err, result) {
  		if (err) {
    			console.log(err)
  		} else {
    			console.log(web3.utils.fromWei(result, "ether") + " ETH")
  		}
	});
	//let's create some accounts
	var accounts = [];
	for(var i=0;i<500;i++){
		var wallet = await web3.eth.accounts.create();
		accounts.push({
			public: wallet.address,
			private: wallet.privateKey.substring(2)
		});
	}
	var accJson = JSON.stringify(accounts);
	console.log(accJson);

	const transferFunds = async () => {
		console.log(
			`Attempting to make transaction from ${miningpk} to ${contractpk}`
		);

		const createTransaction = await web3.eth.accounts.signTransaction(
			{	
				from: miningpk,
				to: contractpk,
				value: web3.utils.toWei('20', 'ether'),
				gas: '21000',
			
			},
			miningsk
		);
		const createReceipt = await web3.eth.sendSignedTransaction(
			createTransaction.rawTransaction
		);
		console.log(
			`Transaction successful with hash: ${createReceipt.transactionHash}`
		);
	};
	await transferFunds();

	const deploy = async() => {

    		console.log('Attempting to deploy from account:', contractpk);
   		const incrementer = new web3.eth.Contract(abi);

    		const incrementerTx = incrementer.deploy({
        		data: "0x"+bin,
        		// arguments: [],
    		})
    		const createTransaction = await web3.eth.accounts.signTransaction({
            			from: contractpk,
            			data: incrementerTx.encodeABI(),
            			gas: 3000000,
        		},
        		contractsk
    		)
    		const createReceipt = web3.eth.sendSignedTransaction(createTransaction.rawTransaction).then((res) => {
        		console.log('Contract deployed at address', res.contractAddress);
			fs.writeFile('/volume/contractId', res.contractAddress, function (err,data) {
  				if (err) {
    					return console.log(err);
  				}
  				console.log(data);
			});	
    		});
	};
	await deploy();


}
main();
