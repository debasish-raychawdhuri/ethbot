# Running Ethbot

The Ethbot source code allows one to run and test the Ethbot concept. It is not designed to be used for truely mounting an attack. We use Docker to simulate different components of the distributed system. This readme describes how to run the test bench.

The following is the directory structure - 

- **Top level:** This directory contains the code for the bots.
- **server:** Contains the Docker code for the deployment of a single geth node which acts as proxy for the main Ethereum chain.
- **contract:** Contains the code to deploy the solidity contract and also create the public keys for the bots to transact.
- **webserver:** Contains a basic webserver that acts as a dummy target to test the attack.

## Steps to run:
We assume that a working docker installation is present and working.
### Setup
  To setup the system for running for the first time, use the following command from the top level directory - 
 ```bash 
 sh network_create.sh
 sh contract/setup.sh
 ```
This creates a Docker network and a volume. 

### Start the server
To start the server, first move to the `server` directory - 
 ```bash
 cd server
 ```
 Now use the command - 
 ```bash
 sh start.sh
 ```
 Once started, the server will keep logging the output on the console. The name of the Docker container is `server`. 
 
### Deploy the contract

Before deploying the contract, wait for a few hours with the server running so that it mines enough ether for use. Once enough ether has been mined, the contract can be deployed by first moving to the contract directory from the top level with  - 
```bash
cd contract
```
Once in the directory, the contract can be deployed using  - 
```bash
sh start.sh
```
The command deploys the contract, generates the key-pairs for the bots to use and transfers fund to these keys. After that, it halts.

### Start the bots
Once the contract has been deployed, a specified number of bots can be launched. Each bot is simulated inside a separate Docker container and the launch is staggered in time.

```bash
sh start.sh <num>
```
where `<num>` is the number of bots to be launched.

Wait for the script to finish. When the script finishes executing, it has deployed `<num>` number of bots. The containers for the bots are named `botxx1`, `botxx2` and so on.

### Shell into the bot

Once the bots are launched, one can get a shell inside the n<sup>th</sup> bot using the following command -
```bash
docker exec -it botxx<n> bash
```
The bot logs the estimates in the file `output` and the errors in the file `errors`

To view the estimates for the number of bots, type the following while inside the bot's shell - 
```bash
cat output
```
### Collecting estimates
The estimates can be collected into `outputfile` using 
```bash
sh collect.sh > outputfile
```

### Running the webserver
The webserver acts as a dummy target for the attack. To start the webserver, first move to the webserver directory using
```bash
cd webserver
```
and then run the server using
```bash
sh start.sh
```
This will start logging the output of the webserver in the console. The sever outputs the total number of requests sent to it after every 100 requests.

### Starting and stopping the attack
The attack can be started from inside a bot. Get a shell into botxx1 using - 
```bash
docker exec -it botxx1 bash
```
While inside the botxx1 node, type - 

```bash
nodejs command.js hit
```
It will take around 5 minutes for all the bots to start the attack. Each bot sends one request every second.

The attack can be stopped using the following command from inside botxx1 - 

```bash
nodejs command.js
```
It will take around 5 minutes for all the bots to stop attacking.

### Stopping the bots
To stop the bots, enter the following command from the top level directory - 

```bash
sh stop.sh
```

### Stopping the server
The server can be stopped using the following command 
```bash
docker container stop server
```
